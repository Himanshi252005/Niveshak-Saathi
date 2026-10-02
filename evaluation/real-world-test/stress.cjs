// C-19 stress inputs that real people produce by accident or on purpose: huge pastes, emoji-only, hidden characters,
// pasted HTML/script, right-to-left text, double taps, Back button. node stress.cjs <app/index.html> <outDir>
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
// Playwright from a normal install (npm install playwright), or from the Codex runtime this project was built with.
const { chromium } = (() => { try { return require('playwright'); } catch (e) { return require(path.join(process.env.USERPROFILE || '', '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); } })();
// Microsoft Edge when installed (as for the published results), otherwise Playwright's own Chromium; BROWSER_PATH overrides.
const EDGE = process.env.BROWSER_PATH || ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(p => fs.existsSync(p));
const [APP, OUT] = process.argv.slice(2), HTML = fs.readFileSync(APP); fs.mkdirSync(OUT, { recursive: true });
const ZW = String.fromCharCode(0x200B), RLM = String.fromCharCode(0x200F);
const E = cp => String.fromCodePoint(cp);
const CASES = [
  ['huge paste (10,000 chars, scam at the end)', 'Market update. '.repeat(640) + ' Guaranteed 30% monthly return, pay today to profitking@ybl'],
  ['one 6,000-char word', 'a'.repeat(6000)],
  ['emoji only', E(0x1F680) + E(0x1F4B0) + E(0x1F4C8) + E(0x1F525) + E(0x1F911)],
  ['scam words split by invisible characters', 'g' + ZW + 'u' + ZW + 'a' + ZW + 'r' + ZW + 'a' + ZW + 'n' + ZW + 't' + ZW + 'e' + ZW + 'e' + ZW + 'd 20% monthly profit, send money to my UPI today'],
  ['pasted HTML image with script handler', '<img src=x onerror="window.__xss=1">Guaranteed IPO allotment, pay now'],
  ['pasted script tag', '<script>window.__xss=2</script> Double your money in 7 days'],
  ['link with javascript: scheme', 'Click javascript:window.__xss=3 to claim your refund of Rs 5000'],
  ['Urdu right-to-left text', RLM + 'آپ کو 10 فیصد روزانہ منافع ملے گا، آج ہی پیسے بھیجیں'],
  ['whitespace only', '      \n\n   '],
  ['only numbers', '9876543210 482913 4111111111111111'],
  ['Devanagari digits scam', 'केवल ₹५००० लगाओ, रोज़ ५% पक्का मुनाफ़ा, आज ही UPI करो'],
  ['lookalike official domain', 'SEBI notice: your demat is frozen. Verify KYC at https://sebi.gov.in.kyc-verify.top/login within 2 hours'],
  ['all caps shouting', 'URGENT!!! YOUR ACCOUNT WILL BE BLOCKED TODAY. UPDATE PAN NOW CLICK BIT.LY/PAN-UPDATE-NOW'],
  ['markdown and forwarded header', '*Forwarded many times*\n> **VIP CALL** : BUY XYZ PENNY STOCK @ 4.20 TARGET 40 \u{1F680}\u{1F680}\n_join fast, limited seats_'],
  ['legit long bank SMS', 'Dear Customer, INR 2,500.00 debited from A/c XX1234 on 01-10-26 to VPA grocery.shop@oksbi (UPI Ref 627412345678). Not you? Call 1800-XXX-XXXX. Never share OTP. -Bank']
];
const server = http.createServer((q, s) => { s.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); s.end(HTML); }).listen(0, '127.0.0.1', async () => {
  const BASE = 'http://127.0.0.1:' + server.address().port, b = await chromium.launch({ headless: true, executablePath: EDGE });
  const rows = [];
  const page = await (await b.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true })).newPage(), errors = [], dialogs = [];
  page.on('pageerror', e => errors.push(e.message.split('\n')[0])); page.on('dialog', d => { dialogs.push(d.message()); d.dismiss(); });
  await page.goto(BASE); await page.locator('#language').selectOption('en'); await page.locator('#home .task-card[data-go="check"]').click();
  for (const [name, msg] of CASES) {
    const e0 = errors.length;
    await page.locator('#message').fill(msg);
    const t0 = Date.now(); await page.locator('#analyse').click();
    await page.waitForFunction(() => ((document.getElementById('result') || {}).innerText || '').trim().length > 0, null, { timeout: 10000 }).catch(() => {});
    const ms = Date.now() - t0;
    const o = await page.evaluate(() => ({ level: (document.getElementById('riskVerdict') || { dataset: {} }).dataset.level || null, coverage: /outside our English\/Hindi coverage|जाँच के दायरे से बाहर/.test((document.getElementById('result') || {}).innerText || ''), typed: document.getElementById('message').value.length, xss: window.__xss || 0, injected: !!document.querySelector('#result img, #result script'), heading: ((document.querySelector('#result h2') || {}).textContent || '').slice(0, 80), resultStart: ((document.getElementById('result') || {}).innerText || '').replace(/\s+/g, ' ').slice(0, 160), sideways: document.scrollingElement.scrollWidth > innerWidth + 1 }));
    rows.push({ name, chars: msg.length, ms, ...o, newErrors: errors.slice(e0) });
  }
  // Double tap on Check, then the Back button, then a language switch: still one result and no errors.
  await page.locator('#message').fill('Guaranteed IPO allotment, pay to profitking@ybl now');
  await page.locator('#analyse').dblclick(); await page.waitForTimeout(200);
  const verdicts = await page.locator('#riskVerdict').count();
  await page.goBack().catch(() => {}); await page.waitForTimeout(300);
  const afterBack = await page.evaluate(() => ({ url: location.href, home: !!document.getElementById('home'), visible: [...document.querySelectorAll('main [role=tabpanel]')].filter(p => !p.classList.contains('hidden')).map(p => p.id) })).catch(e => ({ error: e.message }));
  rows.push({ name: 'double tap Check', verdictElements: verdicts }, { name: 'browser Back after a check', ...afterBack });
  // Emergency own words: very long story and an empty story.
  await page.goto(BASE); await page.locator('#language').selectOption('hi'); await page.locator('#home .task-card[data-go="emergency"]').click();
  await page.locator('#incidentFill').click(); rows.push({ name: 'emergency: fill with empty story', status: (await page.locator('#incidentStatus').innerText()).slice(0, 120) });
  const longStory = 'maine pehle ek group join kiya phir unhone bola ki IPO mein pakka allotment milega '.repeat(20) + ' aakhir mein maine UPI se 20000 bhej diye';
  await page.locator('#incidentText').fill(longStory); await page.locator('#incidentFill').click(); await page.waitForTimeout(150);
  rows.push({ name: 'emergency: 1,700-char story where the payment is at the end', typed: (await page.locator('#incidentText').inputValue()).length, of: longStory.length, situations: await page.evaluate(() => [...document.querySelectorAll('#emergency [data-situation][aria-pressed="true"]')].map(b => b.dataset.situation)), status: (await page.locator('#incidentStatus').innerText()).slice(0, 140) });
  rows.push({ name: 'dialogs opened by pasted text', dialogs }, { name: 'all page errors', errors });
  fs.writeFileSync(path.join(OUT, 'stress.json'), JSON.stringify(rows, null, 1));
  for (const r of rows) console.log(JSON.stringify(r));
  await b.close(); server.close();
});
