# Niveshak Saathi (निवेशक साथी)

**A free, Hindi-first investor-safety and grievance companion for first-time investors in India. English is one tap away.**

Niveshak Saathi helps people stop before paying a scammer, act in the first hours after fraud, know their rights, complain in the right place, and keep a private list of the family's investments and nominees. It is built for Tier-2 and Tier-3 users, runs as one HTML file on the phone, works offline once saved, and saves nothing.

> **Disclaimer.** An independent, educational public-good project. Not affiliated with SEBI, RBI, IRDAI, the IEPF Authority, NPCI, PFRDA or any government body. No investment advice, stock tips or broker promotion. "No known signs" never means that an offer is safe.

## For judges (10 minutes)

| | |
|---|---|
| **Start here** | [`JUDGES.md`](JUDGES.md): one page with the S.01–S.06 map, Track B fit, evidence and limits |
| **Live link** | **[Open Niveshak Saathi](https://himanshi252005.github.io/Niveshak-Saathi/)**: the verified **Release 3.5** build, in any phone or computer browser. No installation, account or server. To keep it offline, use "Save offline copy" in the app or download [`prototype/dist/index.html`](prototype/dist/index.html) ("Download raw file") |
| **Switch to English** | The app opens in Hindi. Use the language menu at the top right and choose "English" |
| **Demo video (S.05)** | **[Watch the demo](https://himanshi252005.github.io/Niveshak-Saathi/demo/)** (4:52; English and Hindi captions; recorded from this build with fictional data) |

| Required item | Where to find it |
|---|---|
| S.01 Product | The app file above; [Submission, S.01](docs/Submission-v3.md#s01-product) |
| S.02 Problem definition | [Submission, S.02](docs/Submission-v3.md#s02-problem-definition) |
| S.03 Solution | [Submission, S.03](docs/Submission-v3.md#s03-solution) |
| S.04 Technology | [Submission, S.04](docs/Submission-v3.md#s04-technology); [Validation](docs/Validation-v3.md); [Scale and reliability](docs/SCALE-AND-RELIABILITY.md) |
| S.05 Demonstration | [Demo video](https://himanshi252005.github.io/Niveshak-Saathi/demo/); [timeline](docs/Submission-v3.md#s05-demonstration) |
| S.06 Impact | [Submission, S.06](docs/Submission-v3.md#s06-impact) |

**Version legend.** Release 3.5 is the newest build; it is on the live link (GitHub Pages) and in this repository. Release 3.4 was verified on 2 October 2026 but never deployed; its results are kept as history. The "checker" is the message checker inside the app: Release 3.4 kept checker 3.3; Release 3.5 ships checker 3.5, which adds Hindi and Hinglish patterns for the three personas' scams. The "-v3" in some document names is the documentation series, not the release.

## Built for three people

| Person (from the brief) | Their risk | What they do in the app |
|---|---|---|
| **Praveen, 22**, Tier-3 graduate or gig worker | Telegram F&O tips; trading on borrowed money | Checks a tip message (High risk, with SEBI's F&O loss study); Before you pay says STOP |
| **Kavita, 39**, Tier-2 homemaker, not fluent in English | Ponzi and fake-IPO offers; intimidated by broking apps | Checks a Hindi message; Before you pay explains ASBA and "@valid" UPI IDs; warns her family |
| **Babulal, 63**, retired, with old or dormant folios | Unaware of the nominee process; cannot navigate IEPF or SCORES | Follows the IEPF-5 and SCORES guides; lists the family's holdings and nominees in the Family asset map |

Each person has a fixed safety plan on Home, under "Plans for people like you". The app asks for no name, account number, holdings or income, and stores no profile.

## What it does

**Check before you act**
- **Check a message.** Paste a message and get High risk, Caution or No known signs, with reasons in plain Hindi or English and an official source for each. It works out promised returns in plain numbers, flags suspicious links and payment IDs, and says how sure it is. Long forwards (up to 30,000 characters) are checked in parts. "Warn my family" prepares a WhatsApp-ready warning without the scam's link.
- **Before you pay.** Three quick questions (what for, who asked, where to pay), with an optional UPI ID and promised return, give STOP or VERIFY and the official way to check: SEBI's "@valid" UPI IDs, SEBI Check, IPO applications only through ASBA, and RBI Sachet for deposit schemes. Paying a UPI ID or a person's account adds I4C's Suspect Search, with I4C's own warning that "not found" proves nothing. A STOP answer offers a 30-second pause.

**If something went wrong**
- **Get help now.** Type or dictate what happened in your own words; an on-device keyword-based parser fills in the answers for you to check. The plan starts with stopping contact if it is still happening, then the bank and 1930; if a trading login or OTP was shared, it adds asking the broker to freeze online access to the trading account (SEBI's rule since 1 July 2024). Recovery is never promised.
- **Where to complain.** Ten routes, with official time limits where they apply, for example the RBI Ombudsman's 30-day wait and 90-day window, or SCORES within one year. A bank, insurance or pension complaint is never sent to SEBI, and "Not sure" never guesses. Routes link to the matching step-by-step guide, and the SCORES routes say what SCORES will not take (for example an unregistered tip group) and where to go instead.
- **Prepare a complaint.** A private packet that will not save while an OTP, PIN, password, CVV or card number is in it (Hindi digits included). It says plainly that it has not been submitted.

**Know your rights (new in Release 3.5)**
- **Rights and help** (Home, under "More help": "अपने अधिकार जानें / Know your rights"; menu: "अधिकार और मदद / Rights and help"):
  - free official helplines that speak regional languages: SEBI 1800-266-7575 or 1800-22-7575 (seven languages), RBI Contact Centre 14448 (English, Hindi and ten regional languages; it explains how to complain but cannot take complaints), IRDAI 155255 or 1800 425 4732, the IEPF helpdesk 14453 and cybercrime 1930;
  - five step-by-step guides, every step sourced to an official page: SEBI SCORES, an IEPF-5 claim (with a tick-only list of the papers needed), the RBI Ombudsman, insurance complaints (insurer, IRDAI, Ombudsman) and adding a nominee;
  - eight rights cards, from the SEBI Investor Charter, RBI's Charter of Customer Rights, IRDAI's free-look and two-week grievance rules and others, grouped by institution, each with "Where to complain about this".

**Learn and protect**
- **Family safety**, with the new **Family asset map** (Track B "Nominee & Family Wealth Tracker"). One row per investment: type, institution name, nominee status, where the papers are, and who in the family knows. The institution name is the only typed field, and it refuses numbers, e-mail addresses and PAN. Download or print the list, and reopen the downloaded list later on the phone; the app itself saves nothing. Shares or mutual funds without a nominee link to the nominee guide. The tick-only family checklist and printable family card remain.
- **My safety plan** for Praveen, Kavita and Babulal, and **Practise** with made-up messages, before-and-after scores and a habit card.
- **Design:** a calm black-and-white design: warm paper background, ink text, hairline cards and pill buttons, and black-and-white line drawings that draw themselves in (still for people who ask for less motion) on Home, beside each page heading and above each answer.
- **Everyday use:** a short menu (six pages, the rest under "More pages"); a Paste button, a tip to speak the message with the phone keyboard's microphone instead of typing, and one to copy the words of a message that arrived as a picture; read-aloud with the phone's own voice, large text, phone layouts, a working phone Back button, "Save offline copy" and "Share this app".
- **Owner Studio:** a local editor, never part of the public app, where the content owner edits and validates all bilingual content, sources, guides and plans before a rebuild.

## Track B fit

| Direction | Feature |
|---|---|
| Grievance Assistant | Get help now, Where to complain, the private complaint packet |
| Nominee & Family Wealth Tracker | Family asset map, nominee guide, family checklist and card |
| Rights & Process Navigator | Rights and help: helplines, five guides, eight rights cards |

## Privacy and trust

- The app itself saves nothing: no cookies, browser storage or accounts. It runs no analytics or cloud AI and never sends what you type. Its only network request is a fresh copy of its own page when you tap "Save offline copy" or "Share this app".
- The live link is served by GitHub Pages, which sets no cookies (checked on 2 October 2026); like any web host, it may keep standard access logs. A second copy on the earlier host (it serves the first Release 3.5 build, with checker 3.3) sets three cookies of its own and adds a bot-check script. The app neither sets nor reads cookies, and the saved offline copy has none. See [`PRIVACY.md`](PRIVACY.md).
- Every step shows its official source and review date, or is labelled a general safety step. Sources checked against the official page but not yet confirmed by the named content reviewer, Himanshi Rathore, show "review pending".
- No stock tips, predictions, broker promotion, ads, referrals or upsells. The page sends no referrer to the official sites it links to.

## Evidence

All accuracy figures come from synthetic messages and AI-written personas, not from real users. No pilot has been run yet.

**Release 3.5** ([release record](evidence/Release-3.5-Verification.json))
- 1,715 automated checks: 23 release suites plus 796/796 developer-case expectations.
- **Fresh sealed set blind-v9** (200 messages written and sealed by a separate AI agent before checker 3.5 was frozen; scored once after the freeze): fraud warned 87.5% [78.5–93.1] (checker 3.3 on the same messages: 82.5%); fraud rated High 78.8% [68.6–86.3] (3.3: 67.5%); subtle fraud warned 18 of 25 (3.3: 15); ordinary messages warned 12.2% [7–20.6] (3.3: 11.1%). Two of the three targets were met (fraud warned ≥85%, subtle fraud ≥70%); ordinary messages ≤8% was missed.
- The rule written before scoring also required no more ordinary messages warned than checker 3.3. Checker 3.5 warned one more (11 of 90 against 10, the extra one at Caution; 9 at High for both). The owner shipped it because fraud at High improved significantly (paired test, p = 0.0117) ([record](evidence/Blind-Evaluation-v9.json)).
- 100-persona simulated test (AI-written personas; no real users): 91 fully right, 9 partly right, 0 wrong (14/14 checks).
- Size: 806,663 bytes, 233,477 bytes with gzip; Home usable in 7.3 s on an emulated slow connection (about 400 kbps with a 4x slower CPU, gzip as the host serves it); on DevTools "Slow 3G" with a 6x slower CPU (internal), the Hindi loading screen with the 1930 button shows in 2.7 s and Home is usable in about 8 s.

**Release 3.4 (history; verified 2 October 2026, never deployed)**
- **Sealed set blind-v8** (200 messages written by a separate AI agent, scored once), with the shipped checker 3.3:
  - fraud or suspicious messages warned 60.9% [51.6–69.5], the same measure as the earlier sets; fraud alone 67.5% [56.6–76.8];
  - ordinary messages warned 13.3% [7.8–21.9]; none of the 40 everyday messages; subtle fraud 5 of 25.
- **Missed targets:** Release 3.4 aimed for fraud warned ≥85%, ordinary warned ≤8% and subtle fraud warned ≥70%. All three were missed. A candidate checker was no better on this set, so it was not shipped.
- **Checks:** 1,297 automated checks, made up of 22 release suites plus 449 developer-case expectations ([record](evidence/Release-3.4-Verification.json)).
- **100-persona simulated test:** 92 fully right, 8 partly right, 0 wrong.
- **Earlier sealed sets:** on blind-v6, checker 3.3 warned on 87.1% [77.3–93.1] of fraud or suspicious messages and 24.0% [14.3–37.4] of ordinary ones; on blind-v5, model 3.2 warned on 72.4% [65.7–78.2] and 8.6% [4.9–14.7].

These are engineering results, not proof of real-world accuracy, national capacity or prevented loss. Details: [`docs/Validation-v3.md`](docs/Validation-v3.md).

## How this was built

The team built Niveshak Saathi with AI coding assistants, which helped write the code, tests, synthetic test messages and documents. Every change to advice was checked against an official page during development, and each step in the app shows its source; 31 sources still await the named reviewer and show "review pending". All accuracy numbers come from synthetic test sets, not from real users.

## Repository map

| Path | Purpose |
|---|---|
| [`JUDGES.md`](JUDGES.md) | One page for judges |
| [`prototype/`](prototype/) | Source, editable content, the local Owner Studio and the self-contained app (`prototype/dist/index.html`) |
| [`docs/Submission-v3.md`](docs/Submission-v3.md) | S.01–S.06: product, problem, solution, technology, demonstration and impact |
| [`docs/Validation-v3.md`](docs/Validation-v3.md) | Checks, sealed-set results and limits |
| [`docs/SCALE-AND-RELIABILITY.md`](docs/SCALE-AND-RELIABILITY.md) | Scale design and AI/ML reliability plan |
| [`docs/REAL-WORLD-USER-TEST.md`](docs/REAL-WORLD-USER-TEST.md) | The 100-persona simulated test and the fixes it led to |
| [`docs/Operations-and-Pilot-Kit.md`](docs/Operations-and-Pilot-Kit.md) | Pilot protocol, consent script and targets |
| [`docs/MARKET-COMPARISON.md`](docs/MARKET-COMPARISON.md) | How Niveshak Saathi compares with 23 tools people use today, and what it borrows from them |
| [`docs/Delivery-Status.md`](docs/Delivery-Status.md) | Which release is where |
| [`evidence/`](evidence/) | Machine-readable verification records |
| [`evaluation/`](evaluation/) | Sealed message sets, their scorer and the 100-persona test kit |
| [`release/Niveshak-Saathi.zip`](release/Niveshak-Saathi.zip) | A downloadable snapshot of this repository (app, source, documents and evidence). To use the app, you need only `prototype/dist/index.html` |

## Licence, corrections, security and privacy

- **Code:** MIT ([`LICENSE`](LICENSE)). **Original text:** CC BY 4.0 ([`LICENSE-CONTENT.md`](LICENSE-CONTENT.md)). Official-source material belongs to the regulators and is linked, not relicensed.
- **Reuse terms and content corrections:** [`CONTRIBUTING.md`](CONTRIBUTING.md). Report a wrong step or source through GitHub Issues.
- **Security:** [`SECURITY.md`](SECURITY.md). **Privacy:** [`PRIVACY.md`](PRIVACY.md).
- **Content owner and named reviewer:** Himanshi Rathore. There is no personal e-mail contact: use GitHub Issues for corrections and a private security report for security problems.

Use fictional information in demonstrations. Do not call a helpline or submit a complaint merely to test the prototype.
