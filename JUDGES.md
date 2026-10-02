# Niveshak Saathi: for judges (10 minutes)

**What it is.** A free app for first-time investors, in Hindi first with English one tap away. It helps them stop before paying a scammer, act in the first hours after fraud, know their rights, complain in the right place and keep a private list of the family's investments. No ads, no tips, nothing saved.

**Open it**
- **Live link:** **[Open Niveshak Saathi](https://himanshi252005.github.io/Niveshak-Saathi/)**: the verified **Release 3.5** build. For offline use, download [`prototype/dist/index.html`](prototype/dist/index.html) and open it in Chrome or Edge.
- **English:** the app opens in Hindi; use the language menu at the top right.
- **Demo video:** being recorded; the link will be added here when it is published

| Required item | Where |
|---|---|
| S.01 Product | The app file above; [S.01](docs/Submission-v3.md#s01-product) |
| S.02 Problem definition | [S.02](docs/Submission-v3.md#s02-problem-definition) |
| S.03 Solution | [S.03](docs/Submission-v3.md#s03-solution) |
| S.04 Technology | [S.04](docs/Submission-v3.md#s04-technology); [Validation](docs/Validation-v3.md) |
| S.05 Demonstration | Video above; [script](docs/Submission-v3.md#s05-demonstration) |
| S.06 Impact | [S.06](docs/Submission-v3.md#s06-impact) |

| Track B direction | Feature |
|---|---|
| Grievance Assistant | Get help now (bank and 1930 first); Where to complain (10 routes, official time limits where they apply); private complaint packet |
| Nominee & Family Wealth Tracker | **Family asset map (new):** type, institution name, nominee, papers, who knows; download, print, reopen; nothing saved |
| Rights & Process Navigator | **Rights and help (new):** free official helplines, five sourced step-by-step guides, eight rights cards |

| Persona | Journey |
|---|---|
| Praveen, 22 | Telegram F&O tip → High risk and SEBI's F&O loss study → Before you pay: STOP |
| Kavita, 39 | Hindi fake-IPO offer → High risk → STOP before paying (IPOs only through ASBA) → Warn my family |
| Babulal, 63 | Rights and help → IEPF-5 guide with paper checklist → Family asset map → nominee guide |

| Pillar | Feature |
|---|---|
| Detect Fraud | Check a message; Before you pay |
| Educate Simply | Plain-Hindi reasons; safety plans; practice |
| Build Habits | Warn my family; habit card; Family asset map |
| Know Rights | Rights and help; rights cards; guides |

**Evidence (synthetic tests; no real users yet)**
- Release 3.5 ships checker 3.3, the same checker as Release 3.4, so the blind-v8 results below still describe it. An upgraded checker for Hindi and Hinglish scams is not yet scored: the fresh sealed set blind-v9 (200 messages, sealed on 2 October 2026) will be scored once, when the upgraded checker is frozen.
- History, Release 3.4 on blind-v8: fraud or suspicious warned 60.9% [51.6–69.5] (fraud alone 67.5% [56.6–76.8]); ordinary 13.3% [7.8–21.9]; subtle fraud 5 of 25. It missed all three targets (fraud ≥85%, ordinary ≤8%, subtle fraud ≥70% warned).
- 100 AI-written personas: 92 fully right, 8 partly right, 0 wrong (14/14 checks). A regression test, not accuracy.
- 1,347 automated checks (23 release suites plus developer cases).

**Known limits.** Hindi and English only (other languages: official helplines). Many subtle scams are still missed. No pilot, partner or native Hindi review yet. Sources not yet confirmed by the named reviewer show "review pending". The live link (GitHub Pages) sets no cookies ([Privacy](PRIVACY.md)).

**How this was built.** The team built Niveshak Saathi with AI coding assistants, which helped write the code, tests, synthetic test messages and documents. Every change to advice was checked against an official page, and each step in the app shows its source. All accuracy numbers come from synthetic test sets, not from real users.
