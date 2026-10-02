# Niveshak Saathi

**A Hindi-first, English-supported investor-safety and grievance companion for first-time investors in India.**

Niveshak Saathi helps people pause before paying, recognise scam patterns, act after financial fraud, find the right grievance route, prepare a private complaint packet, and organise family investments. It is designed for Tier-2 and Tier-3 users, works as one offline HTML file, and keeps analysis on the user's device.

## Live demo

**[Open Niveshak Saathi](https://niveshak-saathi-safety.himanshirathore25102.chatgpt.site)**

The public link serves the verified **Release 3.3** build until the Site is redeployed with **Release 3.4**, which is verified in this repository. The deployment record is in [`docs/Delivery-Status.md`](docs/Delivery-Status.md).

## Try the newest prototype (Release 3.4)

Open [`prototype/dist/index.html`](prototype/dist/index.html) in a modern browser. It starts in Hindi and supports English. No installation, account, server, API key or network connection is required for the core tools. A portable copy is in [`release/Niveshak-Saathi.zip`](release/Niveshak-Saathi.zip).

## Built for three real situations

- **Praveen, 22:** a Tier-3 graduate or gig worker drawn to Telegram F&O tips and borrowed-capital pressure.
- **Kavita, 39:** a Tier-2 homemaker who needs simple Hindi help against Ponzi, fake IPO and payment scams.
- **Babulal, 63:** a pensioner who needs ordered steps for dormant folios, nominees, RTA/DP processes and possible IEPF claims.

Each fixed persona opens an owner-editable safety plan. The app asks for no name, account, holdings or income, and stores no profile.

## Main capabilities

- **Message-risk checks:** explainable checks using multilingual rules, fitted logistic weights and safety floors. Checker 3.3 also catches electricity or SIM disconnection threats, task scams and loan-app shaming, and no longer flags genuine bank FD offers or awareness messages.
- **Five reliability states:** strong warning agreement, multiple signals, one signal, outside coverage and insufficient evidence. "No known signs" is shown in a neutral style, never as safe.
- **Long messages:** long forwards (up to 30,000 characters) are checked in parts.
- **Typed questions:** if someone types a question instead of pasting a message, the app asks for the real message.
- **Help with payments and complaints:**
  - STOP/VERIFY checks before payment;
  - urgent bank and 1930 steps, including for money that was taken rather than sent;
  - official complaint routes, with one-line hints on each button;
  - a privacy-safe Action Packet.
- **New in Release 3.4, every step sourced to an official page:**
  - the RBI Ombudsman after a bank refuses;
  - police or the State Economic Offences Wing, plus RBI Sachet, for chit, deposit and Ponzi schemes;
  - RBI UDGAM, SEBI MITRA and IRDAI Bima Bharosa for unclaimed money;
  - IEPF-5 claim steps;
  - frozen accounts after a cyber complaint;
  - loan-app harassment;
  - unexplained monthly debits;
  - SEBI's F&O loss study;
  - rights cards from the SEBI Investor Charter, the RBI Charter of Customer Rights and IRDAI's policyholder rules.
- **Everyday use:** family readiness, fictional safety practice, read-aloud, large text, phone layouts, a working phone Back button and offline use.
- **Owner Studio:** a local editor for bilingual reviewed content and persona plans, with validation before rebuilding.

## Scale and trust

The public app is static and cacheable, and analysis happens on the device. The verified Release 3.4 build is 561,637 bytes raw and 164,699 bytes with gzip. Home shows its version and a "Check for a newer version" link that opens only when tapped.

Serving 16 crore investors is an architecture target, not a completed load test. The required CDN tests, native-language review, security review, pilots and rollout gates are in [`docs/SCALE-AND-RELIABILITY.md`](docs/SCALE-AND-RELIABILITY.md).

The product gives no stock tips, predictions, broker promotions, ads or upsells. It does not read accounts, SMS or OTPs, and has no analytics, cloud inference or persistent profile. The app itself stores nothing and never sends what you type; the public link's host (Cloudflare) sets its own short-lived security cookie and bot-check script, which the app neither sets nor reads. The page declares a Content-Security-Policy and sends no referrer to the official sites it links to. **"No known signs" is insufficient evidence, never proof that an offer is safe.**

## Evidence (Release 3.4)

- **Automated checks:** 1,297 across 22 release suites plus the developer-case regression ([`evidence/Release-3.4-Verification.json`](evidence/Release-3.4-Verification.json)).
- **Browser:** 130/130 checks in each of three runs.
- **Developer cases:** 449/449 expectations.
- **100-user real-world test:** realistic users written blind by separate agents, plus 15 stress inputs.
  - Result: 92 users fully right, 8 partly right, 0 wrong (Release 3.2: 83, 9 and 8).
  - Between runs of the same build, up to 3 users move to "partly right" when a result takes just over 1.5 seconds; none is ever wrong.
  - See [`docs/REAL-WORLD-USER-TEST.md`](docs/REAL-WORLD-USER-TEST.md). The test kit is in [`evaluation/real-world-test/`](evaluation/real-world-test/), so anyone can run it again.
- **Complaint routes:** on 40 complaint stories written blind, the app names the main authority in 39/40 and every expected authority in 34/40 (Release 3.3: 35 and 25). These stories guided the changes, so this is a regression test.
- **Fresh sealed set for Release 3.4** (blind-v8: 200 messages written blind; scored once):
  - the shipped checker (3.3) warned on 67.5% [56.6–76.8] of fraud messages;
  - it warned on 13.3% [7.8–21.9] of ordinary messages, and on none of the 40 everyday ones;
  - a candidate checker built to cut false alarms showed no significant difference (63.8% and 11.1%), so it was not shipped;
  - see [`evidence/Blind-Evaluation-v8.json`](evidence/Blind-Evaluation-v8.json).
- **Earlier sealed sets:**
  - blind-v6 (checker 3.3): 87.1% of fraud or suspicious messages warned and 24% of ordinary messages warned ([`evidence/Blind-Evaluation-v6.json`](evidence/Blind-Evaluation-v6.json));
  - model 3.2: 72.4% and 8.6%.

These are engineering results on synthetic data, not proof of nationwide capacity, real-world accuracy or prevented loss. See [`docs/Validation-v3.md`](docs/Validation-v3.md) and [`evidence/`](evidence/).

## Repository map

| Path | Purpose |
|---|---|
| [`prototype/`](prototype/) | Source, editable content, Owner Studio and self-contained build |
| [`docs/Submission-v3.md`](docs/Submission-v3.md) | Product, judging evidence, technology and pitch |
| [`docs/Validation-v3.md`](docs/Validation-v3.md) | Verification and limitations |
| [`docs/REAL-WORLD-USER-TEST.md`](docs/REAL-WORLD-USER-TEST.md) | 100-user test, what it found and the Release 3.3 fixes |
| [`docs/SCALE-AND-RELIABILITY.md`](docs/SCALE-AND-RELIABILITY.md) | National-scale and AI/ML reliability plan |
| [`evidence/`](evidence/) | Machine-readable verification records |
| [`evaluation/`](evaluation/) | Sealed message sets with their scorer, and the 100-user real-world test kit |
| [`release/`](release/) | Portable release archive |

Use fictional information in demonstrations. Do not call a helpline or submit a complaint merely to test the prototype.
