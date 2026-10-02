// Checks the owner-editable content in content/ with the same rules the build and the Owner Studio use.
//   node validate-content.cjs                    validate content/
//   node validate-content.cjs --apply pack.json  validate an Owner Studio content pack, then write it into content/
// Exit code 1 means the content is invalid (nothing is written).
'use strict';
const fs = require('fs'), path = require('path');
const schema = require('./content-schema.js'), engine = require('./engine.js');
const dir = path.join(__dirname, 'content');
const engineIds = engine.definitions.map(d => d.id);
const applyAt = process.argv.indexOf('--apply');

let content, errors = [];
if (applyAt >= 0) {
  try {
    const pack = JSON.parse(fs.readFileSync(path.resolve(process.argv[applyAt + 1] || ''), 'utf8'));
    if (pack.packFormat !== 'niveshak-content-pack' || pack.packVersion !== 1) throw new Error('not a Niveshak Saathi content pack (packFormat/packVersion)');
    content = pack.content;
  } catch (e) { errors.push('pack: ' + e.message); }
} else ({ content, errors } = schema.loadDir(dir));

const result = errors.length ? { errors, warnings: [] } : schema.validateContent(content, { engineIds });
for (const w of result.warnings) console.log('warning: ' + w);
for (const e of result.errors) console.error('error: ' + e);
if (result.errors.length) { console.error('Content is invalid: ' + result.errors.length + ' error(s). Nothing was written.'); process.exit(1); }
if (applyAt >= 0) {
  const changed = [];
  for (const s of schema.SECTIONS) {
    const file = path.join(dir, s + '.json'), next = JSON.stringify(content[s], null, 2) + '\n';
    let prev = null; try { prev = fs.readFileSync(file, 'utf8'); } catch (e) { /* new section file */ }
    if (prev === null || schema.canonical(JSON.parse(prev)) !== schema.canonical(content[s])) { fs.writeFileSync(file, next); changed.push(s); }
  }
  console.log('Content pack applied. Changed sections: ' + (changed.join(', ') || 'none') + '. Run "node build.cjs" to rebuild the app.');
} else console.log('Content is valid (' + result.warnings.length + ' warning(s)).');
