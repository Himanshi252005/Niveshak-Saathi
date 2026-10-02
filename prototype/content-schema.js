/* Owner-editable content: schema and validation shared by build.cjs, validate-content.cjs and the local Owner Studio.
   The build refuses content that fails these checks, so the public app only ever ships validated content. */
(function (root) {
  'use strict';
  const SECTIONS = ['meta', 'sources', 'warnings', 'routes', 'rights', 'practice', 'emergency', 'packet', 'family', 'profiles', 'translations'];
  // Family readiness: the answers drive which items show, and the six items from the product spec must always exist.
  const FAMILY_HOLDINGS = ['demat', 'mf', 'physical', 'unknown'], FAMILY_NOMINEE = ['checked', 'not-checked', 'unknown'];
  const FAMILY_REQUIRED_ITEMS = ['nominee', 'contact-kyc', 'records', 'old-holdings', 'entity-contact', 'no-paid-agents'];
  const FAMILY_TEXT_KEYS = ['tabLabel', 'eyebrow', 'title', 'intro', 'holdingsQuestion', 'nomineeQuestion', 'showList', 'chooseFirst', 'listTitle', 'firstTag', 'doneLabel', 'generalLabel', 'cardTitle', 'cardWarning', 'cardBlank', 'download', 'print'];
  // Persona safety plans: fixed example identities make the three intended audiences explicit without creating user profiles.
  const PROFILE_IDS = ['praveen', 'kavita', 'babulal'], PROFILE_TARGETS = ['check', 'paycheck', 'emergency', 'route', 'family', 'practice'];
  const PROFILE_TEXT_KEYS = ['eyebrow', 'title', 'intro', 'homeTitle', 'homeHint', 'planTitle', 'watchTitle', 'stepsTitle', 'whyTitle', 'privacy'];
  // Action Packet: the app reads these field and essential IDs, so their labels are editable but the IDs are fixed.
  const PACKET_FIELDS = ['entity', 'when', 'complainedOn', 'amount', 'ref'], PACKET_ESSENTIALS = ['entity', 'when', 'summary', 'resolution', 'evidence', 'number'];
  const PACKET_TEXT_KEYS = ['intro', 'routeLabel', 'routeChange', 'actionsTitle', 'evidenceTitle', 'packetHeader', 'contactLine', 'ackLine', 'generate', 'checksTitle', 'essentialsReady', 'privacyFound', 'privacyNone', 'secretsBlock', 'maskButton', 'reviewLabel', 'reviewConfirm', 'download', 'print', 'saveNote'];
  // Emergency mode: these ids drive the plan logic, so labels are editable but the ids are fixed.
  const EMERGENCY_SITUATIONS = ['received', 'clicked', 'shared', 'paid'], EMERGENCY_ONGOING = ['yes', 'no', 'unsure'];
  // Asked only after "sent money": how and when. A payment channel can add steps (step "when" tokens); it never removes one.
  const EMERGENCY_CHANNELS = ['upi', 'card', 'bank', 'wallet', 'cash', 'unsure'], EMERGENCY_WHEN = ['today', 'earlier', 'unsure'];
  const EMERGENCY_CHANNEL_TOKENS = EMERGENCY_CHANNELS.filter(c => c !== 'unsure');
  // Scam check: where the message came from, and the two kinds of advice a channel can lead to.
  const CHECK_CHANNELS = ['sms', 'whatsapp', 'telegram', 'social', 'email', 'call'], CHECK_ADVICE = ['group', 'link'];
  const SUPPORTED_SCHEMA_VERSIONS = [1];
  // Sections whose structure has changed: an older file is refused rather than misread.
  const SECTION_SCHEMA_VERSIONS = { routes: [2] };
  const schemaVersions = s => SECTION_SCHEMA_VERSIONS[s] || SUPPORTED_SCHEMA_VERSIONS;
  // Help routes: a route is a question leading to outcome cards, an escalation ladder, or "not sure" (abstain).
  const ROUTE_KINDS = ['outcomes', 'ladder', 'abstain'];
  // Texts the Find help navigator reads from routes.json.
  const ROUTE_TEXT_KEYS = ['chooseIssue', 'scopeLabel', 'stageQuestion', 'stageNone', 'replyQuestion', 'replyWaiting', 'replyUnresolved', 'replyResolved', 'numberQuestion', 'numberYes', 'numberNo', 'nextTitle', 'nextLabel', 'ifNoReplyLabel', 'answerReply', 'firstAdvice', 'waitAdvice', 'resolvedAdvice', 'noNumberAdvice', 'lastAdvice', 'pathTitle', 'evidenceTitle', 'abstainTitle'];
  // Official links only. A domain is allowed exactly or as a parent domain (e.g. gov.in covers sebi.gov.in).
  // Adding a domain is a deliberate code change, so a mistyped or lookalike link cannot slip in through content.
  const OFFICIAL_DOMAINS = ['gov.in', 'nic.in', 'rbi.org.in', 'npci.org.in', 'nseindia.com', 'bseindia.com', 'nsdl.co.in', 'cdslindia.com', 'amfiindia.com', 'pfrda.org.in'];
  const HELPLINE_NUMBERS = ['1930'];
  // Text keys the app reads from translations.json.
  const REQUIRED_TEXT_KEYS = ['banner.urgent', 'banner.urgentButton', 'route.rightsSummary', 'route.prepareDraft', 'route.saveActionCard', 'actionCard.header', 'trust.title', 'practice.title', 'practice.lede', 'practice.lessonTitle', 'habit.cardTitle', 'habit.cardText', 'habit.download'];
  const SECRET = /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,})|\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{20,}|\bAIza[0-9A-Za-z_-]{35}|\b(?:AKIA|ASIA)[0-9A-Z]{16}\b|-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----|\b(?:password|passwd|secret|token|api[_-]?key)\b["']?\s*[:=]\s*["']?[^"'\s]{8,}/i;
  const DEVANAGARI = /\p{Script=Devanagari}/u;
  const ID = /^[a-z0-9][a-z0-9-]{1,47}$/;
  const DAY = 86400000;

  // Stable JSON (sorted keys) so checksums only change when content changes.
  function canonical(value) {
    if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
    if (value && typeof value === 'object') return '{' + Object.keys(value).sort().map(k => JSON.stringify(k) + ':' + canonical(value[k])).join(',') + '}';
    return JSON.stringify(value);
  }

  function validateContent(content, options) {
    const opts = options || {};
    const engineIds = opts.engineIds || [];
    const today = Date.parse((opts.today || new Date().toISOString().slice(0, 10)) + 'T00:00:00Z');
    const errors = [], warnings = [];
    const err = (where, msg) => errors.push(where + ': ' + msg), warn = (where, msg) => warnings.push(where + ': ' + msg);
    const isObj = v => v && typeof v === 'object' && !Array.isArray(v);
    const str = (where, v, max) => {
      if (typeof v !== 'string' || !v.trim()) { err(where, 'required'); return false; }
      if (v.length > (max || 200)) err(where, 'longer than ' + (max || 200) + ' characters');
      if (/[<>]/.test(v)) err(where, 'must not contain < or >');
      if (SECRET.test(v)) err(where, 'looks like a credential; never put credentials in content');
      return true;
    };
    const text = (where, v, max, optional) => {
      if (v == null) { if (!optional) err(where, 'missing English and Hindi text'); return; }
      if (!isObj(v)) { err(where, 'must be an object with en and hi'); return; }
      for (const k of Object.keys(v)) if (k !== 'en' && k !== 'hi') err(where, 'unexpected key "' + k + '"');
      if (typeof v.en !== 'string' || !v.en.trim()) err(where + '.en', 'missing English text'); else str(where + '.en', v.en, max || 600);
      if (typeof v.hi !== 'string' || !v.hi.trim()) err(where + '.hi', 'missing Hindi text'); else { str(where + '.hi', v.hi, max || 600); if (!DEVANAGARI.test(v.hi)) warn(where + '.hi', 'Hindi text has no Devanagari letters; check the translation'); }
    };
    const id = (where, v, seen) => {
      if (typeof v !== 'string' || !ID.test(v)) { err(where, 'id must be 2–48 lowercase letters, digits or hyphens'); return; }
      if (seen) { if (seen.has(v)) err(where, 'duplicate id "' + v + '"'); seen.add(v); }
    };
    const date = (where, v) => {
      const t = typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) ? Date.parse(v + 'T00:00:00Z') : NaN;
      if (isNaN(t) || new Date(t).toISOString().slice(0, 10) !== v) { err(where, 'must be a real date written YYYY-MM-DD'); return null; }
      return t;
    };
    const bool = (where, v) => { if (typeof v !== 'boolean') err(where, 'must be true or false'); };
    const list = (where, v, min, max) => {
      if (!Array.isArray(v)) { err(where, 'must be a list'); return []; }
      if (v.length < min) err(where, 'needs at least ' + min + ' item(s)');
      if (max && v.length > max) err(where, 'allows at most ' + max + ' items');
      return v;
    };
    const url = (where, v) => {
      if (!str(where, v, 300)) return;
      let u; try { u = new URL(v); } catch (e) { err(where, 'not a valid web address'); return; }
      if (u.protocol !== 'https:') err(where, 'must start with https://');
      if (u.username || u.password) err(where, 'must not contain a user name or password');
      const host = u.hostname.toLowerCase();
      if (!OFFICIAL_DOMAINS.some(d => host === d || host.endsWith('.' + d))) err(where, host + ' is not on the official-domain allowlist (' + OFFICIAL_DOMAINS.join(', ') + ')');
    };

    for (const s of SECTIONS) {
      if (!isObj(content && content[s])) { err(s, 'section missing'); continue; }
      if (!schemaVersions(s).includes(content[s].schemaVersion)) err(s + '.schemaVersion', 'unsupported schema version ' + JSON.stringify(content[s].schemaVersion) + ' (supported: ' + schemaVersions(s).join(', ') + ')');
    }
    if (errors.length) return { errors, warnings };
    const { meta, sources, warnings: warn_, routes, rights, practice, profiles, translations } = content;

    // meta
    str('meta.productVersion', meta.productVersion, 40);
    str('meta.contentVersion', meta.contentVersion, 40);
    const snap = date('meta.snapshotDate', meta.snapshotDate), due = date('meta.reviewDue', meta.reviewDue);
    if (snap != null && snap > today + DAY) err('meta.snapshotDate', 'is in the future');
    if (snap != null && due != null && due < snap) err('meta.reviewDue', 'is before the snapshot date');
    if (due != null && due < today) warn('meta.reviewDue', 'content review is overdue (' + meta.reviewDue + ')');
    // Optional public address behind "Check for a newer version" on Home (P2-4). It is the app's own site, not an official
    // source, so the source allowlist does not apply; it must still be a plain https address without a user name or password.
    if (meta.updateUrl != null && meta.updateUrl !== '' && str('meta.updateUrl', meta.updateUrl, 300)) {
      let u = null; try { u = new URL(meta.updateUrl); } catch (e) { err('meta.updateUrl', 'not a valid web address'); }
      if (u && u.protocol !== 'https:') err('meta.updateUrl', 'must start with https://');
      if (u && (u.username || u.password)) err('meta.updateUrl', 'must not contain a user name or password');
      if (u && (u.search || u.hash)) err('meta.updateUrl', 'must not contain "?" or "#" parts');
    }

    // sources and helplines
    const sourceIds = new Set(), enabledSources = new Set();
    list('sources.sources', sources.sources, 1).forEach((s, i) => {
      const w = 'sources.sources[' + i + ']';
      if (!isObj(s)) return err(w, 'must be an object');
      id(w + '.id', s.id, sourceIds); bool(w + '.enabled', s.enabled); if (s.enabled) enabledSources.add(s.id);
      text(w + '.name', s.name, 120); str(w + '.authority', s.authority, 160); url(w + '.url', s.url);
      text(w + '.supports', s.supports, 300); text(w + '.note', s.note, 300, true); str(w + '.reviewOwner', s.reviewOwner, 120);
      const last = date(w + '.lastReviewed', s.lastReviewed), next = date(w + '.reviewDue', s.reviewDue);
      if (last != null && last > today + DAY) err(w + '.lastReviewed', 'is in the future');
      if (last != null && next != null && next < last) err(w + '.reviewDue', 'is before lastReviewed');
      if (next != null && next < today && s.enabled) warn(w + '.reviewDue', '"' + s.id + '" review is overdue (' + s.reviewDue + ')');
    });
    const sourceRef = (where, v) => { if (!enabledSources.has(v)) err(where, 'must name an enabled source (got ' + JSON.stringify(v) + ')'); };
    const helplineIds = new Set();
    list('sources.helplines', sources.helplines, 1).forEach((h, i) => {
      const w = 'sources.helplines[' + i + ']';
      if (!isObj(h)) return err(w, 'must be an object');
      id(w + '.id', h.id, helplineIds);
      if (!HELPLINE_NUMBERS.includes(h.number)) err(w + '.number', 'must be an approved official helpline (' + HELPLINE_NUMBERS.join(', ') + ')');
      text(w + '.label', h.label, 60); sourceRef(w + '.sourceId', h.sourceId);
    });

    // warnings: one explanation per engine category, no more, no fewer (detection rules live in engine.js)
    if (!isObj(warn_.warnings)) err('warnings.warnings', 'must be an object keyed by warning category');
    else {
      for (const e of engineIds) if (!warn_.warnings[e]) err('warnings.warnings', 'missing explanation for engine category "' + e + '"');
      for (const [k, v] of Object.entries(warn_.warnings)) {
        const w = 'warnings.warnings.' + k;
        if (engineIds.length && !engineIds.includes(k)) { err(w, 'not an engine warning category'); continue; }
        if (!isObj(v)) { err(w, 'must be an object'); continue; }
        text(w + '.title', v.title, 120); text(w + '.why', v.why, 400); sourceRef(w + '.sourceId', v.sourceId);
      }
    }
    // Optional "where did this message come from?": changes only the advice under the result, never the check itself.
    text('warnings.channelQuestion', warn_.channelQuestion, 120); text('warnings.channelWhy', warn_.channelWhy, 200);
    const adviceKeys = isObj(warn_.channelAdvice) ? Object.keys(warn_.channelAdvice) : [];
    if (!isObj(warn_.channelAdvice)) err('warnings.channelAdvice', 'required');
    else if (adviceKeys.slice().sort().join() !== CHECK_ADVICE.slice().sort().join()) err('warnings.channelAdvice', 'must contain exactly: ' + CHECK_ADVICE.join(', '));
    for (const k of adviceKeys) { const a = warn_.channelAdvice[k], w = 'warnings.channelAdvice.' + k; if (!isObj(a)) { err(w, 'must be an object'); continue; } text(w + '.text', a.text, 300); sourceRef(w + '.sourceId', a.sourceId); }
    const chIds = list('warnings.channels', warn_.channels, CHECK_CHANNELS.length, CHECK_CHANNELS.length).map(c => c && c.id);
    if (chIds.slice().sort().join() !== CHECK_CHANNELS.slice().sort().join()) err('warnings.channels', 'must contain exactly these ids: ' + CHECK_CHANNELS.join(', '));
    (Array.isArray(warn_.channels) ? warn_.channels : []).forEach((c, i) => { const w = 'warnings.channels[' + i + ']'; if (!isObj(c)) return err(w, 'must be an object'); text(w + '.label', c.label, 60); if (!CHECK_ADVICE.includes(c.advice)) err(w + '.advice', 'must be one of ' + CHECK_ADVICE.join(', ')); });

    // routes (schema 2)
    if (!isObj(routes.texts)) err('routes.texts', 'required');
    else for (const k of ROUTE_TEXT_KEYS) text('routes.texts.' + k, routes.texts[k], 300);
    const scopeIds = new Set(), levelIds = new Set(), levels = new Map(), usedLevels = new Set();
    list('routes.scopes', routes.scopes, 1, 12).forEach((s, i) => {
      const w = 'routes.scopes[' + i + ']';
      if (!isObj(s)) return err(w, 'must be an object');
      id(w + '.id', s.id, scopeIds); text(w + '.label', s.label, 80); text(w + '.authority', s.authority, 160);
    });
    list('routes.levels', routes.levels, 0, 20).forEach((l, i) => {
      const w = 'routes.levels[' + i + ']';
      if (!isObj(l)) return err(w, 'must be an object');
      id(w + '.id', l.id, levelIds); levels.set(l.id, l);
      if (!scopeIds.has(l.scope)) err(w + '.scope', 'unknown scope "' + l.scope + '"');
      text(w + '.name', l.name, 100); text(w + '.explain', l.explain, 500); text(w + '.linkLabel', l.linkLabel, 80); sourceRef(w + '.sourceId', l.sourceId);
    });
    const outcomeIds = new Set(), issueIds = new Set(), usedOutcomes = new Set();
    list('routes.outcomes', routes.outcomes, 1).forEach((o, i) => {
      const w = 'routes.outcomes[' + i + ']';
      if (!isObj(o)) return err(w, 'must be an object');
      id(w + '.id', o.id, outcomeIds); text(w + '.title', o.title, 160);
      list(w + '.steps', o.steps, 1, 8).forEach((s, j) => text(w + '.steps[' + j + ']', s, 400));
      if (o.helplineId != null && !helplineIds.has(o.helplineId)) err(w + '.helplineId', 'unknown helpline "' + o.helplineId + '"');
      if (!isObj(o.link)) err(w + '.link', 'needs an official link'); else { sourceRef(w + '.link.sourceId', o.link.sourceId); text(w + '.link.label', o.link.label, 80); }
      // Optional further official sources for the card's steps, shown under it with their review dates.
      if (o.sourceIds != null) list(w + '.sourceIds', o.sourceIds, 0, 8).forEach((s, j) => sourceRef(w + '.sourceIds[' + j + ']', s));
    });
    const outcomeRef = (where, v) => { if (!outcomeIds.has(v)) err(where, 'unknown outcome "' + v + '"'); else usedOutcomes.add(v); };
    const enabledIssues = list('routes.issues', routes.issues, 1, 16).filter((issue, i) => {
      const w = 'routes.issues[' + i + ']';
      if (!isObj(issue)) { err(w, 'must be an object'); return false; }
      id(w + '.id', issue.id, issueIds); bool(w + '.enabled', issue.enabled); text(w + '.label', issue.label, 120); text(w + '.shortLabel', issue.shortLabel, 50);
      if (!ROUTE_KINDS.includes(issue.kind)) { err(w + '.kind', 'must be one of ' + ROUTE_KINDS.join(', ')); return false; }
      if (issue.kind !== 'abstain' && !scopeIds.has(issue.scope)) err(w + '.scope', 'unknown scope "' + issue.scope + '"');
      if (issue.kind === 'outcomes') {
        if (issue.question != null) {
          text(w + '.question', issue.question, 160);
          const answerIds = new Set();
          list(w + '.answers', issue.answers, 2, 4).forEach((a, j) => { const aw = w + '.answers[' + j + ']'; if (!isObj(a)) return err(aw, 'must be an object'); id(aw + '.id', a.id, answerIds); text(aw + '.label', a.label, 60); outcomeRef(aw + '.outcome', a.outcome); });
          if (issue.outcome != null) err(w + '.outcome', 'use answers when a question is set');
        } else {
          if (issue.answers != null) err(w + '.answers', 'answers need a question');
          outcomeRef(w + '.outcome', issue.outcome);
        }
      } else if (issue.kind === 'ladder') {
        // First contact is always the institution itself; every later level must belong to the same scope, so a
        // bank, insurance or pension complaint can never be escalated to another regulator's system.
        const fc = issue.firstContact;
        if (!isObj(fc)) err(w + '.firstContact', 'required');
        else { text(w + '.firstContact.name', fc.name, 120); text(w + '.firstContact.how', fc.how, 400); sourceRef(w + '.firstContact.sourceId', fc.sourceId); }
        const seen = new Set();
        list(w + '.ladder', issue.ladder, 1, 4).forEach((lv, j) => {
          const lw = w + '.ladder[' + j + ']', L = levels.get(lv);
          if (!L) return err(lw, 'unknown level "' + lv + '"');
          if (seen.has(lv)) err(lw, 'level "' + lv + '" is listed twice');
          seen.add(lv); usedLevels.add(lv);
          if (L.scope !== issue.scope) err(lw, 'level "' + lv + '" belongs to scope "' + L.scope + '" but this route is "' + issue.scope + '"; a route must not escalate to another regulator\'s system');
        });
        list(w + '.evidence', issue.evidence, 1, 8).forEach((e, j) => text(w + '.evidence[' + j + ']', e, 300));
      } else {
        list(w + '.steps', issue.steps, 1, 6).forEach((s, j) => text(w + '.steps[' + j + ']', s, 400));
        list(w + '.sourceIds', issue.sourceIds, 0, 8).forEach((s, j) => sourceRef(w + '.sourceIds[' + j + ']', s));
      }
      // Optional "Also check" tips on escalation and "not sure" routes: short, bilingual, each tied to one official source.
      if (issue.tips != null) {
        if (issue.kind === 'outcomes') err(w + '.tips', 'a question route shows extra advice as outcome steps, not tips');
        else list(w + '.tips', issue.tips, 0, 4).forEach((tp, j) => { const tw = w + '.tips[' + j + ']'; if (!isObj(tp)) return err(tw, 'must be an object'); text(tw + '.text', tp.text, 300); sourceRef(tw + '.sourceId', tp.sourceId); });
      }
      return issue.enabled === true;
    });
    if (!enabledIssues.length) err('routes.issues', 'at least one route must be enabled');
    if (!enabledIssues.some(x => x.kind === 'abstain')) err('routes.issues', 'needs an enabled "not sure" route (kind "abstain") so unknown cases are never forced into a wrong route');
    // The "Get urgent help" button opens the fraud route with "money already sent": that path must exist and show a helpline.
    const fraud = (routes.issues || []).find(x => x && x.id === 'fraud');
    const urgent = fraud && fraud.enabled && fraud.kind === 'outcomes' && Array.isArray(fraud.answers) && fraud.answers.find(a => a && a.id === 'yes');
    const urgentOutcome = urgent && (routes.outcomes || []).find(o => o && o.id === urgent.outcome);
    if (!urgentOutcome || !urgentOutcome.helplineId) err('routes', 'the urgent route (enabled issue "fraud" with answer "yes" leading to an outcome with a helpline) must remain available');
    for (const o of outcomeIds) if (!usedOutcomes.has(o)) warn('routes.outcomes', 'outcome "' + o + '" is not used by any route');
    for (const l of levelIds) if (!usedLevels.has(l)) warn('routes.levels', 'level "' + l + '" is not used by any route');
    for (const s of scopeIds) if (!(routes.issues || []).some(x => x && x.scope === s)) warn('routes.scopes', 'scope "' + s + '" is not used by any route');

    // rights
    const cardIds = new Set();
    list('rights.cards', rights.cards, 0).forEach((c, i) => {
      const w = 'rights.cards[' + i + ']';
      if (!isObj(c)) return err(w, 'must be an object');
      id(w + '.id', c.id, cardIds); bool(w + '.enabled', c.enabled); text(w + '.text', c.text, 500); sourceRef(w + '.sourceId', c.sourceId);
      list(w + '.issueIds', c.issueIds, 1).forEach((r, j) => { if (!issueIds.has(r)) err(w + '.issueIds[' + j + ']', 'unknown route "' + r + '"'); });
    });

    // practice
    const scenarioIds = new Set();
    for (const phase of ['before', 'after']) {
      const items = list('practice.' + phase, practice[phase], 1, 10);
      items.forEach((q, i) => {
        const w = 'practice.' + phase + '[' + i + ']';
        if (!isObj(q)) return err(w, 'must be an object');
        id(w + '.id', q.id, scenarioIds); bool(w + '.enabled', q.enabled); text(w + '.question', q.question, 300);
        const opts = list(w + '.options', q.options, 2, 4); opts.forEach((o, j) => text(w + '.options[' + j + ']', o, 200));
        if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= opts.length) err(w + '.correct', 'must point to one of the options (0 to ' + (opts.length - 1) + ')');
      });
      if (!items.some(q => q && q.enabled === true)) err('practice.' + phase, 'needs at least one enabled question');
    }
    const nb = (practice.before || []).filter(q => q && q.enabled).length, na = (practice.after || []).filter(q => q && q.enabled).length;
    if (nb !== na) warn('practice', 'before (' + nb + ') and after (' + na + ') have different numbers of enabled questions, so scores are harder to compare');
    list('practice.lesson', practice.lesson, 1, 6).forEach((c, i) => { const w = 'practice.lesson[' + i + ']'; if (!isObj(c)) return err(w, 'must be an object'); text(w + '.title', c.title, 100); text(w + '.text', c.text, 300); });
    if (!isObj(practice.habit)) err('practice.habit', 'required');
    else { text('practice.habit.title', practice.habit.title, 80); text('practice.habit.intro', practice.habit.intro, 200); text('practice.habit.footer', practice.habit.footer, 200); list('practice.habit.days', practice.habit.days, 1, 14).forEach((d, i) => text('practice.habit.days[' + i + ']', d, 200)); }

    // emergency mode: every situation must lead to specific steps, "still happening" must add a step,
    // and the "sent money" plan must include the official helpline.
    const E = content.emergency;
    for (const k of ['eyebrow', 'title', 'intro', 'situationsQuestion', 'ongoingQuestion', 'showPlan', 'chooseFirst', 'planTitle', 'generalLabel', 'recoveryNote', 'save', 'saveHeader', 'nextRoute', 'nextDraft', 'checkEntry']) text('emergency.' + k, E[k], 300);
    if (!isObj(E.callNow)) err('emergency.callNow', 'required');
    else { text('emergency.callNow.label', E.callNow.label, 60); text('emergency.callNow.note', E.callNow.note, 300); if (!helplineIds.has(E.callNow.helplineId)) err('emergency.callNow.helplineId', 'unknown helpline "' + E.callNow.helplineId + '"'); }
    const fixedIds = (where, items, ids) => {
      const got = list(where, items, ids.length, ids.length).map(x => x && x.id);
      if (got.slice().sort().join() !== ids.slice().sort().join()) err(where, 'must contain exactly these ids: ' + ids.join(', '));
      if (Array.isArray(items)) items.forEach((x, i) => { if (isObj(x)) text(where + '[' + i + '].label', x.label, 120); else err(where + '[' + i + ']', 'must be an object'); });
    };
    fixedIds('emergency.situations', E.situations, EMERGENCY_SITUATIONS);
    fixedIds('emergency.ongoingOptions', E.ongoingOptions, EMERGENCY_ONGOING);
    text('emergency.channelQuestion', E.channelQuestion, 160); fixedIds('emergency.channelOptions', E.channelOptions, EMERGENCY_CHANNELS);
    text('emergency.whenQuestion', E.whenQuestion, 160); fixedIds('emergency.whenOptions', E.whenOptions, EMERGENCY_WHEN);
    // Shown above the plan when money was sent today (or the user is not sure when): why acting at once matters.
    text('emergency.recentNote', E.recentNote, 300); sourceRef('emergency.recentSourceId', E.recentSourceId);
    const actionIds = new Set(), tokens = EMERGENCY_SITUATIONS.concat(['ongoing', 'any'], EMERGENCY_CHANNEL_TOKENS), plan = [];
    list('emergency.actions', E.actions, 1, 20).forEach((a, i) => {
      const w = 'emergency.actions[' + i + ']';
      if (!isObj(a)) return err(w, 'must be an object');
      id(w + '.id', a.id, actionIds); text(w + '.text', a.text, 400);
      const when = list(w + '.when', a.when, 1, 6), unless = a.unless == null ? [] : list(w + '.unless', a.unless, 0, 3);
      when.forEach((tk, j) => { if (!tokens.includes(tk)) err(w + '.when[' + j + ']', 'must be one of ' + tokens.join(', ')); });
      unless.forEach((tk, j) => { if (!EMERGENCY_SITUATIONS.includes(tk)) err(w + '.unless[' + j + ']', 'must be one of ' + EMERGENCY_SITUATIONS.join(', ')); else if (when.includes(tk)) err(w + '.unless[' + j + ']', 'cannot both show and hide the step for "' + tk + '"'); });
      if (a.general === true) { if (a.sourceId != null) err(w, 'use either sourceId or general, not both'); }
      else if (a.general != null) err(w + '.general', 'must be true when present');
      else sourceRef(w + '.sourceId', a.sourceId);
      if (a.helplineId != null && !helplineIds.has(a.helplineId)) err(w + '.helplineId', 'unknown helpline "' + a.helplineId + '"');
      plan.push({ when, unless, helpline: a.helplineId != null && helplineIds.has(a.helplineId) });
    });
    // Check the plan for every answer combination with the app's selection rule: a step shows when one of its "when"
    // answers is chosen and none of its "unless" answers is. Single answers are reported first, each by name.
    const shows = (a, sits, ongoing) => a.when.some(t => t === 'any' || sits.includes(t) || (t === 'ongoing' && ongoing)) && !a.unless.some(t => sits.includes(t));
    const combos = [];
    for (let m = 1; m < 1 << EMERGENCY_SITUATIONS.length; m++) combos.push(EMERGENCY_SITUATIONS.filter((_, b) => m & (1 << b)));
    combos.sort((x, y) => x.length - y.length);
    const failing = test => { const bad = combos.filter(test), single = bad.filter(c => c.length === 1); return single.length ? single : bad.slice(0, 1); };
    const chosen = c => c.length === 1 ? 'situation "' + c[0] + '"' : 'the answers ' + c.join(' + ');
    for (const c of failing(sits => !plan.some(a => shows(a, sits, false) && a.when.some(t => sits.includes(t)))))
      err('emergency.actions', 'no specific step for ' + chosen(c) + ' (steps marked only "any" do not count; check the "hide" answers)');
    if (!plan.some(a => a.when.includes('ongoing'))) err('emergency.actions', 'needs a step for "still happening" (when: ongoing)');
    else for (const c of failing(sits => !plan.some(a => shows(a, sits, true) && a.when.includes('ongoing'))))
      err('emergency.actions', 'the "still happening" step is hidden for ' + chosen(c));
    for (const c of failing(sits => sits.includes('paid') && !plan.some(a => shows(a, sits, false) && a.helpline)))
      err('emergency.actions', 'the "sent money" plan must include a step with the official helpline' + (c.length > 1 ? ' (missing for ' + chosen(c) + ')' : ''));

    // Action Packet: labels and reasons for each input, the lists users tick, the complaint essentials and the reminder
    // never to include secrets (with its source). Finding private details is code, like the warning rules.
    const PK = content.packet;
    for (const k of PACKET_TEXT_KEYS) text('packet.' + k, PK[k], 300);
    // The packet must never imply that it was submitted.
    if (isObj(PK.packetHeader) && typeof PK.packetHeader.en === 'string' && !/not submitted/i.test(PK.packetHeader.en)) err('packet.packetHeader.en', 'must say the packet is "not submitted"');
    if (isObj(PK.packetHeader) && typeof PK.packetHeader.hi === 'string' && !/जमा नहीं/.test(PK.packetHeader.hi)) err('packet.packetHeader.hi', 'must say the packet is not submitted ("जमा नहीं")');
    if (!isObj(PK.fields)) err('packet.fields', 'required');
    else {
      if (Object.keys(PK.fields).sort().join() !== PACKET_FIELDS.slice().sort().join()) err('packet.fields', 'must contain exactly: ' + PACKET_FIELDS.join(', '));
      for (const [k, f] of Object.entries(PK.fields)) { const w = 'packet.fields.' + k; if (!isObj(f)) { err(w, 'must be an object'); continue; } text(w + '.label', f.label, 160); text(w + '.why', f.why, 200); }
    }
    const tickList = (where, items, max) => { const ids = new Set(); list(where, items, 1, max).forEach((x, i) => { const w = where + '[' + i + ']'; if (!isObj(x)) return err(w, 'must be an object'); id(w + '.id', x.id, ids); text(w + '.label', x.label, 160); }); };
    tickList('packet.actions', PK.actions, 10); tickList('packet.evidence', PK.evidence, 12);
    fixedIds('packet.essentials', PK.essentials, PACKET_ESSENTIALS);
    (Array.isArray(PK.essentials) ? PK.essentials : []).forEach((x, i) => { if (isObj(x) && x.sourceId != null) sourceRef('packet.essentials[' + i + '].sourceId', x.sourceId); });
    if (!isObj(PK.doNotInclude)) err('packet.doNotInclude', 'required');
    else { text('packet.doNotInclude.text', PK.doNotInclude.text, 300); sourceRef('packet.doNotInclude.sourceId', PK.doNotInclude.sourceId); }

    // Family readiness: tick-only answers, items backed by a source or marked general, and the spec's six items kept.
    const FA = content.family;
    for (const k of FAMILY_TEXT_KEYS) text('family.' + k, FA[k], 300);
    if (isObj(FA.cardWarning) && typeof FA.cardWarning.en === 'string' && !/password/i.test(FA.cardWarning.en)) err('family.cardWarning.en', 'must warn against writing passwords on the card');
    if (isObj(FA.cardWarning) && typeof FA.cardWarning.hi === 'string' && !/पासवर्ड/.test(FA.cardWarning.hi)) err('family.cardWarning.hi', 'must warn against writing passwords on the card ("पासवर्ड")');
    fixedIds('family.holdings', FA.holdings, FAMILY_HOLDINGS);
    fixedIds('family.nomineeOptions', FA.nomineeOptions, FAMILY_NOMINEE);
    const familyIds = new Set(), familyTokens = FAMILY_HOLDINGS.concat(['any']), familyCovered = new Set();
    list('family.items', FA.items, FAMILY_REQUIRED_ITEMS.length, 16).forEach((it, i) => {
      const w = 'family.items[' + i + ']';
      if (!isObj(it)) return err(w, 'must be an object');
      id(w + '.id', it.id, familyIds); text(w + '.text', it.text, 400);
      list(w + '.when', it.when, 1, 5).forEach((tk, j) => { if (!familyTokens.includes(tk)) err(w + '.when[' + j + ']', 'must be one of ' + familyTokens.join(', ')); else if (tk !== 'any') familyCovered.add(tk); });
      if (it.general === true) { if (it.sourceId != null) err(w, 'use either sourceId or general, not both'); }
      else if (it.general != null) err(w + '.general', 'must be true when present');
      else sourceRef(w + '.sourceId', it.sourceId);
    });
    for (const r of FAMILY_REQUIRED_ITEMS) if (!familyIds.has(r)) err('family.items', 'the "' + r + '" item from the product specification must stay');
    for (const hdg of FAMILY_HOLDINGS) if (!familyCovered.has(hdg)) err('family.items', 'no specific item for "' + hdg + '" (items marked only "any" do not count)');
    const nom = (Array.isArray(FA.items) ? FA.items : []).find(x => x && x.id === 'nominee');
    if (nom && Array.isArray(nom.when) && !(nom.when.includes('demat') && nom.when.includes('mf'))) err('family.items', 'the "nominee" item must apply to both demat accounts and mutual funds');

    // Persona safety plans. These are examples only: there are no free-text identity, account, holding or income fields.
    for (const k of PROFILE_TEXT_KEYS) text('profiles.texts.' + k, profiles.texts && profiles.texts[k], 400);
    const profileIds = new Set();
    const profileRows = list('profiles.profiles', profiles.profiles, PROFILE_IDS.length, PROFILE_IDS.length);
    profileRows.forEach((p, i) => {
      const w = 'profiles.profiles[' + i + ']';
      if (!isObj(p)) return err(w, 'must be an object');
      id(w + '.id', p.id, profileIds);
      text(w + '.name', p.name, 80); text(w + '.label', p.label, 120); text(w + '.situation', p.situation, 500);
      text(w + '.firstAction', p.firstAction, 500); text(w + '.why', p.why, 600);
      list(w + '.watchFor', p.watchFor, 2, 5).forEach((x, j) => text(w + '.watchFor[' + j + ']', x, 240));
      list(w + '.steps', p.steps, 2, 5).forEach((s, j) => {
        const sw = w + '.steps[' + j + ']';
        if (!isObj(s)) return err(sw, 'must be an object');
        text(sw + '.text', s.text, 500); sourceRef(sw + '.sourceId', s.sourceId);
      });
      list(w + '.actions', p.actions, 1, 3).forEach((a, j) => {
        const aw = w + '.actions[' + j + ']';
        if (!isObj(a)) return err(aw, 'must be an object');
        if (!PROFILE_TARGETS.includes(a.target)) err(aw + '.target', 'must be one of ' + PROFILE_TARGETS.join(', '));
        text(aw + '.label', a.label, 100);
      });
    });
    const missingProfiles = PROFILE_IDS.filter(x => !profileIds.has(x)), extraProfiles = [...profileIds].filter(x => !PROFILE_IDS.includes(x));
    if (missingProfiles.length || extraProfiles.length) err('profiles.profiles', 'must contain exactly these ids: ' + PROFILE_IDS.join(', '));

    // translations
    if (!isObj(translations.texts)) err('translations.texts', 'must be an object');
    else {
      for (const k of REQUIRED_TEXT_KEYS) if (!translations.texts[k]) err('translations.texts', 'missing required text "' + k + '"');
      for (const [k, v] of Object.entries(translations.texts)) {
        if (!/^[a-z][A-Za-z0-9]*(?:\.[a-z][A-Za-z0-9]*)+$/.test(k)) err('translations.texts.' + k, 'key must look like section.name');
        if (!REQUIRED_TEXT_KEYS.includes(k)) warn('translations.texts.' + k, 'not used by the app');
        text('translations.texts.' + k, v, 300);
      }
    }

    // Characters of content. The soft budget was 120,000 until Release 3.4 added the source-backed grievance routes (P1) in
    // two languages; the whole app is then about 165 KB with gzip (2 October 2026), so the warning now starts at 140,000.
    const size = canonical(content).length;
    if (size > 300000) err('content', 'larger than 300 KB; keep the offline app small');
    else if (size > 140000) warn('content', 'larger than 140 KB of text; the app is meant for low-bandwidth use');
    return { errors, warnings };
  }

  // Node only: read prototype/content/<section>.json files.
  function loadDir(dir) {
    const fs = require('fs'), path = require('path');
    const content = {}, errors = [];
    for (const s of SECTIONS) {
      const file = path.join(dir, s + '.json');
      try { content[s] = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { errors.push(s + ': cannot read ' + file + ' (' + e.message + ')'); }
    }
    return { content, errors };
  }

  const api = { SECTIONS, SUPPORTED_SCHEMA_VERSIONS, SECTION_SCHEMA_VERSIONS, ROUTE_KINDS, ROUTE_TEXT_KEYS, OFFICIAL_DOMAINS, HELPLINE_NUMBERS, REQUIRED_TEXT_KEYS, EMERGENCY_SITUATIONS, EMERGENCY_ONGOING, EMERGENCY_CHANNELS, EMERGENCY_WHEN, EMERGENCY_CHANNEL_TOKENS, CHECK_CHANNELS, CHECK_ADVICE, PACKET_FIELDS, PACKET_ESSENTIALS, PACKET_TEXT_KEYS, FAMILY_HOLDINGS, FAMILY_NOMINEE, FAMILY_REQUIRED_ITEMS, FAMILY_TEXT_KEYS, PROFILE_IDS, PROFILE_TARGETS, PROFILE_TEXT_KEYS, canonical, validateContent, loadDir };
  root.NiveshakContentSchema = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
