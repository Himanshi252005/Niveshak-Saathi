// C-19 real-world persona test. Each persona uses the real app (headless Edge) the way that person would: their phone
// size, their language, large text if they need it, starting on Home, typing their own words.
//   node run-personas.cjs <app/index.html> <personasDir> <outDir> [--only P001,P002] [--workers 3]
// Writes <outDir>/results.json and one screenshot per persona in <outDir>/shots. Touches nothing outside <outDir>.
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
// Playwright from a normal install (npm install playwright), or from the Codex runtime this project was built with.
const { chromium } = (() => { try { return require('playwright'); } catch (e) { return require(path.join(process.env.USERPROFILE || '', '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); } })();
// Microsoft Edge when installed (as for the published results), otherwise Playwright's own Chromium; BROWSER_PATH overrides.
const EDGE = process.env.BROWSER_PATH || ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(p => fs.existsSync(p));
const argv = process.argv.slice(2), opt = n => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const [APP, PDIR, OUT] = argv.filter((a, i) => !a.startsWith('--') && !(argv[i - 1] || '').startsWith('--'));
const ONLY = (opt('--only') || '').split(',').filter(Boolean), WORKERS = +(opt('--workers') || 3);
const HTML = fs.readFileSync(APP);
fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true });
const personas = fs.readdirSync(PDIR).filter(f => /^part-\d+\.json$/.test(f)).sort()
  .flatMap(f => { try { return JSON.parse(fs.readFileSync(path.join(PDIR, f), 'utf8')); } catch (e) { console.error('cannot read ' + f + ': ' + e.message); return []; } })
  .filter(p => !ONLY.length || ONLY.includes(p.id));

const LARGE = /Larger text|बड़ा टेक्स्ट/;
async function openMenuIfPhone(page) { if (await page.locator('#menuButton').isVisible()) { await page.locator('#menuButton').click(); await page.waitForTimeout(260); return true; } return false; }
// Real users start on Home; a tool without a Home choice is reached through the menu.
async function openTool(page, tab) {
  const card = page.locator(`#home .task-card[data-go="${tab}"]`);
  if (await card.count() && await card.isVisible()) { await card.click(); return 'home card'; }
  await openMenuIfPhone(page); await page.locator(`#sideNav [data-tab="${tab}"]`).evaluate(b => { const d = b.closest('details'); if (d && !d.open) d.open = true; }); await page.locator(`#sideNav [data-tab="${tab}"]`).click(); return 'menu';
}
async function largeText(page) {
  const phone = await openMenuIfPhone(page);
  await page.locator('#toolbar > button', { hasText: LARGE }).first().click();
  if (phone) { await page.keyboard.press('Escape'); await page.waitForTimeout(260); }
}
const text = (page, sel) => page.evaluate(s => { const e = document.querySelector(s); return e ? (e.value !== undefined && e.tagName === 'TEXTAREA' ? e.value : e.innerText) : null; }, sel);

const J = {
  async check(page, p, rec) {
    const i = p.input || {};
    rec.path = await openTool(page, 'check');
    await page.locator('#message').fill(i.message || '');
    if (i.channel) await page.locator('#msgChannel').selectOption(i.channel).catch(() => rec.notes.push('channel not offered: ' + i.channel));
    const t0 = Date.now(); await page.locator('#analyse').click();
    await page.waitForFunction(() => document.getElementById('riskVerdict') || ((document.getElementById('result') || {}).innerText || '').trim().length > 0, null, { timeout: 8000 }).catch(() => rec.notes.push('no result within 8 s'));
    rec.ms = Date.now() - t0;
    rec.out = await page.evaluate(() => {
      const v = document.getElementById('riskVerdict'), r = document.getElementById('result') || { innerText: '' };
      return { level: v ? v.dataset.level : null, heading: (r.querySelector && (r.querySelector('h2') || {}).textContent) || '', coverageNote: /outside our English\/Hindi coverage|जाँच के दायरे से बाहर|looks like Marathi|मराठी में लगता है/.test(r.innerText), questionNote: /looks like your own question|आपका अपना सवाल लगता है/.test(r.innerText), negationNote: /caution or negated statement|चेतावनी या मना करने वाले वाक्य/.test(r.innerText), typedLength: document.getElementById('message').value.length,
        flags: r.querySelectorAll ? [...r.querySelectorAll('.flag strong')].map(e => e.textContent.trim()) : [],
        insights: ['insightReturns', 'insightLinks', 'insightPayees'].filter(id => document.getElementById(id)).map(id => id + ': ' + document.getElementById(id).innerText.replace(/\s+/g, ' ').slice(0, 220)),
        warnFamily: !!document.getElementById('warnFamily'), resultText: r.innerText.replace(/\s+/g, ' ').slice(0, 1600) };
    });
  },
  async paycheck(page, p, rec) {
    const i = p.input || {};
    rec.path = await openTool(page, 'paycheck');
    for (const k of ['purpose', 'askedBy', 'payTo']) if (i[k]) await page.locator(`#pay-${k}-${i[k]}`).check().catch(() => rec.notes.push(`option not offered: ${k}=${i[k]}`));
    if (i.upiId && i.payTo === 'upi') await page.locator('#payUpi').fill(String(i.upiId)).catch(e => rec.notes.push('UPI field: ' + e.message.split('\n')[0]));
    if (i.returnRate !== null && i.returnRate !== undefined && i.returnRate !== '') {
      await page.locator('#payRate').fill(String(i.returnRate)).catch(e => rec.notes.push('rate field: ' + e.message.split('\n')[0]));
      if (i.returnPeriod) await page.locator('#payPeriod').selectOption(i.returnPeriod).catch(() => rec.notes.push('period not offered: ' + i.returnPeriod));
    }
    const t0 = Date.now(); await page.locator('#payCheckBtn').click(); await page.waitForTimeout(120); rec.ms = Date.now() - t0;
    rec.out = await page.evaluate(() => { const v = document.getElementById('payVerdict'), r = document.getElementById('payResult'); return { verdict: v ? v.dataset.verdict : null, resultText: r ? r.innerText.replace(/\s+/g, ' ').slice(0, 1600) : '' }; });
  },
  async emergency(page, p, rec) {
    const i = p.input || {};
    rec.path = await openTool(page, 'emergency');
    await page.locator('#incidentText').fill(i.story || '');
    await page.locator('#incidentFill').click(); await page.waitForTimeout(150);
    const st = await page.evaluate(() => ({ situations: [...document.querySelectorAll('#emergency [data-situation][aria-pressed="true"]')].map(b => b.dataset.situation), radios: [...document.querySelectorAll('#emergency input[type=radio]:checked')].map(r => r.id), status: ((document.getElementById('incidentStatus') || {}).innerText || '').replace(/\s+/g, ' '), typedLength: document.getElementById('incidentText').value.length }));
    const pick = pre => (st.radios.find(id => id.startsWith(pre)) || '').slice(pre.length) || null;
    await page.locator('#emergencyPlan').click(); await page.waitForTimeout(150);
    const plan = await page.evaluate(() => ({ actions: [...document.querySelectorAll('#emergencyResult li[data-action]')].map(li => li.dataset.action), text: ((document.getElementById('emergencyResult') || {}).innerText || '').replace(/\s+/g, ' ').slice(0, 1600) }));
    rec.out = { situations: st.situations, ongoing: pick('ongoing-'), channel: pick('channel-'), when: pick('paid-when-'), status: st.status, typedLength: st.typedLength, storyLength: (i.story || '').length, plan: plan.actions, resultText: plan.text };
  },
  async route(page, p, rec) {
    const i = p.input || {};
    rec.path = await openTool(page, 'route');
    await page.locator(`#issue-${i.issue}`).click().catch(() => rec.notes.push('issue not offered: ' + i.issue));
    await page.waitForTimeout(120);
    const first = await text(page, '#routeResult');
    const other = (await page.locator('#language').inputValue()) === 'hi' ? 'en' : 'hi', mine = other === 'hi' ? 'en' : 'hi';
    await page.locator('#language').selectOption(other); const second = await text(page, '#routeResult'); await page.locator('#language').selectOption(mine);
    rec.out = { resultText: (first || '').replace(/\s+/g, ' ').slice(0, 1800), otherLanguageText: (second || '').replace(/\s+/g, ' ').slice(0, 1800) };
  },
  async draft(page, p, rec) {
    const i = p.input || {};
    rec.path = await openTool(page, 'draft');
    await page.locator('#summary').fill(i.summary || '');
    await page.locator('#outcome').fill(i.outcome || '');
    if (i.entity) await page.locator('#packetEntity').fill(i.entity);
    if (i.when) await page.locator('#packetWhen').fill(i.when).catch(() => rec.notes.push('month field refused: ' + i.when));
    await page.locator('#generate').click(); await page.waitForTimeout(120);
    const before = await page.locator('#draftText').inputValue();
    await page.locator('#packetReviewed').check().catch(() => {});
    const blocked = await page.locator('#download').isDisabled(), gate = (await text(page, '#packetGate')) || '';
    const kinds = await page.evaluate(() => [...document.querySelectorAll('[data-kind]')].filter(e => e.getClientRects().length).map(e => e.dataset.kind));
    await page.locator('#maskPacket').click().catch(() => rec.notes.push('mask button not available'));
    await page.waitForTimeout(100);
    const after = await page.locator('#draftText').inputValue();
    await page.locator('#packetReviewed').check().catch(() => {});
    const blockedAfter = await page.locator('#download').isDisabled(), gateAfter = (await text(page, '#packetGate')) || '';
    rec.out = { blockedBeforeMask: blocked, gate: gate.replace(/\s+/g, ' ').slice(0, 400), detectedKinds: kinds, blockedAfterMask: blockedAfter, gateAfter: gateAfter.replace(/\s+/g, ' ').slice(0, 400), draftBefore: before.slice(0, 2500), draftAfter: after.slice(0, 2500) };
  },
  async family(page, p, rec) {
    const i = p.input || {};
    rec.path = await openTool(page, 'family');
    for (const h of i.holdings || []) await page.locator(`[data-holding="${h}"]`).click().catch(() => rec.notes.push('holding not offered: ' + h));
    if (i.nominee) { const r = page.locator(`#nominee-${i.nominee}`); if (await r.isVisible()) await r.check(); else rec.notes.push('nominee question not shown for these holdings'); }
    await page.locator('#familyShow').click(); await page.waitForTimeout(120);
    rec.out = await page.evaluate(() => { const r = document.getElementById('familyResult'); return { items: r ? r.querySelectorAll('li').length : 0, resultText: r ? r.innerText.replace(/\s+/g, ' ').slice(0, 2400) : '' }; });
  }
};

async function runOne(browser, BASE, p) {
  const d = p.device || {}, width = +d.width || 360, height = +d.height || 760, mobile = d.mobile !== undefined ? !!d.mobile : width < 768;
  const rec = { id: p.id, journey: p.journey, persona: p.persona, device: { width, height, mobile, largeText: !!d.largeText }, uiLanguage: p.uiLanguage || 'hi', notes: [], errors: [], consoleErrors: [], externalRequests: [] };
  const ctx = await browser.newContext({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile, acceptDownloads: true }), page = await ctx.newPage();
  page.on('pageerror', e => rec.errors.push(e.message.split('\n')[0]));
  page.on('console', m => { if (m.type() === 'error') rec.consoleErrors.push(m.text().slice(0, 200)); });
  page.on('request', r => { const u = r.url(); if (!u.startsWith(BASE) && !/^(data|blob):/.test(u)) rec.externalRequests.push(u.slice(0, 120)); });
  try {
    await page.goto(BASE); await page.locator('#language').selectOption(rec.uiLanguage === 'en' ? 'en' : 'hi');
    if (rec.device.largeText) await largeText(page);
    if (!J[p.journey]) throw new Error('unknown journey ' + p.journey);
    await J[p.journey](page, p, rec);
    rec.post = await page.evaluate(() => {
      const main = document.querySelector('main'), txt = main ? main.innerText : '';
      const over = []; for (const e of document.querySelectorAll('main *')) { if (!e.getClientRects().length) continue; const r = e.getBoundingClientRect(); if (r.right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed') { over.push(e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (typeof e.className === 'string' && e.className ? '.' + e.className.trim().split(/\s+/)[0] : '')); if (over.length > 3) break; } }
      return { pageScrollsSideways: document.scrollingElement.scrollWidth > innerWidth + 1, overflowing: over, junk: (txt.match(/\bundefined\b|\bNaN\b|\[object Object\]|\bnull\b/g) || []).slice(0, 3) };
    });
    await page.screenshot({ path: path.join(OUT, 'shots', p.id + '.png') });
    // A real user may switch language after reading the result: it must keep working.
    const other = rec.uiLanguage === 'en' ? 'hi' : 'en'; await page.locator('#language').selectOption(other); await page.locator('#language').selectOption(rec.uiLanguage === 'en' ? 'en' : 'hi');
  } catch (e) { rec.crash = e.message.split('\n')[0]; await page.screenshot({ path: path.join(OUT, 'shots', p.id + '-crash.png') }).catch(() => {}); }
  await ctx.close();
  return rec;
}

const server = http.createServer((q, s) => { if (q.url === '/' || q.url === '/index.html') { s.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); s.end(HTML); } else { s.writeHead(404); s.end(); } }).listen(0, '127.0.0.1', async () => {
  const BASE = 'http://127.0.0.1:' + server.address().port, browser = await chromium.launch({ headless: true, executablePath: EDGE });
  const results = new Array(personas.length); let next = 0;
  await Promise.all(Array.from({ length: Math.min(WORKERS, personas.length) }, async () => {
    while (next < personas.length) { const k = next++; results[k] = await runOne(browser, BASE, personas[k]); process.stdout.write(results[k].crash ? 'x' : '.'); }
  }));
  await browser.close(); server.close();
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 1));
  console.log('\n' + results.length + ' personas run; crashes ' + results.filter(r => r.crash).length + '; page errors ' + results.filter(r => r.errors.length).length + '; external requests ' + results.filter(r => r.externalRequests.length).length + ' -> ' + path.join(OUT, 'results.json'));
});
