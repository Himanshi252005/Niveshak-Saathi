# Claude handoff — Niveshak Saathi

## Goal

Continue turning Niveshak Saathi into a reliable, Bharat-first investor-protection product that can eventually serve users across India's 16+ crore demat accounts. Treat 16 crore as a capacity target, not a claim that national load has already been tested.

## Current verified state

- Canonical source: `prototype/`
- Public build: `prototype/dist/index.html`
- Build size: 495,106 bytes raw; 146,742 bytes with gzip
- SHA-256: `DFFF70E703656669048C58D0D319C2FB3E842B60297AB18AE29D7F5145FF2B4F`
- Verification: all canonical suites pass; 1,201 automated checks; browser record is 130/130 in each of three runs; developer message cases are 435/435.
- Blind synthetic result: 72.4% of fraud or suspicious messages warned; 8.6% of ordinary messages warned. Do not present this as real-world accuracy.

## Completed in the latest batch

1. Added fixed, bilingual safety plans for Praveen, Kavita and Babulal in `prototype/content/profiles.json`.
2. Added a Home shortcut and **My safety plan** page. No identity, account, holdings or income fields exist; selection remains in page memory.
3. Added a five-state reliability explanation around the checker: strong warning agreement, multiple signals, one signal, outside coverage and insufficient evidence.
4. Added owner editing and schema validation for persona plans in the local Owner Studio.
5. Added `docs/SCALE-AND-RELIABILITY.md` with honest national-scale architecture, traffic arithmetic, rollout gates and operational controls.
6. Refreshed the build and all evidence JSON files.

## Product guardrails

- No tips, predictions, broker promotion, ads, commissions or upsells.
- No SMS/OTP harvesting, account connection, analytics, cloud inference or persistent user profiles.
- Never call a no-match result safe; it is “insufficient evidence”.
- Keep Hindi and English parity, low-bandwidth/offline use, official-source citations and owner control.
- Do not put credentials, `context/`, `work/`, coordination logs or private notes in GitHub.

## Work deliberately stopped

The owner asked Codex to stop before the new build was deployed. The existing public URL remains available, but it may show the previous build:

`https://niveshak-saathi-safety.himanshirathore25102.chatgpt.site`

The updated Sites source was pushed at commit `b10c33c0ce136bbd12fd91065a6cfe8fedca9a89`; packaging/deployment was not completed.

## Next tasks

1. Read `docs/Delivery-Status.md`, `docs/Validation-v3.md`, `docs/SCALE-AND-RELIABILITY.md` and `prototype/OWNER-GUIDE.md`.
2. Confirm the GitHub checkout matches the build hash above.
3. When the owner asks, package and deploy the verified `prototype/dist/index.html` to the existing Site ID, preserve public access, and record the deployment/version IDs and served hash.
4. Open the public URL and visually check Home, all three persona plans, Hindi/English switching and the five reliability states.
5. For the next evidence milestone, run a consented Tier-2/3 pilot and native Hindi review. Do not invent outcomes.

## Safe demo cases

- Strong warning: `Send your OTP to our agent now to unlock the trading account.`
- Insufficient evidence: `Your monthly statement is ready in the official app. Do not share your OTP.`
- Outside coverage: use a Tamil message; the app should ask for human help rather than judge it.
