# Niveshak Saathi validation

**Build checked:** Release 3.4, on 2026-10-02 in installed Microsoft Edge (headless). The file is 561,637 bytes (164,699 with gzip), with SHA-256 `911E8BA0637980325249E72B5442A6B0CE3306153D3432C663CE773EF02DBB04`. The public link serves Release 3.3 until the Site is redeployed; see `Delivery-Status.md`.

The evidence records are:
- `Release-3.4-Verification.json`;
- `Browser-Validation.json`;
- `Rule-Evaluation.json`;
- `Real-World-User-Test.json`;
- `Blind-Evaluation-v8.json`, with the earlier `Blind-Evaluation-v6.json` and `Blind-Evaluation.json`.

## What changed in Release 3.4

- **Complaint routes (P1):** 15 new official sources, each checked on its official page on 2 October 2026 (48 in all, 46 shown in the app). They support:
  - the RBI Ombudsman step after a bank refuses or does not reply in 30 days;
  - police or the State Economic Offences Wing, plus RBI Sachet, for chit, deposit and Ponzi schemes;
  - RBI UDGAM, SEBI MITRA and IRDAI Bima Bharosa for unclaimed money;
  - IEPF-5 claim steps (no agent, demat account needed);
  - the SEBI Consolidated Account Statement;
  - frozen accounts after a cyber complaint;
  - loan-app harassment and RBI's Digital Lending Apps directory;
  - unexplained monthly debits (RBI e-mandate rules).

  Find help buttons show one-line hints, and the routes show sourced "Also check" tips.
- **Rights (P1):** 8 rights cards, each showing its source:
  - SEBI's Investor Charter;
  - RBI's Charter of Customer Rights;
  - IRDAI's 30-day free look and its two-week deadline for complaints.
- **F&O fact:** when tips, borrowing or F&O appear, a card shows SEBI's study: 93% of individual F&O traders lost money in FY22–FY24.
- **Privacy and security (P2):**
  - the app's privacy notes now say that the public link's host may set its own short-lived security cookie;
  - the page declares a Content-Security-Policy and a no-referrer policy;
  - Home shows the version, the date the guidance was checked, and a "Check for a newer version" link that opens only when tapped.
- **Checker:** Release 3.4 keeps checker 3.3. A candidate checker was measured on a fresh sealed set and showed no significant gain, so the owner kept 3.3 (below).

## Checks that passed

- **1,297 automated checks** across 22 release suites, including 449/449 developer message expectations, with no false negatives or false positives.
- **Browser journeys:** 130/130 checks in each of three independent runs, with no runtime errors.
- **Real-world users and stress inputs:** 14/14 checks.
  - **Who:** 100 realistic users written by four separate agents that never saw the code. They cover ages 18–80, Hindi and English screens, phones 320–412 px wide and large text.
  - **Result for Release 3.4:** 92 fully right, 8 partly right, 0 wrong. On this machine the "partly right" count varies between 8 and 11 across runs of the same build, because the judge marks a result that takes more than 1.5 seconds as partly right. The number wrong was 0 in every run.
  - **Stress inputs:** 15 of them, including a 9,659-character forward, pasted HTML and script, and the phone Back button.
  - **Details:** see `REAL-WORLD-USER-TEST.md`. These users were used to fix problems, so they are a regression test, not an accuracy result.
- **Complaint routes and rights (P1):** 39/39 checks, covering:
  - every new step, tip, rights card and source, in both languages;
  - the button hints on a 360-pixel phone;
  - the action card listing each route's official links.
- **Privacy notes, security policy and version line (P2):** 27/27 checks.
  - No policy violation occurs in any journey, in the saved offline copy, on a phone, or next to a simulated copy of the host's injected bot-check script.
  - Official links send no referrer.
  - The update link opens only when tapped.
  - Three deliberately broken builds were each caught by these checks.
- **Public-scale reliability and personas:** 26/26 checks: the three fixed plans, all five reliability states, no storage, no user-data requests and a 320-pixel Hindi phone view.
- **App shell:** 31/31 checks across 320, 360 and 390-pixel phones, Hindi and English, normal/large/200% text, keyboard navigation and print layout.
- **On-device assistant:** 176 checks for English, Hindi and Roman Hindi own-words input, return maths and before-payment decisions.
- **Content and Owner Studio:** all validator and editor suites passed. Unsafe content prevents a build.
- **Emergency, grievance, packet and family coverage:** all 60 emergency combinations, 272 grievance route states and 60 family combinations are covered.
- **Privacy:**
  - the public file contains no Studio or file-writing code;
  - in the tested journeys the app itself uses no browser storage, cookies, analytics, cloud inference or third-party request;
  - the public link's host (Cloudflare) adds its own bot-check script and a short-lived `__cf_bm` security cookie. The app neither sets nor reads it, and the offline file has neither;
  - the guardrail audit finds 49 outbound links, all on official domains apart from the app's own address behind the update link.
- **Official links:** on 2 October 2026, 45 of the 46 enabled sources opened automatically (C-12). The IEPF claimants' FAQ refuses automated clients and was checked in a browser.
- **Offline:** the downloaded file works with networking disabled. Official links naturally require internet.

## Complaint-route test (40 stories written blind)

Each story names the officially correct authorities. The test presses the button a first-time user chose, then reads the route the app shows in both languages.

| Measure | Release 3.3 | Release 3.4 |
|---|---:|---:|
| Main authority named, first-time user's buttons | 35/40 | 39/40 |
| All expected authorities named, first-time user's buttons | 25/40 | 34/40 |
| All expected authorities named, correct buttons | 26/40 | 37/40 |
| A new first-time-user agent picks the judge's button (with the button hints) | 34/40 | 36/40 |

The stories were used to find the gaps, so this is a regression test, not an independent accuracy result. The remaining misses:
- two "Bank" angles in insurance and pension stories;
- one story that "Not sure" deliberately does not route to a regulator.

## Model evidence

The checker combines multilingual warning-sign rules, a fitted logistic model and hard safety floors. The interface explains the agreement around each result, and abstains when the language is outside coverage or there is too little evidence.

**Fresh sealed set for Release 3.4 (blind-v8, scored once on 2 October 2026).**
- **Who wrote it:** a separate agent that never saw the code, earlier sets or tests, writing after the candidate checker was frozen.
- **What it contains:** 200 messages, 80 fraud, 30 suspicious and 90 ordinary. Of the ordinary messages, 50 are tricky look-alikes and 40 are everyday messages. The languages are Hindi 70, Hinglish 60, English 60 and mixed 10.

| Measure | Checker 3.3 (shipped in 3.4) | Candidate checker (not shipped) |
|---|---:|---:|
| Fraud or suspicious messages warned | 60.9% [51.6–69.5] | 58.2% [48.8–67.0] |
| Fraud warned | 67.5% [56.6–76.8] | 63.8% [52.8–73.4] |
| Fraud at High | 56.3% [45.3–66.6] | 52.5% [41.7–63.1] |
| Subtle fraud warned | 5/25 | 5/25 |
| Suspicious warned | 43.3% [27.4–60.8] | 43.3% [27.4–60.8] |
| Ordinary messages warned | 13.3% [7.8–21.9] | 11.1% [6.1–19.3] |
| Ordinary messages at High | 10.0% [5.4–17.9] | 8.9% [4.6–16.6] |
| Everyday ordinary messages flagged | 0/40 | 0/40 |

**Reading the results:**
- The candidate checker was built to reduce false alarms. On the development sets it did: on blind-v7, ordinary messages at High fell from 11.1% to 0%; on blind-v6, from 18% to 8%, with no fraud loss.
- On this fresh set, every difference is within the intervals.
- The owner therefore kept checker 3.3, and the candidate is kept for a later round.
- This set is harder than the earlier ones for both checkers. Most misses are subtle approaches:
  - pension and life-certificate scams;
  - RTA "processing fees" and dormant-folio offers;
  - wrong-number introductions.
- Babulal's messages (pensioner) are caught least often.
- This set has now been inspected, so it is development data. The next checker change must be measured on another fresh set.

**Earlier sealed sets (history).**
- **blind-v6** (120 messages, scored once for checkers 3.2 and 3.3):
  - checker 3.3 warned on 87.1% [77.3–93.1] of fraud or suspicious messages and 24.0% [14.3–37.4] of ordinary messages;
  - none of the 12 everyday ordinary messages was flagged.
- **The third 320-message set** (model 3.2): 72.4% [65.7–78.2] of fraud or suspicious messages warned, and 8.6% [4.9–14.7] of ordinary messages warned.

These are synthetic-message results, not evidence of nationwide accuracy or avoided financial loss.

## Size and speed

- **Size:** 561,637 bytes uncompressed and 164,699 bytes with gzip (Release 3.3: 509,588 and 151,758). The growth is the new bilingual, sourced complaint content.
- **Simulated slow network** (400 ms latency, 50,000 bytes/second, 4× CPU slowdown): median 12,242 ms uncompressed and 4,260 ms gzip-served, across three runs.
- **Home usable, gzip-served, on emulated networks and phones:**

  | Profile | Release 3.3 | Release 3.4 |
  |---|---:|---:|
  | Slow 4G | 1.5 s | 1.7 s |
  | Weak 3G, low-end phone | 4.2 s | 4.7 s |
  | 2G, low-end phone | 7.6 s | 8.4 s |

  This is 10–15% slower than Release 3.3.
- **Message analysis:** it stays local and takes about 1 ms for ordinary inputs. Release 3.4 keeps checker 3.3, so the C-22 volume test still applies: 1,000,000 checks with 0 errors, 1,034 per second on one core, p99 9.6 ms.

## Known limits of Release 3.4

- **Checker:** no measured gain in fraud detection over Release 3.3; see blind-v8 above.
- **Sources:** the app shows each source as reviewed by the named content reviewer (owner decision). The 15 sources added on 2 October were checked by Claude against the official pages and await the reviewer's confirmation.
- **Hosting:** the public host sends no security headers or cache validators, so every visit downloads the whole page again (`SCALE-AND-RELIABILITY.md`).
- **RBI links:** RBI's website shows a language chooser to first-time visitors and opens its home page, so an RBI link may need a second tap.
- **Missing content:** MF Central and DigiLocker are not covered, because their official text could not be verified.

## Still unproven

- avoided fraud or loss in real use;
- real-user comprehension and completion;
- native-speaker review of Hindi;
- physical low-end device and screen-reader conformance;
- accuracy on a representative, consented real-message corpus;
- CDN and operations performance at national traffic volumes.

No complaint was filed and no helpline was called during verification.
