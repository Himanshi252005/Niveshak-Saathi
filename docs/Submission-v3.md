# Niveshak Saathi: Release 3.5 submission
## Sangyan public-good hackathon, Track B: Investor Awareness, Rights & Grievance

**Promise:** help a first-time Indian investor stop a fraud before money leaves, act correctly in the first hours if it already has, and use their rights and the official complaint routes without paying an agent. Hindi first, with English one tap away.

> check the message → check before paying → stop immediate harm → find the right office → follow the official steps → protect the family → build the habit

**Status (2 October 2026)**
- **Release 3.5** is the build in this repository: 661,710 bytes, SHA-256 `175BD9D4ADDD6F6B517C39CC6582D96C553157F712080812C75D710269E86E1C`. 1,346 automated checks passed: 23 release suites plus the developer cases ([release record](../evidence/Release-3.5-Verification.json)).
- **The live link serves Release 3.3** until it is redeployed ([delivery status](Delivery-Status.md)). It does not have the Release 3.4 and 3.5 features described here.
- **Release 3.4** was verified but never deployed. Its results are kept below as history.
- **No real-user study or pilot** has been run. Every accuracy figure comes from synthetic test sets.
- **An independent educational product,** not affiliated with SEBI, RBI, IRDAI, the IEPF Authority, PFRDA, NPCI or any institution.

**On this page:** [S.01 Product](#s01-product) · [S.02 Problem](#s02-problem-definition) · [S.03 Solution](#s03-solution) · [S.04 Technology](#s04-technology) · [S.05 Demonstration](#s05-demonstration) · [S.06 Impact](#s06-impact) · [Judging criteria](#how-the-product-meets-the-judging-criteria) · [Guardrails](#guardrails-privacy-and-governance) · [Q&A](#judge-qa)

## S.01 Product

A working prototype: one self-contained HTML file that runs in a phone or desktop browser, in Hindi and English, with no installation, account, server or API key.

| How to try it | What you get |
|---|---|
| Download [`prototype/dist/index.html`](../prototype/dist/index.html) and open it in Chrome or Edge | **Release 3.5**, with every feature on this page |
| [Live link](https://niveshak-saathi-safety.himanshirathore25102.chatgpt.site) | **Release 3.3** until it is redeployed: no Rights and help page, Family asset map, rights cards or step-by-step guides |
| Demo video | being recorded; the link will be added here when it is published |

- **Language:** the app opens in Hindi. To switch to English, use the language menu at the top right.
- **Home** asks one question, "What do you need help with?", with large choices in everyday words and three persona plans.
- **The menu** groups the tools under "Check before you act", "If something went wrong", "Know your rights" and "Learn and protect". A "Get urgent help" button stays in the top bar.
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
   - RBI Sachet checks deposit schemes.

### If something went wrong

3. **Get help now (emergency mode).** It opens with a "Call 1930 now" box.
   - The user types or dictates what happened, for example "maine UPI se 5000 bhej diye aur OTP bhi bata diya". An on-device keyword-based parser fills in the answers for the user to check.
   - The ordered plan starts with stopping contact if it is still happening, then the bank or payment provider and 1930. It goes on to removing remote-access apps, refusing any "recovery fee", reporting the message on Chakshu and keeping evidence. For UPI fraud it sends the user to the bank, because UPI Help takes no complaint on a completed person-to-person payment.
   - Recovery is never promised.
4. **Where to complain.** Ten routes, with official time limits where they apply, for example:
   - RBI Ombudsman: wait 30 days for the bank, then file within 90 days;
   - SCORES: within one year, reviews within 15 days, SMART ODR at any point;
   - Insurance Ombudsman: within one year; PFRDA's levels for pensions.

   Each button carries a one-line hint, and routes show sourced "Also check" tips: police or the State Economic Offences Wing and RBI Sachet for chit, deposit and Ponzi schemes; RBI UDGAM, SEBI MITRA and IRDAI Bima Bharosa for unclaimed money; frozen accounts after a cyber complaint; loan-app harassment; unexplained monthly debits. A bank, insurance or pension complaint is never sent to SEBI, and "Not sure" never guesses. **New in Release 3.5:** each route links to its step-by-step guide.
5. **Prepare a complaint (private Action Packet).**
   - The complaint essentials are checked.
   - OTPs, PINs, passwords, CVVs and card numbers are found, including Hindi digits, invisible characters and SMS phrasing. They block saving until masked, and masking can be undone.
   - Changing an answer marks the packet out of date, and the packet says it has not been submitted.

### Know your rights (new in Release 3.5)

6. **Rights and help.** Home card "अपने अधिकार जानें / Know your rights"; in the menu, "Know your rights", then "Rights and help".
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

**Also:** read-aloud with the phone's own voice, large text, phone layouts and a working phone Back button. A **Pilot session** for facilitators sits under More tools. The **Owner Studio** is a local editor, never part of the public app (its file is in the repository), where the content owner edits all bilingual content, sources, guides and plans; the build validates every change.

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

- **Warning signs:** English, Hindi and Roman-Hindi rules for categories such as certain returns, pressure, personal accounts, credential and remote-access requests, chat groups, borrowing, release fees, app installs, money multiplication, impersonation, threats and "digital arrest", unsolicited tips, suspicious links, fake IPO access and fee-charging recovery offers. Caution handling means "never share your OTP" is not read as an OTP request.
- **Risk score:** an L2-regularised logistic regression over the category flags, fitted on labelled development messages, with weights rounded for readability. The fitting script is not yet published. The weights and thresholds are in `engine.js` and shown to the user under "How the risk level was decided". In model 3.2 and checker 3.3, every sign weighs at least 1.5 and the High threshold (0.65) works out to a rule anyone can check: High means a safety floor, any two different signs, or one strong sign; one moderate sign gives Caution.
- **Safety floors:** once recognised, a release fee, a credential request, a fee-charging recovery offer and a threat with a payment demand always give High.
- **Five reliability states:** strong warning agreement, several signs agree, one sign, outside language coverage, and insufficient evidence. The last two abstain; no state calls a message safe.
- **Insights:** compounded return maths, link analysis (shorteners, app files, bare IP addresses, lookalike addresses) and masked payee details.
- **Speed:** about 1 ms per ordinary message, fully on the device (Release 3.4 tests).

**Checker in Release 3.5:** checker 3.3, unchanged from Release 3.4. An upgraded checker for Hindi and Hinglish scams aimed at the three personas is in development; it will be measured once on the fresh sealed set blind-v9 (200 messages, sealed 2 October 2026) before it can ship.

**The own-words parser** in "Get help now" is keyword-based, not a language model. It reads English, Hindi and Roman Hindi and pre-fills answers that the user confirms. Unusual phrasing can be missed.

**Why no large language model?**
- A model whose every warning can be explained and checked against a source is more trustworthy for this audience than a cloud model.
- It costs nothing to run, works offline and never uploads a message.
- A generative model would have to beat it on the same sealed evaluation, with an abstention path.

### Evaluation

- **Sealed sets:** each set is written by a separate AI agent that never saw the code, the tests or earlier sets. It is scored once for the checker it was written to test, and becomes development data after that.
- **Intervals:** results are shown with 95% intervals. Sets differ in mix and difficulty, so compare checkers on the same set, not across sets.
- **What is published:** the messages and scores of blind-v5, v6 and v8, and the scores of the first two 320-message sets, blind-v3 and v4. One more set, blind-v7, guided the Release 3.4 candidate checker and is not published.

| Sealed set (messages) | Release and checker | Fraud or suspicious warned | Fraud warned | Ordinary warned |
|---|---|---:|---:|---:|
| blind-v9 (200 messages) | upgraded checker, when frozen | not yet scored | not yet scored | not yet scored |
| blind-v8 (200) | 3.4, checker 3.3 | 60.9% [51.6–69.5] | 67.5% [56.6–76.8] | 13.3% [7.8–21.9] |
| blind-v6 (120) | 3.3, checker 3.3 | 87.1% [77.3–93.1] | 94.0% [83.8–97.9] | 24.0% [14.3–37.4] |
| blind-v5 (320) | 3.2, model 3.2 | 72.4% [65.7–78.2] | 79.7% [71.9–85.7] | 8.6% [4.9–14.7] |

**Release 3.4 history, told straight:**
- On blind-v8 the shipped checker 3.3 caught only 5 of 25 subtle frauds. Babulal-type messages (pensions, life certificates, dormant folios) were caught least often: 39.3% [23.6–57.6] of his fraud or suspicious messages. None of the 40 everyday ordinary messages was flagged.
- **Missed targets:** Release 3.4 aimed for fraud warned ≥85%, ordinary warned ≤8% and subtle fraud warned ≥70%. All three were missed. One complaint-route target was also missed: an AI agent acting as a new first-time user picked the expected button in 36 of 40 stories, against a target of 37.
- A candidate checker built to cut false alarms was no better on blind-v8 (fraud warned 63.8% [52.8–73.4]; ordinary warned 11.1% [6.1–19.3]), so Release 3.4 kept checker 3.3. In [`Blind-Evaluation-v8.json`](../evidence/Blind-Evaluation-v8.json), the key "v3.4" is that candidate and "v3.3" is the checker shipped in Release 3.4.

Full tables, by language and persona: [Validation](Validation-v3.md).

### Technical evidence

**Release 3.5:** 1,346 automated checks (23 release suites plus 449/449 developer-case expectations); browser journeys 130/130 in each of 3 runs; 100-persona simulated test 92 fully right, 8 partly right, 0 wrong (14/14 checks); official links every official link re-opened by the integrated suite (C-12: 13/13 checks passed); 661,710 bytes (191,146 with gzip); Home usable in 4.9 s on an emulated slow connection (about 400 kbps with a 4x slower CPU, gzip as the host serves it); on DevTools "Slow 3G" the Hindi loading screen with the 1930 button shows in 2.5 s.

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

**Video:** being recorded; the link will be added here when it is published. The brief asks for 3–5 minutes; the script below runs about 4 minutes 30 seconds. It is recorded on Release 3.5 on a phone-sized screen, with Hindi screens and English subtitles, using fictional data only. No helpline is called and no complaint is filed.

| Time | Who and where | What it shows |
|---|---|---|
| 0:00–0:20 | Kavita, Home | A WhatsApp "VIP group" promises a guaranteed IPO allotment and asks her to pay a UPI ID today. Home in Hindi; the language menu at the top right |
| 0:20–0:55 | Check a message | The Hindi example: High risk, the reasons (guaranteed return, fake IPO allotment, chat group, pressure), "10% a month" in plain numbers; "Warn my family" |
| 0:55–1:25 | Before you pay | IPO, a group and the UPI ID `profitking.demo@ybl`: STOP, because everyone applies for an IPO through ASBA and nobody can sell an allotment, and SEBI warns about "VIP" groups. Then a broker's own app and `abc.brk@validhdfc`: VERIFY, with the "@valid" rule and SEBI Check |
| 1:25–1:55 | Get help now | "maine UPI se 5000 bhej diye aur OTP bhi bata diya", dictated with the keyboard's microphone; the answers fill in; the plan puts the bank and 1930 first. 1930 is not dialled |
| 1:55–2:20 | Where to complain | Bank → the RBI 30-day and 90-day rule → the linked step-by-step guide for the RBI Ombudsman |
| 2:20–3:00 | Babulal, Rights and help | The free helplines and their languages; the IEPF-5 guide: each step's official source, "no agent is needed", the tick-only paper list, "Download this guide" |
| 3:00–3:35 | Babulal, Family asset map | Two rows (a bank account; demat shares with "No nominee"). Typing a number in the name field blocks saving. The next-step button "How to add a nominee for shares and mutual funds" opens the nominee guide. Download the list; "nothing is saved" |
| 3:35–3:55 | Praveen, Check a message | A Telegram F&O tip: High risk and SEBI's F&O loss study card |
| 3:55–4:15 | Offline | Network off: the saved copy checks a message again; "How the risk level was decided" |
| 4:15–4:30 | Close | Synthetic tests only, misses published, no real users yet; next step: a consented pilot |

**Operator script** (fictional inputs only)
1. Clear the session (More tools). On Home, choose "Got a suspicious message?", press "See example" in Hindi, then Check. Show the verdict, the reasons, "How the risk level was decided" and "Warn my family".
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

- **Small and phone-first:** one 661,710-byte file, 191,146 bytes when served with gzip; Home usable in 4.9 s on an emulated slow connection (about 400 kbps with a 4x slower CPU, gzip as the host serves it); on DevTools "Slow 3G" the Hindi loading screen with the 1930 button shows in 2.5 s. Once saved, it works with no network at all.
- **Spreads without accounts:** the link or the file can be forwarded on WhatsApp, and "Warn my family" spreads warnings without tracking anyone.
- **Language reach without unreviewed translation:** Hindi first, English one tap away. Users of other languages are pointed to official helplines that speak their language: SEBI in seven languages, RBI 14448 in English, Hindi and ten regional languages, and IRDAI in Hindi, English and other major languages.
- **No cost per user:** no servers, accounts, message database or inference. At Release 3.4's size, 16 crore one-time downloads would be about 26.4 TB before caching. That is a planning figure, not a load test ([scale plan](SCALE-AND-RELIABILITY.md)).
- **Maintained by content owners, not programmers:** the Owner Studio edits and validates every bilingual text and source; each source carries a review date.
- **Distribution:** investor-awareness programmes, community volunteers and families could share the file. No partner has been signed.
- **Remaining real costs:** source review, native-language review, device and accessibility testing, and support.

### Measuring it

- **Built in:** a facilitator Pilot session (More tools) that reads the consent script, times six fictional scenarios, records the scores and downloads anonymous rows in the exact `Pilot-Results.csv` columns.
- **Ready to run:** 24 consenting adults across the three personas, with matched tasks: official pages first versus the app first ([Operations and pilot kit](Operations-and-Pilot-Kit.md)).
- **Targets, not results:** at least 80% correct routes, at least 90% understanding that "no known signs" is not proof of safety, at least 80% completion without help, and at least 30% lower median time to the next action. `Pilot-Results.csv` is blank; no participant data has been invented.

**Not yet proven:** avoided fraud or loss, real-user understanding, native-speaker quality of the Hindi, and performance at national traffic.

## How the product meets the judging criteria

| Criterion (weight) | What the product does | Evidence | Not yet proven |
|---|---|---|---|
| **Resilience & Safety Impact (30%)** | STOP before paying; message check; bank and 1930 first; the right office with time limits; sourced guides; Family asset map | blind-v9: not yet scored (it waits for the upgraded checker). Release 3.5 ships checker 3.3: blind-v8 60.9% [51.6–69.5] fraud or suspicious warned; complaint-route test 39/40 main authority (Release 3.4, internal) | No real-user outcome study; money saved not measured; subtle scams often missed |
| **Tier-2/3 Usability (25%)** | Hindi first, English one tap away; large choices in everyday words; persona plans; read-aloud; large text; offline copy; official helplines in regional languages | Every page fits 320–390-pixel phones in both languages (Release 3.4); 191,146 bytes to download with gzip; Home usable in 4.9 s on an emulated slow connection (gzip) | Native Hindi review; physical low-end phones; only two languages in the app; no in-app voice input |
| **Guardrails & Trust (15%)** | No commerce or tips; nothing saved or sent; every step sourced and dated, with "review pending" where the reviewer has not confirmed; in-page security policy; uncertainty shown | Privacy and security checks; no network requests in tested journeys | Independent security audit; confirmation of pending sources |
| **Technical Execution (15%)** | Explainable on-device model with safety floors and abstention; keyword-based parser; validated, reproducible single-file build | Sealed sets with intervals; 1,346 automated checks | A consented, representative real-message corpus; colloquial Hindi coverage |
| **Feasibility & Scalability (15%)** | Static file with no inference cost; Owner Studio; pilot kit; open licences | Transfer arithmetic; validated content pipeline | No load test, partner or pilot yet |

No judging score is guaranteed. The evidence above comes from automated checks, not from users.

## Guardrails, privacy and governance

- **No commerce:** no stock tips, broker or product promotion, commissions, ads, referrals or upsells. Unsolicited tips and "operator" calls are flagged as warning signs.
- **No data access:** no SMS, inbox, contacts, documents or accounts are read. Voice input goes only through the phone's own keyboard; there is no in-app recording.
- **Nothing saved:**
  - the app itself saves nothing and never sends what you type;
  - the public link's host (Cloudflare) sets three cookies of its own, measured on 2 October 2026: `__Host-appgarden-visitor` (90 days), `cf_clearance` (365 days) and `__cf_bm` (about 30 minutes), and adds a bot-check script. The app neither sets nor reads them, and the offline copy has none;
  - downloaded files stay on the device and must be deleted separately ([privacy](../PRIVACY.md)).
- **Transparent about uncertainty:** "No known signs" never means safe; "Not sure" never guesses a regulator; Before you pay says it cannot confirm who owns an ID; the checker shows how it decided.
- **Official sources:** 55 official sources are shown in the app, from SEBI, RBI, NPCI, IRDAI, IEPF, PFRDA, MHA/I4C, DoT (Sanchar Saathi), PIB and others. Each says exactly what it supports and when it was reviewed; the guidance snapshot is 2 October 2026 and the next review is due on 1 November 2026. 29 sources were checked against the official page during development but are not yet confirmed by the named reviewer, Himanshi Rathore, so the app shows them as "review pending". (In Release 3.4 and on the live link, every source showed her name, including 15 she had not yet confirmed.)
- **Reviews:** before Release 3.0, three reviews by separate AI agents covered content accuracy and Hindi, complaint-packet privacy, and security and accessibility. Every advice-changing finding was checked against the official text before editing. The corrections included the RBI Ombudsman's 90-day filing window; the SCORES one-year limit and 15-day reviews; SMART ODR arbitration fees; UPI fraud going to the bank first; SEBI's 29 May 2026 nomination circular replacing the 2024 one; paper shares converted through a DP; an unverifiable claim about pension systems removed; and plainer Hindi.
- **Locks in code:** links must be on official domains, and helpline numbers must be on an approved list (1930, 14448, 1800 266 7575, 1800 22 7575, 155255, 1800 425 4732, 14453). The build refuses anything else.
- **Open and correctable:** code under MIT, original text under CC BY 4.0, with reuse terms that forbid ads, referrals, upsells, trading or account-opening funnels for any copy using the project's name ([CONTRIBUTING](../CONTRIBUTING.md)). Corrections go through GitHub Issues; security reports through [SECURITY](../SECURITY.md).

## Judge Q&A

**How accurate is it?** We report each release's sealed-set result with intervals, including where a new checker was worse or no better and was not shipped. What is and is not published is listed in [S.04](#evaluation).
- **Release 3.5, fresh set blind-v9:** not yet scored: the fresh sealed set blind-v9 (200 messages, sealed on 2 October 2026) will be scored once, when the upgraded checker is frozen.
- **Release 3.4, blind-v8:** 60.9% [51.6–69.5] of fraud or suspicious messages warned, the same measure as the earlier sets (67.5% [56.6–76.8] for fraud alone); 13.3% [7.8–21.9] of ordinary messages warned, all of them tricky look-alikes; none of the 40 everyday messages. Release 3.4 missed all three of its checker targets.
- The sets are synthetic and written by AI, so they are not a measure of real-world accuracy. No checker is perfect, so "No known signs" never means safe.

**Is this AI?** Yes, used carefully. The checker is an on-device statistical model over explainable signals, with fitted weights, safety floors and abstention, and "Get help now" uses an on-device keyword-based parser. No cloud model is involved, so it is private, free to run and checkable. The team also built the app with AI coding assistants; every advice change was checked against an official page.

**Why only Hindi and English?** Depth and reviewed accuracy instead of unreviewed machine translation. Users of other languages are pointed to official helplines that speak their language, and a message in another language gets an "outside coverage" note, never a safe verdict.

**How do you keep the advice current?** Every source shows its review date, and unconfirmed sources show "review pending". The owner updates content in the local Studio, the build validates it, and sources are reviewed monthly.

**What happens to my data?** Nothing is saved or sent by the app. The host's three cookies and everything else are in [PRIVACY](../PRIVACY.md).

**Have you proved impact?** No. Measurement is built in and a pilot is prepared. Practice scores and sealed-set results are not evidence of money saved.

**Can it recover money?** No. It speeds up the correct official action. Institutions and authorities decide outcomes.
