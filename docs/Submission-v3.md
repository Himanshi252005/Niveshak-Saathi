# Niveshak Saathi: Release 3.3
## A Hindi-first investor-safety companion that works on the phone, offline and in private

**Promise:** help an Indian investor stop a fraud before money leaves, and act correctly in the first hours if it already has. Everything is in Hindi or English.

> check the message → check before paying → stop immediate harm → find the right authority → prepare the complaint → protect the family → build the habit

**Status:**
- Tested browser prototype and downloadable offline HTML.
- Release 3.3 has been prepared and verified locally. The public link still serves the earlier Release 3.2 build until it is redeployed (see `Delivery-Status.md`).
- No real-user impact study has been conducted.
- This is an independent educational product, not affiliated with SEBI, RBI, IRDAI, PFRDA, NPCI or any institution.

**Why it matters:**
- **Scale:** the Ministry of Home Affairs reports more than 65.89 lakh financial-fraud complaints on the National Cyber Crime Reporting Portal for 2021–2025, with more than ₹55,050 crore reported (PIB, 21 July 2026, PRID 2287039).
- **Approach:** Niveshak Saathi works at the two moments that decide the loss: just before paying, and the first hours after.

## How the verified prototype meets the judging criteria

| Criterion (weight) | What the product does | Evidence | What is not yet proven |
|---|---|---|---|
| **Resilience and safety impact (30%)** | **Before you pay:** a STOP or VERIFY answer, with SEBI's "@valid" UPI rule, SEBI Check, IPO-by-ASBA and RBI Sachet.<br>**Message check:** a High / Caution / No-known-signs verdict with reasons.<br>**Emergency mode:** fills in from your own words; bank and 1930 first.<br>**Complaint routes:** with official time limits.<br>**Private Action Packet** and **family readiness**.<br>**Practice:** before and after scores.<br>**"Warn my family"** | **Independent blind test:** warned on 72.4% [65.7–78.2] of fraud or suspicious messages; v2 managed 35.4% on the same set.<br>**Coverage checks:** all 60 Emergency answer combinations, 272 navigator states and 60 family combinations | No real-user outcome study yet; money saved is not measured |
| **Tier-2/3 usability (25%)** | Hindi-first everywhere, with English and Roman-Hindi understanding.<br>The Home page offers six large task choices plus fixed, privacy-safe plans for Praveen, Kavita and Babulal.<br>A labelled phone menu, urgent-help button, simple line icons, read-aloud, large text and an offline copy reduce cognitive and connectivity burden.<br>No identity, account, holding or income input is required.<br>One offline file of 151,758 bytes with gzip | **Layout:** no sideways scrolling on any page at 320, 360 or 390 px, in both languages, with normal, large or 200% text.<br>**Persona plans:** 26 reliability/persona checks, including a 320-pixel Hindi view.<br>**Offline:** every tool runs offline.<br>**Slow network:** median 4,427 ms gzip-served in the simulation | Native-speaker review and physical low-end phones are pending.<br>Hindi and English only: no unreviewed machine translation |
| **Guardrails and trust (15%)** | No commerce, no tips: tips and "operator" calls are flagged as warning signs.<br>Every step cites one of 31 official pages and shows its review date and its named reviewer (Himanshi Rathore).<br>Nothing is uploaded, stored or tracked.<br>Private details are masked before saving.<br>The checker shows how it reached its verdict and its measured miss rate | Three independent reviews; every finding was checked against the official text and fixed.<br>22 checks replay each reviewer example.<br>No network requests during journeys | Independent security audit and native Hindi review |
| **Technical execution (15%)** | An explainable on-device hybrid:<br>- multilingual signals in 15 categories;<br>- weights fitted by logistic regression;<br>- thresholds and "always High" safety floors;<br>- five reliability states, including outside-coverage and insufficient-evidence abstention;<br>- return maths, lookalike-link and payee-shape insights.<br>An on-device assistant reads the user's own words | **Three sealed blind sets** written separately (results below).<br>About 1.0 ms per message.<br>130-check browser suite in 3 runs.<br>1,229 automated checks in all | Evaluation text is synthetic and not a representative corpus of real victim messages |
| **Feasibility and scale (15%)** | A static, cacheable file with no message server or inference cost.<br>The local Owner Studio edits and validates reviewed content, persona plans and release manifests.<br>A facilitator pilot exports anonymous results.<br>The engine is embeddable and the public app stores no user profile | 509,588-byte raw / 151,758-byte gzip build.<br>Validated build that refuses unsafe content.<br>National-scale transfer arithmetic and rollout gates in `SCALE-AND-RELIABILITY.md` | No 16-crore load test, named distribution partner or completed field pilot yet |

No judging score is guaranteed. The evidence above comes from automated checks, not from users.

## Problem and users

**Primary user:** a Hindi-speaking homemaker managing family savings in a Tier-2 city.
- A WhatsApp "VIP group" promises guaranteed IPO allotment and asks her to pay a UPI ID today.
- She needs to know, in her language, whether to pay, how to check, and what to do if she already has.

**Three explicit paths:**
- **Praveen, 22:** a Tier-3 graduate or gig worker pulled into Telegram tips, F&O and borrowing;
- **Kavita, 39:** a Tier-2 homemaker who needs simple Hindi checks for Ponzi, fake IPO and payment requests;
- **Babulal, 63:** a pensioner organising old folios, nominees, RTA/DP steps and possible IEPF claims.

Their plans are fixed examples, not stored user profiles. The owner can update every bilingual instruction and official source in the local Studio.

**Scope:** the product does not choose investments, certify that an offer is safe, recover money or decide legal rights.

## Seven tools, one private journey

The app opens on **Home**: one question, six large task choices and three persona shortcuts. The menu groups the tools under "Check before you act", "If something went wrong" and "Learn and protect".

1. **Check a message.** Paste a message and get a traffic-light verdict:
   - **High risk:** stop.
   - **Caution:** check independently.
   - **No known signs**, with the note that this does not mean safe.

   Reasons follow in order of weight, each with an official source. The model also explains in plain numbers:
   - the promised return (for example, "10% a month means ₹1 lakh would become about ₹3.14 lakh in a year");
   - suspicious links (shortened, app files, lookalikes of sebi.gov.in);
   - payment IDs.

   "Warn my family" prepares a WhatsApp-ready warning with the signs and 1930, never the scam's link. "How the risk level was decided" shows the weights and thresholds. A separate reliability card says whether rules and the fitted model strongly agree, several signs agree, only one sign was found, the language is outside coverage, or evidence is insufficient. It never calls a no-match message safe.
2. **Before you pay (new).** Three taps: what the payment is for, who asked, and where to pay. A UPI ID and a promised return are optional. The answer is STOP or VERIFY, with official ways to check:
   - SEBI-registered brokers, mutual funds, advisers and research analysts must give investors "@valid" UPI IDs (from 1 October 2025), shown with a thumbs-up in a green triangle;
   - SEBI Check confirms a UPI ID or bank account;
   - in a public issue everyone applies through ASBA and there is no discretion in allotment, so nobody can sell an allotment;
   - RBI Sachet checks deposit schemes.
3. **Get urgent help (Emergency mode).** A "Call 1930 now" box opens it.
   - The user can type or say what happened in their own words, for example "maine UPI se 5000 bhej diye aur OTP bhi bata diya". The answers are filled in on the phone for them to check.
   - The ordered plan puts the bank first, then 1930, then the bank for UPI fraud (UPI Help takes no complaint on a completed person-to-person payment), removing remote-access apps, Chakshu for messages, and keeping evidence.
   - Recovery is never promised.
4. **Find help (grievance navigator).** Ten routes with official time limits:
   - RBI Ombudsman: 30 days' wait, then 90 days to file;
   - SCORES: within one year, reviews within 15 days, SMART ODR at any point;
   - SMART ODR fees;
   - Insurance Ombudsman: one year;
   - PFRDA's levels.

   A bank, insurance or pension complaint is never sent to SEBI, and "Not sure" never guesses.
5. **Prepare a private Action Packet.**
   - The essentials are checked.
   - OTPs, PINs, passwords, CVVs and card numbers are found, including Hindi digits, invisible characters and SMS phrasing, and they block saving until masked. Masking can be undone.
   - Changing an answer marks the packet out of date.
   - The packet says it is not submitted.
6. **Family readiness.** A tick-only checklist covering:
   - nominees (SEBI's 2026 rules: reminders, no freezing);
   - converting paper shares through a DP;
   - IEPF transfers;
   - official contacts;
   - unsolicited "recovery" offers.

   A printable family card is included.
7. **Practise safety.** Three fictional questions, a short lesson and three parallel questions produce before-and-after scores. An optional anonymous export and a seven-day habit card are included.

**My safety plan.** Praveen, Kavita and Babulal each receive an ordered first action, warning signs, sourced steps and buttons into the relevant tools. Selection stays in page memory and no personal financial data is requested.

**Owner Control Studio** (local only, never published). The owner edits all reviewed content, persona plans, sources and review dates in Hindi and English, side by side. The build validates every change and records a release manifest.

## The model (v3): explainable, private, measured

- **Signals:** 15 categories of warning signs, written as English, Hindi and Roman-Hindi rules with caution handling, so "never share your OTP" is not an OTP request.
  - Established: certain returns, pressure, personal accounts, credentials and remote access, chat groups, borrowing, release fees, app installs, money multiplication.
  - New in v3: impersonation, threats and "digital arrest", unsolicited tips, suspicious links, fake IPO or institutional access, fee-charging recovery offers.
- **Risk score:** logistic regression over the category flags, fitted on labelled development messages, with weights rounded for readability. In v3.2 every sign weighs at least 1.5, and the High threshold (0.65) works out to a rule anyone can check: High means a safety floor, any two different signs, or one strong sign (certain returns, money multiplication, credential or remote-access requests, release fees, impersonation or IPO offers); a single moderate sign gives Caution. Safety floors keep a release fee, a credential request, recovery-for-a-fee and a threat with a payment demand at High.
- **Insights:** compounded return maths, link analysis (shorteners, APKs, bare IP addresses, lookalikes of official domains) and masked payee details.
- **Speed and size:** about 1.0 ms per message (maximum 18 ms on 6,000-character adversarial inputs). It runs fully on the device.

**Evaluation.**
- **Three sealed blind sets** of 320 synthetic messages each. Separate agents wrote them without ever seeing the checker or each other's sets.
- **One look per set:** each set was scored once for the model version it was meant to test, and only then used to find general weaknesses.
- **A fresh set for every improvement:** each improvement was measured on the next, untouched set.
- **Intervals:** results are shown with 95% intervals.

| Measure | v2 (on set 3) | v3.0 (set 1) | v3.1 (set 2) | **v3.2 (set 3, final)** |
|---|---|---|---|---|
| Fraud or suspicious messages warned | 35.4% | 70.3% | 68.2% | **72.4% [65.7–78.2]** |
| Fraud at High | 13.3% | 59.4% | 69.5% | **71.9% [63.5–78.9]** |
| Ordinary messages warned | 24.2% | 25.0% | 18.0% | **8.6% [4.9–14.7]** |
| Ordinary messages at High | 2.3% | 14.1% | 14.1% | **7% [3.7–12.8]** |

On the third sealed set (320 messages; 90 of the 128 ordinary ones are deliberately tricky), v3.2 warned on 79.7% of fraud and 57.8% of subtle "suspicious" messages, against 45.3% and 15.6% for v2. It flagged none of the 38 everyday messages and 12.2% of the tricky ones (v2: 33.3%). By language, fraud or suspicious messages warned were 80.6% in English, 68.4% in Hindi and 67.6% in Roman Hindi: Hindi and Roman Hindi detection still lags English. **Known weakness:** 7% of ordinary messages received the High verdict (v2: 2.3%; v3.1 on the same set: 11.7%), all of them among the deliberately tricky look-alikes (ordinary messages written to contain risky-looking words). On the sets it was tuned on, v3.2 looked almost perfect (0% ordinary messages at High), which is why only the untouched third set is reported as its accuracy.

**Release 3.3 (checker 3.3), from a 100-user real-world test.** 100 realistic users were written blind by separate agents and run in the app; see `REAL-WORLD-USER-TEST.md`.

| | Fully right | Partly right | Wrong |
|---|---:|---:|---:|
| Release 3.2 | 83 | 9 | 8 |
| Release 3.3 | 92 | 8 | 0 |

The checker now catches:
- Hindi and Hinglish electricity or SIM disconnection threats;
- task scams;
- loan-app shaming.

It no longer flags:
- genuine bank FD offers (a decimal-rate bug read "7.25%" as "25%");
- awareness messages that warn about guaranteed returns.

All earlier developer cases still pass, and the first two sealed sets are unchanged. The third set has now been seen, so the table above stays the last untouched measurement.

**Why no large language model?**
- An on-device model whose every warning can be explained and checked against a source is more trustworthy for this audience than a cloud model.
- It costs nothing to run, works offline and never uploads a message.
- A generative model would have to earn its place on the same blind evaluation, with an abstention path.

## Technical evidence

| Check | Result | Limit |
|---|---|---|
| Browser journeys (Release 3.3 suite) | 130/130 in each of 3 runs, no runtime errors | Local headless Edge, not every device or browser |
| New-feature journeys | 23 checks: verdicts, insights, own words, Before you pay, sharing, no network | Scripted journeys |
| Review-fix replays | 22 checks, including 41 reviewer privacy examples | Reviewers' examples, not every format |
| On-device assistant | 176 checks: 106 own-words cases in three languages, return maths, every Before-you-pay combination | Keyword rules can miss unusual phrasing |
| Home choices, sharing and pilot session | 18 checks: the shared file contains no user text, the pilot needs consent, blocks private details, uses the exact CSV columns and shows a live summary | Scripted journeys; the pilot has not yet been run with people |
| App layout | 30 checks: opens on Home with six choices; the menu's order and headings; the phone menu opens, closes (choice, close button, shaded area, Escape) and blocks the page behind it; no emoji anywhere in the app file; every page fits 320–390 px phones in both languages at normal, large and 200% text | Headless browser, not physical phones |
| Content safety rules | 166 validator tests | Known risks only |
| Owner Studio end to end | 124 checks | Local editor, single user |
| Rule regression (developer cases) | 449/449 expectations | Used during development |
| Independent boundary set | 38/38 | Small |
| Official links re-opened | 31/31 on 2026-10-01. All opened. | Pages change; review dates are shown in the app |
| Size and speed | 509,588-byte file, 151,758 bytes with gzip. Simulated slow network (400 ms latency, 50,000 bytes/s, 4× CPU): median 11,569 ms uncompressed, 4,406 ms gzip-served | Desktop simulation, not a physical phone |

## Guardrails and privacy

- **No commerce:** no stock tips, broker or product promotion, commissions, ads or upsells. Unsolicited tips and "operator" calls are flagged as warning signs.
- **No data access:** no SMS, inbox, contacts, documents or accounts are read. Voice input goes only through the phone's own keyboard. There is no in-app recording.
- **Page memory only:**
  - nothing is stored or uploaded;
  - Reset or Back clears the page;
  - autofill and cloud spellcheck are off for private fields;
  - downloaded files must be deleted separately.
- **Transparent about uncertainty:**
  - "No known signs" never means safe;
  - the abstaining route never guesses a regulator;
  - Before you pay says it cannot confirm who owns an ID;
  - the checker shows how its verdict was reached.

## Official sources and governance

- **Sources:** 31 official sources from SEBI, RBI, NPCI, IRDAI, PFRDA, MHA/I4C, DoT (Sanchar Saathi), PIB and others. Each states exactly what it supports and when it was reviewed. Snapshot 2026-10-01; next review due 2026-11-01.
- **Independent review:** three independent reviews preceded this release. Every advice-changing finding was re-checked against the official text before editing. The corrections were:
  - the RBI Ombudsman 90-day filing window;
  - the SCORES one-year limit and 15-day reviews;
  - SMART ODR arbitration fees;
  - UPI fraud goes to the bank first;
  - SEBI's 29 May 2026 nomination circular replacing the 2024 one;
  - paper shares are converted through a DP;
  - an unverifiable claim about pension systems was removed;
  - plainer Hindi.
- **Allowlist:** links must be on official domains, and the build refuses others.

## Measuring impact

**Built in:**
- a facilitator **Pilot session** (More tools). It reads the consent script, times six fictional scenarios, records the scores, and downloads anonymous rows in the exact `Pilot-Results.csv` columns. A live summary compares the prototype with official information, with denominators;
- practice before-and-after scores, with an anonymous export;
- the measured model accuracy;
- the coverage checks of every answer state.

**Pilot (ready to run, `Operations-and-Pilot-Kit.md`):**
- 24 consenting adults across the three personas, using fictional scenarios;
- matched tasks with official pages versus the prototype.

The pilot measures:
- correct next actions;
- whether users understand that "no known signs" is not proof of safety;
- Action Packet completeness;
- time to act.

**Targets** (not results): at least 80% correct routes, at least 90% understanding of uncertainty, and at least 30% faster to the next action. `Pilot-Results.csv` is blank; no participant data has been invented.

## Feasibility and scale

- **Cost:** a static file of 151,758 bytes with gzip, with no accounts, message database or inference server. Even 16 crore cold downloads are about 24.3 TB before CDN caching; a 1% daily-active cold-transfer upper bound is about 243 GB/day. These are planning figures, not a completed load test.
- **Reliability:** the checker combines multilingual rules, fitted weights and non-negotiable safety floors, then exposes its agreement or abstention state to the user.
- **Rollout:** start with measured district pilots, native-language review, security review, CDN load tests and monitored partner distribution before national traffic. The full plan is in `SCALE-AND-RELIABILITY.md`.
- **Maintenance:** content owners update reviewed content locally, with validation and release manifests. Sources carry review dates.
- **Distribution:**
  - Partners such as investor-awareness programmes, banks or brokers could embed the engine module or link the offline file.
  - "Warn my family" lets warnings spread without tracking.
- **Real remaining costs:** source review, native-language review, accessibility testing on devices, and support. Each new language needs native review and its own tests.

## Three-minute pitch

**0:00–0:20 — Problem.** A WhatsApp "VIP group" promises guaranteed IPO allotment and asks Sunita to pay a UPI ID today. Officially, more than ₹55,000 crore in financial-fraud losses was reported in five years.

**0:20–0:50 — Check.** She pastes the message in Hindi.
- The verdict is red: "High risk: stop".
- The reasons: a guaranteed return, a fake IPO allotment, a chat group and pressure to pay.
- "10% a month" becomes plain numbers.
- She taps "Warn my family".

**0:50–1:20 — Before you pay.** She chooses IPO, a group and a UPI ID. The answer is STOP:
- In a public issue everyone applies through ASBA, and nobody can sell an allotment.
- A broker's UPI ID must carry "@valid".
- SEBI Check is how to confirm one.

**1:20–1:50 — Already paid?** She says "maine UPI se 5000 bhej diye aur OTP bhi bata diya" using the keyboard's microphone. The answers fill in themselves. The plan puts the bank first, then 1930, then removing remote-access apps and keeping evidence.

**1:50–2:20 — The right authority, and a private packet.**
- **Find help:** shows RBI's 90-day window, or SCORES and SMART ODR for brokers.
- **Action Packet:** catches an OTP written in Hindi digits and blocks saving until it is masked.

**2:20–2:40 — Proof.** Disconnect the network and repeat the check offline. Open "How the risk level was decided".

**2:40–3:00 — Evidence and next step.**
- On a blind test written by a separate agent, the new model warned on 72.4% [65.7–78.2] of fraud or suspicious messages; v2 managed 35.4%.
- These are engineering checks, not user outcomes.
- Next is a 24-person pilot.

## Demo operator script

1. On Home, choose "Got a suspicious message?". Press "See example" in Hindi, then Check. Show the verdict, the reasons, "How the risk level was decided" and "Warn my family".
2. Open "Before you pay" from the menu. Choose IPO, a group and a UPI ID, and enter `profitking@ybl`. Show STOP. Then choose a trading app, "my own broker's app" and `abc.brk@validhdfc`. Show VERIFY, SEBI Check and the green-triangle sign.
3. Press "Get urgent help" in the top bar and type the Roman-Hindi sentence above. Press "Fill in the answers for me" and show the plan. Do not call 1930.
4. In Find help, choose Bank, then "complained" and "waiting". Show the RBI 30-day and 90-day rule.
5. In Prepare a complaint, enter fictional facts with "OTP ४८२९१३". Show that saving is blocked, mask it, review and download.
6. Save the offline copy, disconnect, and repeat a check.
7. Press "Share this app" to show it hands the link (or the offline file) to WhatsApp. Then open More tools → Pilot session, show the consent gate and one timed scenario.
8. In the local Owner Studio, mark a source reviewed, preview and export.
9. Clear the session, and delete the downloads separately.

## Judge Q&A

**How accurate is it?** We report every blind result with intervals, including where the new model was worse than v2 (more ordinary messages at High).
- Each fix was measured on a fresh, untouched set written by a different agent.
- On the final set, v3.2 warned on 72.4% [65.7–78.2] of fraud or suspicious messages and put 7% [3.7–12.8] of ordinary messages at High. All of those were tricky look-alikes; none of the everyday ones was flagged.
- No checker is perfect, so "No known signs" never means safe.

**Is this AI?** Yes, used carefully. It is an on-device statistical model over explainable signals, with fitted weights and safety floors, plus on-device language understanding of the user's own words. It runs without a cloud model, so it is private, free to run and checkable.

**How do you keep the advice current?** Every source shows its review date. The owner updates content locally, and the build validates it. This release fixed every review finding against the official text.

**Have you proved impact?** No. Measurement is built in and a pilot is prepared. Practice scores and blind tests are not evidence of money saved.

**Can it recover money?** No. It speeds up the correct official action. Institutions and authorities decide outcomes.
