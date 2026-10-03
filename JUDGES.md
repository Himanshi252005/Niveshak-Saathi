# Niveshak Saathi: for judges (10 minutes)

**What it is.** A free app that helps first-time investors in India use their rights: complain to the right office, follow the official steps (SCORES, IEPF-5, RBI Ombudsman, insurance, nominee) without paying an agent, and keep track of the family's investments and nominees. Before they trust a message or a request to pay, it checks it; if money has already gone, it shows what to do in the first hours. Hindi first, English one tap away. No ads, no tips, no account. Nothing you type is sent, and only the family list can be kept on the phone, if you choose.

**Open it**
- **Live link:** **[Open Niveshak Saathi](https://himanshi252005.github.io/Niveshak-Saathi/)**: the verified **Release 3.5** build, with checker 3.6. For offline use, download [`prototype/dist/index.html`](prototype/dist/index.html) and open it in Chrome or Edge.
- **English:** the app opens in Hindi; use the language menu at the top right.
- **Demo video:** [watch the demo](https://himanshi252005.github.io/Niveshak-Saathi/demo/) (4 min 58 s; English and Hindi captions, no voice-over; fictional data). Recorded on 3 October 2026, before Home led with rights and before the family tracker.

| Required item | Where |
|---|---|
| S.01 Product | The app file above; [S.01](docs/Submission-v3.md#s01-product) |
| S.02 Problem definition | [S.02](docs/Submission-v3.md#s02-problem-definition) |
| S.03 Solution | [S.03](docs/Submission-v3.md#s03-solution) |
| S.04 Technology | [S.04](docs/Submission-v3.md#s04-technology); [Validation](docs/Validation-v3.md) |
| S.05 Demonstration | Video above; [script](docs/Submission-v3.md#s05-demonstration) |
| S.06 Impact | [S.06](docs/Submission-v3.md#s06-impact) |

**Track B, rights first.** Home leads with these.

| Track B direction | What the app does |
|---|---|
| Grievance Assistant | **"Want to complain?"**, the first choice on Home: ten complaint routes with official time limits, "not this door" notes, step-by-step guides and a private complaint packet. **"Already paid, or shared your OTP?"**: stop contact, then the bank and 1930 |
| Rights & Process Navigator | **"Know your rights"**, the second choice: free official helplines that speak regional languages, five step-by-step guides with every step sourced (SCORES, IEPF-5, RBI Ombudsman, insurance, nominee) and eight rights cards |
| Nominee & Family Wealth Tracker | **"Track the family's investments"**: institution names and nominee status, with a progress line (nominees added, who in the family knows). It is kept on the phone only if the user turns it on, and can be downloaded or printed |

Checking follows, under "Check before you trust anyone": **Check a message** (High risk, Caution or No known signs, with reasons and sources) and **Before you pay** (STOP or VERIFY, with the official way to check).

| Persona | Journey |
|---|---|
| Babulal, 63 | Know your rights → IEPF-5 guide with its paper list (no agent needed) → the family tracker remembers his holdings → nominee guide |
| Kavita, 39 | Hindi fake-IPO offer → High risk → Before you pay: STOP (IPOs only through ASBA) → Warn my family |
| Praveen, 22 | Telegram F&O tip → High risk and SEBI's F&O loss study → Before you pay: STOP |

**What was measured** (synthetic tests; no real users yet)
- **1,820 automated checks passed:** 25 release suites plus 842 developer cases ([release record](evidence/Release-3.5-Verification.json)).
- **A fresh sealed test, blind-v10** (200 messages written and sealed by a separate AI agent before checker 3.6 was frozen; each checker scored once): checker 3.6 warned on 83.8% [74.2–90.3] of fraud messages and rated 70% High; against checker 3.5 on the same messages it lost no fraud warning and raised one false alarm fewer (12 of 90 ordinary messages warned, against 13). The rule written before scoring held, so checker 3.6 ships. ([record](evidence/Blind-Evaluation-v10.json))
- **100 AI-written personas:** 90 fully right, 10 partly right, 0 wrong (14/14 checks). A regression test, not accuracy.
- **Every advice step** shows its official source and review date.

**Known limits, and what we do about them**
- **No real users yet.** A consented pilot is ready (24 adults, matched tasks; [kit](docs/Operations-and-Pilot-Kit.md)). No result is claimed until it runs.
- **The checker is not perfect.** On blind-v10, checker 3.6 gave no warning on 13 of 80 frauds (9 of 25 subtle ones) and warned on 12 of 90 ordinary messages; missed: fraud warned ≥85% (83.8%), subtle fraud warned ≥70% (64%) and ordinary messages warned ≤8% (13.3%). Most remaining false alarms are genuine messages that carry an OTP or a code (a parcel, a cab ride, a bank OTP in Hindi). Every warning shows its reasons, and "No known signs" never says safe. The full sealed-set history is in the [validation](docs/Validation-v3.md).
- **Hindi and English only.** Users of other languages are pointed to official helplines that speak their language.
- **Read-aloud uses the phone's own voice,** so it needs a Hindi voice on the phone. A recorder and a player for the key steps in a recorded Hindi voice are prepared; the recordings are not made yet.
- **Sources:** 31 checked during development still await the named reviewer and show "review pending".
- **An older copy** (the first Release 3.5 build) is still on the earlier host. It is not maintained, and its removal has been requested. Use the live link.

**Compared with today's tools.** [23 tools compared](docs/MARKET-COMPARISON.md): official help is split across about ten portals with their own logins and exclusions, and private checkers are mostly English-first, need an account or upload messages, and stop at advice. Niveshak Saathi is Hindi-first, needs no account, keeps everything on the phone and covers before, during and after a loss.

**How this was built.** The team built Niveshak Saathi with AI coding assistants, which helped write the code, tests, synthetic test messages and documents. Every change to advice was checked against an official page during development, and each step in the app shows its source; 31 sources still await the named reviewer and show "review pending". All accuracy numbers come from synthetic test sets, not from real users.
