# Delivery status: Niveshak Saathi

Which release is where, as of 2 October 2026.

| Where | Release | Status |
|---|---|---|
| [Live link](https://niveshak-saathi-safety.himanshirathore25102.chatgpt.site) | **3.3** | Public; opens without signing in. Serves Release 3.3 until it is redeployed |
| This repository: [`prototype/dist/index.html`](../prototype/dist/index.html) | **3.5** | Newest build; not yet deployed to the live link |
| Release 3.4 | 3.4 | Verified and published in this repository on 2 October 2026; never deployed; replaced by 3.5 |

## Live link: Release 3.3

- **What it serves:** Release 3.3, app size 509,588 bytes, product and checker version 3.3. The served file's SHA-256, after removing the host's per-request Cloudflare block, is `055455709CAA0AA479C309CAB84A9EA668D9B553532696A511D4AEC05CE7BBAB`. Checked again on 2 October 2026: the page reports product version 3.3.
- **Deployed:** 13:01 IST on 2 October 2026. After deployment, the served hash matched the verified build and 10 of 10 smoke checks passed (internal scripts). Home, Hindi and English, all three safety plans, long-forward splitting, the browser Back button and the neutral "No known signs" state were checked by eye against the same local file.
- **Not on the live link:** everything added in Releases 3.4 and 3.5, including the Rights and help page, the step-by-step guides and helplines, the Family asset map, the rights cards, SEBI's F&O study card, the in-page security policy and the version line.

**What the host does** (measured on 2 October 2026):
- It sets three cookies of its own: `__Host-appgarden-visitor` (90 days), `cf_clearance` (365 days) and `__cf_bm` (about 30 minutes). The app itself sets and reads no cookies and stores nothing ([privacy](../PRIVACY.md)).
- It adds Cloudflare's bot-check script in a hidden frame.
- It sends no security headers: no HSTS, `nosniff`, framing protection, Content-Security-Policy or Referrer-Policy.
- It sends `Cache-Control: public, max-age=0, must-revalidate` with no ETag or Last-Modified date, so every visit downloads the whole page again.
- Since Release 3.4 the page carries its own Content-Security-Policy and no-referrer policy; only the host can add the rest.

## Release 3.5: newest build, in this repository

- **File:** `prototype/dist/index.html`, 661,710 bytes (191,146 with gzip).
- **SHA-256:** `175BD9D4ADDD6F6B517C39CC6582D96C553157F712080812C75D710269E86E1C`.
- **Versions:** product 3.5, with checker 3.3.
- **Verification:** 1,346 automated checks, that is 23 release suites plus 449/449 developer-case expectations ([`Release-3.5-Verification.json`](../evidence/Release-3.5-Verification.json)).
- **New in Release 3.5:**
  - the Rights and help page: free official helplines, five step-by-step guides (SCORES, IEPF-5, RBI Ombudsman, insurance, nominee) and all eight rights cards grouped by institution;
  - the Family asset map in Family safety;
  - "review pending" on sources not yet confirmed by the named reviewer;
  - the host's three cookies named in the documents; licence, reuse, security and privacy files.
- **To deploy:** publish this exact file to the live link, confirm that the served file's hash matches the release record, and run the smoke checks. Until then the live link stays on Release 3.3, and the app's "Check for a newer version" link opens that older release.

## Release 3.4: verified, never deployed

- **File:** 561,637 bytes (164,699 with gzip); SHA-256 `911E8BA0637980325249E72B5442A6B0CE3306153D3432C663CE773EF02DBB04`.
- **Versions:** product 3.4, with checker 3.3. A candidate checker was measured on the fresh sealed set blind-v8, showed no significant gain, and was kept back by the owner.
- **Verification:** all 22 release suites passed ([`Release-3.4-Verification.json`](../evidence/Release-3.4-Verification.json)): 1,297 automated checks, that is the suites plus 449 developer-case expectations. They include 130/130 browser checks in each of three runs, the 100-persona simulated test (92 fully right, 8 partly, 0 wrong), 39 complaint-route and rights checks and 27 privacy and security checks.
- **New in Release 3.4:** sourced complaint steps and tips (RBI Ombudsman, police/EOW and Sachet, UDGAM, MITRA and Bima Bharosa, IEPF-5, frozen accounts, loan apps, unexplained debits); eight rights cards (SEBI, RBI, IRDAI); button hints; SEBI's F&O study card; hosting and privacy notes; an in-page security policy; a version line with a tap-only update link.

## Release 3.3: live

- **File:** 509,588 bytes (151,758 with gzip); SHA-256 `055455709CAA0AA479C309CAB84A9EA668D9B553532696A511D4AEC05CE7BBAB`. It is the file on the live link. In this repository, `prototype/dist/index.html` now holds the newest build, so Release 3.3's file is in the repository history.
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

The rollback target is always the release that was live just before the latest redeploy. Release 3.3 is live today, so it is the rollback target when Release 3.5 is deployed. (Release 3.2, SHA-256 `E377FB4EF8024F00C647C4D2D2C1CE82146DDADC48C26C43E6D5BD274001DAC6`, was the rollback target for the Release 3.3 deployment and is now history.)

## GitHub Pages copy

Live at **https://himanshi252005.github.io/Niveshak-Saathi/** from 2 October 2026, published from the `gh-pages` branch, which holds only the verified app (`index.html`) and an empty `.nojekyll`. Checked before it was announced: the served file's SHA-256 equals the verified build (`175BD9D4…6E1C`); HTTPS with HSTS; gzip (198,783 bytes transferred); `Cache-Control: max-age=600`; no cookies. In a phone-sized browser it opens in Hindi as version 3.5, hides the update link, makes no request outside the site and rates a scam message High risk, with no page error.
