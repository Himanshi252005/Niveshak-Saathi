# Niveshak Saathi: Release 3.4
## A Hindi-first investor-safety companion that works on the phone, offline and in private

**Promise:** help an Indian investor stop a fraud before money leaves, and act correctly in the first hours if it already has. Everything is in Hindi or English.

> check the message → check before paying → stop immediate harm → find the right authority → prepare the complaint → protect the family → build the habit

**Status:**
- Tested browser prototype and downloadable offline HTML.
- Release 3.4 is verified: all 22 release suites pass (`Release-3.4-Verification.json`).
- The public link serves the verified Release 3.3 until the Site is redeployed with 3.4 (see `Delivery-Status.md`).
- No real-user impact study has been conducted.
- This is an independent educational product, not affiliated with SEBI, RBI, IRDAI, PFRDA, NPCI or any institution.

**Why it matters:**
- **Scale:** the Ministry of Home Affairs reports more than 65.89 lakh financial-fraud complaints on the National Cyber Crime Reporting Portal for 2021–2025, with more than ₹55,050 crore reported (PIB, 21 July 2026, PRID 2287039).
- **Approach:** Niveshak Saathi works at the two moments that decide the loss: just before paying, and the first hours after.

## How the verified prototype meets the judging criteria

| Criterion (weight) | What the product does | Evidence | What is not yet proven |
|---|---|---|---|
| **Resilience and safety impact (30%)** | **Before you pay:** a STOP or VERIFY answer, with SEBI's "@valid" UPI rule, SEBI Check, IPO-by-ASBA and RBI Sachet.<br>**Message check:** a High / Caution / No-known-signs verdict with reasons.<br>**Emergency mode:** fills in from your own words; bank and 1930 first.<br>**Complaint routes:** with official time limits.<br>**Private Action Packet** and **family readiness**.<br>**Practice:** before and after scores.<br>**"Warn my family"** | **Fresh blind set (blind-v8, 200 messages, scored once):** warned on 67.5% [56.6–76.8] of fraud messages; flagged none of the 40 everyday messages.<br>**Complaint routes:** on 40 stories written blind, the main authority is named in 39/40 (Release 3.3: 35/40).<br>**Coverage checks:** all 60 Emergency answer combinations, 272 navigator states and 60 family combinations | No real-user outcome study yet; money saved is not measured. Subtle scams are often missed (5 of 25 caught on blind-v8) |
| **Tier-2/3 usability (25%)** | Hindi-first everywhere, with English and Roman-Hindi understanding.<br>The Home page offers six large task choices plus fixed, privacy-safe plans for Praveen, Kavita and Babulal.<br>A labelled phone menu, urgent-help button, simple line icons, read-aloud, large text and an offline copy reduce cognitive and connectivity burden.<br>No identity, account, holding or income input is required.<br>One offline file of 164,699 bytes with gzip | **Layout:** no sideways scrolling on any page at 320, 360 or 390 px, in both languages, with normal, large or 200% text.<br>**Persona plans:** 26 reliability/persona checks, including a 320-pixel Hindi view.<br>**Offline:** every tool runs offline.<br>**Slow network:** median 4,260 ms gzip-served in the simulation; Home usable in 1.7 s on slow 4G | Native-speaker review and physical low-end phones are pending.<br>Hindi and English only: no unreviewed machine translation |
| **Guardrails and trust (15%)** | No commerce, no tips: tips and "operator" calls are flagged as warning signs.<br>Every step cites one of 46 official pages and shows its review date and its named reviewer (Himanshi Rathore).<br>Rights cards from the SEBI Investor Charter, the RBI Charter of Customer Rights and IRDAI's policyholder rules.<br>An in-page Content-Security-Policy, and no referrer sent to linked sites.<br>The app itself uploads, stores and tracks nothing; the public link's host sets its own short-lived security cookie, which the app neither sets nor reads.<br>Private details are masked before saving.<br>The checker shows how it reached its verdict and its measured miss rate | Three independent reviews; every finding was checked against the official text and fixed.<br>22 checks replay each reviewer example.<br>No network requests during journeys | Independent security audit and native Hindi review |
| **Technical execution (15%)** | An explainable on-device hybrid:<br>- multilingual signals in 15 categories;<br>- weights fitted by logistic regression;<br>- thresholds and "always High" safety floors;<br>- five reliability states, including outside-coverage and insufficient-evidence abstention;<br>- return maths, lookalike-link and payee-shape insights.<br>An on-device assistant reads the user's own words | **Sealed blind sets** written separately and scored once (results below).<br>About 1.0 ms per message.<br>130-check browser suite in 3 runs.<br>1,297 automated checks in all | Evaluation text is synthetic and not a representative corpus of real victim messages |
| **Feasibility and scale (15%)** | A static, cacheable file with no message server or inference cost.<br>The local Owner Studio edits and validates reviewed content, persona plans and release manifests.<br>A facilitator pilot exports anonymous results.<br>The engine is embeddable and the public app stores no user profile | 561,637-byte raw / 164,699-byte gzip build.<br>Validated build that refuses unsafe content.<br>National-scale transfer arithmetic and rollout gates in `SCALE-AND-RELIABILITY.md` | No 16-crore load test, named distribution partner or completed field pilot yet |

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

   **New in Release 3.4:**
   - each button carries a one-line hint;
   - routes show sourced "Also check" tips:
     - the RBI Ombudsman after a bank refusal;
     - police or the State Economic Offences Wing, plus RBI Sachet, for chit, deposit and Ponzi schemes;
     - RBI UDGAM, SEBI MITRA and IRDAI Bima Bharosa for unclaimed money;
     - IEPF-5 claims without agents;
     - frozen accounts after a cyber complaint;
     - loan-app harassment and RBI's Digital Lending Apps directory;
     - unexplained monthly debits (RBI e-mandate rules);
   - eight rights cards cite the SEBI Investor Charter, the RBI Charter of Customer Rights and IRDAI's policyholder rules (a 30-day free look; complaints resolved within two weeks).
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

**Release 3.4: a fresh sealed set, and a candidate checker that was not shipped.**
- **Why a candidate:** it was built to remove false alarms, for example genuine OTP SMS, awareness messages and everyday words such as "पक्का".
- **The fresh set (blind-v8):** a separate agent wrote 200 messages after the candidate was frozen. The set was scored once.

| On blind-v8 (200 messages) | Checker 3.3 (shipped) | Candidate (not shipped) |
|---|---:|---:|
| Fraud warned | 67.5% [56.6–76.8] | 63.8% [52.8–73.4] |
| Fraud at High | 56.3% | 52.5% |
| Ordinary messages warned | 13.3% [7.8–21.9] | 11.1% [6.1–19.3] |
| Ordinary messages at High | 10.0% | 8.9% |
| Everyday ordinary messages flagged | 0/40 | 0/40 |

- **Result:** the differences are within the intervals. The large gains the candidate showed on the set that guided it did not carry over, so the owner kept checker 3.3 for Release 3.4.
- **Weak spots:** this harder set shows that subtle approaches are still often missed (5 of 25 caught), especially pension, life-certificate and folio scams aimed at older investors. That is the next checker round, to be measured on another fresh set.

**Why no large language model?**
- An on-device model whose every warning can be explained and checked against a source is more trustworthy for this audience than a cloud model.
- It costs nothing to run, works offline and never uploads a message.
- A generative model would have to earn its place on the same blind evaluation, with an abstention path.

## Technical evidence

| Check | Result | Limit |
|---|---|---|
| Browser journeys (Release 3.4 build) | 130/130 in each of 3 runs, no runtime errors | Local headless Edge, not every device or browser |
| Complaint routes, rights and sources (Release 3.4) | 39 checks: every new step, tip, rights card and source in both languages, button hints on a 360 px phone, the action card's links | Content checked by Claude against official pages; awaiting the named reviewer's confirmation |
| Privacy notes, security policy and version line (Release 3.4) | 27 checks: no policy violation in any journey, the offline copy, a phone, or next to the host's injected script; no referrer; the update link opens only when tapped; three broken builds caught | The host's own headers cannot be set from the page |
| Complaint-route test (40 stories written blind) | Main authority 39/40; all expected authorities 34/40 with a first-time user's buttons, 37/40 with the correct buttons (Release 3.3: 35, 25 and 26) | The stories guided the changes, so this is a regression test |
| New-feature journeys | 23 checks: verdicts, insights, own words, Before you pay, sharing, no network | Scripted journeys |
| Review-fix replays | 22 checks, including 41 reviewer privacy examples | Reviewers' examples, not every format |
| On-device assistant | 176 checks: 106 own-words cases in three languages, return maths, every Before-you-pay combination | Keyword rules can miss unusual phrasing |
| Home choices, sharing and pilot session | 19 checks: the version line and its tap-only update link; the shared file contains no user text, the pilot needs consent, blocks private details, uses the exact CSV columns and shows a live summary | Scripted journeys; the pilot has not yet been run with people |
| App layout | 31 checks: opens on Home with six choices and ends with the version line; the menu's order and headings; the phone menu opens, closes (choice, close button, shaded area, Escape) and blocks the page behind it; no emoji anywhere in the app file; every page fits 320–390 px phones in both languages at normal, large and 200% text | Headless browser, not physical phones |
| Content safety rules | 166 validator tests | Known risks only |
| Owner Studio end to end | 124 checks | Local editor, single user |
| Rule regression (developer cases) | 449/449 expectations | Used during development |
| Independent boundary set | 38/38 | Small |
| Official links re-opened | 45 of 46 opened automatically on 2026-10-02; the IEPF claimants' FAQ refuses automated clients and was checked in a browser | Pages change; review dates are shown in the app. RBI's site may show a language chooser first |
| Size and speed | 561,637-byte file, 164,699 bytes with gzip. Simulated slow network (400 ms latency, 50,000 bytes/s, 4× CPU): median 12,242 ms uncompressed, 4,260 ms gzip-served. Home usable in 1.7 s (slow 4G), 4.7 s (weak 3G) and 8.4 s (2G), 10–15% slower than Release 3.3 | Desktop simulation, not a physical phone |

## Guardrails and privacy

- **No commerce:** no stock tips, broker or product promotion, commissions, ads or upsells. Unsolicited tips and "operator" calls are flagged as warning signs.
- **No data access:** no SMS, inbox, contacts, documents or accounts are read. Voice input goes only through the phone's own keyboard. There is no in-app recording.
- **Page memory only:**
  - the app itself stores nothing and never sends what you type;
  - the public link's host (Cloudflare) adds its own bot-check script and a short-lived `__cf_bm` security cookie. The app neither sets nor reads it, and the offline file has neither;
  - Reset or Back clears the page;
  - autofill and cloud spellcheck are off for private fields;
  - downloaded files must be deleted separately.
- **Transparent about uncertainty:**
  - "No known signs" never means safe;
  - the abstaining route never guesses a regulator;
  - Before you pay says it cannot confirm who owns an ID;
  - the checker shows how its verdict was reached.

## Official sources and governance

- **Sources:** 46 official sources shown in the app (48 recorded), from SEBI, RBI, NPCI, IRDAI, IEPF, PFRDA, MHA/I4C, DoT (Sanchar Saathi), PIB and others.
  - Each states exactly what it supports and when it was reviewed.
  - Snapshot 2026-10-02; next review due 2026-11-01.
  - The 15 sources added on 2 October were checked against the official pages and await the named reviewer's confirmation.
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

- **Cost:** a static file of 164,699 bytes with gzip, with no accounts, message database or inference server.
  - Even 16 crore cold downloads are about 26.4 TB before CDN caching.
  - A 1% daily-active cold-transfer upper bound is about 264 GB/day.
  - These are planning figures, not a completed load test.
  - The current host sends no cache validators, so repeat visits download the page again (`SCALE-AND-RELIABILITY.md`).
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
- **Find help:** shows RBI's 90-day window, or SCORES and SMART ODR for brokers. For a deposit or Ponzi scheme, it names the police or the State Economic Offences Wing and RBI Sachet, each with its official source.
- **Action Packet:** catches an OTP written in Hindi digits and blocks saving until it is masked.

**2:20–2:40 — Proof.** Disconnect the network and repeat the check offline. Open "How the risk level was decided".

**2:40–3:00 — Evidence and next step.**
- On a fresh blind set of 200 messages, written by a separate agent and scored once, the checker warned on 67.5% [56.6–76.8] of fraud and flagged none of the 40 everyday messages.
- We publish the misses too: subtle scams aimed at pensioners are the next thing to fix.
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

**How accurate is it?** We report every blind result with intervals, including where a new model was worse, or where it was no better and was not shipped.
- Each fix was measured on a fresh, untouched set written by a different agent.
- **Newest set (blind-v8, 200 messages, harder than before), with the shipped checker 3.3:**
  - 67.5% [56.6–76.8] of fraud warned;
  - 13.3% [7.8–21.9] of ordinary messages warned, all of them tricky look-alikes;
  - none of the 40 everyday messages flagged.
- **A candidate checker** that removed false alarms on its development sets showed no significant difference on this set, so it was not shipped.
- **Earlier set (model 3.2):** 72.4% [65.7–78.2] of fraud or suspicious messages warned, and 7% [3.7–12.8] of ordinary messages at High.
- No checker is perfect, so "No known signs" never means safe.

**Is this AI?** Yes, used carefully. It is an on-device statistical model over explainable signals, with fitted weights and safety floors, plus on-device language understanding of the user's own words. It runs without a cloud model, so it is private, free to run and checkable.

**How do you keep the advice current?** Every source shows its review date. The owner updates content locally, and the build validates it. This release fixed every review finding against the official text.

**Have you proved impact?** No. Measurement is built in and a pilot is prepared. Practice scores and blind tests are not evidence of money saved.

**Can it recover money?** No. It speeds up the correct official action. Institutions and authorities decide outcomes.
