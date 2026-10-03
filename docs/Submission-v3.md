# Niveshak Saathi: Release 3.5 submission
## Sangyan public-good hackathon, Track B: Investor Awareness, Rights & Grievance

**Promise:** help a first-time Indian investor stop a fraud before money leaves, act correctly in the first hours if it already has, and use their rights and the official complaint routes without paying an agent. Hindi first, with English one tap away.

> check the message → check before paying → stop immediate harm → find the right office → follow the official steps → protect the family → build the habit

**Status (2 October 2026)**
- **Release 3.5** is the build in this repository: 825,173 bytes, SHA-256 `833C6BA15BA28421FE556E75CEF8810BE40697634F86BBC9448985151004F7B3`. 1,742 automated checks passed: 24 release suites plus the developer cases ([release record](../evidence/Release-3.5-Verification.json)).
- **The live link serves Release 3.5:** [himanshi252005.github.io/Niveshak-Saathi/](https://himanshi252005.github.io/Niveshak-Saathi/). Its served file matches the verified repository build ([delivery status](Delivery-Status.md)).
- **Release 3.4** was verified but never deployed. Its results are kept below as history.
- **No real-user study or pilot** has been run. Every accuracy figure comes from synthetic test sets.
- **An independent educational product,** not affiliated with SEBI, RBI, IRDAI, the IEPF Authority, PFRDA, NPCI or any institution.

**On this page:** [S.01 Product](#s01-product) · [S.02 Problem](#s02-problem-definition) · [S.03 Solution](#s03-solution) · [S.04 Technology](#s04-technology) · [S.05 Demonstration](#s05-demonstration) · [S.06 Impact](#s06-impact) · [Judging criteria](#how-the-product-meets-the-judging-criteria) · [Guardrails](#guardrails-privacy-and-governance) · [Q&A](#judge-qa)

## S.01 Product

A working prototype: one self-contained HTML file that runs in a phone or desktop browser, in Hindi and English, with no installation, account, server or API key.

| How to try it | What you get |
|---|---|
| Download [`prototype/dist/index.html`](../prototype/dist/index.html) and open it in Chrome or Edge | **Release 3.5**, with every feature on this page |
| [Live link](https://himanshi252005.github.io/Niveshak-Saathi/) | **Release 3.5**, including Rights and help, Family asset map, rights cards and step-by-step guides |
| [Demo video](https://himanshi252005.github.io/Niveshak-Saathi/demo/) | 4:58, recorded from Release 3.5 with fictional data; English and Hindi captions |

- **Language:** the app opens in Hindi. To switch to English, use the language menu at the top right.
- **Home** asks one question, "What do you need help with?", with four large choices in everyday words. "More help" opens rights, practice and family safety, and one fold holds the three persona plans.
- **The menu** shows six everyday pages (Home, Check a message, Before you pay, Get help now, Where to complain, Rights and help); the complaint packet, safety plans, practice and family safety sit under "More pages". A "Get urgent help" button stays in the top bar.
- **Design:** a calm green-and-white design: white and soft-mint surfaces, deep green text, hairline cards and pill buttons, and green line drawings that draw themselves in (still for people who ask for less motion) on Home, beside each page heading and above each answer; choices are chips, long notes fold away, and a persistent five-item phone navigation remains visible after every selection. The menu is emerald green from top to bottom. The app always opens in the light theme; "Dark theme" in the menu switches to a dark theme made from the app's own emerald.
- **No typing needed:** a Paste button puts a copied message in the box, a tip shows how to speak it with the phone keyboard's microphone, and another how to copy the words of a message that arrived as a picture.
- **Offline and sharing:** "Save offline copy" (More tools) downloads the app so it works without internet. "Share this app" hands the link, or the file, to WhatsApp.

## S.02 Problem definition

**The gap.** India has more than 16 crore demat accounts, and more than 70% of new accounts are opened outside the metros (hackathon brief). Access has outrun protection:
- SEBI's study found that 93% of individual F&O traders lost money between FY22 and FY24.
- More than 65.89 lakh financial-fraud complaints were made on the National Cyber Crime Reporting Portal from 2021 to 2025, reporting more than ₹55,050 crore (PIB, Ministry of Home Affairs, 21 July 2026, release 2287039).
- Investor rights and complaint routes exist, but a first-time user cannot use them. They do not know which office handles which problem, the deadlines or the documents. They do not know that SCORES and an IEPF-5 claim are free and need no agent, or that official helplines speak their language. Scammers sell exactly this missing knowledge: guaranteed IPO allotments, "recovery agents" for old shares, fake KYC blocks.

**Who we build for: the brief's three people**

| Person | Situation | The problem the app solves |
|---|---|---|
| **Praveen, 22** | Tier-3 graduate or gig worker, new to trading | Pulled into Telegram F&O tips and trading on borrowed money. He needs a pause and the facts before paying |
| **Kavita, 39** | Tier-2 homemaker managing family savings, not fluent in English | A WhatsApp "VIP group" promises a guaranteed IPO allotment and asks her to pay a UPI ID today. She needs to know, in Hindi, whether to pay, how to check and what to do if she already has |
| **Babulal, 63** | Retired, with old or dormant folios | He does not know the nominee process and cannot navigate the IEPF or SCORES portals, so paid "recovery agents" can exploit him |

**Two moments decide the loss:** just before paying, and the first hours after. Rights, complaints, family records and habits support those two moments.

**What people use today, and where it falls short.** We compared 23 tools (SEBI, RBI, I4C, DoT, NPCI, IEPF, IRDAI, banks, brokers, Truecaller, Google and global scam checkers; [market comparison](MARKET-COMPARISON.md)). Official help is split across about ten portals, each with its own login and exclusions: SCORES, for example, does not take complaints about unregistered tip groups. Private checkers are mostly English-first, need an account or upload your messages, and stop at advice; Google's on-device scam detection in Messages does not list Hindi. Few tools are built for investment scams, which IANS, citing I4C data, reports were 77% of 2025 cyber-fraud losses.

**Scope.** The product does not choose investments, certify that an offer is safe, recover money, file complaints or decide legal rights.

## S.03 Solution

One private journey, from a suspicious message to the right official action. Every step that gives advice shows its official source and review date, or is labelled a general safety step.

### Check before you act

1. **Check a message.** Paste a message and get a traffic-light verdict:
   - **High risk:** stop.
   - **Caution:** check independently.
   - **No known signs**, shown in a neutral style with the note that this does not mean safe.

   Reasons follow in order of weight, each with an official source. The checker also explains promised returns in plain numbers ("10% a month means ₹1 lakh would become about ₹3.14 lakh in a year"), suspicious links (shorteners, app files, lookalike addresses) and payment IDs. "How the risk level was decided" shows the weights and thresholds, and a reliability note says how sure the result is. When tips, borrowing or F&O appear, a card shows SEBI's F&O loss study. **"Warn my family"** prepares a WhatsApp-ready warning with the signs and 1930, never the scam's link.
2. **Before you pay.** Three quick questions (what the payment is for, who asked, where to pay), with an optional UPI ID and promised return, give **STOP** or **VERIFY**, with the official way to check:
   - SEBI-registered brokers, mutual funds, advisers and research analysts must give investors "@valid" UPI IDs (from 1 October 2025), shown with a thumbs-up in a green triangle;
   - SEBI Check confirms a UPI ID or bank account;
   - in a public issue everyone applies through ASBA and allotment is not discretionary, so nobody can sell an allotment;
   - RBI Sachet checks deposit schemes;
   - paying a UPI ID or a person's account adds I4C's Suspect Search, with I4C's own warning that the database is not complete, so "not found" proves nothing.

   A STOP answer offers **"Pause for 30 seconds"**: a calm screen with a ring that empties, because scams work by rushing people (a general safety step).

### If something went wrong

3. **Get help now (emergency mode).** It opens with a "Call 1930 now" box.
   - The user types or dictates what happened, for example "maine UPI se 5000 bhej diye aur OTP bhi bata diya". An on-device keyword-based parser fills in the answers for the user to check.
   - The ordered plan starts with stopping contact if it is still happening, then the bank or payment provider and 1930. It goes on to removing remote-access apps, refusing any "recovery fee", reporting the message on Chakshu and keeping evidence. For UPI fraud it sends the user to the bank, because UPI Help takes no complaint on a completed person-to-person payment.
   - If a trading app login, password or OTP was shared, the plan adds asking the broker to freeze online access to the trading account, which every broker must offer since 1 July 2024 (SEBI circular of 12 January 2024), and the DP to freeze the demat account.
   - Recovery is never promised.
4. **Where to complain.** Ten routes, with official time limits where they apply, for example:
   - RBI Ombudsman: wait 30 days for the bank, then file within 90 days;
   - SCORES: within one year, reviews within 15 days, SMART ODR at any point;
   - Insurance Ombudsman: within one year; PFRDA's levels for pensions;
   - "not this door": the SCORES routes say that SCORES does not take complaints about unregistered or unregulated activity, fake or forged documents, or other regulators' matters (SCORES FAQ), and point to "Possible fraud" instead.

   Each button carries a one-line hint, and routes show sourced "Also check" tips: police or the State Economic Offences Wing and RBI Sachet for chit, deposit and Ponzi schemes; RBI UDGAM, SEBI MITRA and IRDAI Bima Bharosa for unclaimed money; frozen accounts after a cyber complaint; loan-app harassment; unexplained monthly debits. A bank, insurance or pension complaint is never sent to SEBI, and "Not sure" never guesses. **New in Release 3.5:** seven of the ten routes link to the matching step-by-step guide.
5. **Prepare a complaint (private Action Packet).**
   - The complaint essentials are checked.
   - OTPs, PINs, passwords, CVVs and card numbers are found, including Hindi digits, invisible characters and SMS phrasing. They block saving until masked, and masking can be undone.
   - Changing an answer marks the packet out of date, and the packet says it has not been submitted.

### Know your rights (new in Release 3.5)

6. **Rights and help.** Home card "अपने अधिकार जानें / Know your rights" (under "More help"); in the menu, "अधिकार और मदद / Rights and help".
   - **Free official helplines that speak regional languages:**
     - SEBI 1800-266-7575 or 1800-22-7575: English, Hindi, Marathi, Gujarati, Tamil, Bengali and Telugu; 9 am–6 pm, except Sundays and Maharashtra public holidays;
     - RBI Contact Centre 14448: English, Hindi and ten regional languages; it explains how to complain but cannot take a complaint;
     - IRDAI grievance call centre 155255 or 1800 425 4732: 8 am–8 pm, Monday to Saturday, in Hindi, English and other major languages;
     - IEPF helpdesk 14453, and cybercrime 1930.
   - **Five step-by-step guides,** every step sourced to an official page, each downloadable as a text file:
     - SEBI SCORES (shares, brokers, mutual funds);
     - an IEPF-5 claim, with a tick-only list of the papers needed and the warning that no agent is needed or appointed;
     - the RBI Ombudsman (bank, card, wallet);
     - insurance complaints (insurer, then IRDAI, then the Insurance Ombudsman);
     - adding or checking a nominee for demat accounts and mutual funds.
   - **All eight rights cards,** grouped by institution, each with "Where to complain about this": the SEBI Investor Charter, RBI's Charter of Customer Rights, IRDAI's 30-day free look and two-week grievance rule, and cards on evidence, reviews, nominees and family entitlement.

   Nothing on this page asks the user to type anything, and ticks are not saved.

### Learn and protect

7. **Family safety.**
   - **Family asset map (new in Release 3.5; Track B "Nominee & Family Wealth Tracker").** A private list with one row per investment: type (bank, demat shares, mutual fund, paper shares, insurance, PF/NPS/pension, post office, other), the institution's name, nominee status, where the papers are, and who in the family knows. The institution's name is the only typed field, and it refuses numbers, e-mail addresses and PAN. The user downloads or prints the list and can reopen the downloaded file on the phone later; the file is read on the phone and never uploaded. The app itself saves nothing. Shares or mutual funds without a nominee link to the nominee guide.
   - **Family checklist and card:** a tick-only checklist covering nominees (SEBI's 2026 rules: reminders, no freezing), converting paper shares through a DP, IEPF transfers, official contacts and unsolicited "recovery" offers, with a printable family card.
8. **My safety plan.** Praveen, Kavita and Babulal each get an ordered first action, warning signs, sourced steps and buttons into the right tools. The plans are fixed examples, not user profiles.
9. **Practise.** Three made-up questions, a short lesson and three parallel questions give before-and-after scores, with an optional anonymous export and a seven-day habit card. Practice scores are not evidence of impact.

**Also:** read-aloud with the phone's own voice, large text, phone layouts and a working phone Back button. A **Pilot session** for facilitators appears under More tools only on a link ending in `?pilot=1`, so everyday users never see it. The **Owner Studio** is a local editor, never part of the public app (its file is in the repository), where the content owner edits all bilingual content, sources, guides and plans; the build validates every change.

### Track B fit

| Direction | Feature |
|---|---|
| Grievance Assistant | Get help now (bank and 1930 first); Where to complain (10 routes, with official time limits where they apply); private complaint packet; guides for SCORES, the RBI Ombudsman and insurance |
| Nominee & Family Wealth Tracker | Family asset map; nominee guide; family checklist and card |
| Rights & Process Navigator | Rights and help: helplines, five guides, eight rights cards; IEPF-5 claim guide |

### The four pillars

| Pillar | Feature |
|---|---|
| Detect Fraud | Check a message; Before you pay; lookalike links and return maths |
| Educate Simply | Plain-Hindi reasons; persona plans; practice; SEBI's F&O study card |
| Build Habits | Warn my family; habit card; Family asset map and its next steps |
| Know Rights | Rights and help page; rights cards; step-by-step guides; free helplines |

## S.04 Technology

### Architecture

```text
Official pages (SEBI, RBI, IRDAI, IEPF, NPCI, PFRDA, MHA/I4C, DoT, PIB)
      |  each fact checked and dated; reviewer-confirmed or "review pending"
      v
Owner Studio (local) --> content validator --> reproducible build --> one HTML file
                                                                          |
                                           public link / offline copy / shared file
                                                                          v
In the user's browser: message checker (rules -> fitted score -> safety floors -> reliability state),
keyword-based parser for the user's own words, routes, guides, helplines, packet, family list
      |
      v
Nothing is sent. Downloads stay on the device.
```

| Part | File | Role |
|---|---|---|
| Message checker | `prototype/engine.js` | Warning signs, fitted risk score, safety floors, reliability states, insights |
| Own-words parser and Before you pay | `prototype/assist.js` | Keyword-based reading of the user's words; STOP/VERIFY reasons; return maths |
| Interface | `prototype/base.html`, `upgrade.js`, `upgrade.css` | Bilingual screens, accessibility, offline copy, downloads |
| Content | `prototype/content/*.json` | Sources, helplines, routes, guides, rights cards, plans and texts in Hindi and English |
| Validator and build | `prototype/content-schema.js`, `build.cjs` | Refuse unsafe or incomplete content; build the single file |
| Owner Studio | `prototype/owner-studio.html` | Local editor; never part of the public app |

### The message checker: an explainable, on-device model

- **Warning signs:** English, Hindi and Roman-Hindi rules for categories such as certain returns, pressure, personal accounts, credential and remote-access requests, chat groups, borrowing, release fees, app installs, money multiplication, impersonation, threats and "digital arrest", unsolicited tips, suspicious links, fake IPO access, fee-charging recovery offers, and requests for documents or a signed blank cheque. Caution handling means "never share your OTP" is not read as an OTP request.
- **Risk score:** an L2-regularised logistic regression over the category flags, fitted on labelled development messages, with weights rounded for readability. The fitting script and its feature table are published ([`evaluation/fit-weights.cjs`](../evaluation/fit-weights.cjs)) and reproduce the shipped weights exactly. The weights and thresholds are in `engine.js` and shown to the user under "How the risk level was decided". In model 3.2, and in checkers 3.3 and 3.5, which keep its weights, every sign weighs at least 1.5 and the High threshold (0.65) works out to a rule anyone can check: High means a safety floor, any two different signs, or one strong sign; one moderate sign gives Caution.
- **Safety floors:** once recognised, a release fee, a credential request, a fee-charging recovery offer, and a threat that comes with a payment demand, a link to click or an order to talk to an "officer" (as in "digital arrest") always give High.
- **Five reliability states:** strong warning agreement, several signs agree, one sign, outside language coverage, and insufficient evidence. The last two abstain; no state calls a message safe.
- **Insights:** compounded return maths, link analysis (shorteners, app files, bare IP addresses, lookalike addresses) and masked payee details.
- **Speed:** fully on the device. Checker 3.5 takes about 0.4 ms for an ordinary message on the test computer (internal benchmark, about 1.8 times checker 3.3); an unusual long input can take about 0.1–0.2 s the first time.

**Checker in Release 3.5:** checker 3.5. It adds Hindi, Hinglish and Devanagari patterns for the three personas' scams: advance fees on money said to be "approved" or "unclaimed", paid agents for old shares and IEPF claims, freeze and "digital arrest" threats, requests for documents or a signed blank cheque, IPO quotas, wrong-number openers and paid VIP tips. It also stops flagging many warnings that only quote scam lines. Weights and thresholds are unchanged. It was frozen before the fresh sealed set blind-v9 was scored once (below).

**The own-words parser** in "Get help now" is keyword-based, not a language model. It reads English, Hindi and Roman Hindi and pre-fills answers that the user confirms. Unusual phrasing can be missed.

**Why no large language model?**
- A model whose every warning can be explained and checked against a source is more trustworthy for this audience than a cloud model.
- It costs nothing to run, works offline and never uploads a message.
- A generative model would have to beat it on the same sealed evaluation, with an abstention path.

### Evaluation

- **Sealed sets:** each set is written by a separate AI agent that never saw the code, the tests or earlier sets. It is scored once for the checker it was written to test, and becomes development data after that.
- **Intervals:** results are shown with 95% intervals. Sets differ in mix and difficulty, so compare checkers on the same set, not across sets.
- **What is published:** the messages and scores of blind-v5, v6, v8 and v9, and the scores of the first two 320-message sets, blind-v3 and v4. One more set, blind-v7, guided the Release 3.4 candidate checker and is not published.

| Sealed set (messages) | Release and checker | Fraud or suspicious warned | Fraud warned | Ordinary warned |
|---|---|---:|---:|---:|
| blind-v9 (200) | 3.5, checker 3.5 | 80% [71.6–86.4] | 87.5% [78.5–93.1] | 12.2% [7–20.6] |
| blind-v9 (200), same messages | checker 3.3, for comparison | 74.5% [65.7–81.8] | 82.5% [72.7–89.3] | 11.1% [6.1–19.3] |
| blind-v8 (200) | 3.4, checker 3.3 | 60.9% [51.6–69.5] | 67.5% [56.6–76.8] | 13.3% [7.8–21.9] |
| blind-v6 (120) | 3.3, checker 3.3 | 87.1% [77.3–93.1] | 94.0% [83.8–97.9] | 24.0% [14.3–37.4] |
| blind-v5 (320) | 3.2, model 3.2 | 72.4% [65.7–78.2] | 79.7% [71.9–85.7] | 8.6% [4.9–14.7] |

**Release 3.5 on blind-v9, told straight:**
- Checker 3.5 met two of the three targets: fraud warned 87.5% (target ≥85%) and subtle fraud warned 18 of 25, 72% (target ≥70%). It missed the third: 12.2% of ordinary messages were warned (target ≤8%; checker 3.3: 11.1%).
- Babulal-type messages, caught least often before, improved: fraud or suspicious warned 75% [56.6–87.3] (3.3: 67.9%), fraud at High 75% (3.3: 45%).
- The rule written before scoring also required no more ordinary messages warned than checker 3.3. Checker 3.5 warned one more (11 of 90 against 10, the extra one at Caution; 9 at High for both). The owner shipped it because fraud at High improved significantly (paired test, p = 0.0117). The record states this deviation ([`Blind-Evaluation-v9.json`](../evidence/Blind-Evaluation-v9.json)).
- Still wrong: 10 of 80 frauds got no warning (for example wrong-number openers, a fake helpline asking for remote access, an advance fee to transfer old shares), and 9 ordinary messages were rated High, most of them awareness warnings or genuine notices (an IEPF refund, a broker withdrawal, a branch KYC call, an LPG booking).

**Release 3.4 history, told straight:**
- On blind-v8 the shipped checker 3.3 caught only 5 of 25 subtle frauds. Babulal-type messages (pensions, life certificates, dormant folios) were caught least often: 39.3% [23.6–57.6] of his fraud or suspicious messages. None of the 40 everyday ordinary messages was flagged.
- **Missed targets:** Release 3.4 aimed for fraud warned ≥85%, ordinary warned ≤8% and subtle fraud warned ≥70%. All three were missed. One complaint-route target was also missed: an AI agent acting as a new first-time user picked the expected button in 36 of 40 stories, against a target of 37.
- A candidate checker built to cut false alarms was no better on blind-v8 (fraud warned 63.8% [52.8–73.4]; ordinary warned 11.1% [6.1–19.3]), so Release 3.4 kept checker 3.3. In [`Blind-Evaluation-v8.json`](../evidence/Blind-Evaluation-v8.json), the key "v3.4" is that candidate and "v3.3" is the checker shipped in Release 3.4.

Full tables, by language and persona: [Validation](Validation-v3.md).

### Technical evidence

**Release 3.5:** 1,742 automated checks (24 release suites plus 796/796 developer-case expectations; two suites' counts come from the test logs, see the [validation](Validation-v3.md)); browser journeys 130/130 in each of 3 runs; 100-persona simulated test 92 fully right, 8 partly right, 0 wrong (14/14 checks); official links re-requested with none missing or failing (C-12: 13/13 checks passed; a page that refuses automated clients is confirmed in a browser); 825,173 bytes (237,291 with gzip); Home usable in 5.9 s on an emulated slow connection (about 400 kbps with a 4x slower CPU, gzip as the host serves it); on DevTools "Slow 3G" with a 6x slower CPU (internal), the Hindi loading screen with the 1930 button shows in 2.4 s and Home is usable in about 8 s.

**Release 3.4 (history).** Rows marked "internal" come from test runs whose scripts and logs are not yet in this repository.

| Check (Release 3.4) | Result | Limit |
|---|---|---|
| Browser journey suite | 130/130 in each of 3 runs, no runtime errors | Headless Edge on a desktop, not every device or browser |
| Complaint routes, rights cards and sources | 39/39: every new step, tip, rights card and source in both languages; button hints on a 360-pixel phone | 15 new sources awaited the named reviewer |
| Privacy notes, security policy, version line | 27/27, including no policy violation next to a simulated copy of the host's script; three deliberately broken builds caught | The host's own headers cannot be set from the page |
| Complaint-route test (40 stories by a separate AI agent; internal) | Main authority 39/40; all expected authorities 34/40 with the buttons an AI agent acting as a first-time user chose, and 37/40 with the correct buttons (Release 3.3: 35, 25 and 26) | The stories guided the changes, so this is a regression test |
| Own-words parser | 176 checks, including own-words cases in three languages, return maths and every Before-you-pay combination | Keyword rules miss unusual phrasing |
| Content validator; Owner Studio end to end | 166 tests; 124 checks | Known risks only; local, single-user editor |
| Developer cases | 449/449 expectations | Written during development, so not an accuracy measure |
| Boundary set written by a different AI model | 38/38 | Small |
| Other suites | Integrated static and parity checks 13/13; review-fix replays 22/22; feature journeys 23/23; Home, sharing and pilot session 19/19; app layout 31/31 (every page fits 320–390-pixel phones in both languages at normal, large and 200% text); persona plans and reliability 26/26; 100-persona test 14/14 | Scripted journeys in a headless browser |
| Official links (internal) | 45 of 46 opened automatically on 2 October 2026; the IEPF claimants' FAQ refuses automated clients and was checked in a browser | Pages change; RBI's site may show a language chooser first |
| Size and speed | 561,637 bytes (164,699 with gzip). Simulated slow network (400 ms latency, 50,000 bytes/s, 4× CPU): median 12,242 ms uncompressed, 4,260 ms gzip-served. Home usable in 1.7 s (slow 4G), 4.7 s (weak 3G) and 8.4 s (2G) (internal) | Desktop simulation, not a physical phone |

All 22 Release 3.4 suites (848 checks) plus the 449 developer-case expectations make the 1,297 automated checks in [`Release-3.4-Verification.json`](../evidence/Release-3.4-Verification.json). Two suites are recorded there as passed without a count; their counts come from the test logs ([details](Validation-v3.md)).

**Build and maintenance.** The build is reproducible: the same sources give a byte-identical file, whose SHA-256 is in the release record. The validator refuses missing Hindi or English, links outside the official-domain allowlist, unknown or hidden sources, a route that escalates outside its scope, a packet that does not say "not submitted", helpline numbers that are not on the approved list, and anything that looks like a password or key.

## S.05 Demonstration

**Video:** [watch it here](https://himanshi252005.github.io/Niveshak-Saathi/demo/) (4 min 58 s; the brief asks for 3–5 minutes). It was recorded automatically from Release 3.5 on 3 October 2026, before the menu turned emerald and light became the default, on a phone-sized screen, with English and Hindi captions, using fictional data only. No helpline is called and no complaint is filed.

| Time | Who and where | What it shows |
|---|---|---|
| 0:00–0:08 | Title | A Hindi-first investor-safety and grievance companion: one offline file; nothing leaves the phone |
| 0:08–0:47 | Kavita, Check a message | A WhatsApp "pakka IPO allotment" offer: High risk with six warning signs explained in Hindi, and the promised 20% a month in plain numbers |
| 0:47–1:24 | Kavita, Before you pay | IPO, asked in a WhatsApp group, to a UPI ID: STOP, because IPOs are applied for only through ASBA; the 30-second pause; SEBI's "@valid" UPI IDs |
| 1:24–1:58 | Kavita, Get urgent help | What if she had already paid: she types what happened in Roman Hindi, the answers fill in, and the plan puts the bank and 1930 first, then freezing online access to her trading account (no call is made) |
| 1:58–2:30 | Kavita, Where to complain | The bank first, then the RBI Ombudsman after 30 days; the step-by-step guide with official sources; the free helplines |
| 2:30–3:03 | Babulal, old shares | The company or its registrar first, then the IEPF-5 guide with its tick-only paper list; no agent is needed |
| 3:03–3:33 | Babulal, Family asset map | A mutual fund by name only, nominee "not sure", and the link to the nominee guide |
| 3:33–4:08 | Praveen, Check a message (English) | A Telegram F&O tip that pushes borrowing: High risk and SEBI's study card |
| 4:08–4:45 | Offline and trust | Network off: an ordinary message gets no warning but "not proof of safety"; sources and privacy; the dark theme from the mint menu; the version line |
| 4:45–4:58 | What the tests show | blind-v9 fraud warned 87.5%; 1,742 engineering checks; synthetic tests only; next step: a pilot with real, consenting users |

**Operator script for a live demonstration** (fictional inputs only)
1. Clear the session (More tools). On Home, choose "Got a suspicious message?", press "Try a suspicious example" ("संदिग्ध उदाहरण देखें" in Hindi), then Check. Show the verdict, the reasons, "How the risk level was decided" and "Warn my family".
2. Open "Before you pay". Choose IPO, a group and a UPI ID, and enter `profitking.demo@ybl`: STOP. Then choose a trading app, "my own broker's app" and `abc.brk@validhdfc`: VERIFY, with SEBI Check and the green-triangle sign.
3. Press "Get urgent help" in the top bar, type the Roman-Hindi sentence above, press "Fill in the answers for me" and show the plan. Do not call 1930.
4. In "Where to complain", choose Bank, then "complained" and "waiting". Show the RBI rule, then open the step-by-step guide.
5. On "Rights and help", show the helplines, open the IEPF-5 guide and tick two papers.
6. In "Family safety", add two rows to the Family asset map, type a number into the name field to show the block, remove it, and download the list.
7. Optional: in "Prepare a complaint", enter fictional facts with "OTP ४८२९१३", show that saving is blocked, then mask it.
8. Save the offline copy, turn the network off and repeat a check.
9. Clear the session, and delete the downloaded files from the device.

## S.06 Impact

### Who benefits

- **First-time and small investors in Tier-2 and Tier-3 India, and their families,** as in the brief:
  - young traders like Praveen get a pause, and the facts, before paying for tips or trading on borrowed money;
  - family savers like Kavita get a Hindi check before paying a fake IPO or Ponzi scheme, and a way to warn the family;
  - pensioners like Babulal get free, official steps for IEPF-5 and SCORES, the nominee process, and a family list so heirs can find the holdings.
- **The people who help them:** family members, investor-awareness volunteers and community facilitators, who can share one offline file.

### What harm it aims to reduce

These are the mechanisms. None has yet been measured with real users.

| Harm | How the app reduces it |
|---|---|
| Paying a scammer | Before you pay gives STOP with the official way to check; the message check names the warning signs before any money moves |
| Losing the first hours after fraud | Get help now puts the bank and 1930 first. Speed matters: under the national Citizen Financial Cyber Fraud Reporting and Management System, set up in 2021 for immediate reporting of financial fraud, more than ₹11,158 crore had been saved in more than 32.80 lakh complaints by 30 June 2026 (PIB, Ministry of Home Affairs, 21 July 2026, release 2287039) |
| Paying "recovery agents" | The IEPF-5 guide shows that the claim is filed online by the investor and that no agent is needed or appointed; Get help now says never to pay a "recovery" fee |
| Complaints that go nowhere | The right office, its time limits, sourced step-by-step guides and helplines in regional languages |
| Holdings the family cannot find | The Family asset map, the nominee guide, and routes to UDGAM, MITRA and IEPF for unclaimed money |
| Borrowing to trade F&O | SEBI's F&O loss study appears whenever tips, borrowing or F&O are found |

### How it scales in Tier-2 and Tier-3 India

- **Small and phone-first:** one 825,173-byte file, 237,291 bytes with gzip (GitHub Pages sent 246,254 on 3 October 2026); Home usable in 5.9 s on an emulated slow connection (about 400 kbps with a 4x slower CPU, gzip as the host serves it); on DevTools "Slow 3G" with a 6x slower CPU (internal), the Hindi loading screen with the 1930 button shows in 2.4 s and Home is usable in about 8 s. Once saved, it works with no network at all.
- **Spreads without accounts:** the link or the file can be forwarded on WhatsApp, and "Warn my family" spreads warnings without tracking anyone.
- **Language reach without unreviewed translation:** Hindi first, English one tap away. Users of other languages are pointed to official helplines that speak their language: SEBI in seven languages, RBI 14448 in English, Hindi and ten regional languages, and IRDAI in Hindi, English and other major languages.
- **No cost per user:** no servers, accounts, message database or inference. At Release 3.5's size (237,291 bytes with gzip), 16 crore one-time downloads would be about 38.0 TB before caching. That is a planning figure, not a load test ([scale plan](SCALE-AND-RELIABILITY.md)).
- **Maintained by content owners, not programmers:** the Owner Studio edits and validates every bilingual text and source; each source carries a review date.
- **Distribution:** investor-awareness programmes, community volunteers and families could share the file. No partner has been signed.
- **Remaining real costs:** source review, native-language review, device and accessibility testing, and support.

### Measuring it

- **Built in:** a facilitator Pilot session (More tools, on a link ending in `?pilot=1`) that reads the consent script, times six fictional scenarios, records the scores and downloads anonymous rows in the exact `Pilot-Results.csv` columns.
- **Ready to run:** a protocol for 24 consenting adults, 8 per persona (none recruited yet), with matched tasks: official pages first versus the app first ([Operations and pilot kit](Operations-and-Pilot-Kit.md)).
- **Targets, not results:** at least 80% correct routes, at least 90% understanding that "no known signs" is not proof of safety, at least 80% completion without help, and at least 30% lower median time to the next action. `Pilot-Results.csv` is blank; no participant data has been invented.

**Not yet proven:** avoided fraud or loss, real-user understanding, native-speaker quality of the Hindi, and performance at national traffic.

## How the product meets the judging criteria

| Criterion (weight) | What the product does | Evidence | Not yet proven |
|---|---|---|---|
| **Resilience & Safety Impact (30%)** | STOP before paying; message check; bank and 1930 first; the right office with time limits; sourced guides; Family asset map | Sealed set blind-v9, scored once: checker 3.5 warned 87.5% of fraud (3.3: 82.5%) and 72% of subtle fraud; complaint-route test 39/40 main authority (Release 3.4, internal) | No real-user outcome study; money saved not measured; 10 of 80 frauds missed and 12.2% of ordinary messages warned on blind-v9 |
| **Tier-2/3 Usability (25%)** | Hindi first, English one tap away; large choices in everyday words; a six-page menu; Paste button and keyboard-microphone tips instead of typing; persona plans; read-aloud; large text; offline copy; official helplines in regional languages | Every page fits 320–390-pixel phones in both languages (app layout suite C-18, 38/38 in Release 3.5); WCAG AA contrast in the light and dark themes (C-27); about 246 KB to download (gzip, live link); Home usable in 5.9 s on an emulated slow connection (gzip) | Native Hindi review; physical low-end phones; only two languages in the app; voice input only through the phone keyboard's microphone |
| **Guardrails & Trust (15%)** | No commerce or tips; nothing saved or sent; every step sourced and dated, with "review pending" where the reviewer has not confirmed; in-page security policy; uncertainty shown | Privacy and security checks; no network request in tested journeys except the app's own page for "Save offline copy" and "Share this app" | Independent security audit; confirmation of pending sources |
| **Technical Execution (15%)** | Explainable on-device model with safety floors and abstention; keyword-based parser; validated, reproducible single-file build | Sealed sets with intervals; 1,742 automated checks | A consented, representative real-message corpus; colloquial Hindi coverage |
| **Feasibility & Scalability (15%)** | Static file with no inference cost; Owner Studio; pilot kit; open licences | Transfer arithmetic; validated content pipeline | No load test, partner or pilot yet |

No judging score is guaranteed. The evidence above comes from automated checks, not from users.

## Guardrails, privacy and governance

- **No commerce:** no stock tips, broker or product promotion, commissions, ads, referrals or upsells. Unsolicited tips and "operator" calls are flagged as warning signs.
- **No data access:** no SMS, inbox, contacts or accounts are read; the only file the app opens is a family list the user chooses to reopen. Voice input goes only through the phone's own keyboard; there is no in-app recording.
- **Nothing saved:**
  - the app itself saves nothing and never sends what you type;
  - the live link (GitHub Pages) sets no cookies, measured on 2 October 2026; a second copy on the earlier host (the first Release 3.5 build, with checker 3.3) sets three cookies of its own and adds a bot-check script. The app neither sets nor reads cookies, and the offline copy has none;
  - downloaded files stay on the device and must be deleted separately ([privacy](../PRIVACY.md)).
- **Transparent about uncertainty:** "No known signs" never means safe; "Not sure" never guesses a regulator; Before you pay says it cannot confirm who owns an ID; the checker shows how it decided.
- **Official sources:** 57 official sources are shown in the app, from SEBI, RBI, NPCI, IRDAI, IEPF, PFRDA, MHA/I4C, DoT (Sanchar Saathi), PIB and others. Each says exactly what it supports and when it was reviewed; the guidance snapshot is 2 October 2026 and the next review is due on 1 November 2026. 31 sources were checked against the official page during development but are not yet confirmed by the named reviewer, Himanshi Rathore, so the app shows them as "review pending". (In Release 3.4 every source showed her name, including 15 she had not yet confirmed.)
- **Reviews:** before Release 3.0, three reviews by separate AI agents covered content accuracy and Hindi, complaint-packet privacy, and security and accessibility. Every advice-changing finding was checked against the official text before editing. The corrections included the RBI Ombudsman's 90-day filing window; the SCORES one-year limit and 15-day reviews; SMART ODR arbitration fees; UPI fraud going to the bank first; SEBI's 29 May 2026 nomination circular replacing the 2024 one; paper shares converted through a DP; an unverifiable claim about pension systems removed; and plainer Hindi.
- **Locks in code:** links must be on official domains, and helpline numbers must be on an approved list (1930, 14448, 1800 266 7575, 1800 22 7575, 155255, 1800 425 4732, 14453). The build refuses anything else.
- **Open and correctable:** code under MIT, original text under CC BY 4.0, with reuse terms that forbid ads, referrals, upsells, trading or account-opening funnels for any copy using the project's name ([CONTRIBUTING](../CONTRIBUTING.md)). Corrections go through GitHub Issues; security reports through [SECURITY](../SECURITY.md).

## Judge Q&A

**How accurate is it?** We report each release's sealed-set result with intervals, including where a new checker was worse or no better and was not shipped. What is and is not published is listed in [S.04](#evaluation).
- **Release 3.5, fresh set blind-v9 (scored once, checker 3.5):** fraud warned 87.5% [78.5–93.1]; fraud or suspicious 80% [71.6–86.4]; ordinary messages warned 12.2% [7–20.6].
- **Release 3.4, blind-v8:** 60.9% [51.6–69.5] of fraud or suspicious messages warned, the same measure as the earlier sets (67.5% [56.6–76.8] for fraud alone); 13.3% [7.8–21.9] of ordinary messages warned, all of them tricky look-alikes; none of the 40 everyday messages. Release 3.4 missed all three of its checker targets.
- The sets are synthetic and written by AI, so they are not a measure of real-world accuracy. No checker is perfect, so "No known signs" never means safe.

**Is this AI?** Yes, used carefully. The checker is an on-device statistical model over explainable signals, with fitted weights, safety floors and abstention, and "Get help now" uses an on-device keyword-based parser. No cloud model is involved, so it is private, free to run and checkable. The team also built the app with AI coding assistants; every advice change was checked against an official page.

**Why only Hindi and English?** Depth and reviewed accuracy instead of unreviewed machine translation. Users of other languages are pointed to official helplines that speak their language, and a message in another language gets an "outside coverage" note, never a safe verdict.

**How do you keep the advice current?** Every source shows its review date, and unconfirmed sources show "review pending". The owner updates content in the local Studio, the build validates it, and sources are reviewed monthly.

**What happens to my data?** Nothing is saved or sent by the app, and the live link sets no cookies. The details, including the second copy's host cookies, are in [PRIVACY](../PRIVACY.md).

**Have you proved impact?** No. Measurement is built in and a pilot is prepared. Practice scores and sealed-set results are not evidence of money saved.

**Can it recover money?** No. It speeds up the correct official action. Institutions and authorities decide outcomes.
