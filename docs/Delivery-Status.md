# Delivery status — Niveshak Saathi

## Public demo

[Open Niveshak Saathi](https://niveshak-saathi-safety.himanshirathore25102.chatgpt.site)

- **Audience:** public. Confirmed on 2 October 2026; the link opens without signing in.
- **What it serves:** Release 3.3, app size 509,588 bytes, product/checker version 3.3.
- **Normalized served SHA-256:** `055455709CAA0AA479C309CAB84A9EA668D9B553532696A511D4AEC05CE7BBAB` after removing the host's per-request Cloudflare block. The raw served response was 510,526 bytes in the verification request.
- **Sites source commit:** `a4c827030be170270274ceb0400e4ee7b3a30f08`.
- **Version ID:** `appgprj_6abdcbd1b6148191a68dc1b38c53c585~appgver_cde24683035881918757492d23d7bf2a` (version 3).
- **Deployment ID:** `appgdep_6abf5da335a48191bb4f65074ab52f20`.
- **Deployment result:** succeeded at 13:01 IST on 2 October 2026.
- **Post-deployment checks:** `check-live-build.cjs` reported `matchesExpected: true`; the public URL passed 10/10 deployment smoke checks. Home, Hindi/English, all three safety plans, long-forward splitting, browser Back and the grey neutral “No known signs” state were visually checked against the identical local file.

**What the host does (measured on 2 October 2026; known limits until the owner decides on hosting, O-4):**
- It adds Cloudflare's bot-check script in a hidden frame.
- It sets a 30-minute `__cf_bm` security cookie (HttpOnly, Secure) for the whole `chatgpt.site` domain. The app itself sets and reads no cookies and stores nothing.
- It sends no security headers: no HSTS, `nosniff`, framing protection, Content-Security-Policy or Referrer-Policy.
- It sends `Cache-Control: public, max-age=0, must-revalidate` with no ETag or Last-Modified date, so every visit downloads the whole page again.
- The Release 3.4 work in progress adds a policy inside the page itself (Content-Security-Policy and no-referrer). Only the host can add the rest.

## Newest verified repository build: Release 3.4 (not yet deployed)

- **File:** `prototype/dist/index.html`, 561,637 bytes (164,699 with gzip).
- **SHA-256:** `911E8BA0637980325249E72B5442A6B0CE3306153D3432C663CE773EF02DBB04`.
- **Versions:** product 3.4, content 2026.10.02. The checker is still 3.3: a candidate checker was measured on the fresh blind-v8 set, showed no significant gain, and was kept back by the owner.
- **Verification:** all 22 release suites passed (`Release-3.4-Verification.json`), 1,297 automated checks in total. They include:
  - 130/130 browser checks in each of three runs;
  - 449/449 developer message cases;
  - the 100-user test 14/14 (92 right, 8 partly, 0 wrong);
  - 39 complaint-route and rights checks;
  - 27 privacy and security checks.
- **New in Release 3.4:**
  - sourced complaint steps and tips (RBI Ombudsman, police/EOW and Sachet, UDGAM/MITRA/Bima Bharosa, IEPF-5, frozen accounts, loan apps, unexplained debits);
  - eight rights cards (SEBI, RBI, IRDAI);
  - button hints;
  - SEBI's F&O study card;
  - truthful hosting and privacy notes;
  - an in-page security policy;
  - a version line with a tap-only update link.
- **To deploy:** follow `CODEX-DEPLOY-HANDOFF.md` with this hash. After the redeploy, `node tools/check-live-build.cjs <URL> 911E8BA0637980325249E72B5442A6B0CE3306153D3432C663CE773EF02DBB04` must report `matchesExpected: true`, and the smoke test must pass 10/10. Release 3.3 below stays the rollback target.
- **GitHub Pages mirror (owner decision D-9):** it appears once the owner enables Pages for the repository, at `https://himanshi252005.github.io/Niveshak-Saathi/prototype/dist/`. Its headers and served hash are checked before it is announced.

## Previous verified build: Release 3.3 (live)

- File: `prototype/dist/index.html`
- Bytes: 509,588
- Gzip bytes: 151,758
- SHA-256: `055455709CAA0AA479C309CAB84A9EA668D9B553532696A511D4AEC05CE7BBAB`
- **Verification:** all 20 release suites passed (`Release-3.3-Verification.json`), 1,229 automated checks in total. They include:
  - 14 real-world user checks;
  - 26 persona and reliability checks;
  - 130/130 browser checks in each of three runs;
  - 449/449 developer message cases.
- **New in Release 3.3:**
  - the fixes from a 100-user real-world test (`REAL-WORLD-USER-TEST.md`): urgent help recognises money taken, not only sent, and remote-access apps described in everyday words;
  - long forwards are checked in parts instead of being cut at 6,000 characters;
  - the phone Back button stays in the app;
  - a typed question asks for the real message;
  - Marathi gets a "may miss signs" note;
  - "No known signs" is neutral, not green;
  - checker 3.3: disconnection threats, task scams, loan-app shaming, and genuine bank FD offers and awareness messages no longer flagged.
- **Earlier in this build:** fixed plans for Praveen, Kavita and Babulal; the five-state reliability explanation; owner editing for persona content; national-scale architecture and rollout documentation.

The previous Release 3.2 deployment remains the rollback target: app SHA-256 `E377FB4EF8024F00C647C4D2D2C1CE82146DDADC48C26C43E6D5BD274001DAC6`.
