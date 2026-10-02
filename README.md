# Niveshak Saathi

**A Hindi-first, English-capable investor safety and grievance prototype for first-time investors in India.**

Niveshak Saathi helps a person pause before paying, recognise common scam patterns, take the right first steps after financial fraud, find the correct grievance route, prepare a private complaint packet, and organise family investment information. It is designed for Tier-2 and Tier-3 users, works as a single offline HTML file, and does not upload the user's message.

## Live demo

**[Open Niveshak Saathi](https://niveshak-saathi-safety.himanshirathore25102.chatgpt.site)**

The demo is public and can be opened by anyone with the link. The same verified prototype also works offline. Real-user impact, native-speaker review, physical low-end phone testing, and screen-reader conformance still need to be measured.

## Try the prototype

1. Download or clone this repository.
2. Open [`prototype/dist/index.html`](prototype/dist/index.html) in a modern browser.
3. The app starts in Hindi. Use the language control for English.

No installation, account, server, API key, or network connection is required for the core tools. Official reporting links need internet access.

For a portable submission copy, download [`release/Niveshak-Saathi.zip`](release/Niveshak-Saathi.zip).

## What it includes

- **Check a message:** an explainable on-device rule model gives High risk, Caution, or No known signs, with reasons and uncertainty.
- **Before you pay:** a short STOP or VERIFY flow covering UPI IDs, IPO claims, deposit schemes, suspicious returns, and unofficial payment routes.
- **Get urgent help:** puts the bank and the 1930 cyber-fraud helpline first when money or credentials may be at risk.
- **Find help:** routes bank, broker, listed-company, insurance, pension, and unclaimed-investment problems to the appropriate official process.
- **Prepare a complaint:** creates a private Action Packet and blocks saving when it detects OTPs, PINs, passwords, CVVs, or card details.
- **Family readiness:** covers nominees, old paper shares, IEPF, official contacts, and recovery-scam warnings.
- **Practise safety:** uses fictional scenarios and before/after scores to build safer habits.
- **Owner Control Studio:** lets the owner update reviewed Hindi and English content locally and validates changes before rebuilding.

## Trust boundaries

The product gives no stock tips, buy/sell/hold signals, price predictions, broker promotions, commissions, advertising, or subscription upsells. It does not read SMS, contacts, documents, accounts, or OTPs. It has no analytics, cookies, cloud inference, or persistent user profile.

The checker is a limited warning system. **“No known signs” never means an offer is safe.** The app does not verify an entity, file a complaint, recover money, or replace an official authority or professional adviser.

## Evidence

Current prototype evidence:

- 1,175 automated checks across content rules, routes, privacy guards, owner controls, browser journeys, accessibility-related layout checks, and feature flows;
- 130 browser checks passing in each of three runs;
- 435/435 developer regression expectations passing;
- a sealed synthetic evaluation of 320 messages where the current model warned on 72.4% of fraud or suspicious messages and 8.6% of ordinary messages; 7% of ordinary messages received the High verdict.

These are engineering results on synthetic data, not proof of real-world fraud accuracy or prevented loss. See [`docs/Validation-v3.md`](docs/Validation-v3.md) and the machine-readable files in [`evidence/`](evidence/).

## Repository map

| Path | Purpose |
|---|---|
| [`prototype/`](prototype/) | App source, editable content, local Owner Studio, build script, and self-contained browser build |
| [`docs/Submission-v3.md`](docs/Submission-v3.md) | Problem, solution, judging-criteria evidence, technical design, and three-minute pitch |
| [`docs/Validation-v3.md`](docs/Validation-v3.md) | Verification results and stated limits |
| [`docs/Operations-and-Pilot-Kit.md`](docs/Operations-and-Pilot-Kit.md) | Consented pilot protocol and operating guidance |
| [`docs/REAL-WORLD-ROADMAP.md`](docs/REAL-WORLD-ROADMAP.md) | Practical path from prototype to public-good deployment |
| [`evidence/`](evidence/) | Current release, browser, blind-evaluation, and rule-regression records |
| [`evaluation/`](evaluation/) | Held-out synthetic corpus and a scorer for reproducible aggregate results |
| [`release/`](release/) | Portable release archive |

## Build and verify

Node.js is required only for rebuilding and evaluation. The app itself runs directly in a browser.

```text
node prototype/build.cjs
node Evaluate-Rules.cjs
node evaluation/score-blind.cjs prototype/engine.js evaluation/blind-v5.json
```

`prototype/build.cjs` validates owner-editable content before generating the public app and release manifest. Read [`prototype/OWNER-GUIDE.md`](prototype/OWNER-GUIDE.md) before changing reviewed content.

## Public-good use

Use fictional information in demonstrations. Do not call a helpline or submit a complaint merely to test the prototype. Any real deployment should add native-language review, consented user testing, accessibility testing on physical devices, routine official-source review, and a clearly named accountable content owner.

