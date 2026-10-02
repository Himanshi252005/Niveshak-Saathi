# Delivery status — Niveshak Saathi

## Public demo

[Open Niveshak Saathi](https://niveshak-saathi-safety.himanshirathore25102.chatgpt.site)

- **Audience:** public. Checked on 2 October 2026: the link opens without signing in.
- **What it serves:** the earlier Release 3.2 build (474,236 bytes, version 3.2), without the persona plans or the Release 3.3 fixes.
- **How to update it:** the Site is published with the Sites tool in Codex/ChatGPT under the owner's account. Publish `prototype/dist/index.html` exactly as verified below, keep public access, then record the deployment id and the served hash here.

## Newest verified repository build: Release 3.3

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

The Sites source repository holds the persona build at commit `b10c33c0ce136bbd12fd91065a6cfe8fedca9a89` (before Release 3.3). No new public deployment has been made since Release 3.2. The GitHub repository holds the current verified build.
