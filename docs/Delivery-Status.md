# Delivery status: Niveshak Saathi

Which release is where, as of 3 October 2026.

| Where | Release | Status |
|---|---|---|
| [Live link](https://himanshi252005.github.io/Niveshak-Saathi/) (GitHub Pages) | **3.5** | The link to share. Exact verified build `B5814882…FA0B` with checker 3.5, refined in place on 2 and 3 October 2026; HTTPS with HSTS, gzip, no cookies |
| This repository: [`prototype/dist/index.html`](../prototype/dist/index.html) | **3.5** | Byte-identical to the app served by the live link |
| [Second copy](https://niveshak-saathi-safety.himanshirathore25102.chatgpt.site) | 3.5 (first build) | The first Release 3.5 build (`175BD9D4…6E1C`, checker 3.3), without the refinements below; not the link to share |
| Release 3.4 | 3.4 | Verified and published in this repository on 2 October 2026; never deployed; replaced by 3.5 |

## Release 3.5: the build on the live link

- **File:** `prototype/dist/index.html`, 825,597 bytes (237,429 with gzip).
- **SHA-256:** `B5814882FC16B3099CD088CD7C919301FCBF73C628561DFF12B443008160FA0B`.
- **Versions:** product 3.5, with checker 3.5.
- **Verification:** 1,741 automated checks, that is 24 release suites plus 796/796 developer-case expectations ([`Release-3.5-Verification.json`](../evidence/Release-3.5-Verification.json)); browser journeys 130/130 in each of 3 runs; 100-persona simulated test 92 fully right, 8 partly right, 0 wrong; text contrast meets WCAG AA in the light and dark themes on every main screen (C-27).
- **Checker 3.5 on the fresh sealed set blind-v9** (scored once after the checker was frozen): fraud warned 87.5%, subtle fraud warned 18 of 25, ordinary messages warned 12.2% ([`Blind-Evaluation-v9.json`](../evidence/Blind-Evaluation-v9.json)). The rule written before scoring was missed by one ordinary message at Caution; the owner shipped checker 3.5, and the record says so.
- **New in Release 3.5:**
  - the Rights and help page: free official helplines, five step-by-step guides (SCORES, IEPF-5, RBI Ombudsman, insurance, nominee) and all eight rights cards grouped by institution;
  - the Family asset map in Family safety;
  - "review pending" on sources not yet confirmed by the named reviewer;
  - licence, reuse, security and privacy files.
- **Refined in place on 2 and 3 October 2026** (same release number, at the owner's request, after judge-style reviews):
  - a design refresh (3 October 2026): a calm green-and-white look with line drawings that draw themselves in, chips instead of long option lists, rights folded by institution and the long footer notes folded under one line; a persistent five-item phone navigation remains visible after every selection;
  - a mint-green menu and a dark theme (3 October 2026, built on the green-and-white design): the dark theme follows the device's own setting and "Dark theme" in the menu switches it for the visit (nothing is saved); line drawings keep one colour, forest green or mint; text-box borders are back to at least 3:1;
  - four ideas from the [market comparison](MARKET-COMPARISON.md): "not this door" notes on the SCORES routes, a "freeze online access to your trading account" step, I4C's Suspect Search in Before you pay, and "Pause for 30 seconds" after a STOP or High-risk answer;
  - checker 3.5, with Hindi and Hinglish scam patterns for the three personas (it replaced checker 3.3);
  - a calmer Home: four large choices first; rights, practice and family safety under "More help"; the persona plans under one fold;
  - a shorter menu: six everyday pages, with the complaint packet, safety plans, practice and family safety under "More pages", which opens by itself when one of them is in use;
  - input without typing: a "Paste the message" button, tips to speak a message or a complaint with the phone keyboard's microphone, and a tip to copy the words of a message that arrived as a picture; text boxes tell the keyboard which language to expect;
  - the privacy note names the host the app was opened from (the GitHub Pages live link sets no cookies; the offline copy has no host), and the privacy window keeps its Close button in view;
  - the version line's update link points to the live link.
- **Live check after publishing** (3 October 2026, 13:10 IST): the live link served this exact file (SHA-256 match) over HTTPS with HSTS, gzip-compressed (246,393 bytes transferred), with `Cache-Control: max-age=600` and no cookies. GitHub Pages commit `70a3bfc`.

## Second copy: first Release 3.5 build

- **What it serves:** the first Release 3.5 build, 661,710 bytes, product version 3.5 and checker version 3.3. After removing the host's per-request Cloudflare block, its SHA-256 is `175BD9D4ADDD6F6B517C39CC6582D96C553157F712080812C75D710269E86E1C`, exactly matching that verified build (its verification record is internal). It does not have the refinements above.
- **Deployed:** 20:49 IST on 2 October 2026. The exact-build check passed and the live smoke test passed 10/10.
- **Sites record:** source commit `88e3f65f72e7584258fea67fe5be55aa973d5079`; version `4` (`appgprj_6abdcbd1b6148191a68dc1b38c53c585~appgver_47711223d59c81918c769928d4225383`); deployment `appgdep_6abfcb5aa8d48191aadd2f6344e0f3d3`.

**What the host does** (measured on 2 October 2026):
- It sets three cookies of its own: `__Host-appgarden-visitor` (90 days), `cf_clearance` (365 days) and `__cf_bm` (about 30 minutes). The app itself sets and reads no cookies and stores nothing ([privacy](../PRIVACY.md)).
- It adds Cloudflare's bot-check script in a hidden frame.
- It sends no security headers: no HSTS, `nosniff`, framing protection, Content-Security-Policy or Referrer-Policy.
- It sends `Cache-Control: public, max-age=0, must-revalidate` with no ETag or Last-Modified date, so every visit downloads the whole page again.
- Since Release 3.4 the page carries its own Content-Security-Policy and no-referrer policy; only the host can add the rest.

## Release 3.4: verified, never deployed

- **File:** 561,637 bytes (164,699 with gzip); SHA-256 `911E8BA0637980325249E72B5442A6B0CE3306153D3432C663CE773EF02DBB04`.
- **Versions:** product 3.4, with checker 3.3. A candidate checker was measured on the fresh sealed set blind-v8, showed no significant gain, and was kept back by the owner.
- **Verification:** all 22 release suites passed ([`Release-3.4-Verification.json`](../evidence/Release-3.4-Verification.json)): 1,297 automated checks, that is the suites plus 449 developer-case expectations. They include 130/130 browser checks in each of three runs, the 100-persona simulated test (92 fully right, 8 partly, 0 wrong), 39 complaint-route and rights checks and 27 privacy and security checks.
- **New in Release 3.4:** sourced complaint steps and tips (RBI Ombudsman, police/EOW and Sachet, UDGAM, MITRA and Bima Bharosa, IEPF-5, frozen accounts, loan apps, unexplained debits); eight rights cards (SEBI, RBI, IRDAI); button hints; SEBI's F&O study card; hosting and privacy notes; an in-page security policy; a version line with a tap-only update link.

## Release 3.3: previous live release

- **File:** 509,588 bytes (151,758 with gzip); SHA-256 `055455709CAA0AA479C309CAB84A9EA668D9B553532696A511D4AEC05CE7BBAB`. It is the rollback target for Release 3.5 as a whole (see the rollback rule) and remains in the repository history.
- **Verification:** all 20 release suites passed ([`Release-3.3-Verification.json`](../evidence/Release-3.3-Verification.json)): 1,229 automated checks, including the 100-persona simulated test, 26 persona and reliability checks, 130/130 browser checks in each of three runs and 449/449 developer cases.
- **New in Release 3.3:**
  - the fixes from the 100-persona simulated test ([details](REAL-WORLD-USER-TEST.md)): urgent help recognises money taken, not only sent, and remote-access apps described in everyday words;
  - long forwards are checked in parts instead of being cut at 6,000 characters;
  - the phone Back button stays in the app;
  - a typed question asks for the real message;
  - Marathi gets a "may miss signs" note;
  - "No known signs" is neutral, not green;
  - checker 3.3: disconnection threats, task scams and loan-app shaming caught; genuine bank FD offers and awareness messages no longer flagged.
- **Earlier in this build:** fixed plans for Praveen, Kavita and Babulal; the five-state reliability explanation; owner editing for persona content; the national-scale architecture and rollout documents.

## Rollback rule

The rollback target is always the build that was live just before the latest redeploy. For this build that is `FE329BD3…9965` (the green-and-white design, before the mint menu and dark theme), the previous app on the `gh-pages` branch; before it, `4F494B8D…2A5E` (the earlier monochrome design), `244FAD4E…B32C`, `1B279AD5…5C23` (checker 3.3) and the first Release 3.5 build (`175BD9D4…6E1C`), which the second copy still serves. For Release 3.5 as a whole, the rollback target is Release 3.3 (`05545570…BBAB`). Release 3.2, SHA-256 `E377FB4EF8024F00C647C4D2D2C1CE82146DDADC48C26C43E6D5BD274001DAC6`, is earlier history.

## Live link (GitHub Pages)

Live at **https://himanshi252005.github.io/Niveshak-Saathi/** from 2 October 2026, published from the `gh-pages` branch, which holds the verified app (`index.html`), the demo-video page and video (`demo/`) and an empty `.nojekyll`. Each publish is checked before it is announced: the served file's SHA-256 must equal the verified build; HTTPS with HSTS; gzip; `Cache-Control: max-age=600`; no cookies. In a phone-sized browser it opens in Hindi as version 3.5, hides the update link, shows the persistent five-item navigation and the six-page mint menu, keeps the Paste button, makes no request outside the site and rates a scam message High risk, with no page error.
