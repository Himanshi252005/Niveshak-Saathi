# Niveshak Saathi: for judges (10 minutes)

**What it is.** A free app for first-time investors, in Hindi first with English one tap away. It helps them stop before paying a scammer, act in the first hours after fraud, know their rights, complain in the right place and keep a private list of the family's investments. No ads, no tips, nothing saved.

**Open it**
- **Live link:** **[Open Niveshak Saathi](https://himanshi252005.github.io/Niveshak-Saathi/)**: the verified **Release 3.5** build. For offline use, download [`prototype/dist/index.html`](prototype/dist/index.html) and open it in Chrome or Edge.
- **English:** the app opens in Hindi; use the language menu at the top right.
- **Demo video:** [watch the demo](https://himanshi252005.github.io/Niveshak-Saathi/demo/) (4 min 37 s; English and Hindi captions; recorded from the Release 3.5 file that the live link serves, with fictional data)

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
| Grievance Assistant | Get help now (stop contact if it is still happening, then the bank and 1930); Where to complain (10 routes, official time limits where they apply); private complaint packet |
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
- **Checker 3.5 on the fresh sealed set blind-v9** (200 messages written and sealed by a separate AI agent before checker 3.5 was frozen; scored once after the freeze): fraud warned 87.5% [78.5–93.1] (checker 3.3 on the same messages: 82.5%); fraud rated High 78.8% [68.6–86.3] (3.3: 67.5%); subtle fraud warned 18 of 25 (3.3: 15); ordinary messages warned 12.2% [7–20.6] (3.3: 11.1%). Targets: fraud warned ≥85% and subtle fraud ≥70% met; ordinary messages ≤8% missed.
- The rule written before scoring also required no more ordinary messages warned than checker 3.3. Checker 3.5 warned one more (11 of 90 against 10, the extra one at Caution; 9 at High for both). The owner shipped it because fraud at High improved significantly (paired test, p = 0.0117) ([record](evidence/Blind-Evaluation-v9.json)).
- History, Release 3.4 (which kept checker 3.3) on blind-v8: fraud or suspicious warned 60.9% [51.6–69.5] (fraud alone 67.5% [56.6–76.8]); ordinary 13.3% [7.8–21.9]; subtle fraud 5 of 25. It missed all three targets (fraud ≥85%, ordinary ≤8%, subtle fraud ≥70% warned).
- 100 AI-written personas: 92 fully right, 8 partly right, 0 wrong (14/14 checks). A regression test, not accuracy.
- 1,705 automated checks (23 release suites plus developer cases).

**Known limits.** Hindi and English only (other languages: official helplines). Some scams are still missed (on blind-v9, 10 of 80 frauds got no warning), and 12.2% of ordinary messages got one. No pilot, partner or native Hindi review yet. Sources not yet confirmed by the named reviewer show "review pending". The live link (GitHub Pages) sets no cookies ([Privacy](PRIVACY.md)).

**How this was built.** The team built Niveshak Saathi with AI coding assistants, which helped write the code, tests, synthetic test messages and documents. Every change to advice was checked against an official page during development, and each step in the app shows its source; 29 sources still await the named reviewer and show "review pending". All accuracy numbers come from synthetic test sets, not from real users.
