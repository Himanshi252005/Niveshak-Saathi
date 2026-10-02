// Scores each persona's result against what a careful app should do, and summarises problems.
//   node judge.cjs <personasDir> <results.json> <out report.json>
'use strict';
const fs = require('fs'), path = require('path');
const [PDIR, RES, OUTF] = process.argv.slice(2);
const personas = Object.fromEntries(fs.readdirSync(PDIR).filter(f => /^part-\d+\.json$/.test(f)).sort().flatMap(f => JSON.parse(fs.readFileSync(path.join(PDIR, f), 'utf8'))).map(p => [p.id, p]));
const results = JSON.parse(fs.readFileSync(RES, 'utf8'));
const DEV = '०१२३४५६७८९', norm = s => String(s || '').replace(/[०-९]/g, d => String(DEV.indexOf(d))).replace(/[\s\-.]/g, '').toLowerCase();
const UNSUPPORTED = new Set(['ta', 'bn', 'mr', 'te', 'kn', 'ml', 'gu', 'pa', 'or', 'ur']);
// Route expectations: each wanted authority may list alternatives ("A / B" or "A or B"); one must appear in either language.
const ALIASES = [[/scores/i, /SCORES/], [/smart\s*odr|\bodr\b/i, /SMART ODR|ODR/], [/rbi|reserve bank|ombudsman.*rbi|rbi.*ombudsman/i, /RBI|Reserve Bank|रिज़र्व बैंक/], [/1930|cyber/i, /1930|cybercrime/i], [/bima bharosa|irdai/i, /Bima Bharosa|बीमा भरोसा|IRDAI/i], [/insurance ombudsman/i, /Insurance Ombudsman|बीमा लोकपाल/i], [/pfrda|nps|cra/i, /PFRDA|NPS|CRA/], [/iepf/i, /IEPF/], [/rta|registrar/i, /RTA|registrar|रजिस्ट्रार/i], [/amc|fund house|mutual fund/i, /AMC|mutual fund|म्यूचुअल फ़ंड/i], [/broker|stock exchange|exchange|depository|\bdp\b/i, /broker|exchange|depository|ब्रोकर|एक्सचेंज|डिपॉज़िटरी|DP/i], [/bank/i, /bank|बैंक/i], [/police|fir/i, /police|पुलिस|FIR/i], [/company/i, /company|कंपनी/i]];
function routeHit(want, text) {
  const alts = String(want).split(/\s*\/\s*|\s+or\s+|,\s*/i).filter(Boolean);
  return alts.some(a => { const al = ALIASES.find(([k]) => k.test(a)); return al ? al[1].test(text) : text.toLowerCase().includes(a.toLowerCase()); });
}
const sev = { fail: 2, weak: 1, pass: 0 };
function judge(p, r) {
  const t = p.truth || {}, o = r.out || {}, issues = [];
  if (r.crash) return { grade: 'fail', kind: 'crash', why: 'journey could not finish: ' + r.crash };
  if (r.errors.length) issues.push(['fail', 'runtime error', r.errors[0]]);
  if (r.externalRequests.length) issues.push(['fail', 'privacy', 'request left the page: ' + r.externalRequests[0]]);
  if (r.post && r.post.pageScrollsSideways) issues.push(['weak', 'layout', 'page scrolls sideways: ' + r.post.overflowing.join(', ')]);
  if (r.post && r.post.junk.length) issues.push(['weak', 'text', 'shows ' + r.post.junk.join(', ')]);
  if (r.notes.length) issues.push(['weak', 'input', r.notes.join('; ')]);
  let grade = 'pass', kind = 'ok', why = '';
  if (p.journey === 'check') {
    const lvl = o.level || 'none', content = t.label === 'edge' ? t.content : t.label, lang = t.language;
    if (t.label === 'edge' && /own question|instead of pasting|no message in it/i.test((t.expected || '') + ' ' + (p.why || ''))) {
      if (o.questionNote) why = 'asked the user to paste the actual message (verdict ' + lvl + ')';
      else if (lvl === 'none') { grade = 'fail'; kind = 'question taken as message'; why = 'a typed question got "No known signs" as if a message was checked'; }
      else { grade = 'weak'; kind = 'question taken as message'; why = 'a typed question got verdict ' + lvl; }
    } else if (t.label === 'edge' && UNSUPPORTED.has(lang)) {
      if (!o.coverageNote) { grade = lvl === 'none' ? 'fail' : 'weak'; kind = 'language'; why = `${lang} message: no "outside our coverage" note (verdict ${lvl})`; }
      else { why = `${lang}: coverage note shown (verdict ${lvl})`; }
    } else if (content === 'fraud') { if (lvl === 'high') why = 'High'; else if (lvl === 'caution') { grade = 'weak'; kind = 'scam only Caution'; why = 'fraud got Caution, not High'; } else { grade = 'fail'; kind = 'missed scam'; why = 'fraud got No known signs'; } }
    else if (content === 'suspicious') { if (lvl === 'none') { grade = 'fail'; kind = 'missed suspicious'; why = 'suspicious got No known signs'; } else why = lvl; }
    else if (content === 'benign') { if (lvl === 'high') { grade = 'fail'; kind = 'false High'; why = 'legitimate message got High: ' + (o.flags || []).join(', '); } else if (lvl === 'caution') { grade = 'weak'; kind = 'false Caution'; why = 'legitimate message got Caution: ' + (o.flags || []).join(', '); } else why = 'no signs'; }
    else { why = 'unlabelled: ' + lvl; }
    if (r.ms > 1500) issues.push(['weak', 'speed', 'result took ' + r.ms + ' ms']);
    const typed = o.typedLength, full = ((p.input || {}).message || '').length;
    if (typed !== undefined && typed < full) issues.push(['fail', 'input cut', `message box kept ${typed} of ${full} characters, with no notice`]);
  } else if (p.journey === 'paycheck') {
    const want = String(t.expected || '').toLowerCase(), got = o.verdict;
    if (!got) { grade = 'fail'; kind = 'no answer'; why = 'no STOP/VERIFY shown'; }
    else if (want && got !== want) { grade = 'fail'; kind = want === 'stop' ? 'scam said VERIFY' : 'legit said STOP'; why = `expected ${want.toUpperCase()}, got ${got.toUpperCase()}`; }
    else why = got.toUpperCase();
  } else if (p.journey === 'emergency') {
    const want = new Set(t.situations || []), got = new Set(o.situations || []);
    const missing = [...want].filter(s => !got.has(s)), extra = [...got].filter(s => !want.has(s));
    // The app asks how and when money was sent only after "I sent money" is chosen, so those two are judged only then.
    const asked = f => f === 'ongoing' || (want.has('paid') && got.has('paid'));
    const fields = ['ongoing', 'channel', 'when'].filter(f => asked(f) && t[f] !== null && t[f] !== undefined && o[f] !== t[f]).map(f => `${f}: expected ${t[f]}, got ${o[f] || 'not filled'}`);
    if (!got.size) { grade = 'fail'; kind = 'not understood'; why = 'nothing pre-filled: ' + (o.status || '').slice(0, 120); }
    else if (missing.length) { grade = 'fail'; kind = 'missed situation'; why = 'missed ' + missing.join('+') + (extra.length ? '; added ' + extra.join('+') : ''); }
    else if (extra.length) { grade = 'weak'; kind = 'extra situation'; why = 'added ' + extra.join('+'); }
    else if (fields.length) { grade = 'weak'; kind = 'detail not filled'; why = fields.join('; '); }
    else why = 'all answers right';
    if (want.has('paid') && !(o.plan || []).includes('report-1930')) issues.push(['fail', 'plan', 'paid but plan has no 1930 step: ' + (o.plan || []).join(',')]);
    if (o.typedLength < o.storyLength) issues.push(['weak', 'input', `story cut from ${o.storyLength} to ${o.typedLength} characters`]);
  } else if (p.journey === 'route') {
    const txt = (o.resultText || '') + ' ' + (o.otherLanguageText || ''), miss = (t.mustInclude || []).filter(w => !routeHit(w, txt));
    if (!txt.trim()) { grade = 'fail'; kind = 'no route'; why = 'no route shown'; }
    else if (miss.length) { grade = 'weak'; kind = 'route wording'; why = 'did not find: ' + miss.join('; ') + ' (check by hand)'; }
    else why = 'route includes ' + (t.mustInclude || []).join(', ');
  } else if (p.journey === 'draft') {
    // A secret is still present only if its digits appear as a whole number (spaces or dashes allowed between digits),
    // not inside a longer number such as an Aadhaar or phone number.
    const ascii = s => String(s || '').replace(/[०-९]/g, d => String(DEV.indexOf(d)));
    // Checked with the words just before the secret in the user's text, so "pin 1234" is not confused with an Aadhaar "1234 5678 9012".
    const src = ascii((p.input || {}).summary || '');
    const stillThere = s => { const a = ascii(s), i = src.indexOf(a); if (a.replace(/\D/g, '').length < 3) return false; const ctx = i >= 0 ? src.slice(Math.max(0, i - 10), i + a.length) : a; return ascii(o.draftAfter).includes(ctx); };
    const secrets = t.secrets || [], left = secrets.filter(stillThere);
    if (secrets.length && !o.blockedBeforeMask) { grade = 'fail'; kind = 'secret not blocked'; why = 'saving allowed while a secret was present'; }
    else if (left.length) { grade = 'fail'; kind = 'secret not masked'; why = 'still in the draft after masking: ' + left.join(', '); }
    else if (secrets.length && o.blockedAfterMask) { grade = 'weak'; kind = 'still blocked'; why = 'saving still blocked after masking: ' + o.gateAfter; }
    else if (!secrets.length && o.blockedBeforeMask) { grade = 'weak'; kind = 'false block'; why = 'blocked with no secret: ' + o.gate; }
    else why = secrets.length ? 'secret blocked, masked, then allowed' : 'no secret; allowed';
    const kinds = new Set(o.detectedKinds || []); if (kinds.has('number')) kinds.add('account'); // long digit runs are listed as "number"
    const kindsWanted = (t.otherPrivate || []).filter(k => !kinds.has(k));
    if (kindsWanted.length) issues.push(['weak', 'privacy panel', 'not listed as private: ' + kindsWanted.join(', ')]);
  } else if (p.journey === 'family') {
    if (!o.items) { grade = 'fail'; kind = 'no checklist'; why = 'no checklist shown'; } else why = o.items + ' checklist items (mentions checked by hand)';
  }
  for (const [g] of issues) if (sev[g] > sev[grade]) grade = g;
  return { grade, kind: issues.length && kind === 'ok' ? issues[0][1] : kind, why, issues: issues.map(([g, k, w]) => `${g}/${k}: ${w}`) };
}
const rows = results.map(r => { const p = personas[r.id] || {}; return { id: r.id, journey: r.journey, label: (p.truth || {}).label || '', language: (p.truth || {}).language || '', ui: r.uiLanguage, device: `${r.device.width}x${r.device.height}${r.device.largeText ? ' large' : ''}`, ...judge(p, r) }; });
const by = (k) => rows.reduce((a, r) => { const key = r[k] || '-'; a[key] = a[key] || { pass: 0, weak: 0, fail: 0 }; a[key][r.grade]++; return a; }, {});
const report = { total: rows.length, grades: rows.reduce((a, r) => (a[r.grade]++, a), { pass: 0, weak: 0, fail: 0 }), byJourney: by('journey'), byLabel: by('label'), byLanguage: by('language'), problems: rows.filter(r => r.grade !== 'pass'), rows };
fs.writeFileSync(OUTF, JSON.stringify(report, null, 1));
console.log(JSON.stringify({ total: report.total, grades: report.grades, byJourney: report.byJourney, byLabel: report.byLabel, byLanguage: report.byLanguage }));
for (const r of report.problems) console.log(`${r.grade.toUpperCase()} ${r.id} ${r.journey}/${r.label}/${r.language} ${r.device} ui=${r.ui} :: ${r.kind} :: ${r.why}${r.issues.length ? ' :: ' + r.issues.join(' | ') : ''}`);
