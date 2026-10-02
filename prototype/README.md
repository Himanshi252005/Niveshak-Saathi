# Niveshak Saathi

**[Open the public live demo](https://niveshak-saathi-safety.himanshirathore25102.chatgpt.site)**, or open `dist/index.html` in a modern browser. No installation or build is required.

## What it does

Hindi-first, with English. It opens on a **Home** page that asks one question, "What do you need help with?", with six large choices in everyday words. A sidebar menu groups the seven tools under three plain headings: check before you act, if something went wrong, and learn and protect. On phones the menu opens from a labelled **Menu** button, and "Get urgent help" stays in the top bar on every page. The seven tools are:
1. **Check a message:** a model v3 risk verdict with reasons, return maths, link checks and "Warn my family".
2. **Before you pay:** STOP or VERIFY, with SEBI's "@valid" UPI rule, SEBI Check, IPO-by-ASBA and RBI Sachet.
3. **Get urgent help:** your own words fill in the answers.
4. **Find help:** official routes with time limits.
5. **Prepare a complaint:** a private Action Packet with a privacy gate.
6. **Family readiness.**
7. **Practise safety:** before and after scores.

Other features:
- simple line icons, no emoji, and the less-used tools (stop audio, offline copy, pilot session, clear session) under **More tools**;
- "Share this app", which sends the link or the offline file;
- a facilitator **Pilot session** that exports anonymous results in the `Pilot-Results.csv` columns;
- read-aloud with installed voices, with help to install a Hindi voice;
- large text, keyboard navigation and an offline HTML download;
- a source and privacy register with review dates and the named reviewer.

## Build and files

Run `node build.cjs` to validate the content and rebuild the self-contained `dist/index.html`, `release-manifest.json` and the local `owner-studio.html`. No dependencies are required.

| File or folder | Role |
|---|---|
| `base.html` | The original page |
| `engine.js` | The current explainable message-check model |
| `assist.js` | Understanding own words, "Before you pay" and return maths |
| `upgrade.js`, `upgrade.css` | The interface |
| `content/*.json` | Owner-editable, validated content |
| `content-schema.js` | The content validator |
| `studio/` | The local Owner Studio (see `OWNER-GUIDE.md`) |

Keep the same Site identity in `.openai/hosting.json`.

## Evidence

- `evaluation-cases.json` holds developer-written regression cases (435/435 pass). They were used in development, so they are not an accuracy benchmark.
- The independent results are in `../evidence/Blind-Evaluation.json`, from three sealed blind sets written by separate agents. On the third set, never used in development, the current model warned on 72% of fraud or suspicious messages and on 9% of ordinary ones (7% at High). The original model warned on 35% and 24%.
- The full evidence is in `../docs/Validation-v3.md`.

## Privacy and limits

No message upload, analytics, account connection, persistent storage or cloud inference is used. The checker is a limited on-device model, not a fraud-verification service: "No known signs" never means safe. External official links need internet. There is no background caching or automatic content update.

Use fictional examples in demonstrations. Do not submit a test complaint to an authority.
