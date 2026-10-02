# Release 3.2 validation

**Build checked:** 2026-10-01, in installed Microsoft Edge (headless). The release build is 473,298 bytes, with SHA-256 `E377FB4EF8024F00C647C4D2D2C1CE82146DDADC48C26C43E6D5BD274001DAC6`.

**Records:** every figure below comes from these files:
- `Browser-Validation.json`
- `Rule-Evaluation.json`
- `Blind-Evaluation.json`
- `Release-3.2-Verification.json`

## Checks that passed

- **Browser journeys:** 130 checks passed in each of 3 runs, with no runtime errors. The suite includes all 42 version 2 checks, plus:
  - Emergency mode (all 60 answer combinations);
  - the grievance navigator (all 272 route states);
  - the Action Packet and family readiness (all 60 combinations);
  - the Owner Studio's effect on the app;
  - opening on the Home page, and keyboard use across every menu item;
  - the phone menu, 200% text on every page, the Hindi-mode language scan (pages and menu), offline use, and no browser storage.
- **New features:** 23 checks covering:
  - model v3 verdicts, insights and the "how it was decided" panel;
  - "Warn my family", which never shares the scam's link;
  - own-words understanding in Roman Hindi and Hindi, including negation;
  - Before you pay STOP/VERIFY answers with sources;
  - Hindi switching, reset, and no network requests.
- **Review fixes:** 22 checks replay every example from the three independent reviews, including 41 private-detail examples. The other replays cover:
  - stale-packet and print guards;
  - phone scrolling;
  - accessibility names;
  - the Owner Studio refusing to run from a website.
- **App layout:** 30 checks.
  - The app opens on Home with one question and six choices; the urgent choice is marked.
  - The sidebar lists every page in a fixed order under three plain headings; each item opens only its own page and names it in the top bar.
  - On a phone, a labelled Menu button opens the menu over the page and blocks the page behind it; choosing a page, the close button, the shaded area and Escape all close it.
  - The app file contains no emoji; every page fits 320, 360 and 390 px phones in Hindi and English at normal, large and 200% text; printing hides the menus.
- **Home choices, sharing and pilot session:** 18 checks.
  - Sharing on a website sends the link; elsewhere it sends the clean app file, which contains none of the user's text.
  - The pilot needs consent, refuses private details in notes, records the counterbalanced plan in the exact `Pilot-Results.csv` columns and shows a live summary.
  - The sources register names the reviewer, and read-aloud explains how to install a voice.
- **On-device assistant:** 176 checks, including 106 own-words cases in English, Hindi and Roman Hindi, return maths, and every Before-you-pay combination with its sources.
- **Content rules:** 166 validator tests, and 124 Owner Studio end-to-end checks. The build refuses content that breaks a safety rule.
- **Message checker, developer cases:** 435/435 expectations. These cases were used in development.
- **Independent boundary set:** 38/38.
- **Blind evaluation:** see `Blind-Evaluation.json` and the model section of `Submission-v3.md`. Results are given with 95% intervals.
- **Separation and privacy:**
  - The public file contains no Owner Studio code, file-writing code or credentials.
  - It uses no storage, cookies or beacons, and makes no requests during the tested journeys.
  - Every web address is https on an allowed official domain.
- **Official links,** re-opened 2026-10-01: 31 of 31 opened. All opened.
- **Offline:** the downloaded copy opened with networking disabled, and every tool worked.
- **Speed and size:**
  - 462 KB uncompressed, 138 KB gzip, 110 KB brotli.
  - On the simulated slow network (400 ms latency, 50,000 bytes per second, 4× CPU slowdown), the median was 11,386 ms uncompressed and 4,587 ms gzip-served.
  - The message check takes about 1.0 ms per message.

## Still unproven

- avoided fraud or loss;
- real-user comprehension;
- native-speaker review of the Hindi;
- performance on physical low-end devices;
- local voice quality;
- screen-reader conformance;
- accuracy on real (non-synthetic) messages.

No complaint was filed and no helpline was called. Release 3.2 has been prepared but not published.
