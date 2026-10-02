// Builds three things from the sources in this folder:
//   dist/index.html        the public single-file app (the only file that is deployed)
//   release-manifest.json  what was built, from which content, and which content sections changed (not deployed)
//   owner-studio.html      the local Owner Control Studio (never copied into dist/)
// The build refuses owner-editable content (content/*.json) that fails content-schema.js validation.
const fs=require('fs'),path=require('path'),crypto=require('crypto');const root=__dirname;
const read=f=>fs.readFileSync(path.join(root,f),'utf8'),sha=s=>crypto.createHash('sha256').update(s).digest('hex').toUpperCase();
const LT=String.fromCharCode(92)+'u003c',json=v=>JSON.stringify(v).replace(/</g,LT); // keeps "</script>" inside data harmless
// Replaces one anchor that must appear exactly once; slicing avoids String.replace treating "$&" in content as a pattern.
function inject(text,anchor,insert){const at=text.indexOf(anchor);if(at<0||text.indexOf(anchor,at+1)>=0)throw new Error('build anchor must appear exactly once: '+anchor);return text.slice(0,at)+insert+text.slice(at+anchor.length)}
// Inlined scripts must not contain "</script" or "<!--": the HTML parser would end or garble the script there.
const script=f=>{const code=read(f);if(/<\/script|<!--/i.test(code))throw new Error(f+' contains "</script" or "<!--"; split such text (for example "<"+"/script>") so it can be inlined');return code};
const schema=require('./content-schema.js'),engine=require('./engine.js'),engineIds=engine.definitions.map(d=>d.id);
const loaded=schema.loadDir(path.join(root,'content'));
const checked=loaded.errors.length?{errors:loaded.errors,warnings:[]}:schema.validateContent(loaded.content,{engineIds});
for(const w of checked.warnings)console.warn('content warning: '+w);
if(checked.errors.length){for(const e of checked.errors)console.error('content error: '+e);console.error('Build refused: fix the content errors above. The Owner Studio shows the same checks.');process.exit(1)}
const content=loaded.content;

let html=read('base.html');
// assist.js (on-device helpers: understanding the user's own words, the "Before you pay" check) ships in the engine's script block.
const assistJs=fs.existsSync(path.join(root,'assist.js'))?script('assist.js'):'';
html=inject(html,'</style>',read('upgrade.css')+'\n</style>');
html=inject(html,'<script>','<!-- NS_SNAPSHOT_V2 -->\n<script>\n'+script('engine.js')+(assistJs?'\n'+assistJs:'')+'\n</script>\n<script>\nwindow.NS_CONTENT='+json(content)+';\n</script>\n<script>');
html=inject(html,'</body>','<script>\n'+script('upgrade.js')+'\n</script></body>');
if(/NS_OWNER_STUDIO|showDirectoryPicker|createWritable/.test(html))throw new Error('the public build must not contain Owner Studio or file-writing code');
fs.mkdirSync(path.join(root,'dist'),{recursive:true});fs.writeFileSync(path.join(root,'dist/index.html'),html);

const manifestFile=path.join(root,'release-manifest.json');let previous=null;try{previous=JSON.parse(fs.readFileSync(manifestFile,'utf8'))}catch(e){}
const sections=Object.fromEntries(schema.SECTIONS.map(s=>[s,sha(schema.canonical(content[s]))]));
const manifest={manifestVersion:1,product:'Niveshak Saathi',productVersion:content.meta.productVersion,contentVersion:content.meta.contentVersion,builtAt:new Date().toISOString(),app:{file:'dist/index.html',bytes:Buffer.byteLength(html),sha256:sha(html)},contentSha256:sha(schema.canonical(content)),sections,changedSections:previous&&previous.sections?schema.SECTIONS.filter(s=>previous.sections[s]!==sections[s]):schema.SECTIONS,previousAppSha256:previous&&previous.app?previous.app.sha256:null,contentWarnings:checked.warnings};
fs.writeFileSync(manifestFile,JSON.stringify(manifest,null,2)+'\n');

let studioBytes=0;
if(fs.existsSync(path.join(root,'studio/studio.html'))){
 const data={content,engineIds,app:{base:read('base.html'),css:read('upgrade.css'),engine:read('engine.js'),assist:assistJs,upgrade:read('upgrade.js')},builtFrom:{contentSha256:manifest.contentSha256,appSha256:manifest.app.sha256,productVersion:manifest.productVersion}};
 let studio=read('studio/studio.html');
 studio=inject(studio,'/*STUDIO_CSS*/',read('studio/studio.css'));
 studio=inject(studio,'/*CONTENT_SCHEMA*/',script('content-schema.js'));
 studio=inject(studio,'/*STUDIO_DATA*/','window.NS_STUDIO_DATA='+json(data)+';');
 studio=inject(studio,'/*STUDIO_JS*/',script('studio/studio.js'));
 fs.writeFileSync(path.join(root,'owner-studio.html'),studio);studioBytes=Buffer.byteLength(studio);
}
console.log(JSON.stringify({htmlBytes:Buffer.byteLength(html),appSha256:manifest.app.sha256,contentSha256:manifest.contentSha256,changedSections:manifest.changedSections,contentWarnings:checked.warnings.length,studioBytes}));
