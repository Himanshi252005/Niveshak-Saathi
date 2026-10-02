// Scores one engine file on the sealed blind set and prints aggregate metrics only (never message text), so the set can
// measure a baseline without becoming tuning data.
//   node evaluation/score-blind.cjs <engine.js> <corpus.json> [--out report.json]
// Levels: the engine's own risk.level when it has one (v3); otherwise the app's v2 fallback (2+ signs high, 1 caution).
'use strict';
const fs = require('fs'), path = require('path');
const argv = process.argv.slice(2), outAt = argv.indexOf('--out'), OUT = outAt >= 0 ? argv[outAt + 1] : null;
const pos = argv.filter((a, i) => !a.startsWith('--') && (outAt < 0 || i !== outAt + 1));
if (!pos[0]) { console.error('usage: node score-blind.cjs <engine.js> [corpus.json] [--out report.json]'); process.exit(2); }
const ENGINE = path.resolve(pos[0]), CORPUS = path.resolve(pos[1] || path.join(__dirname, 'blind-v5.json'));
const engine = require(ENGINE), items = JSON.parse(fs.readFileSync(CORPUS, 'utf8')).items;
const wilson = (k, n) => { if (!n) return [0, 0]; const z = 1.96, p = k / n, d = 1 + z * z / n, c = p + z * z / (2 * n), m = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)); return [+(100 * (c - m) / d).toFixed(1), +(100 * (c + m) / d).toFixed(1)]; };
const rate = (rows, f) => { const k = rows.filter(f).length; return { k, n: rows.length, pct: rows.length ? +(100 * k / rows.length).toFixed(1) : 0, ci95: wilson(k, rows.length) }; };
const t0 = process.hrtime.bigint();
const rows = items.map(it => { let r; try { r = engine.analyse(it.text); } catch (e) { r = { matches: [], error: e.message }; }
  const n = r.matches.length, level = r.risk && r.risk.level ? r.risk.level : n >= 2 ? 'high' : n ? 'caution' : 'none';
  return { label: it.label, lang: it.lang, hard: !!it.hard, channel: it.channel, level, warn: level !== 'none' }; });
const ms = Number(process.hrtime.bigint() - t0) / 1e6;
const fraud = rows.filter(r => r.label === 'fraud'), susp = rows.filter(r => r.label === 'suspicious'), benign = rows.filter(r => r.label === 'benign');
const risky = rows.filter(r => r.label !== 'benign');
const byLang = Object.fromEntries(['en', 'hi', 'hinglish'].map(l => [l, { riskyWarned: rate(risky.filter(r => r.lang === l), r => r.warn), benignWarned: rate(benign.filter(r => r.lang === l), r => r.warn) }]));
const report = {
  engine: path.basename(ENGINE), engineVersion: (engine.analyse('test message').version) || 'unknown', corpus: path.basename(CORPUS), items: rows.length,
  headline: { riskyWarned: rate(risky, r => r.warn), benignWarned: rate(benign, r => r.warn) },
  fraud: { high: rate(fraud, r => r.level === 'high'), warned: rate(fraud, r => r.warn) },
  suspicious: { warned: rate(susp, r => r.warn) },
  benign: { high: rate(benign, r => r.level === 'high'), warned: rate(benign, r => r.warn), hardWarned: rate(benign.filter(r => r.hard), r => r.warn), easyWarned: rate(benign.filter(r => !r.hard), r => r.warn) },
  byLanguage: byLang, totalMs: +ms.toFixed(1), meanMsPerMessage: +(ms / rows.length).toFixed(3)
};
if (OUT) fs.writeFileSync(path.resolve(OUT), JSON.stringify(report, null, 2) + '\n');
const f = x => `${x.k}/${x.n} = ${x.pct}% [${x.ci95.join('–')}]`;
console.log(`${report.engine} v${report.engineVersion} on ${report.items} blind messages (${report.meanMsPerMessage} ms each)`);
console.log('  fraud or suspicious warned : ' + f(report.headline.riskyWarned));
console.log('  ordinary messages warned   : ' + f(report.headline.benignWarned) + '  (hard ' + f(report.benign.hardWarned) + '; easy ' + f(report.benign.easyWarned) + ')');
console.log('  fraud at High              : ' + f(report.fraud.high) + '; ordinary at High: ' + f(report.benign.high));
for (const [l, v] of Object.entries(byLang)) console.log(`  ${l.padEnd(9)} risky warned ${f(v.riskyWarned)}; ordinary warned ${f(v.benignWarned)}`);
