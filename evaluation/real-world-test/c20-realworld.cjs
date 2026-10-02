// C-20 real-world user test: 100 realistic users (written blind by four separate agents that never saw the code) and
// 15 stress inputs, each run in the real app the way that person would (their phone size, language, large text, Home).
//   node c20-realworld.cjs <path/to/index.html> [--report <file.json>]
// The 100 users were used to find and fix problems in C-20, so they are now development data: a regression check, not an
// accuracy claim. Writes only to a temporary folder, and to the --report file when one is given.
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), crypto = require('crypto'), { spawnSync } = require('child_process');
const APP = process.argv[2] && path.resolve(process.argv[2]); if (!APP) { console.error('usage: node c20-realworld.cjs <index.html> [--report <file.json>]'); process.exit(2); }
const ri = process.argv.indexOf('--report'), REPORT = ri > 0 && process.argv[ri + 1] ? path.resolve(process.argv[ri + 1]) : null;
// The kit sits in realworld/ next to this file locally, and in the same folder in the published evaluation/real-world-test/.
const D = fs.existsSync(path.join(__dirname, 'realworld')) ? path.join(__dirname, 'realworld') : __dirname, TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'ns-c20-'));
const run = args => { const r = spawnSync(process.execPath, args, { encoding: 'utf8', maxBuffer: 1 << 26, timeout: 20 * 60 * 1000 }); return (r.stdout || '') + (r.stderr || ''); };
let passed = 0; const failures = [], checks = [];
const check = (name, ok, detail) => { if (ok) passed++; else failures.push(name + (detail ? ' -> ' + detail : '')); checks.push({ check: name, passed: !!ok }); console.log((ok ? 'ok   ' : 'FAIL ') + name + (!ok && detail ? ' -> ' + detail : '')); };
run([path.join(D, 'run-personas.cjs'), APP, path.join(D, 'personas'), TMP, '--workers', '3']);
run([path.join(D, 'judge.cjs'), path.join(D, 'personas'), path.join(TMP, 'results.json'), path.join(TMP, 'report.json')]);
const results = JSON.parse(fs.readFileSync(path.join(TMP, 'results.json'), 'utf8')), report = JSON.parse(fs.readFileSync(path.join(TMP, 'report.json'), 'utf8'));
const rows = report.rows, J = j => rows.filter(r => r.journey === j);
check('All 100 users finish their journey', results.length === 100 && !results.some(r => r.crash), results.filter(r => r.crash).map(r => r.id + ': ' + r.crash).join('; '));
check('No runtime errors for any user', !results.some(r => r.errors.length), results.filter(r => r.errors.length).map(r => r.id).join(' '));
check('Nothing leaves the page for any user', !results.some(r => r.externalRequests.length));
check('No page scrolls sideways for any user, on any phone size', !results.some(r => r.post && r.post.pageScrollsSideways), results.filter(r => r.post && r.post.pageScrollsSideways).map(r => r.id).join(' '));
check('No wrong result for any of the 100 users', !rows.some(r => r.grade === 'fail'), rows.filter(r => r.grade === 'fail').map(r => `${r.id} ${r.kind}`).join('; '));
check('Before you pay: every scam gets STOP and every genuine payment VERIFY', J('paycheck').length === 18 && J('paycheck').every(r => r.grade === 'pass'));
check('Complaint drafts: every OTP, PIN, CVV, password or card number blocks saving and is masked', J('draft').length === 7 && J('draft').every(r => r.grade !== 'fail'));
check('Urgent help: everyone who lost money is told to call 1930', !J('emergency').some(r => (r.issues || []).some(i => /no 1930 step/.test(i))));
check('Where to complain: every route names the right office', J('route').every(r => r.grade === 'pass'));
run([path.join(D, 'stress.cjs'), APP, TMP]);
const st = JSON.parse(fs.readFileSync(path.join(TMP, 'stress.json'), 'utf8')), by = n => st.find(x => x.name.startsWith(n)) || {};
check('A 9,659-character forward is kept whole and its scam at the end is caught', by('huge paste').typed === by('huge paste').chars && by('huge paste').level === 'high', JSON.stringify({ typed: by('huge paste').typed, level: by('huge paste').level }));
check('The phone Back button returns to Home inside the app', JSON.stringify(by('browser Back').visible) === '["home"]', JSON.stringify(by('browser Back')));
check('A 1,700-character urgent-help story is kept and the payment at its end is understood', by('emergency: 1,700').typed === by('emergency: 1,700').of && (by('emergency: 1,700').situations || []).includes('paid'));
check('Pasted HTML or script never runs', st.filter(x => 'xss' in x).every(x => !x.xss && !x.injected) && (by('dialogs').dialogs || []).length === 0);
check('No runtime errors from any stress input', (by('all page errors').errors || []).length === 0, JSON.stringify(by('all page errors').errors));
fs.rmSync(TMP, { recursive: true, force: true });
if (REPORT) fs.writeFileSync(REPORT, JSON.stringify({
  test: '100-user real-world test and stress inputs', date: new Date().toISOString().slice(0, 10),
  app: { file: path.basename(APP), bytes: fs.statSync(APP).size, sha256: crypto.createHash('sha256').update(fs.readFileSync(APP)).digest('hex').toUpperCase() },
  note: 'AI-written fictional users, used to find and fix problems in Release 3.3: a regression test, not a real-world accuracy result. Grades: pass = fully right, weak = partly right, fail = wrong.',
  checksPassed: passed, checksTotal: passed + failures.length, checks,
  users: { total: report.total, grades: report.grades, byJourney: report.byJourney, byLabel: report.byLabel, byLanguage: report.byLanguage, rows: report.rows },
  stress: st
}, null, 1) + '\n');
console.log(`${passed}/${passed + failures.length} checks passed (100 users: ${report.grades.pass} right, ${report.grades.weak} partly, ${report.grades.fail} wrong)`);
process.exitCode = failures.length ? 1 : 0;
