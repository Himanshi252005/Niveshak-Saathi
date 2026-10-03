# Niveshak Saathi: validation

**Build checked:** Release 3.5, on 3 October 2026 (UI-4: Home and the pitch lead with rights, the family tracker, checker 3.6): 848,230 bytes (244,877 with gzip), SHA-256 `3135FA9A24B71B0A1A4931BD83837EA851EB8C30F09B7CE82B1674EA01CFF01A`. The live link (https://himanshi252005.github.io/Niveshak-Saathi/) serves this build; a second copy on the earlier host still serves the first Release 3.5 build; it is not maintained and its removal has been requested ([delivery status](Delivery-Status.md)).

**How to read this page**
- Every accuracy figure comes from synthetic messages or AI-written personas. None comes from real users.
- A "separate AI agent" is an AI assistant working in a fresh session, with no access to the code, the tests or earlier sets. It is not a person or an outside organisation, and it may share blind spots with the AI assistants that helped build the app.
- Results marked "internal" come from test runs whose scripts or logs are not yet in this repository. The published records are in [`evidence/`](../evidence/), and the published test kits are in [`evaluation/`](../evaluation/).
- Release 3.4 and earlier results are history, kept so that each release can be compared with the one before.

**Evidence records:** [`Release-3.5-Verification.json`](../evidence/Release-3.5-Verification.json) for this release; the earlier [`Release-3.4-Verification.json`](../evidence/Release-3.4-Verification.json) and [`Release-3.3-Verification.json`](../evidence/Release-3.3-Verification.json); `Browser-Validation.json`, `Rule-Evaluation.json` and `Real-World-User-Test.json` (the 100-persona simulated test); and the sealed-set records: `Blind-Evaluation-v10.json` (checker 3.6) and `Blind-Evaluation-v9.json` (checker 3.5) for Release 3.5, `Blind-Evaluation-v8.json`, `Blind-Evaluation-v6.json` and `Blind-Evaluation.json` (blind-v3, v4 and v5).

## What changed in Release 3.5

- **UI-4 (3 October 2026, the owner's fixes after a judge-style review):**
  - **Home and the pitch lead with rights and complaints.** Home's four large choices are now "Want to complain?", "Know your rights", "Already paid, or shared your OTP?" and "Track the family's investments"; "Check a message" and "Before you pay" follow under "Check before you trust anyone"; only practice stays under "More help". The menu and the phone dock put complaints and rights first too. Every page is still reached from Home.
  - **The Family asset map is a tracker.** A progress line counts the nominees added and who in the family knows. "Remember this list on this phone", off unless the user turns it on, keeps the list in that browser (the fixed choices and names only; a name that looks like a number, e-mail address or PAN is never kept), so it comes back on the next visit. Turning it off, "Forget" or "Clear this session" deletes it. A copy opened from a file never keeps it, because the browser may share storage between files.
  - **Checker 3.6** removes false alarms on ordinary messages (a gas-cylinder delivery code, "you never need a PIN", "unhone na OTP maanga", a denied withdrawal fee, an IEPF claim "approved", money already credited, a trade confirmation, documents to the company's Registrar, a friend's warning, a bank's assurance); each exception is cancelled by a phone number, a link, an amount due or a request. On the earlier sealed sets, now development data, it removed all 11 of checker 3.5's false alarms on blind-v9 and changed nothing else; 46 new developer cases (12 ordinary, 34 frauds written right next to each exception). It was then measured once on the fresh sealed set blind-v10 (below) and ships.
  - **Recorded Hindi voice for the key steps: prepared, not yet recorded.** This computer has no Hindi voice, and a person's voice is more trustworthy than a synthetic one, so eight key lines (1930 and the bank, stop contact, no recovery fee, keep evidence, SCORES, IEPF-5 with no agent, adding a nominee) are taken word for word from the app's reviewed content into a recording script, with a private recorder page and a player that plays the recordings offline on any phone. Until the recordings exist the app is unchanged, and read-aloud uses the phone's own voice.
  - **New suite C-28 (31/31):** the rights-first Home, menu and dock; the tracker (off by default, nothing kept before the switch, one key, choices and names only, never a number, e-mail or PAN, back after a reload, deleted by Forget, the switch and Clear this session, damaged data ignored, blocked storage and file copies handled, Hindi on a phone, no request leaves the page); and checker 3.6 in the app (the LPG code shows no warning; the same code sent to a phone number is High).
- **Rights and help page.** Home has a new card under "More help", "अपने अधिकार जानें / Know your rights", and the menu a new page, "अधिकार और मदद / Rights and help". The page holds:
  - **free official helplines that speak regional languages:** SEBI 1800-266-7575 or 1800-22-7575 (English, Hindi, Marathi, Gujarati, Tamil, Bengali and Telugu; 9 am–6 pm except Sundays and Maharashtra public holidays); RBI Contact Centre 14448 (English, Hindi and ten regional languages; it explains how to complain and cannot take complaints); IRDAI grievance call centre 155255 or 1800 425 4732 (8 am–8 pm, Monday to Saturday; Hindi, English and other major languages); the IEPF helpdesk 14453; cybercrime 1930;
  - **five step-by-step guides,** every step sourced to an official page: SEBI SCORES; an IEPF-5 claim, with a tick-only checklist of the papers needed; the RBI Ombudsman; insurance complaints (insurer, IRDAI, Insurance Ombudsman); adding a nominee. Each guide can be downloaded as a text file;
  - **all 8 rights cards,** grouped by institution, each with "Where to complain about this".

  Complaint routes now link to the matching guide. Nothing on the page asks the user to type, and ticks are not saved.
- **Family asset map** in Family safety (Track B "Nominee & Family Wealth Tracker"). Each row records the type of investment, the institution's name, nominee status, where the papers are kept and who in the family knows. The institution's name is the only typed field, and numbers, e-mail addresses and PAN are blocked. The list can be downloaded, printed and reopened from the downloaded file on the phone. (Since UI-4 it can also be remembered on the phone if the user chooses; see above.) Shares or mutual funds without a nominee link to the nominee guide.
- **"Review pending" labels.** Sources checked against the official page during development but not yet confirmed by the named reviewer (Himanshi Rathore) now show "review pending". In Release 3.4 every source showed her name, including 15 she had not yet confirmed.
- **Privacy notes.** The app's privacy note now names the host it was opened from: on the live link it says GitHub Pages sets no cookies; on any other host it says the host may set its own; in the offline copy it says there is no host. The documents name the three cookies the earlier host sets (`__Host-appgarden-visitor`, 90 days; `cf_clearance`, 365 days; `__cf_bm`, about 30 minutes) instead of "one short-lived security cookie". The app itself still sets and reads none ([privacy](../PRIVACY.md)).
- **Public-good files:** an MIT licence for the code, CC BY 4.0 for original text, reuse terms, a security policy and a privacy page.
- **Simpler menu:** six everyday pages stay in the menu (since UI-4: Home, Where to complain, Rights and help, Get help now, Check a message, Before you pay); the other four sit under "More pages", which opens by itself when one of them is in use.
- **Input without typing:** a "Paste the message" button fills the check box in one tap from a message copied in WhatsApp or SMS, and the message box, the "Get help now" box and the complaint box say that the phone keyboard's microphone can be used; text boxes tell the keyboard which language to expect. For a message that arrived as a picture, a tip explains how to copy its words with the phone's gallery and paste them. The app adds no speech or image reading of its own.
- **Open fitting:** the script that fitted the checker's weights is published with its input table (categories found and label per message, no message text); given the hand-chosen High threshold of 0.65, it reproduces the shipped weights and the Caution threshold exactly (`evaluation/fit-weights.cjs`).
- **Checker 3.5:** Hindi, Hinglish and Devanagari patterns for the three personas' scams (advance fees on "approved" money, paid recovery agents, freeze and "digital arrest" threats, document and blank-cheque requests, IPO quotas, wrong-number openers, paid VIP tips), and fewer false alarms on warnings that quote scam lines. Weights and thresholds are unchanged. The developer cases grew from 449 to 796 (347 new cases, mostly fraud and ordinary pairs that differ in one detail; the 449 earlier cases are unchanged). Frozen before blind-v9 was scored once (below).
- **From the market comparison (3 October 2026; [comparison](MARKET-COMPARISON.md)):** "not this door" notes on the SCORES routes (SCORES FAQ Q3); a "freeze online access to your trading account" step in Get help now when a login, password or OTP was shared (SEBI circular of 12 January 2024); I4C's Suspect Search in Before you pay when paying a UPI ID or a person's account, with I4C's warning that the database is not complete; and "Pause for 30 seconds" after a STOP or High-risk answer (a general safety step). The two new sources are marked "review pending".
- **Design refresh (3 October 2026):** a calm green-and-white design: white and soft-mint surfaces, deep green text, hairline cards and pill buttons, and green line drawings that draw themselves in (still for people who ask for less motion) on Home, beside each page heading and above each answer. Choices are chips; each institution's rights fold under one row; the long footer notes fold under one line. A persistent five-item phone navigation keeps Home, Check, Before you pay, Complaints and Menu in reach after every selection. Every tool is still there; repeated or decorative lines were folded or dropped (the taglines above headings, a repeated privacy line, the explanation under the optional "where did this message come from?" question, and on phones the one-line descriptions under the Home tiles, which screen readers still read).
- **Emerald menu and dark theme (3 October 2026):** the menu is emerald from top to bottom (a deeper emerald in the dark theme). The app always opens in the light theme, whatever the phone's own setting; "Dark theme" in the menu, beside "Larger text", switches for the visit to a dark theme made from the app's own emerald (deep emerald surfaces, not grey); nothing is saved, so the next visit opens light again. Line drawings keep one colour: forest green on the light page, emerald on the dark page. (Earlier the same day the menu was mint and the dark theme followed the device.) Every main screen was checked for WCAG AA contrast in both themes (C-27), which also brought text-box borders back to at least 3:1 (the design refresh had made them too faint).
- **Calmer Home:** four large choices first (since UI-4: a complaint, rights, money already sent or an OTP shared, the family tracker; then the two checks under their own heading); practice under "More help"; the three persona plans under one fold that names them; language help and the promises in one short line each.
- **Unchanged decisions:** Hindi and English only, with users of other languages pointed to the official helplines that speak their language; the app sends nothing you type. (Changed in UI-4 at the owner's request: the family list can be kept on the phone if the user chooses; nothing else is kept.)

## Release 3.5 checks

- **1,820 automated checks:** 25 release suites (978 checks) plus 842/842 developer-case expectations. Two suites, the general Owner Studio end-to-end suite and the boundary set, are recorded without a count; their 30 and 38 checks come from the test logs.
- **Browser journeys:** 130/130 in each of 3 runs.
- **100-persona simulated test** (AI-written personas; no real users): 90 fully right, 10 partly right, 0 wrong (14/14 checks).
- **Theme and contrast (C-27, 25/25):** the app always opens light, even on a device set to dark; "Dark theme" in the menu switches it for the visit and saves nothing; printing stays light; and every text and field border on 14 main screens meets WCAG AA in both themes, on a phone in Hindi and English and on a desktop.
- **Official links:** the integrated suite (C-12, 13/13 passed) re-requested every enabled official link and found none missing or failing; a page that refuses automated clients passes this check and is confirmed in a browser.
- **Size and speed:** 848,230 bytes (244,877 with gzip); Home usable in 6.5 s on an emulated slow connection (about 400 kbps with a 4x slower CPU, gzip as the host serves it; the green-and-white build before the coloured menu measured 5.7 s in an earlier, quieter session, and the side-by-side timing below shows the two builds equal); on DevTools "Slow 3G" with a 6x slower CPU (internal), the Hindi loading screen with the 1930 button shows in 2.6 s and Home is usable in about 11 s. Timings vary with the load on the test computer (the first Release 3.5 build measured 4.9 s on a quieter run). Checker 3.5 adds 29,819 bytes to the gzip download, about 0.6 s on "Slow 3G"; running its code at start-up takes about 47 ms on a 6x slower CPU, against 23 ms for checker 3.3 (internal measurement). The design refresh and the market-comparison additions add 11,445 bytes to the gzip download, about 0.2 s on "Slow 3G"; timed side by side on "Slow 3G" (median of 3 runs, internal), the Hindi screen with the 1930 button showed in 2.7 s against 2.3 s before the refresh, and Home was usable in 8.5 s against 10.1 s. The emerald menu and the dark theme add 3,127 bytes to the gzip download (about 0.1 s on "Slow 3G"); timed side by side with the green-and-white build before them (median of 3 runs, internal), the Hindi screen with the 1930 button showed in 2.4 s against 2.4 s, and Home was usable in 7.6 s against 7.5 s. UI-4 (the rights-first Home, the family tracker and checker 3.6) adds 7,586 bytes to the gzip download; timed side by side with the build before it (median of 3 runs, internal), the Hindi screen with the 1930 button showed in 2.6 s against 2.5 s, and Home was usable in 10.8 s against 8.3 s.

### Fresh sealed set (blind-v10), scored once: checker 3.6

- **Who wrote it:** a separate AI agent, on 3 October 2026, before checker 3.6 was frozen, asked for the same mix as blind-v9: 200 messages, 80 fraud (25 subtle), 30 suspicious and 90 ordinary (50 tricky look-alikes, 40 everyday); Hindi 70, Hinglish 60, English 60, mixed 10. Sealed with SHA-256 `CBDAD72DA940B80EB0010BADD94D79D1EB5FD89D0669D8493D8E334FDCA64BC4`; only its counts were checked before scoring.
- **How it was scored:** the ship rule was written before checker 3.6 was frozen (`F48E1B97151D…`); then checkers 3.5 and 3.6 were each scored exactly once on the same messages.

| Measure | Checker 3.5 | Checker 3.6 (shipped) | Paired test |
|---|---:|---:|---|
| Fraud warned (target ≥85%) | 83.8% [74.2–90.3] | 83.8% [74.2–90.3] | 3.6 caught 0 more, 3.5 0 more; p = 1 |
| Fraud at High | 70% [59.2–78.9] | 70% [59.2–78.9] | 0 against 0; p = 1 |
| Subtle fraud warned (target ≥70%) | 16/25 | 16/25 = 64% [44.5–79.8] | |
| Suspicious warned | 56.7% [39.2–72.6] | 56.7% [39.2–72.6] | |
| Fraud or suspicious warned | 76.4% [67.6–83.3] | 76.4% [67.6–83.3] | 0 against 0; p = 1 |
| Ordinary messages warned (target ≤8%) | 14.4% [8.6–23.2] | 13.3% [7.8–21.9] | 3.6 stopped 1, added 0; p = 1 |
| Ordinary messages at High | 10% [5.4–17.9] | 8.9% [4.6–16.6] | 1 fewer, 0 more; p = 1 |
| Tricky look-alikes warned | 11/50 | 10/50 | |
| Everyday ordinary messages warned | 2/40 | 2/40 | |

**Reading the results**
- **The ship rule** (written before scoring): checker 3.6 replaces 3.5 only if no false alarm is added (ordinary messages warned and at High not higher) and no fraud warning is lost (every fraud 3.5 warned on is still warned on, and fraud or suspicious warned not lower). The rule written before scoring (no new false alarm and no fraud warning lost) held, so checker 3.6 replaced 3.5 inside Release 3.5.
- **Targets:** Missed: fraud warned ≥85% (83.8%), subtle fraud warned ≥70% (64%) and ordinary messages warned ≤8% (13.3%).
- **Where it still fails:** 13 frauds got no warning (for example a doorstep fee for a life certificate, a "stamp fee" to transfer a dead relative's shares, a relative's "new number" asking for money in an emergency, a dividend link that sends one rupee to "verify" an account, a slowly built mentor group that moves to an app and a women's savings-group scheme), and 8 ordinary messages were rated High (a genuine bank OTP SMS in Hindi, a parcel delivery code, a daughter's nominee e-sign, a life certificate marked as submitted, a family chat that refuses to share an OTP, a demat account welcome message, a cab ride OTP and a pension arrear notice). Checker 3.6 fixed the gas-cylinder code class it was built for; a broader rule for genuine OTP and code messages needs another fresh sealed set.
- This set has now been scored, so it is development data and is published as `evaluation/blind-v10.json`. The next checker change needs another fresh set.

### Fresh sealed set (blind-v9), scored once

- **Who wrote it:** a separate AI agent, on 2 October 2026, before checker 3.5 was frozen. 200 messages: 80 fraud (25 subtle), 30 suspicious and 90 ordinary (50 tricky look-alikes, 40 everyday). Hindi 70, Hinglish 60, English 60, mixed 10. Sealed with SHA-256 `D5A59F9B9620903EE6399B9B90164407BD0CF927FFB8D74D8EA7BAB9D2567B22`; only its counts were checked before scoring.
- **How it was scored:** checker 3.5 was frozen at 22:36 IST; the ship rule was written down; then each checker was scored exactly once. `evaluation/score-blind.cjs` reproduces the headline rates (fraud warned with `--out`); the subtle-fraud, persona and paired-test figures come from the team's sealed-set scorer, and the checker 3.3 column needs checker 3.3's `engine.js` from the repository history.

| Measure | Checker 3.3 | Checker 3.5 (shipped) | Paired test |
|---|---:|---:|---|
| Fraud warned (target ≥85%) | 82.5% [72.7–89.3] | 87.5% [78.5–93.1] | 3.5 caught 4 more, 3.3 0 more; p = 0.125 |
| Fraud at High | 67.5% [56.6–76.8] | 78.8% [68.6–86.3] | 10 against 1; p = 0.0117 |
| Subtle fraud warned (target ≥70%) | 15/25 | 18/25 = 72% [52.4–85.7] | |
| Suspicious warned | 53.3% [36.1–69.8] | 60% [42.3–75.4] | |
| Fraud or suspicious warned | 74.5% [65.7–81.8] | 80% [71.6–86.4] | 7 against 1; p = 0.0703 |
| Ordinary messages warned (target ≤8%) | 11.1% [6.1–19.3] | 12.2% [7–20.6] | 3 against 2; p = 1 |
| Ordinary messages at High | 10% [5.4–17.9] | 10% [5.4–17.9] | 2 against 2; p = 1 |
| Everyday ordinary messages warned | 1/40 | 1/40 | |

**By persona** (checker 3.5, fraud or suspicious warned; 3.3 in brackets): Praveen 77.8% (74.1%), Kavita 85.7% (82.1%), Babulal 75% (67.9%). **By language:** Hindi 77.5% (72.5%), Hinglish 75.9% (69%), English 82.9% (80%).

**Reading the results**
- **Targets:** fraud warned ≥85% and subtle fraud warned ≥70% were met; ordinary messages warned ≤8% was missed (12.2%). Checker 3.3 missed all three on this set too.
- **The ship rule and the deviation:** the rule written before scoring said checker 3.5 ships only if fraud warned does not fall, fraud or suspicious warned rises, and ordinary messages warned and at High do not rise. All held except one: ordinary messages warned rose by one message (at Caution). The owner shipped checker 3.5 because fraud at High improved significantly with no rise at High in ordinary messages. The record states the deviation ([`Blind-Evaluation-v9.json`](../evidence/Blind-Evaluation-v9.json)).
- **Where it still fails:** wrong-number and "classroom" openers, a fake helpline asking for remote access, an advance fee to transfer old shares, a romance-crypto platform, a reward-points link and a fake debit alert got no warning. Ordinary messages at High were mostly awareness warnings that quote scam lines, and genuine notices (an IEPF refund, a broker withdrawal, a branch KYC call, an LPG booking, a small-savings deposit).
- **Before blind-v9 (internal):** on a fresh set of 150 messages never used for tuning, checker 3.5 raised fraud at High from 48.0% to 66.7% and cut ordinary messages flagged from 34.0% to 26.0%. On its development sets it is near 100%, which is in-sample and not a fair estimate.
- This set has now been inspected, so it is development data. The next checker change needs another fresh set.

## Release 3.4 results (history)

Release 3.4 was verified on 2 October 2026 and published in this repository, but never deployed: 561,637 bytes (164,699 with gzip), SHA-256 `911E8BA0637980325249E72B5442A6B0CE3306153D3432C663CE773EF02DBB04`, with checker 3.3.

### What changed in Release 3.4

- **Complaint routes:** 15 new official sources (48 recorded, 46 shown in the app), each checked on its official page on 2 October 2026. They support:
  - the RBI Ombudsman step after a bank refuses or does not reply in 30 days;
  - police or the State Economic Offences Wing, plus RBI Sachet, for chit, deposit and Ponzi schemes;
  - RBI UDGAM, SEBI MITRA and IRDAI Bima Bharosa for unclaimed money;
  - IEPF-5 claim steps (no agent; a demat account is needed);
  - the SEBI Consolidated Account Statement;
  - frozen accounts after a cyber complaint;
  - loan-app harassment and RBI's Digital Lending Apps directory;
  - unexplained monthly debits (RBI e-mandate rules).

  Find-help buttons gained one-line hints, and routes gained sourced "Also check" tips.
- **Rights:** 8 rights cards with their sources (SEBI's Investor Charter; RBI's Charter of Customer Rights; IRDAI's 30-day free look and two-week deadline for complaints). In Release 3.4 they appeared only inside a chosen complaint route; Release 3.5 gives them their own page.
- **F&O fact:** when tips, borrowing or F&O appear, a card shows SEBI's study: 93% of individual F&O traders lost money in FY22–FY24.
- **Privacy and security:** an in-page Content-Security-Policy and no-referrer policy; Home shows the version, the date the guidance was checked and a "Check for a newer version" link that opens only when tapped. In Release 3.4 that link pointed to the older live release; Release 3.5 points it at the GitHub Pages live link and hides it there.
- **Checker:** kept checker 3.3; a candidate checker was measured on a fresh sealed set and was not shipped (below).

### Checks that passed (Release 3.4)

- **1,297 automated checks:** the 22 release suites (848 checks) plus 449 developer-case expectations. The developer cases had no false negatives or false positives, but they were written during development, so they are not an accuracy measure. Two suites, the general Owner Studio end-to-end suite and the boundary set, are recorded in the release record as passed without a count; their counts (30 and 38) come from the test logs.
- **Browser journey suite:** 130/130 in each of three runs, with no runtime errors. (In the release record this suite keeps its old name, "Release 3.0 browser suite".)
- **100-persona simulated test and stress inputs:** 14/14 checks.
  - **Who:** 100 fictional users written by four separate AI agents that never saw the code: ages 18–80, Hindi and English screens, phones 320–412 pixels wide, large text.
  - **Result:** 92 fully right, 8 partly right, 0 wrong. On the test machine, the "partly right" count varies between 8 and 11 across runs of the same build, because the scorer marks a result that takes more than 1.5 seconds as partly right. None was ever wrong.
  - **Stress:** 15 pasted inputs (including a 9,659-character forward, pasted HTML and script, right-to-left text and invisible characters) plus 4 interaction checks (a double tap, the phone Back button, and an empty and a 1,700-character urgent-help story).
  - These personas were used to fix problems, so they are a regression test, not an accuracy result ([details](REAL-WORLD-USER-TEST.md)).
- **Complaint routes and rights:** 39/39: every new step, tip, rights card and source in both languages; the button hints on a 360-pixel phone; the action card listing each route's official links.
- **Privacy notes, security policy and version line:** 27/27. No policy violation occurred in any journey, in the saved offline copy, on a phone, or next to a simulated copy of the host's injected script. Official links send no referrer, the update link opens only when tapped, and three deliberately broken builds were each caught.
- **Persona plans and reliability:** 26/26: the three plans, all five reliability states, no storage, no user-data requests and a 320-pixel Hindi phone view.
- **App layout:** 31/31 across 320, 360 and 390-pixel phones, Hindi and English, normal, large and 200% text, keyboard navigation and print layout.
- **Own-words parser:** 176 checks for English, Hindi and Roman-Hindi own-words input, return maths and every Before-you-pay combination.
- **Content validator and Owner Studio:** 166 validator tests and 124 Studio checks. Unsafe content stops the build.
- **Answer coverage:**
  - **Emergency:** the browser suite runs all 60 answer combinations, that is the 15 combinations of the four "What happened?" answers, each with the four states of "Is it still happening?" (not answered, yes, no, not sure). The build validator checks the 15 "What happened?" combinations, which is why the Owner guide says 15.
  - **Complaint routes:** all 272 navigator states. **Family checklist:** all 60 answer combinations.
- **Privacy:** the public file contains no Studio or file-writing code. In the tested journeys the app made no network request except fetching its own page for "Save offline copy" and "Share this app", and used no storage, cookies, analytics or cloud inference. The guardrail audit found 49 outbound links, all on official domains apart from the app's own address behind the update link (internal).
- **Official links (internal):** on 2 October 2026, 45 of the 46 enabled sources opened automatically. The IEPF claimants' FAQ refuses automated clients and was checked in a browser.
- **Offline:** the downloaded file works with networking turned off. Official links need internet.

### Complaint-route test (internal)

40 complaint stories written by a separate AI agent, each naming the officially correct authorities. The test presses the button that an AI agent acting as a first-time user chose, then reads the route the app shows, in both languages.

| Measure | Release 3.3 | Release 3.4 |
|---|---:|---:|
| Main authority named, first-time user's buttons | 35/40 | 39/40 |
| All expected authorities named, first-time user's buttons | 25/40 | 34/40 |
| All expected authorities named, correct buttons | 26/40 | 37/40 |
| A new first-time-user agent picks the expected button (with the button hints) | 34/40 | 36/40 |

- **Targets:** main authority at least 38/40 (met); the new first-time-user agent picking the expected button at least 37/40 (missed, 36/40).
- **Remaining misses:** two "Bank" choices in insurance and pension stories, and one story that "Not sure" deliberately does not route to a regulator.
- The stories were used to find the gaps, so this is a regression test, not an accuracy result.

### Sealed set for Release 3.4 (blind-v8)

- **Who wrote it:** a separate AI agent that never saw the code, earlier sets or tests, writing after the candidate checker was frozen. Scored once on 2 October 2026.
- **What it contains:** 200 messages: 80 fraud (25 subtle), 30 suspicious and 90 ordinary (50 tricky look-alikes and 40 everyday messages). Hindi 70, Hinglish 60, English 60, mixed 10.

| Measure | Checker 3.3 (shipped in 3.4) | Candidate checker (not shipped) |
|---|---:|---:|
| Fraud or suspicious messages warned (the measure used for earlier sets) | 60.9% [51.6–69.5] | 58.2% [48.8–67.0] |
| Fraud warned | 67.5% [56.6–76.8] | 63.8% [52.8–73.4] |
| Fraud at High | 56.3% [45.3–66.6] | 52.5% [41.7–63.1] |
| Subtle fraud warned | 5/25 | 5/25 |
| Suspicious warned | 43.3% [27.4–60.8] | 43.3% [27.4–60.8] |
| Ordinary messages warned | 13.3% [7.8–21.9] | 11.1% [6.1–19.3] |
| Ordinary messages at High | 10.0% [5.4–17.9] | 8.9% [4.6–16.6] |
| Everyday ordinary messages flagged | 0/40 | 0/40 |

**By persona** (checker 3.3, fraud or suspicious warned): Praveen 72.2% [56.0–84.2], Kavita 53.6% [35.8–70.5], Babulal 39.3% [23.6–57.6]. **By language:** Hindi 65.8% [49.9–78.8], Hinglish 63.6% [46.6–77.8], English 57.6% [40.8–72.8].

**Reading the results**
- **Targets missed.** Release 3.4 aimed for fraud warned at least 85%, ordinary messages warned at most 8%, and subtle fraud warned at least 70%. Both checkers missed all three.
- **The candidate.** It was built to reduce false alarms, and on its development sets it did (internal): on blind-v7, ordinary messages at High fell from 11.1% to 0%; on blind-v6, from 18% to 8%, with no fraud loss. On this fresh set every difference was within the intervals, so the owner kept checker 3.3, and the candidate was kept for a later round.
- **Labels in the evidence file.** In `Blind-Evaluation-v8.json`, the key "v3.4" is the candidate checker and "v3.3" is the checker shipped in Release 3.4. The file's "frozenChecker" note calls the candidate "the Release 3.4 checker" because, when the set was scored, it was the candidate for that release.
- **Where it fails.** Most misses were subtle approaches: pension and life-certificate scams, RTA "processing fees" and dormant-folio offers, and wrong-number introductions. Babulal's messages were caught least often.
- This set has been inspected, so it is now development data.

### Earlier sealed sets (history)

- **blind-v6** (120 messages: 50 fraud, 29 of them everyday scams; 20 suspicious; 50 ordinary, 38 of them tricky look-alikes), scored once for checkers 3.2 and 3.3. Checker 3.3 warned on 87.1% [77.3–93.1] of fraud or suspicious messages and 24.0% [14.3–37.4] of ordinary messages, and flagged none of the 12 everyday ordinary messages.
- **blind-v5** (320 messages, the third of three 320-message sets), model 3.2: 72.4% [65.7–78.2] of fraud or suspicious messages warned, and 8.6% [4.9–14.7] of ordinary messages warned.
- **blind-v3 and blind-v4** (320 messages each): their scores are in `Blind-Evaluation.json`; the messages are not published.

These are synthetic-message results, not evidence of nationwide accuracy or avoided financial loss.

### Size and speed (Release 3.4)

- **Size:** 561,637 bytes uncompressed and 164,699 bytes with gzip (Release 3.3: 509,588 and 151,758). The growth was the new bilingual, sourced complaint content. The 164,699 bytes is the download size; the saved offline file is the full 561,637 bytes.
- **Simulated slow network** (400 ms latency, 50,000 bytes per second, 4× CPU slowdown): median 12,242 ms uncompressed and 4,260 ms gzip-served, across three runs.
- **Home usable, gzip-served, on emulated networks and phones (internal):**

  | Profile | Release 3.3 | Release 3.4 |
  |---|---:|---:|
  | Slow 4G | 1.5 s | 1.7 s |
  | Weak 3G, low-end phone | 4.2 s | 4.7 s |
  | 2G, low-end phone | 7.6 s | 8.4 s |

- **Message analysis:** local. Checker 3.3's volume test (internal; a different benchmark from the Release 3.5 per-message timing): 1,000,000 checks with 0 errors, 1,034 per second on one core, p99 9.6 ms.

## Known limits

- **Checker:** on blind-v10, checker 3.6 gave no warning on 13 of 80 frauds and 9 of 25 subtle frauds, and warned on 13.3% of ordinary messages (on blind-v9, checker 3.5: 10 of 80, 7 of 25 and 12.2%). Detection depends on word lists, so new colloquial Hindi and Hinglish phrasings can be missed.
- **Languages:** Hindi and English only. Messages in other languages get an "outside coverage" note, never a safe verdict, and users are pointed to official helplines that speak their language. Some English words still appear on Hindi screens; native review is pending.
- **No voice or image reading inside the app:** voice works through the phone keyboard's microphone, and the words of a message in a picture can be copied with the phone's gallery and pasted; read-aloud needs a voice installed on the phone, until the prepared recorded Hindi lines are recorded.
- **Almost nothing is kept, by design:** only the family list, and only if the user turns on "Remember this list on this phone" on the web link. A guide or a packet must be downloaded to keep it.
- **Offline use** needs one "Save offline copy"; there is no installable app or service worker.
- **Sources:** sources not yet confirmed by the named reviewer show "review pending" (31 in Release 3.5, two of them added on 3 October 2026). An automated pre-check on 2 October 2026 of the 29 then pending (an AI assistant reading each official page; internal, not a review) found the supporting words on 20 of them and part of them on 2; 7 pages refused automated reading; no app text was contradicted by a page it read.
- **Hosting:** the live link is GitHub Pages (HTTPS with HSTS, gzip, a ten-minute browser cache, no cookies). The second copy (first Release 3.5 build; not maintained, its removal requested) is on a host that sends no security headers or cache validators, so every visit there downloads the whole page again ([scale plan](SCALE-AND-RELIABILITY.md)). RBI's website may show a language chooser first, so an RBI link can need a second tap.
- **Missing content:** MF Central and DigiLocker are not covered, because their official text could not be verified.
- **Unpublished scripts:** most release suites run from the team's working folder; their results are in the release records, but their scripts are not yet in this repository. The published kits are the sealed-set scorer, the developer cases, the 100-persona test and the weight-fitting script with its feature table, which reproduces the shipped weights exactly.

## Still unproven

- avoided fraud or loss in real use;
- real-user comprehension and completion;
- native-speaker review of the Hindi;
- physical low-end devices and screen-reader conformance;
- accuracy on a representative, consented real-message corpus;
- CDN and operations performance at national traffic.

No complaint was filed and no helpline was called during verification.
