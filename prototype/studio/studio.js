// Owner Control Studio: a local editor for the reviewed content in prototype/content/*.json.
// It runs from a file on this computer, makes no network requests, and is never part of the public build.
// Validation uses the same content-schema.js as build.cjs, and the preview assembles the app the same way the build does.
'use strict';
(function () {
  // Local tool only: refuse to run when served from a website (file://, or localhost while previewing, is fine).
  if (!/^(file:|about:)$/.test(location.protocol) && !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) {
    document.body.replaceChildren(Object.assign(document.createElement('p'), { textContent: 'The Owner Control Studio is a local tool. Open owner-studio.html from your own computer, not from a website.' }));
    return;
  }
  const DATA = window.NS_STUDIO_DATA, SCHEMA = window.NiveshakContentSchema;
  const clone = v => JSON.parse(JSON.stringify(v));
  const LT = String.fromCharCode(92) + 'u003c';
  let original = clone(DATA.content), content = clone(DATA.content), tab = 'overview', result = { errors: [], warnings: [] }, timer = null, seq = 0;
  const $ = s => document.querySelector(s);

  // Element builder. Text is always set as text, never parsed as HTML.
  function h(tag, props, ...kids) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat(Infinity)) if (kid != null && kid !== false) e.append(kid instanceof Node ? kid : String(kid));
    return e;
  }
  const isoToday = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
  const addDays = (iso, n) => new Date(Date.parse(iso + 'T00:00:00Z') + n * 86400000).toISOString().slice(0, 10);
  const daysUntil = iso => Math.round((Date.parse(iso + 'T00:00:00Z') - Date.parse(isoToday() + 'T00:00:00Z')) / 86400000);
  const safeName = s => String(s || 'content').replace(/[^A-Za-z0-9.-]+/g, '-');
  const sourceOptions = () => content.sources.sources.map(s => [s.id, s.id + ' · ' + (s.name.en || '')]);

  // ---------- validation and status ----------
  function changedSections() { return SCHEMA.SECTIONS.filter(s => SCHEMA.canonical(content[s]) !== SCHEMA.canonical(original[s])); }
  function validate() {
    result = SCHEMA.validateContent(content, { engineIds: DATA.engineIds });
    const st = $('#status'), changes = changedSections();
    st.replaceChildren(h('span', { class: result.errors.length ? 'bad' : 'ok', text: result.errors.length ? result.errors.length + ' error(s): the build would refuse this content' : 'Content valid' }),
      ' · ' + result.warnings.length + ' warning(s) · ' + (changes.length ? 'unsaved changes in ' + changes.join(', ') : 'no unsaved changes'));
    document.querySelectorAll('.invalid').forEach(e => e.classList.remove('invalid'));
    for (const msg of result.errors) {
      const path = msg.slice(0, msg.indexOf(':'));
      document.querySelectorAll('[data-path]').forEach(e => { const p = e.getAttribute('data-path'); if (path === p || path.startsWith(p + '.') || path.startsWith(p + '[')) e.classList.add('invalid'); });
    }
    const list = $('#validation');
    if (list) list.replaceChildren(...(result.errors.length || result.warnings.length
      ? [h('ul', { class: 'issues' }, result.errors.map(m => h('li', { class: 'e', text: 'Error · ' + m })), result.warnings.map(m => h('li', { class: 'w', text: 'Warning · ' + m })))]
      : [h('p', { class: 'ok', text: 'No problems found. The build would accept this content.' })]));
    planSummary(); routeSummary();
    return result;
  }
  function changed() { clearTimeout(timer); timer = setTimeout(validate, 200); }
  function toast(text, bad) { const t = $('#toast'); t.textContent = text; t.className = 'toast' + (bad ? ' bad' : ''); }

  // ---------- field editors ----------
  // English and Hindi side by side, bound to obj[key] = {en, hi}.
  function pair(obj, key, label, path, opts) {
    opts = opts || {};
    const wrap = h('div', { class: 'pair', 'data-path': path }, h('div', { class: 'pair-label', text: label }));
    if (!obj[key]) {
      if (!opts.optional) obj[key] = { en: '', hi: '' };
      else { wrap.append(h('button', { type: 'button', class: 'small', text: '+ Add', onclick: () => { obj[key] = { en: '', hi: '' }; changed(); render(); } })); return wrap; }
    }
    const row = h('div', { class: 'pair-row' });
    for (const lang of ['en', 'hi']) {
      const id = 'f' + (++seq), input = h('textarea', { id, lang, rows: opts.rows || 2, 'data-path': path + '.' + lang });
      input.value = obj[key][lang] || '';
      input.addEventListener('input', () => { obj[key][lang] = input.value; changed(); });
      row.append(h('div', { class: 'lang-col' }, h('label', { for: id, text: (lang === 'en' ? 'English' : 'हिन्दी (Hindi)') + ' · ' + label }), input));
    }
    wrap.append(row);
    if (opts.optional) wrap.append(h('button', { type: 'button', class: 'small danger', text: 'Remove ' + label.toLowerCase(), onclick: () => { delete obj[key]; changed(); render(); } }));
    return wrap;
  }
  function field(obj, key, label, path, type, opts) {
    type = type || 'text'; opts = opts || {};
    const id = 'f' + (++seq);
    if (type === 'checkbox') {
      const box = h('input', { id, type: 'checkbox', 'data-path': path }); box.checked = !!obj[key];
      box.addEventListener('change', () => { obj[key] = box.checked; changed(); });
      return h('label', { class: 'check', for: id }, box, label);
    }
    let input;
    if (type === 'select') {
      input = h('select', { id, 'data-path': path });
      for (const [v, l] of opts.options) input.add(new Option(l, v));
      input.value = obj[key] == null ? '' : obj[key];
      input.addEventListener('change', () => { if (input.value === '' && opts.allowNone) delete obj[key]; else obj[key] = input.value; changed(); });
    } else {
      input = h('input', { id, type, 'data-path': path, spellcheck: 'false' }); input.value = obj[key] == null ? '' : obj[key];
      input.addEventListener('input', () => { obj[key] = input.value; changed(); });
    }
    return h('div', { class: 'field' }, h('label', { for: id, text: label }), input, opts.help ? h('small', { text: opts.help }) : null);
  }
  function controls(arr, i) {
    const move = d => () => { const j = i + d; [arr[i], arr[j]] = [arr[j], arr[i]]; changed(); render(); };
    return h('div', { class: 'list-controls' },
      h('button', { type: 'button', class: 'small', text: '↑', 'aria-label': 'Move up', disabled: i === 0, onclick: move(-1) }),
      h('button', { type: 'button', class: 'small', text: '↓', 'aria-label': 'Move down', disabled: i === arr.length - 1, onclick: move(1) }),
      h('button', { type: 'button', class: 'small danger', text: 'Remove', onclick: () => { if (confirm('Remove this item?')) { arr.splice(i, 1); changed(); render(); } } }));
  }
  const addButton = (text, fn) => h('button', { type: 'button', class: 'primary', text, onclick: () => { fn(); changed(); render(); } });
  const blank = () => ({ en: '', hi: '' });

  // ---------- views ----------
  function overview() {
    const m = content.meta;
    const rows = content.sources.sources.map(s => {
      const d = daysUntil(s.reviewDue), status = !s.enabled ? ['Not shown', ''] : isNaN(d) ? ['Invalid date', 'bad'] : d < 0 ? ['Overdue by ' + -d + ' day(s)', 'bad'] : d <= 7 ? ['Due in ' + d + ' day(s)', 'warn'] : ['OK', 'ok'];
      return h('tr', null, h('td', { text: s.name.en || s.id }), h('td', { text: s.lastReviewed }), h('td', { text: s.reviewDue }), h('td', { class: status[1], text: status[0] }));
    });
    return h('section', null, h('h1', { text: 'Overview' }),
      h('p', { class: 'lede', text: 'Edit the reviewed content of the public app: official sources, warning explanations, help routes, emergency steps, rights cards, practice and app texts. Edits stay on this computer until you save them and rebuild. Detection rules, safety caveats and the build are code, so they cannot be changed here.' }),
      h('div', { class: 'card' }, h('h2', { text: 'Release details' }),
        h('div', { class: 'grid2' }, field(m, 'productVersion', 'Product version', 'meta.productVersion'), field(m, 'contentVersion', 'Content version', 'meta.contentVersion', 'text', { help: 'Change it whenever you publish new content, for example 2026.11.01.' })),
        h('div', { class: 'grid2' }, field(m, 'snapshotDate', 'Guidance snapshot date', 'meta.snapshotDate', 'date'), field(m, 'reviewDue', 'Next content review', 'meta.reviewDue', 'date')),
        field(m, 'updateUrl', 'Public app address', 'meta.updateUrl', 'url', { help: 'Home shows "Check for a newer version" with this https address in offline copies. It opens only when the user taps it. Leave empty to hide the link.' })),
      h('div', { class: 'card' }, h('h2', { text: 'Official source review status' }),
        h('table', null, h('thead', null, h('tr', null, ['Source', 'Last reviewed', 'Review due', 'Status'].map(x => h('th', { text: x })))), h('tbody', null, rows))),
      h('div', { class: 'card' }, h('h2', { text: 'Validation' }), h('div', { id: 'validation' })),
      h('p', { class: 'small', text: 'Built from app ' + DATA.builtFrom.appSha256.slice(0, 12) + '… and content ' + DATA.builtFrom.contentSha256.slice(0, 12) + '…' }));
  }

  function sources() {
    const list = content.sources.sources;
    return h('section', null, h('h1', { text: 'Official sources and review dates' }),
      h('p', { class: 'lede', text: 'Warnings, routes and rights cards all point to these sources. Links must be https addresses on official domains: ' + SCHEMA.OFFICIAL_DOMAINS.join(', ') + '. After you check a page, press "Mark reviewed today".' }),
      list.map((s, i) => { const p = 'sources.sources[' + i + ']';
        return h('div', { class: 'card', 'data-path': p },
          h('div', { class: 'card-head' }, h('h2', { text: s.name.en || s.id || 'New source' }), controls(list, i)),
          h('div', { class: 'grid2' }, field(s, 'id', 'ID', p + '.id'), field(s, 'enabled', 'Shown in the app', p + '.enabled', 'checkbox')),
          pair(s, 'name', 'Name', p + '.name', { rows: 1 }),
          h('div', { class: 'grid2' }, field(s, 'authority', 'Authority', p + '.authority'), field(s, 'url', 'Official web address', p + '.url', 'url')),
          pair(s, 'supports', 'What this source supports', p + '.supports'),
          pair(s, 'note', 'Caution note', p + '.note', { optional: true }),
          h('div', { class: 'grid3' }, field(s, 'lastReviewed', 'Last reviewed', p + '.lastReviewed', 'date'), field(s, 'reviewDue', 'Review due', p + '.reviewDue', 'date'), field(s, 'reviewOwner', 'Review owner', p + '.reviewOwner')),
          h('button', { type: 'button', text: 'Mark reviewed today', onclick: () => { s.lastReviewed = isoToday(); s.reviewDue = addDays(s.lastReviewed, 30); changed(); render(); toast('"' + s.id + '" marked reviewed today; next review in 30 days.'); } })); }),
      addButton('+ Add source', () => list.push({ id: 'new-source-' + (list.length + 1), enabled: false, name: blank(), authority: '', url: 'https://', supports: blank(), lastReviewed: isoToday(), reviewDue: addDays(isoToday(), 30), reviewOwner: '' })),
      h('h2', { text: 'Helplines' }),
      h('p', { class: 'small', text: 'Helpline numbers are fixed in code (approved: ' + SCHEMA.HELPLINE_NUMBERS.join(', ') + '). You can edit the button label and its source.' }),
      content.sources.helplines.map((x, i) => { const p = 'sources.helplines[' + i + ']';
        return h('div', { class: 'card', 'data-path': p }, h('h2', { text: 'Helpline ' + x.number }), pair(x, 'label', 'Button label', p + '.label', { rows: 1 }), field(x, 'sourceId', 'Source', p + '.sourceId', 'select', { options: sourceOptions() })); }));
  }

  function warnings() {
    return h('section', null, h('h1', { text: 'Warning explanations' }),
      h('p', { class: 'lede', text: 'How each warning is explained to users. The detection rules are reviewed code in engine.js; they cannot be switched off here, so a content change can never hide a warning.' }),
      DATA.engineIds.map(id => { const w = content.warnings.warnings[id] || (content.warnings.warnings[id] = { title: blank(), why: blank(), sourceId: '' }), p = 'warnings.warnings.' + id;
        return h('div', { class: 'card', 'data-path': p }, h('h2', { text: id }), pair(w, 'title', 'Warning title', p + '.title', { rows: 1 }), pair(w, 'why', 'Why it matters', p + '.why'), field(w, 'sourceId', 'Official source', p + '.sourceId', 'select', { options: sourceOptions() })); }),
      channelCard());
  }
  // Optional "where did this message come from?" under the message box: it changes only the advice, never the check.
  function channelCard() {
    const W = content.warnings, adviceOptions = SCHEMA.CHECK_ADVICE.map(k => [k, k === 'group' ? 'Chat groups and social media advice' : 'Links and numbers advice']);
    if (!W.channelAdvice) W.channelAdvice = {};
    return h('div', { class: 'card', 'data-path': 'warnings.channels' }, h('h2', { text: 'Where the message came from (optional question)' }),
      h('p', { class: 'small', text: 'The channel IDs are fixed; their labels and the advice each one shows can change. The answer never changes which warnings are found.' }),
      pair(W, 'channelQuestion', 'Question', 'warnings.channelQuestion', { rows: 1 }), pair(W, 'channelWhy', 'Why we ask', 'warnings.channelWhy', { rows: 1 }),
      (W.channels || []).map((c, i) => h('div', { class: 'sub' }, pair(c, 'label', 'Channel "' + c.id + '"', 'warnings.channels[' + i + '].label', { rows: 1 }), field(c, 'advice', 'Advice shown', 'warnings.channels[' + i + '].advice', 'select', { options: adviceOptions }))),
      SCHEMA.CHECK_ADVICE.map(k => { const a = W.channelAdvice[k] || (W.channelAdvice[k] = { text: blank(), sourceId: '' }), p = 'warnings.channelAdvice.' + k;
        return h('div', { class: 'sub', 'data-path': p }, pair(a, 'text', adviceOptions.find(x => x[0] === k)[1], p + '.text', { rows: 2 }), field(a, 'sourceId', 'Official source', p + '.sourceId', 'select', { options: sourceOptions() })); }));
  }

  // Help routes (routes.json schema 2): question routes, escalation ladders and the "not sure" route.
  const KIND_LABEL = { outcomes: 'Question route: one question; each answer leads to an outcome card.', ladder: 'Escalation route: the institution first, then official levels of the same scope, in order.', abstain: '"Not sure" route: never guesses a regulator; lists safe first steps and official pages.' };
  const ROUTE_TEXT_LABELS = { chooseIssue: 'Question above the route buttons', scopeLabel: 'Label before "who handles it"', stageQuestion: 'Question: how far has the complaint gone', stageNone: 'Answer: not complained yet', replyQuestion: 'Question: what happened after the complaint', replyWaiting: 'Answer: waiting for a reply', replyUnresolved: 'Answer: replied but not resolved', replyResolved: 'Answer: resolved', numberQuestion: 'Question: complaint number', numberYes: 'Answer: yes', numberNo: 'Answer: no', nextTitle: 'Heading of the next-step box', nextLabel: 'Words before the next level ("Go to:")', ifNoReplyLabel: 'Words before the next level while waiting for a reply', answerReply: 'Prompt to answer the reply question', firstAdvice: 'Advice when not complained yet', waitAdvice: 'Advice while waiting for a reply', resolvedAdvice: 'Advice when resolved', noNumberAdvice: 'Advice when there is no complaint number', lastAdvice: 'Advice after the last level', pathTitle: 'Heading of the escalation path', evidenceTitle: 'Heading of the evidence list', abstainTitle: 'Heading of the "not sure" card' };
  function routeSummary() {
    const box = $('#routeSummary'); if (!box) return;
    const R = content.routes, lv = Object.fromEntries((R.levels || []).filter(l => l && l.id).map(l => [l.id, l])), sc = Object.fromEntries((R.scopes || []).filter(s => s && s.id).map(s => [s.id, s]));
    const en = v => (v && v.en) || '?';
    const rows = (R.issues || []).filter(x => x).map(x => {
      const path = x.kind === 'ladder' ? [en(x.firstContact && x.firstContact.name), ...(x.ladder || []).map(id => lv[id] ? en(lv[id].name) + (lv[id].scope !== x.scope ? ' (wrong scope!)' : '') : '"' + id + '"?')].join(' → ')
        : x.kind === 'outcomes' ? 'Question: ' + en(x.question) : x.kind === 'abstain' ? 'Does not guess: ' + (x.steps || []).length + ' safe steps, ' + (x.sourceIds || []).length + ' official pages' : '?';
      return h('tr', null, h('th', { scope: 'row', text: en(x.shortLabel) + (x.enabled ? '' : ' (hidden)') }), h('td', { text: x.kind === 'abstain' ? 'Nobody guessed' : en(sc[x.scope] && sc[x.scope].authority) }), h('td', { text: path }));
    });
    const errs = result.errors.filter(m => m.startsWith('routes')).length;
    box.replaceChildren(h('table', null, h('thead', null, h('tr', null, ['Route button', 'Who handles it', 'Where it leads'].map(t => h('th', { text: t })))), h('tbody', null, rows)),
      h('p', { class: errs ? 'note bad' : 'small', text: errs ? errs + ' route error(s): see the highlighted fields and the Overview validation list.' : 'Each escalation route stays within its own scope, so a bank, insurance or pension complaint is never sent to a securities-market system.' }));
  }
  function routes() {
    const R = content.routes, outcomeOptions = () => R.outcomes.map(o => [o.id, o.id + ' · ' + (o.title.en || '')]);
    const helplines = [['', 'No helpline button'], ...content.sources.helplines.map(x => [x.id, 'Helpline ' + x.number])];
    const scopeOptions = () => R.scopes.map(s => [s.id, s.id + ' · ' + ((s.label && s.label.en) || '')]);
    const levelOptions = () => R.levels.map(l => [l.id, l.id + ' · ' + ((l.name && l.name.en) || '') + ' [' + l.scope + ']']);
    const enabledSource = () => (content.sources.sources.find(s => s.enabled) || content.sources.sources[0] || {}).id;
    const textList = (arr, label, path, max, rows) => [arr.map((s, j) => h('div', { class: 'sub' }, h('div', { class: 'card-head' }, h('strong', { text: label + ' ' + (j + 1) }), controls(arr, j)), pair(arr, j, label + ' ' + (j + 1), path + '[' + j + ']', { rows: rows || 1 }))),
      arr.length < max ? h('button', { type: 'button', class: 'small', text: '+ Add ' + label.toLowerCase(), onclick: () => { arr.push(blank()); changed(); render(); } }) : null];
    const ladderBody = (issue, p) => {
      if (!issue.firstContact) issue.firstContact = { name: blank(), how: blank(), sourceId: enabledSource() };
      if (!Array.isArray(issue.ladder)) issue.ladder = [];
      if (!Array.isArray(issue.evidence)) issue.evidence = [];
      return [field(issue, 'scope', 'Who handles it (scope)', p + '.scope', 'select', { options: scopeOptions() }),
        h('h3', { text: 'Step 1: the institution itself' }), pair(issue.firstContact, 'name', 'Who to contact first', p + '.firstContact.name', { rows: 1 }), pair(issue.firstContact, 'how', 'How to complain to them', p + '.firstContact.how', { rows: 3 }),
        field(issue.firstContact, 'sourceId', 'Official source saying to start here', p + '.firstContact.sourceId', 'select', { options: sourceOptions() }),
        h('h3', { text: 'Then, if unresolved: official levels, in order' }),
        issue.ladder.map((lv, j) => h('div', { class: 'sub' }, h('div', { class: 'card-head' }, h('strong', { text: 'Step ' + (j + 2) }), controls(issue.ladder, j)), field(issue.ladder, j, 'Level', p + '.ladder[' + j + ']', 'select', { options: levelOptions() }))),
        issue.ladder.length < 4 ? h('button', { type: 'button', class: 'small', text: '+ Add level', onclick: () => { const same = R.levels.find(l => l.scope === issue.scope && !issue.ladder.includes(l.id)); issue.ladder.push(same ? same.id : ((R.levels[0] || {}).id || '')); changed(); render(); } }) : null,
        h('h3', { text: 'Evidence to keep' }), textList(issue.evidence, 'Evidence item', p + '.evidence', 8, 2)];
    };
    const abstainBody = (issue, p) => {
      if (!Array.isArray(issue.steps)) issue.steps = [];
      if (!Array.isArray(issue.sourceIds)) issue.sourceIds = [];
      return [h('h3', { text: 'Safe first steps' }), textList(issue.steps, 'Step', p + '.steps', 6, 2),
        h('fieldset', { 'data-path': p + '.sourceIds' }, h('legend', { text: 'Official pages to list' }),
          content.sources.sources.map(s => { const id = 'f' + (++seq), box = h('input', { type: 'checkbox', id }); box.checked = issue.sourceIds.includes(s.id);
            box.addEventListener('change', () => { issue.sourceIds = box.checked ? [...new Set([...issue.sourceIds, s.id])] : issue.sourceIds.filter(x => x !== s.id); changed(); });
            return h('label', { class: 'check', for: id }, box, (s.name && s.name.en) || s.id); }))];
    };
    // Optional "Also check" tips on escalation and "not sure" routes: up to four short pointers, each with one official source.
    // The list is created only when the owner adds a tip, so opening the Studio never changes a route.
    const tipsBody = (issue, p) => { const tips = issue.tips || [];
      return [h('h3', { text: 'Also check: optional tips shown on the route' }),
        tips.map((tp, j) => h('div', { class: 'sub', 'data-path': p + '.tips[' + j + ']' }, h('div', { class: 'card-head' }, h('strong', { text: 'Tip ' + (j + 1) }), controls(tips, j)),
          pair(tp, 'text', 'Tip ' + (j + 1), p + '.tips[' + j + '].text', { rows: 2 }), field(tp, 'sourceId', 'Official source for this tip', p + '.tips[' + j + '].sourceId', 'select', { options: sourceOptions() }))),
        tips.length < 4 ? h('button', { type: 'button', class: 'small', text: '+ Add tip', onclick: () => { (issue.tips || (issue.tips = [])).push({ text: blank(), sourceId: enabledSource() }); changed(); render(); } }) : null];
    };
    return h('section', null, h('h1', { text: 'Help routes' }),
      h('p', { class: 'lede', text: 'The "Find help" navigator. A question route asks one question and shows an outcome card. An escalation route starts with the institution itself, then lists official levels of the same scope (for example SCORES for the securities market). The "not sure" route never guesses. The urgent route (issue "fraud", answer "yes", with a helpline) powers "Get urgent help": you can edit it but not remove it.' }),
      h('div', { class: 'card' }, h('h2', { text: 'Where each route leads' }), h('div', { id: 'routeSummary' })),
      h('h2', { text: 'Routes, in the order users see them' }),
      R.issues.map((issue, i) => { const p = 'routes.issues[' + i + ']';
        if (issue.kind === 'ladder' || issue.kind === 'abstain')
          return h('div', { class: 'card', 'data-path': p },
            h('div', { class: 'card-head' }, h('h2', { text: issue.label.en || issue.id }), controls(R.issues, i)), h('p', { class: 'small', text: KIND_LABEL[issue.kind] }),
            h('div', { class: 'grid2' }, field(issue, 'id', 'ID', p + '.id'), field(issue, 'enabled', 'Shown in the app', p + '.enabled', 'checkbox')),
            pair(issue, 'label', 'Title', p + '.label', { rows: 1 }), pair(issue, 'shortLabel', 'Button label', p + '.shortLabel', { rows: 1 }),
            issue.kind === 'ladder' ? ladderBody(issue, p) : abstainBody(issue, p), tipsBody(issue, p));
        const body = issue.question
          ? [pair(issue, 'question', 'Follow-up question', p + '.question', { rows: 1 }), h('h3', { text: 'Answers' }),
             issue.answers.map((a, j) => { const ap = p + '.answers[' + j + ']';
               return h('div', { class: 'sub', 'data-path': ap }, h('div', { class: 'grid2' }, field(a, 'id', 'Answer ID', ap + '.id'), field(a, 'outcome', 'Leads to', ap + '.outcome', 'select', { options: outcomeOptions() })), pair(a, 'label', 'Answer label', ap + '.label', { rows: 1 }),
                 issue.answers.length > 2 ? h('button', { type: 'button', class: 'small danger', text: 'Remove answer', onclick: () => { issue.answers.splice(j, 1); changed(); render(); } }) : null); }),
             h('div', { class: 'actions' }, issue.answers.length < 4 ? h('button', { type: 'button', class: 'small', text: '+ Add answer', onclick: () => { issue.answers.push({ id: 'answer-' + (issue.answers.length + 1), label: blank(), outcome: R.outcomes[0].id }); changed(); render(); } }) : null,
               h('button', { type: 'button', class: 'small', text: 'Remove the question', onclick: () => { issue.outcome = issue.answers[0].outcome; delete issue.question; delete issue.answers; changed(); render(); } }))]
          : [field(issue, 'outcome', 'Outcome card', p + '.outcome', 'select', { options: outcomeOptions() }),
             h('button', { type: 'button', class: 'small', text: '+ Add a follow-up question', onclick: () => { issue.question = blank(); issue.answers = [{ id: 'no', label: { en: 'No / not sure', hi: 'नहीं / पक्का नहीं पता' }, outcome: issue.outcome }, { id: 'yes', label: { en: 'Yes', hi: 'हाँ' }, outcome: issue.outcome }]; delete issue.outcome; changed(); render(); } })];
        return h('div', { class: 'card', 'data-path': p },
          h('div', { class: 'card-head' }, h('h2', { text: issue.label.en || issue.id }), controls(R.issues, i)), h('p', { class: 'small', text: KIND_LABEL.outcomes }),
          h('div', { class: 'grid2' }, field(issue, 'id', 'ID', p + '.id'), field(issue, 'enabled', 'Shown in the app', p + '.enabled', 'checkbox')),
          pair(issue, 'label', 'Title', p + '.label', { rows: 1 }), pair(issue, 'shortLabel', 'Button label', p + '.shortLabel', { rows: 1 }),
          field(issue, 'scope', 'Who handles it (scope)', p + '.scope', 'select', { options: scopeOptions() }), body); }),
      h('div', { class: 'actions' },
        addButton('+ Add escalation route', () => R.issues.push({ id: 'new-route-' + (R.issues.length + 1), enabled: false, kind: 'ladder', label: blank(), shortLabel: blank(), scope: (R.scopes[0] || {}).id, firstContact: { name: blank(), how: blank(), sourceId: enabledSource() }, ladder: [], evidence: [blank()] })),
        addButton('+ Add question route', () => R.issues.push({ id: 'new-route-' + (R.issues.length + 1), enabled: false, kind: 'outcomes', label: blank(), shortLabel: blank(), scope: (R.scopes[0] || {}).id, outcome: R.outcomes[0].id }))),
      h('h2', { text: 'Official escalation levels' }),
      h('p', { class: 'small', text: 'Each level belongs to one scope and can only be used by routes of that scope. Users see its name, the explanation, a link to its official source and the review date.' }),
      R.levels.map((l, i) => { const p = 'routes.levels[' + i + ']';
        return h('div', { class: 'card', 'data-path': p },
          h('div', { class: 'card-head' }, h('h2', { text: (l.name && l.name.en) || l.id }), controls(R.levels, i)),
          h('div', { class: 'grid2' }, field(l, 'id', 'ID', p + '.id'), field(l, 'scope', 'Scope', p + '.scope', 'select', { options: scopeOptions() })),
          pair(l, 'name', 'Name', p + '.name', { rows: 1 }), pair(l, 'explain', 'Plain-language explanation', p + '.explain', { rows: 3 }),
          field(l, 'sourceId', 'Official source (also the link users open)', p + '.sourceId', 'select', { options: sourceOptions() }), pair(l, 'linkLabel', 'Link label', p + '.linkLabel', { rows: 1 })); }),
      addButton('+ Add level', () => R.levels.push({ id: 'new-level-' + (R.levels.length + 1), scope: (R.scopes[0] || {}).id, name: blank(), explain: blank(), sourceId: enabledSource(), linkLabel: blank() })),
      h('h2', { text: 'Scopes: who handles each kind of problem' }),
      R.scopes.map((s, i) => { const p = 'routes.scopes[' + i + ']';
        return h('div', { class: 'card', 'data-path': p },
          h('div', { class: 'card-head' }, h('h2', { text: (s.label && s.label.en) || s.id }), controls(R.scopes, i)),
          field(s, 'id', 'ID', p + '.id'), pair(s, 'label', 'Name', p + '.label', { rows: 1 }), pair(s, 'authority', 'Who handles it (shown to users)', p + '.authority', { rows: 1 })); }),
      addButton('+ Add scope', () => R.scopes.push({ id: 'new-scope-' + (R.scopes.length + 1), label: blank(), authority: blank() })),
      h('h2', { text: 'Navigator texts' }),
      h('div', { class: 'card', 'data-path': 'routes.texts' }, SCHEMA.ROUTE_TEXT_KEYS.map(k => pair(R.texts, k, ROUTE_TEXT_LABELS[k] || k, 'routes.texts.' + k, { rows: 1 }))),
      h('h2', { text: 'Outcome cards (used by question routes)' }),
      R.outcomes.map((o, i) => { const p = 'routes.outcomes[' + i + ']';
        return h('div', { class: 'card', 'data-path': p },
          h('div', { class: 'card-head' }, h('h2', { text: o.title.en || o.id }), controls(R.outcomes, i)),
          field(o, 'id', 'ID', p + '.id'), pair(o, 'title', 'Title', p + '.title', { rows: 1 }), h('h3', { text: 'Steps' }),
          o.steps.map((s, j) => h('div', { class: 'sub' }, h('div', { class: 'card-head' }, h('strong', { text: 'Step ' + (j + 1) }), controls(o.steps, j)), pair(o.steps, j, 'Step ' + (j + 1), p + '.steps[' + j + ']'))),
          o.steps.length < 8 ? h('button', { type: 'button', class: 'small', text: '+ Add step', onclick: () => { o.steps.push(blank()); changed(); render(); } }) : null,
          h('div', { class: 'grid2' }, field(o, 'helplineId', 'Helpline button', p + '.helplineId', 'select', { options: helplines, allowNone: true }), field(o.link, 'sourceId', 'Official link', p + '.link.sourceId', 'select', { options: sourceOptions() })),
          pair(o.link, 'label', 'Official link label', p + '.link.label', { rows: 1 }),
          h('fieldset', { 'data-path': p + '.sourceIds' }, h('legend', { text: 'More official sources for these steps (optional; shown under the card)' }),
            content.sources.sources.map(s => { const id = 'f' + (++seq), box = h('input', { type: 'checkbox', id }); box.checked = (o.sourceIds || []).includes(s.id);
              box.addEventListener('change', () => { const cur = o.sourceIds || []; o.sourceIds = box.checked ? [...new Set([...cur, s.id])] : cur.filter(x => x !== s.id); changed(); });
              return h('label', { class: 'check', for: id }, box, (s.name && s.name.en) || s.id); }))); }),
      addButton('+ Add outcome card', () => R.outcomes.push({ id: 'new-outcome-' + (R.outcomes.length + 1), title: blank(), steps: [blank()], link: { sourceId: content.sources.sources[0].id, label: blank() } })));
  }

  // Emergency mode: the app shows every step whose "when" matches an answer, in the order listed here.
  const EM_TOKENS = () => SCHEMA.EMERGENCY_SITUATIONS.concat(['ongoing', 'any'], SCHEMA.EMERGENCY_CHANNEL_TOKENS);
  const EM_TEXTS = [['eyebrow', 'Small heading above the title'], ['title', 'Title'], ['intro', 'Introduction'], ['showPlan', '"Show my steps" button'], ['chooseFirst', 'Message when nothing is chosen'], ['planTitle', 'Heading above the steps'], ['generalLabel', 'Label shown on general safety steps'], ['recoveryNote', 'Recovery warning (shown when money was sent)'], ['save', 'Save button'], ['saveHeader', 'First line of the saved file'], ['nextRoute', 'Button to the complaint route'], ['nextDraft', 'Button to the complaint draft'], ['checkEntry', 'Button under a warning result']];
  function emTokenLabel(tk) {
    if (tk === 'ongoing') return 'Still happening (answer "Yes" or "Not sure")';
    if (tk === 'any') return 'Every plan';
    const c = SCHEMA.EMERGENCY_CHANNEL_TOKENS.includes(tk) && (content.emergency.channelOptions || []).find(x => x && x.id === tk);
    if (c) return 'Sent money by: ' + ((c.label && c.label.en) || tk);
    const s = (content.emergency.situations || []).find(x => x && x.id === tk);
    return (s && s.label && s.label.en) || tk;
  }
  // Same selection rule as the app: which steps a set of answers shows, in order.
  function emStepsFor(situations, ongoing, channel) {
    const A = Array.isArray(content.emergency.actions) ? content.emergency.actions : [], paid = situations.includes('paid');
    return A.filter(a => a && Array.isArray(a.when) && a.when.some(w => w === 'any' || situations.includes(w) || (w === 'ongoing' && ongoing) || (paid && channel && w === channel)) && !(Array.isArray(a.unless) ? a.unless : []).some(u => situations.includes(u)));
  }
  function planSummary() {
    const box = $('#planSummary'); if (!box) return;
    const E = content.emergency;
    if (!E || !Array.isArray(E.actions)) return box.replaceChildren(h('p', { class: 'note bad', text: 'The steps list is missing, so no plan can be shown.' }));
    const S = SCHEMA.EMERGENCY_SITUATIONS, name = a => (a.id || '(no id)') + (a.helplineId ? ' (helpline)' : '');
    const row = (label, steps) => h('tr', null, h('th', { scope: 'row', text: label }), h('td', { text: steps.length ? steps.map((a, i) => (i + 1) + '. ' + name(a)).join('  ') : 'No steps' }));
    const ongoingOnly = E.actions.filter(a => a && Array.isArray(a.when) && a.when.includes('ongoing'));
    const planErrors = result.errors.filter(m => m.startsWith('emergency.actions:')).map(m => m.slice(m.indexOf(':') + 2));
    const longest = Math.max(...Array.from({ length: (1 << S.length) - 1 }, (_, m) => S.filter((_, b) => (m + 1) & (1 << b))).flatMap(sub => [null, ...SCHEMA.EMERGENCY_CHANNEL_TOKENS].map(ch => emStepsFor(sub, true, ch).length)));
    box.replaceChildren(
      h('table', null, h('thead', null, h('tr', null, h('th', { text: 'If the user chooses only' }), h('th', { text: 'Steps shown, in order ("(helpline)" = a helpline button)' }))),
        h('tbody', null, S.map(s => row(emTokenLabel(s), emStepsFor([s], false))), row('"Still happening" adds', ongoingOnly),
          row('A payment method adds', E.actions.filter(a => a && Array.isArray(a.when) && a.when.some(w => SCHEMA.EMERGENCY_CHANNEL_TOKENS.includes(w)))),
          row('Every answer ticked and still happening', emStepsFor(S, true)))),
      ...(planErrors.length ? [h('ul', { class: 'issues' }, planErrors.map(m => h('li', { class: 'e', text: 'Error · ' + m })))] : []),
      h('p', { class: 'small', text: 'Several answers show every matching step once, in the order of the list below, except steps hidden by a "hide" answer. The longest possible plan has ' + longest + ' steps.' }));
  }
  function emergency() {
    const E = content.emergency, A = E.actions, helplines = content.sources.helplines.map(x => [x.id, 'Helpline ' + x.number]);
    const enabledSource = () => (content.sources.sources.find(s => s.enabled) || content.sources.sources[0] || {}).id;
    const actionCard = (a, i) => {
      const p = 'emergency.actions[' + i + ']', group = 'backing-' + i, srcId = 'f' + (++seq), genId = 'f' + (++seq);
      const srcRadio = h('input', { type: 'radio', name: group, id: srcId }), genRadio = h('input', { type: 'radio', name: group, id: genId });
      srcRadio.checked = a.general !== true; genRadio.checked = a.general === true;
      srcRadio.addEventListener('change', () => { delete a.general; if (!a.sourceId) a.sourceId = enabledSource(); changed(); render(); });
      genRadio.addEventListener('change', () => { delete a.sourceId; a.general = true; changed(); render(); });
      if (!Array.isArray(a.when)) a.when = [];
      return h('div', { class: 'card', 'data-path': p },
        h('div', { class: 'card-head' }, h('h2', { text: (i + 1) + '. ' + (a.id || 'New step') }), controls(A, i)),
        field(a, 'id', 'ID', p + '.id'), pair(a, 'text', 'Step', p + '.text'),
        h('fieldset', { 'data-path': p + '.when' }, h('legend', { text: 'Show this step when the user chooses' }),
          EM_TOKENS().map(tk => { const id = 'f' + (++seq), box = h('input', { type: 'checkbox', id }); box.checked = a.when.includes(tk);
            box.addEventListener('change', () => { a.when = box.checked ? [...new Set([...a.when, tk])] : a.when.filter(x => x !== tk); changed(); });
            return h('label', { class: 'check', for: id }, box, emTokenLabel(tk)); })),
        h('fieldset', { 'data-path': p + '.unless' }, h('legend', { text: 'Hide this step when the user also chooses (optional)' }),
          h('p', { class: 'small', text: 'Use this when another step already covers the same action, so the plan stays short.' }),
          SCHEMA.EMERGENCY_SITUATIONS.map(tk => { const id = 'f' + (++seq), box = h('input', { type: 'checkbox', id }); box.checked = Array.isArray(a.unless) && a.unless.includes(tk);
            box.addEventListener('change', () => { const rest = (Array.isArray(a.unless) ? a.unless : []).filter(x => x !== tk); if (box.checked) a.unless = [...rest, tk]; else if (rest.length) a.unless = rest; else delete a.unless; changed(); });
            return h('label', { class: 'check', for: id }, box, emTokenLabel(tk)); })),
        h('fieldset', { 'data-path': p + '.general' }, h('legend', { text: 'What backs this step' }),
          h('label', { class: 'check', for: srcId }, srcRadio, 'An official source (users see its name, link and review date)'),
          h('label', { class: 'check', for: genId }, genRadio, 'General safety step (users see the general-step label instead of a source)'),
          a.general === true ? null : field(a, 'sourceId', 'Official source', p + '.sourceId', 'select', { options: sourceOptions() })),
        field(a, 'helplineId', 'Helpline button', p + '.helplineId', 'select', { options: [['', 'No helpline button'], ...helplines], allowNone: true }));
    };
    return h('section', null, h('h1', { text: 'Emergency mode' }),
      h('p', { class: 'lede', text: 'What users see after "Get urgent help": a few quick questions (two more appear after "I sent money"), then their protective steps in order. The answer IDs drive the plan, so only their labels can change. Each step must cite an enabled official source or be marked as a general safety step. Every answer, alone or combined, must give at least one specific step; "still happening" must add a step; and every "sent money" plan must include the helpline. The build checks all combinations.' }),
      h('div', { class: 'card' }, h('h2', { text: 'Which steps each answer shows' }), h('div', { id: 'planSummary' })),
      h('div', { class: 'card', 'data-path': 'emergency.callNow' }, h('div', { class: 'card-head' }, h('h2', { text: 'Call-now box' })),
        field(E.callNow, 'helplineId', 'Helpline', 'emergency.callNow.helplineId', 'select', { options: helplines }),
        pair(E.callNow, 'label', 'Button label', 'emergency.callNow.label', { rows: 1 }), pair(E.callNow, 'note', 'Note under the button', 'emergency.callNow.note')),
      h('div', { class: 'card' }, h('div', { class: 'card-head' }, h('h2', { text: 'Questions and answers' })),
        pair(E, 'situationsQuestion', 'Question 1', 'emergency.situationsQuestion', { rows: 1 }),
        E.situations.map((s, i) => pair(s, 'label', 'Answer "' + s.id + '"', 'emergency.situations[' + i + '].label', { rows: 1 })),
        pair(E, 'ongoingQuestion', 'Question 2', 'emergency.ongoingQuestion', { rows: 1 }),
        E.ongoingOptions.map((o, i) => pair(o, 'label', 'Answer "' + o.id + '"', 'emergency.ongoingOptions[' + i + '].label', { rows: 1 })),
        h('p', { class: 'small', text: 'Questions 3 and 4 appear only after "I sent money" is chosen.' }),
        pair(E, 'channelQuestion', 'Question 3 (payment method)', 'emergency.channelQuestion', { rows: 1 }),
        (E.channelOptions || []).map((o, i) => pair(o, 'label', 'Answer "' + o.id + '"', 'emergency.channelOptions[' + i + '].label', { rows: 1 })),
        pair(E, 'whenQuestion', 'Question 4 (when)', 'emergency.whenQuestion', { rows: 1 }),
        (E.whenOptions || []).map((o, i) => pair(o, 'label', 'Answer "' + o.id + '"', 'emergency.whenOptions[' + i + '].label', { rows: 1 })),
        pair(E, 'recentNote', 'Act-now note (shown when the answer to question 4 is "today" or "not sure")', 'emergency.recentNote', { rows: 2 }),
        field(E, 'recentSourceId', 'Official source for the act-now note', 'emergency.recentSourceId', 'select', { options: sourceOptions() })),
      h('h2', { text: 'Steps, in the order users see them' }),
      A.map(actionCard),
      A.length < 20 ? addButton('+ Add step', () => A.push({ id: 'new-step-' + (A.length + 1), when: [], text: blank(), general: true })) : null,
      h('div', { class: 'card' }, h('h2', { text: 'Page texts' }), EM_TEXTS.map(([k, label]) => pair(E, k, label, 'emergency.' + k, { rows: k === 'intro' || k === 'recoveryNote' || k === 'generalLabel' ? 2 : 1 }))));
  }

  // Action Packet: input labels and reasons, the tick lists, the complaint essentials and the do-not-include reminder.
  // Finding and masking private details is code, so it cannot be weakened here.
  const PACKET_TEXT_LABELS = { intro: 'Introduction above the form', routeLabel: 'Label before the route from Find help', routeChange: 'Button to change the route', actionsTitle: 'Question above "already done"', evidenceTitle: 'Question above the evidence list', packetHeader: 'First line of the packet (must say it is not submitted)', contactLine: 'Placeholder for name and contact', ackLine: 'Blank line for the acknowledgement number', generate: 'Create button', checksTitle: 'Heading of the packet check', essentialsReady: 'Label before the essentials count', privacyFound: 'Heading when private details are found', privacyNone: 'Message when none are found', secretsBlock: 'Message that blocks saving while secrets remain', maskButton: 'Mask button', reviewLabel: 'Label above the packet text', reviewConfirm: 'Review confirmation the user must tick', download: 'Download button', print: 'Print button', saveNote: 'Note under the buttons' };
  function packet() {
    const PK = content.packet;
    const tickEditor = (arr, label, path) => [arr.map((x, i) => { const p = path + '[' + i + ']';
      return h('div', { class: 'sub', 'data-path': p }, h('div', { class: 'card-head' }, h('strong', { text: label + ' ' + (i + 1) }), controls(arr, i)), field(x, 'id', 'ID', p + '.id'), pair(x, 'label', 'Label', p + '.label', { rows: 1 })); }),
      addButton('+ Add ' + label.toLowerCase(), () => arr.push({ id: label.toLowerCase().replace(/\W+/g, '-') + '-' + (arr.length + 1), label: blank() }))];
    return h('section', null, h('h1', { text: 'Action Packet' }),
      h('p', { class: 'lede', text: 'The "Prepare a complaint" tab builds a private packet the user submits themselves. You can edit the labels, the reasons shown under each input, the tick lists and the complaint essentials. The checks for private details (OTPs, PINs, passwords, account, card, PAN, Aadhaar, phone, email and UPI) are code, so a content edit can never switch them off.' }),
      h('div', { class: 'card', 'data-path': 'packet.fields' }, h('h2', { text: 'Inputs and why each is asked' }),
        SCHEMA.PACKET_FIELDS.map(k => { const f = PK.fields[k] || (PK.fields[k] = { label: blank(), why: blank() }), p = 'packet.fields.' + k;
          return h('div', { class: 'sub' }, h('strong', { text: k }), pair(f, 'label', 'Label', p + '.label', { rows: 1 }), pair(f, 'why', 'Why we ask', p + '.why', { rows: 1 })); })),
      h('div', { class: 'card' }, h('h2', { text: 'What the user has already done' }), pair(PK, 'actionsTitle', PACKET_TEXT_LABELS.actionsTitle, 'packet.actionsTitle', { rows: 1 }), tickEditor(PK.actions, 'Action', 'packet.actions')),
      h('div', { class: 'card' }, h('h2', { text: 'Evidence types' }), pair(PK, 'evidenceTitle', PACKET_TEXT_LABELS.evidenceTitle, 'packet.evidenceTitle', { rows: 1 }), tickEditor(PK.evidence, 'Evidence', 'packet.evidence')),
      h('div', { class: 'card', 'data-path': 'packet.essentials' }, h('h2', { text: 'Complaint essentials checked before saving' }),
        h('p', { class: 'small', text: 'The IDs are fixed because the app checks them; only the labels and an optional source change.' }),
        (PK.essentials || []).map((e, i) => { const p = 'packet.essentials[' + i + ']';
          return h('div', { class: 'sub' }, h('strong', { text: e.id }), pair(e, 'label', 'Label', p + '.label', { rows: 1 }), field(e, 'sourceId', 'Official source (optional)', p + '.sourceId', 'select', { options: [['', 'No source shown'], ...sourceOptions()], allowNone: true })); })),
      h('div', { class: 'card', 'data-path': 'packet.doNotInclude' }, h('h2', { text: 'Never-include reminder' }), pair(PK.doNotInclude, 'text', 'Reminder', 'packet.doNotInclude.text', { rows: 2 }), field(PK.doNotInclude, 'sourceId', 'Official source', 'packet.doNotInclude.sourceId', 'select', { options: sourceOptions() })),
      h('div', { class: 'card' }, h('h2', { text: 'Packet texts' }), SCHEMA.PACKET_TEXT_KEYS.filter(k => k !== 'actionsTitle' && k !== 'evidenceTitle').map(k => pair(PK, k, PACKET_TEXT_LABELS[k] || k, 'packet.' + k, { rows: k === 'intro' || k === 'packetHeader' || k === 'saveNote' ? 2 : 1 }))));
  }

  // Family readiness: tick-only answers (IDs fixed), and checklist items shown by holding type. The six items from the
  // product specification are required, so they have no Remove button.
  const FAMILY_TEXT_LABELS = { tabLabel: 'Tab button', eyebrow: 'Small heading above the title', title: 'Title', intro: 'Introduction (privacy promise)', holdingsQuestion: 'Question 1 (holdings)', nomineeQuestion: 'Question 2 (nominees; shown for demat or mutual funds)', showList: 'Show button', chooseFirst: 'Message when nothing is chosen', listTitle: 'Checklist heading', firstTag: 'Tag on the nominee step when nominees are not checked', doneLabel: 'Done label', generalLabel: 'Label shown on general safety steps', cardTitle: 'First line of the card', cardWarning: 'Card warning (must mention passwords)', cardBlank: 'Blank line on the card', download: 'Download button', print: 'Print button' };
  function family() {
    const FA = content.family, tokens = SCHEMA.FAMILY_HOLDINGS.concat(['any']);
    const tokenLabel = tk => tk === 'any' ? 'Every family' : (((FA.holdings || []).find(x => x && x.id === tk) || {}).label || {}).en || tk;
    const enabledSource = () => (content.sources.sources.find(s => s.enabled) || content.sources.sources[0] || {}).id;
    const itemCard = (it, i) => {
      const p = 'family.items[' + i + ']', group = 'fbacking-' + i, srcId = 'f' + (++seq), genId = 'f' + (++seq), required = SCHEMA.FAMILY_REQUIRED_ITEMS.includes(it.id);
      const srcRadio = h('input', { type: 'radio', name: group, id: srcId }), genRadio = h('input', { type: 'radio', name: group, id: genId });
      srcRadio.checked = it.general !== true; genRadio.checked = it.general === true;
      srcRadio.addEventListener('change', () => { delete it.general; if (!it.sourceId) it.sourceId = enabledSource(); changed(); render(); });
      genRadio.addEventListener('change', () => { delete it.sourceId; it.general = true; changed(); render(); });
      if (!Array.isArray(it.when)) it.when = [];
      const ctrls = controls(FA.items, i);
      if (required) ctrls.lastChild.remove();
      return h('div', { class: 'card', 'data-path': p },
        h('div', { class: 'card-head' }, h('h2', { text: (i + 1) + '. ' + (it.id || 'New item') + (required ? ' (required by the product specification)' : '') }), ctrls),
        required ? h('p', { class: 'small', text: 'ID: ' + it.id }) : field(it, 'id', 'ID', p + '.id'), pair(it, 'text', 'Checklist item', p + '.text', { rows: 2 }),
        h('fieldset', { 'data-path': p + '.when' }, h('legend', { text: 'Show this item when the family holds' }),
          tokens.map(tk => { const id = 'f' + (++seq), box = h('input', { type: 'checkbox', id }); box.checked = it.when.includes(tk);
            box.addEventListener('change', () => { it.when = box.checked ? [...new Set([...it.when, tk])] : it.when.filter(x => x !== tk); changed(); });
            return h('label', { class: 'check', for: id }, box, tokenLabel(tk)); })),
        h('fieldset', { 'data-path': p + '.general' }, h('legend', { text: 'What backs this item' }),
          h('label', { class: 'check', for: srcId }, srcRadio, 'An official source (users see its name, link and review date)'),
          h('label', { class: 'check', for: genId }, genRadio, 'General safety step (users see the general-step label instead of a source)'),
          it.general === true ? null : field(it, 'sourceId', 'Official source', p + '.sourceId', 'select', { options: sourceOptions() })));
    };
    return h('section', null, h('h1', { text: 'Family readiness' }),
      h('p', { class: 'lede', text: 'The "Family readiness" tab: a privacy-safe checklist. It never asks for values, account numbers, passwords, documents or relatives\' details, and nothing here can add such a question; answers are ticks only. Each item must cite an enabled official source or be marked as a general safety step, and every holding type needs at least one specific item.' }),
      h('div', { class: 'card' }, h('h2', { text: 'Questions and answers' }),
        pair(FA, 'holdingsQuestion', FAMILY_TEXT_LABELS.holdingsQuestion, 'family.holdingsQuestion', { rows: 1 }),
        (FA.holdings || []).map((x, i) => pair(x, 'label', 'Answer "' + x.id + '"', 'family.holdings[' + i + '].label', { rows: 1 })),
        pair(FA, 'nomineeQuestion', FAMILY_TEXT_LABELS.nomineeQuestion, 'family.nomineeQuestion', { rows: 1 }),
        (FA.nomineeOptions || []).map((x, i) => pair(x, 'label', 'Answer "' + x.id + '"', 'family.nomineeOptions[' + i + '].label', { rows: 1 }))),
      h('h2', { text: 'Checklist items, in the order users see them' }),
      (FA.items || []).map(itemCard),
      (FA.items || []).length < 16 ? addButton('+ Add item', () => FA.items.push({ id: 'new-item-' + (FA.items.length + 1), when: [], text: blank(), general: true })) : null,
      h('div', { class: 'card' }, h('h2', { text: 'Family texts' }), SCHEMA.FAMILY_TEXT_KEYS.filter(k => k !== 'holdingsQuestion' && k !== 'nomineeQuestion').map(k => pair(FA, k, FAMILY_TEXT_LABELS[k] || k, 'family.' + k, { rows: k === 'intro' || k === 'cardWarning' || k === 'generalLabel' ? 2 : 1 }))));
  }

  // Persona plans are fixed examples, not user profiles. Owners can change every bilingual explanation and source,
  // but cannot add a free-text identity or financial-data field through this editor.
  function profiles() {
    const P = content.profiles;
    const textCards = SCHEMA.PROFILE_TEXT_KEYS.map(k => pair(P.texts, k, k, 'profiles.texts.' + k, { rows: 2 }));
    const cards = P.profiles.map((p, i) => {
      const at = 'profiles.profiles[' + i + ']';
      return h('div', { class: 'card', 'data-path': at },
        h('h2', { text: p.name.en + ' (' + p.id + ')' }),
        h('p', { class: 'small', text: 'The ID is fixed so the app and tests keep the same three audience paths.' }),
        pair(p, 'name', 'Example name and age', at + '.name', { rows: 1 }),
        pair(p, 'label', 'Short audience label', at + '.label', { rows: 1 }),
        pair(p, 'situation', 'Situation', at + '.situation', { rows: 2 }),
        pair(p, 'firstAction', 'First protective action', at + '.firstAction', { rows: 2 }),
        pair(p, 'why', 'Why this plan', at + '.why', { rows: 3 }),
        h('h3', { text: 'Warning signs' }),
        p.watchFor.map((x, j) => pair(p.watchFor, j, 'Warning sign ' + (j + 1), at + '.watchFor[' + j + ']', { rows: 1 })),
        h('h3', { text: 'Ordered steps and official sources' }),
        p.steps.map((s, j) => h('div', { class: 'sub', 'data-path': at + '.steps[' + j + ']' }, pair(s, 'text', 'Step ' + (j + 1), at + '.steps[' + j + '].text', { rows: 2 }), field(s, 'sourceId', 'Official source', at + '.steps[' + j + '].sourceId', 'select', { options: sourceOptions() }))),
        h('h3', { text: 'Buttons' }),
        p.actions.map((a, j) => h('div', { class: 'sub', 'data-path': at + '.actions[' + j + ']' }, pair(a, 'label', 'Button ' + (j + 1), at + '.actions[' + j + '].label', { rows: 1 }), field(a, 'target', 'Opens tool', at + '.actions[' + j + '].target', 'select', { options: SCHEMA.PROFILE_TARGETS.map(x => [x, x]) }))));
    });
    return h('section', null, h('h1', { text: 'Persona safety plans' }),
      h('p', { class: 'lede', text: 'Three privacy-safe example paths for the intended users. The public app never asks which real person is using it, and it never requests an account number, holdings or income.' }),
      h('div', { class: 'card' }, h('h2', { text: 'Shared text' }), textCards), cards);
  }

  function rights() {
    const cards = content.rights.cards, issues = content.routes.issues;
    return h('section', null, h('h1', { text: 'Rights cards' }),
      h('p', { class: 'lede', text: 'Short rights reminders shown under the matching help route.' }),
      cards.map((c, i) => { const p = 'rights.cards[' + i + ']';
        return h('div', { class: 'card', 'data-path': p },
          h('div', { class: 'card-head' }, h('h2', { text: c.id }), controls(cards, i)),
          h('div', { class: 'grid2' }, field(c, 'id', 'ID', p + '.id'), field(c, 'enabled', 'Shown in the app', p + '.enabled', 'checkbox')),
          h('fieldset', { 'data-path': p + '.issueIds' }, h('legend', { text: 'Show under these routes' }),
            issues.map(iss => { const id = 'f' + (++seq), box = h('input', { type: 'checkbox', id }); box.checked = c.issueIds.includes(iss.id);
              box.addEventListener('change', () => { c.issueIds = box.checked ? [...new Set([...c.issueIds, iss.id])] : c.issueIds.filter(x => x !== iss.id); changed(); });
              return h('label', { class: 'check', for: id }, box, iss.label.en || iss.id); })),
          pair(c, 'text', 'Text', p + '.text', { rows: 3 }), field(c, 'sourceId', 'Official source', p + '.sourceId', 'select', { options: sourceOptions() })); }),
      addButton('+ Add rights card', () => cards.push({ id: 'new-card-' + (cards.length + 1), enabled: false, issueIds: [issues[0].id], text: blank(), sourceId: content.sources.sources[0].id })));
  }

  function practice() {
    const P = content.practice;
    const scenarioCards = phase => P[phase].map((q, i) => { const p = 'practice.' + phase + '[' + i + ']', group = 'correct-' + phase + '-' + i;
      return h('div', { class: 'card', 'data-path': p },
        h('div', { class: 'card-head' }, h('h2', { text: (phase === 'before' ? 'Before' : 'After') + ' the lesson · question ' + (i + 1) }), controls(P[phase], i)),
        h('div', { class: 'grid2' }, field(q, 'id', 'ID', p + '.id'), field(q, 'enabled', 'Used in the exercise', p + '.enabled', 'checkbox')),
        pair(q, 'question', 'Question', p + '.question'), h('h3', { text: 'Options (mark the correct one)' }),
        q.options.map((o, j) => { const id = 'f' + (++seq), radio = h('input', { type: 'radio', name: group, id }); radio.checked = q.correct === j;
          radio.addEventListener('change', () => { q.correct = j; changed(); });
          return h('div', { class: 'sub', 'data-path': p + '.options[' + j + ']' }, h('label', { class: 'check', for: id }, radio, 'Option ' + (j + 1) + ' is the correct answer'), pair(q.options, j, 'Option ' + (j + 1), p + '.options[' + j + ']', { rows: 1 }),
            q.options.length > 2 ? h('button', { type: 'button', class: 'small danger', text: 'Remove option', onclick: () => { q.options.splice(j, 1); q.correct = q.correct === j ? 0 : q.correct > j ? q.correct - 1 : q.correct; changed(); render(); } }) : null); }),
        q.options.length < 4 ? h('button', { type: 'button', class: 'small', text: '+ Add option', onclick: () => { q.options.push(blank()); changed(); render(); } }) : null); });
    const addScenario = phase => addButton('+ Add question', () => P[phase].push({ id: phase + '-new-' + (P[phase].length + 1), enabled: false, question: blank(), options: [blank(), blank()], correct: 0 }));
    return h('section', null, h('h1', { text: 'Practice exercise' }),
      h('p', { class: 'lede', text: 'Fictional questions asked before and after a short lesson. Keep the same number of enabled questions before and after so the scores compare fairly.' }),
      h('h2', { text: 'Before the lesson' }), scenarioCards('before'), addScenario('before'),
      h('h2', { text: 'Lesson cards' }),
      P.lesson.map((c, i) => h('div', { class: 'card', 'data-path': 'practice.lesson[' + i + ']' }, h('div', { class: 'card-head' }, h('strong', { text: 'Lesson card ' + (i + 1) }), controls(P.lesson, i)), pair(c, 'title', 'Title', 'practice.lesson[' + i + '].title', { rows: 1 }), pair(c, 'text', 'Text', 'practice.lesson[' + i + '].text'))),
      P.lesson.length < 6 ? addButton('+ Add lesson card', () => P.lesson.push({ title: blank(), text: blank() })) : null,
      h('h2', { text: 'After the lesson' }), scenarioCards('after'), addScenario('after'),
      h('h2', { text: 'Habit card' }),
      h('div', { class: 'card', 'data-path': 'practice.habit' }, pair(P.habit, 'title', 'Title', 'practice.habit.title', { rows: 1 }), pair(P.habit, 'intro', 'Introduction', 'practice.habit.intro'),
        P.habit.days.map((d, i) => h('div', { class: 'sub' }, h('div', { class: 'card-head' }, h('strong', { text: 'Day ' + (i + 1) }), controls(P.habit.days, i)), pair(P.habit.days, i, 'Day ' + (i + 1), 'practice.habit.days[' + i + ']', { rows: 1 }))),
        P.habit.days.length < 14 ? h('button', { type: 'button', class: 'small', text: '+ Add day', onclick: () => { P.habit.days.push(blank()); changed(); render(); } }) : null,
        pair(P.habit, 'footer', 'Closing line', 'practice.habit.footer')));
  }

  function texts() {
    const T = content.translations.texts;
    return h('section', null, h('h1', { text: 'App texts' }),
      h('p', { class: 'lede', text: 'Labels and short texts used across the app. Safety caveats (such as "no warning does not mean safe") and legal disclaimers are fixed in code and need a safety review to change.' }),
      Object.keys(T).map(k => h('div', { class: 'card', 'data-path': 'translations.texts.' + k }, pair(T, k, k, 'translations.texts.' + k, { rows: 1 }))));
  }

  // Same assembly as build.cjs, from the app sources embedded when this studio was built.
  // Tag names are split ("<" + "/script>") because this code itself sits inside a script element.
  const OPEN = '<' + 'script>', CLOSE = '<' + '/script>', STYLE_END = '<' + '/style>', BODY_END = '<' + '/body>', MARK = '<' + '!-- NS_SNAPSHOT_V2 --' + '>';
  function inject(text, anchor, insert) { const at = text.indexOf(anchor); if (at < 0 || text.indexOf(anchor, at + 1) >= 0) throw new Error('anchor must appear once: ' + anchor); return text.slice(0, at) + insert + text.slice(at + anchor.length); }
  function buildApp(c) {
    let html = inject(DATA.app.base, STYLE_END, DATA.app.css + '\n' + STYLE_END);
    html = inject(html, OPEN, MARK + '\n' + OPEN + '\n' + DATA.app.engine + (DATA.app.assist ? '\n' + DATA.app.assist : '') + '\n' + CLOSE + '\n' + OPEN + '\nwindow.NS_CONTENT=' + JSON.stringify(c).replace(/</g, LT) + ';\n' + CLOSE + '\n' + OPEN);
    return inject(html, BODY_END, OPEN + '\n' + DATA.app.upgrade + '\n' + CLOSE + BODY_END);
  }
  function preview() {
    const wrap = h('section', null, h('h1', { text: 'Preview' }), h('p', { class: 'lede', text: 'The app below is assembled from your current edits exactly as the build would assemble it. It runs only on this computer.' }));
    const v = SCHEMA.validateContent(content, { engineIds: DATA.engineIds });
    if (v.errors.length) { wrap.append(h('p', { class: 'note bad', text: 'Fix ' + v.errors.length + ' error(s) to see the preview. The build would refuse this content.' })); return wrap; }
    const html = buildApp(content), frame = h('iframe', { id: 'preview', title: 'App preview built from your edits', sandbox: 'allow-scripts allow-modals allow-downloads allow-popups' });
    frame.srcdoc = html;
    wrap.append(h('div', { class: 'actions' }, h('button', { type: 'button', text: 'Refresh preview', onclick: render }), h('button', { type: 'button', text: 'Download this preview as one HTML file', onclick: () => download('niveshak-saathi-preview.html', html, 'text/html') })), frame);
    return wrap;
  }

  function download(name, text, type) {
    const url = URL.createObjectURL(new Blob([text], { type: (type || 'application/json') + ';charset=utf-8' })), a = h('a', { href: url, download: name });
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  function exportPack() {
    const v = validate();
    download('niveshak-content-pack-' + safeName(content.meta.contentVersion) + '.json', JSON.stringify({ packFormat: 'niveshak-content-pack', packVersion: 1, exportedAt: new Date().toISOString(), contentVersion: content.meta.contentVersion, validation: { errors: v.errors.length, warnings: v.warnings.length }, content }, null, 2));
    toast(v.errors.length ? 'Exported with ' + v.errors.length + ' error(s); fix them before applying the pack.' : 'Content pack exported. Apply it with: node validate-content.cjs --apply <file>', !!v.errors.length);
  }
  async function importPack(file) {
    if (!file) return;
    try {
      const pack = JSON.parse(await file.text());
      if (pack.packFormat !== 'niveshak-content-pack' || pack.packVersion !== 1 || !pack.content) throw new Error('this is not a Niveshak Saathi content pack');
      const missing = SCHEMA.SECTIONS.filter(s => !pack.content[s] || typeof pack.content[s] !== 'object');
      if (missing.length) throw new Error('the pack has no ' + missing.join(', ') + ' section; it may come from an older Studio. Export a new pack from this Studio instead');
      if (changedSections().length && !confirm('Replace your unsaved changes with this pack?')) return;
      content = pack.content; render(); toast('Pack imported. Check the validation result before saving.');
    } catch (e) { toast('Import failed: ' + e.message, true); }
  }
  async function saveToFolder() {
    const v = validate();
    if (v.errors.length) return toast('Fix ' + v.errors.length + ' error(s) before saving.', true);
    try {
      const dir = await window.showDirectoryPicker({ mode: 'readwrite' });
      try { await dir.getFileHandle('meta.json'); await dir.getFileHandle('sources.json'); } catch (e) { throw new Error('choose the prototype/content folder (it already contains meta.json and sources.json)'); }
      const changes = changedSections();
      for (const s of changes) { const w = await (await dir.getFileHandle(s + '.json', { create: true })).createWritable(); await w.write(JSON.stringify(content[s], null, 2) + '\n'); await w.close(); }
      original = clone(content); render();
      toast(changes.length ? 'Saved ' + changes.join(', ') + '. Now run "node build.cjs" in the prototype folder.' : 'Nothing to save.');
    } catch (e) { if (!e || e.name !== 'AbortError') toast('Save failed: ' + (e && e.message), true); }
  }
  async function draftManifest() {
    const v = validate();
    const hash = async s => { if (!(window.crypto && crypto.subtle)) return null; const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase(); };
    const sections = {}; for (const s of SCHEMA.SECTIONS) sections[s] = await hash(SCHEMA.canonical(content[s]));
    download('release-manifest-draft-' + safeName(content.meta.contentVersion) + '.json', JSON.stringify({ manifestVersion: 1, kind: 'Owner Studio draft; the build writes the official release-manifest.json', product: 'Niveshak Saathi', productVersion: content.meta.productVersion, contentVersion: content.meta.contentVersion, createdAt: new Date().toISOString(), contentSha256: await hash(SCHEMA.canonical(content)), sections, changedSections: changedSections(), basedOn: DATA.builtFrom, validation: { errors: v.errors, warnings: v.warnings } }, null, 2));
  }
  function publish() {
    const changes = changedSections(), file = h('input', { type: 'file', accept: '.json,application/json', id: 'importPack' });
    file.addEventListener('change', () => importPack(file.files[0]));
    return h('section', null, h('h1', { text: 'Save and publish' }),
      h('div', { class: 'card' }, h('h2', { text: 'Changes in this session' }), h('p', { text: changes.length ? 'Changed sections: ' + changes.join(', ') : 'No changes yet.' }),
        h('button', { type: 'button', class: 'danger', text: 'Discard all changes', disabled: !changes.length, onclick: () => { if (confirm('Discard all unsaved changes?')) { content = clone(original); render(); toast('Changes discarded.'); } } })),
      h('div', { class: 'card' }, h('h2', { text: '1. Save your edits' }),
        typeof window.showDirectoryPicker === 'function'
          ? h('p', null, h('button', { type: 'button', class: 'primary', id: 'saveFolder', text: 'Save into the content folder…', onclick: saveToFolder }), ' Choose outputs/prototype/content. Only valid content can be saved.')
          : h('p', { class: 'small', text: 'This browser cannot write to folders. Use the content pack instead; it works everywhere.' }),
        h('p', null, h('button', { type: 'button', id: 'exportPack', text: 'Export content pack', onclick: exportPack }), ' One JSON file with every section. Apply it in the prototype folder with: node validate-content.cjs --apply <pack file>'),
        h('p', null, h('label', { for: 'importPack', text: 'Import a content pack: ' }), file)),
      h('div', { class: 'card' }, h('h2', { text: '2. Rebuild the app' }),
        h('p', { text: 'In the prototype folder run: node build.cjs. The build validates the content again, refuses errors, writes dist/index.html and writes release-manifest.json with the version, time, checksums and changed sections.' }),
        h('p', { class: 'note', text: 'A rebuilt app is a new release. Get it reviewed (GPT/Codex runs the canonical checks) before it is published.' })),
      h('div', { class: 'card' }, h('h2', { text: 'Draft release manifest' }), h('p', { text: 'Download the checksums and changed sections of your current edits to attach to a review request.' }), h('button', { type: 'button', id: 'draftManifest', text: 'Download draft manifest', onclick: draftManifest })));
  }

  // ---------- shell ----------
  const VIEWS = { overview, sources, warnings, routes, emergency, packet, family, profiles, rights, practice, texts, preview, publish };
  const TABS = [['overview', 'Overview'], ['sources', 'Sources & review dates'], ['warnings', 'Warning texts'], ['routes', 'Help routes'], ['emergency', 'Emergency mode'], ['packet', 'Action Packet'], ['family', 'Family readiness'], ['profiles', 'Persona plans'], ['rights', 'Rights cards'], ['practice', 'Practice'], ['texts', 'App texts'], ['preview', 'Preview'], ['publish', 'Save & publish']];
  function render() {
    const focused = document.activeElement && document.activeElement.id;
    seq = 0;
    $('#tabs').replaceChildren(...TABS.map(([id, label]) => h('button', { type: 'button', id: 'tab-' + id, 'aria-current': tab === id ? 'page' : null, 'aria-selected': String(tab === id), onclick: () => { tab = id; render(); window.scrollTo(0, 0); $('#main').focus({ preventScroll: true }); } }, label)));
    let view;
    try { view = VIEWS[tab](); }
    catch (e) { view = h('section', null, h('h1', { text: 'This section cannot be edited' }), h('p', { class: 'note bad', text: 'Its content does not have the expected structure, so the editor cannot show it (' + e.message + '). See the validation list on the Overview tab, or discard the changes on the Save & publish tab.' })); }
    $('#main').replaceChildren(view);
    // Keep keyboard focus on the same field after a re-render (field ids are assigned in a fixed order).
    const again = focused && document.getElementById(focused); if (again && again !== document.body) again.focus();
    validate();
  }
  window.addEventListener('beforeunload', e => { if (changedSections().length) { e.preventDefault(); e.returnValue = ''; } });
  render();
})();
