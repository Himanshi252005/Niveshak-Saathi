// Fits the v3 risk weights: L2-regularised logistic regression on the labelled development set.
//   node fit-weights.cjs [--lambda 1] [--out fit-report.json]
// Features: one 0/1 indicator per warning category found by the engine (so the score is explainable as a sum).
// Targets: fraud = 1, suspicious = 0.5 (soft label), benign = 0. Cases the engine cannot read (coverage 'unsupported')
// are left out of the fit. Weights are then rounded to 0.5 and the two thresholds are chosen on the rounded model,
// with the safety floors applied exactly as in engine.js.
'use strict';
const fs = require('fs'), path = require('path');
const engine = require(path.join(__dirname, '../prototype/engine.js'));
const cases = require(path.join(__dirname, '../prototype/evaluation-cases.json'));
const arg = (n, d) => { const i = process.argv.indexOf(n); return i >= 0 ? process.argv[i + 1] : d; };
const LAMBDA = +arg('--lambda', 1), OUT = arg('--out', path.join(__dirname, 'fit-report.json'));
const FEATS = (() => { const i = process.argv.indexOf('--features'); return i >= 0 ? JSON.parse(fs.readFileSync(path.resolve(process.argv[i + 1]), 'utf8')) : null; })();
const IDS = FEATS ? FEATS.categories : engine.definitions.map(d => d.id), K = IDS.length;
const target = { fraud: 1, suspicious: 0.5, benign: 0 };

const EXTRA = arg('--extra', null), extra = EXTRA ? EXTRA.split(',').flatMap(p => (JSON.parse(fs.readFileSync(path.resolve(p), 'utf8')).items || []).map(x => ({ ...x, set: path.basename(p, '.json') }))) : [];
// --features <file> fits from a saved feature table (categories found per message, no message text); --dump-features <file>
// saves that table, so the published repository can reproduce the shipped weights without republishing older test sets.
const FEAT_IN = arg('--features', null), FEAT_OUT = arg('--dump-features', null);
const rows = FEAT_IN ? FEATS.rows : [...cases.map(c => ({ ...c, src: 'dev' })), ...extra.map(c => ({ id: c.id, text: c.text, label: c.label, src: c.set, lang: c.lang }))].map(c => { const r = engine.analyse(c.text); return { id: c.id, src: c.src, lang: c.lang || (c.language === 'roman-hi' ? 'hinglish' : c.language), label: c.label, coverage: r.coverage, ids: r.matches.map(m => m.id), floor: r.risk.floor || '' }; });
if (FEAT_OUT) fs.writeFileSync(path.resolve(FEAT_OUT), JSON.stringify({ about: 'Warning categories the checker found in each training message (no message text), with its label. Fit with: node evaluation/fit-weights.cjs --features evaluation/fit-features.json --lambda 1 --high 0.65', checker: engine.analyse('x').version, categories: engine.definitions.map(d => d.id), rows: rows.map(({ id, src, lang, label, coverage, ids, floor }) => ({ id, src, lang, label, coverage, ids, floor })) }) + '\n');
const train = rows.filter(r => r.coverage !== 'unsupported');
const X = train.map(r => [1, ...IDS.map(id => r.ids.includes(id) ? 1 : 0)]), y = train.map(r => target[r.label]);

// Newton's method (IRLS) with an L2 penalty on the category weights (not on the bias).
function solve(A, b) { const n = b.length, M = A.map((r, i) => [...r, b[i]]); for (let i = 0; i < n; i++) { let p = i; for (let j = i + 1; j < n; j++) if (Math.abs(M[j][i]) > Math.abs(M[p][i])) p = j; [M[i], M[p]] = [M[p], M[i]]; for (let j = i + 1; j < n; j++) { const f = M[j][i] / M[i][i]; for (let k = i; k <= n; k++) M[j][k] -= f * M[i][k]; } } const x = Array(n).fill(0); for (let i = n - 1; i >= 0; i--) { let s = M[i][n]; for (let k = i + 1; k < n; k++) s -= M[i][k] * x[k]; x[i] = s / M[i][i]; } return x; }
const sig = z => 1 / (1 + Math.exp(-z));
let w = Array(K + 1).fill(0);
for (let it = 0; it < 50; it++) {
  const p = X.map(x => sig(x.reduce((s, v, j) => s + v * w[j], 0)));
  const g = Array(K + 1).fill(0), H = Array.from({ length: K + 1 }, () => Array(K + 1).fill(0));
  X.forEach((x, i) => { const e = p[i] - y[i], s = p[i] * (1 - p[i]); for (let a = 0; a <= K; a++) { g[a] += e * x[a]; if (!x[a]) continue; for (let b = 0; b <= K; b++) H[a][b] += s * x[a] * x[b]; } });
  for (let a = 1; a <= K; a++) { g[a] += LAMBDA * w[a]; H[a][a] += LAMBDA; }
  H[0][0] += 1e-9;
  const step = solve(H, g); w = w.map((v, j) => v - step[j]);
  if (Math.max(...step.map(Math.abs)) < 1e-9) break;
}
const raw = { bias: w[0], weights: Object.fromEntries(IDS.map((id, j) => [id, w[j + 1]])) };
const r05 = v => Math.round(v * 2) / 2;
const rounded = { bias: r05(raw.bias), weights: Object.fromEntries(IDS.map(id => [id, r05(raw.weights[id])])) };

// Levels as in engine.js: floor or score >= high -> high; any sign or score >= caution -> caution; else none.
const scoreOf = (m, ids) => sig(m.bias + ids.reduce((s, id) => s + (m.weights[id] || 0), 0));
function levels(m, high, caution) { return rows.map(r => { const s = scoreOf(m, r.ids); return { ...r, score: s, level: r.floor || s >= high ? 'high' : r.ids.length || s >= caution ? 'caution' : 'none' }; }); }
const rate = (xs, f) => xs.length ? xs.filter(f).length / xs.length : 0;
function metrics(ls) {
  const F = ls.filter(r => r.label === 'fraud'), B = ls.filter(r => r.label === 'benign'), S = ls.filter(r => r.label === 'suspicious');
  return { fraudHigh: rate(F, r => r.level === 'high'), fraudAtLeastCaution: rate(F, r => r.level !== 'none'), benignHigh: rate(B, r => r.level === 'high'), benignAtLeastCaution: rate(B, r => r.level !== 'none'), suspiciousAtLeastCaution: rate(S, r => r.level !== 'none'), n: { fraud: F.length, suspicious: S.length, benign: B.length } };
}
// Threshold choice on the rounded model: candidate cut points are the distinct scores. 'high' = the lowest cut with
// benign-at-high <= 2% (maximises fraud recall at that constraint); 'caution' = halfway (in log-odds) between the
// no-sign score and the lowest single-sign score, so any one sign reaches caution and no sign stays none.
const cuts = [...new Set(rows.map(r => +scoreOf(rounded, r.ids).toFixed(6)))].sort((a, b) => a - b);
let high = 1;
const BMAX = +arg('--benign-high', 0.02);
const table = cuts.map(c => { const ls = levels(rounded, c, 0.5), m = metrics(ls), strict = metrics(ls.map(r => ({ ...r, level: r.level === 'caution' && scoreOf(rounded, r.ids) < sig(rounded.bias + 1) ? 'none' : r.level }))); return { cut: +c.toFixed(3), fraudHigh: +m.fraudHigh.toFixed(3), benignHigh: +m.benignHigh.toFixed(3), benignAtLeastCaution: +m.benignAtLeastCaution.toFixed(3), suspiciousAtLeastCaution: +m.suspiciousAtLeastCaution.toFixed(3) }; });
for (const c of cuts) { const m = metrics(levels(rounded, c, 0.5)); if (m.benignHigh <= BMAX) { high = c; break; } }
const minSingle = Math.min(...IDS.map(id => rounded.weights[id]).filter(v => v > 0));
const caution = +sig(rounded.bias + minSingle / 2).toFixed(3);
high = arg('--high', null) !== null ? +arg('--high') : Math.floor(high * 1000) / 1000; // --high overrides the automatic pick (v3.1 ships 0.6, see REPORT)
const final = levels(rounded, high, caution), m = metrics(final);
const singles = Object.fromEntries(IDS.map(id => [id, +scoreOf(rounded, [id]).toFixed(3)]));
const report = { lambda: LAMBDA, benignHighTarget: BMAX, extraCorpus: EXTRA, tradeOff: table, trainingCases: train.length, excludedUnsupported: rows.length - train.length, targets: target,
  raw: { bias: +raw.bias.toFixed(3), weights: Object.fromEntries(IDS.map(id => [id, +raw.weights[id].toFixed(3)])) },
  rounded, thresholds: { high, caution }, singleSignScore: singles, metrics: m,
  fraudBelowHigh: final.filter(r => r.label === 'fraud' && r.level !== 'high').map(r => ({ id: r.id, ids: r.ids, score: +r.score.toFixed(3), level: r.level })),
  benignAtHigh: final.filter(r => r.label === 'benign' && r.level === 'high').map(r => ({ id: r.id, ids: r.ids, floor: r.floor })),
  benignAtCaution: final.filter(r => r.label === 'benign' && r.level === 'caution').map(r => ({ id: r.id, ids: r.ids })) };
// Alternative High rule for comparison: a safety floor, or >= 2 distinct signs with score >= high, or one strong sign.
const STRONG = new Set((arg('--strong', 'certainty,doubling,secrets,withdrawal')).split(','));
const altLevel = r => { const s = scoreOf(rounded, r.ids); return r.floor || (r.ids.length >= 2 && s >= high) || r.ids.some(i => STRONG.has(i)) ? 'high' : r.ids.length || s >= caution ? 'caution' : 'none'; };
const bySet = rule => Object.fromEntries([...new Set(rows.map(r => r.src))].map(src => [src, metrics(rows.filter(r => r.src === src).map(r => ({ ...r, level: rule(r) })))]));
report.perSet = bySet(r => final.find(x => x.id === r.id && x.src === r.src).level);
report.altRule = { strong: [...STRONG], perSet: bySet(altLevel), all: metrics(rows.map(r => ({ ...r, level: altLevel(r) }))) };
fs.writeFileSync(OUT, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ perSet: report.perSet, alt: report.altRule.perSet }, (k, v) => typeof v === 'number' ? +v.toFixed(3) : v));
console.log(JSON.stringify({ raw: report.raw, rounded, thresholds: report.thresholds, metrics: m, fraudBelowHigh: report.fraudBelowHigh.length, benignAtHigh: report.benignAtHigh }, null, 1));
