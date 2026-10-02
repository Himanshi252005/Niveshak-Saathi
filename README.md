# Niveshak Saathi

**A Hindi-first, English-supported investor-safety and grievance companion for first-time investors in India.**

Niveshak Saathi helps people pause before paying, recognise scam patterns, act after financial fraud, find the right grievance route, prepare a private complaint packet, and organise family investments. It is designed for Tier-2 and Tier-3 users, works as one offline HTML file, and keeps analysis on the user's device.

## Live demo

**[Open Niveshak Saathi](https://niveshak-saathi-safety.himanshirathore25102.chatgpt.site)**

The public link still shows the earlier Release 3.2 build. This repository contains the newer verified **Release 3.3**. See [`docs/Delivery-Status.md`](docs/Delivery-Status.md).

## Try the newest prototype

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
  - official complaint routes;
  - a privacy-safe Action Packet.
- **Everyday use:** family readiness, fictional safety practice, read-aloud, large text, phone layouts, a working phone Back button and offline use.
- **Owner Studio:** a local editor for bilingual reviewed content and persona plans, with validation before rebuilding.

## Scale and trust

The public app is static and cacheable, and analysis happens on the device. The verified build is 509,588 bytes raw and 151,758 bytes with gzip.

Serving 16 crore investors is an architecture target, not a completed load test. The required CDN tests, native-language review, security review, pilots and rollout gates are in [`docs/SCALE-AND-RELIABILITY.md`](docs/SCALE-AND-RELIABILITY.md).

The product gives no stock tips, predictions, broker promotions, ads or upsells. It does not read accounts, SMS or OTPs, and has no analytics, cookies, cloud inference or persistent profile. **"No known signs" is insufficient evidence, never proof that an offer is safe.**

## Evidence

- 1,229 automated checks across 20 release suites plus the developer-case regression;
- 130/130 browser checks in each of three runs;
- 449/449 developer regression expectations;
- **100-user real-world test:** realistic users written blind by separate agents, plus 15 stress inputs. 92 users fully right, 8 partly right, 0 wrong (Release 3.2: 83, 9 and 8). See [`docs/REAL-WORLD-USER-TEST.md`](docs/REAL-WORLD-USER-TEST.md);
- final untouched sealed synthetic set (model 3.2): 72.4% of fraud or suspicious messages warned and 8.6% of ordinary messages warned.

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
| [`release/`](release/) | Portable release archive |

Use fictional information in demonstrations. Do not call a helpline or submit a complaint merely to test the prototype.
