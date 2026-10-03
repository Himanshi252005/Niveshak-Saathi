# Niveshak Saathi: the app

Open `dist/index.html` in a modern browser. No installation is required. After "Save offline copy" it works without internet. It keeps the user's entries only in page memory and saves nothing.

## What it does

Niveshak Saathi is a Hindi-first, English-supported investor-protection companion. It helps a person check a suspicious message, check before paying, act after fraud, find the right complaint route, prepare a privacy-safe complaint packet, know their rights, keep a private list of the family's investments, and practise safer habits.

**New in Release 3.5:**
- **Rights and help:** free official helplines that speak regional languages; five step-by-step guides (SEBI SCORES, IEPF-5 claim, RBI Ombudsman, insurance complaints, adding a nominee), every step sourced to an official page; all eight rights cards grouped by institution, each with "Where to complain about this".
- **Family asset map** (in Family safety): type, institution name (the only typed field; numbers, e-mail addresses and PAN are blocked), nominee status, where the papers are and who in the family knows. Download, print, and reopen the downloaded list on the phone; nothing is saved.
- Sources not yet confirmed by the named reviewer show "review pending".

The Home page also offers three fixed safety plans:
- **Praveen, 22:** pauses Telegram tips, borrowing and F&O pressure;
- **Kavita, 39:** checks Ponzi, fake IPO and payment requests in simple Hindi;
- **Babulal, 63:** organises dormant folios, nominees, RTA/DP steps and IEPF claims.

Choosing a plan creates no account or financial profile. It asks for no identity, holdings, income or account number, and the choice stays only in page memory.

The message checker combines multilingual warning-sign rules, a fitted logistic model and fixed safety floors. Beside the risk result it shows one of five reliability states: strong warning agreement, several signs, one known sign, outside language coverage, or insufficient evidence. "No known signs" is always described as insufficient evidence, never as proof that a message is safe.

Other features include read-aloud with the device's own voice, large text, a labelled phone menu, official-source citations, a clean offline copy, safe app sharing and an anonymous facilitator pilot mode. There are no tips, ads, analytics, accounts, cloud inference or third-party data calls.

## Build and files

Run `node build.cjs` (Node.js 18 or later) in this folder. It validates the content and rebuilds the self-contained `dist/index.html`, `release-manifest.json` and the local `owner-studio.html`. No package installation is required. The build is reproducible: the same sources give a byte-identical `dist/index.html`, and the manifest records its SHA-256.

| File or folder | Role |
|---|---|
| `base.html` | Original app structure |
| `engine.js` | Explainable message-risk and reliability model |
| `assist.js` | On-device keyword-based parser for the user's own words, Before you pay, and return maths |
| `upgrade.js`, `upgrade.css` | Public interface and accessibility |
| `content/*.json` | Owner-editable reviewed content: sources and helplines, routes, rights cards and guides, persona plans, family checklist and texts |
| `content-schema.js` | Safety and content validator |
| `studio/`, `owner-studio.html` | Local Owner Studio, never part of the public app; see [`OWNER-GUIDE.md`](OWNER-GUIDE.md) |
| `evaluation-cases.json` | Developer cases for the checker |

The live link is published from this repository's `gh-pages` branch; the earlier host's deployment settings are kept outside this repository.

## Scale design

The public app is a static, cacheable file. Analysis happens on the device, so more users do not need inference servers, message databases or per-check API costs. The Release 3.5 build is 825,597 bytes raw and 237,429 bytes with gzip. A nationwide rollout still needs CDN capacity, regional monitoring, native-language review, security testing and staged pilots; reaching India's 16 crore demat accounts is a design target, not a completed load test. See [`../docs/SCALE-AND-RELIABILITY.md`](../docs/SCALE-AND-RELIABILITY.md).

## Evidence and limits

- **Release record:** [`../evidence/Release-3.5-Verification.json`](../evidence/Release-3.5-Verification.json): 1,741 automated checks, that is 24 release suites plus the developer cases.
- **Developer cases:** 796/796 expectations pass. They were written during development, so they are not an accuracy benchmark.
- **Sealed sets,** each written by a separate AI agent and scored once:
  - blind-v9 (Release 3.5, checker 3.5): fraud or suspicious messages warned 80% [71.6–86.4], fraud warned 87.5% [78.5–93.1], ordinary messages warned 12.2% [7–20.6] ([record](../evidence/Blind-Evaluation-v9.json));
  - blind-v8 (Release 3.4, checker 3.3): fraud or suspicious messages warned 60.9% [51.6–69.5], ordinary messages warned 13.3% [7.8–21.9] ([record](../evidence/Blind-Evaluation-v8.json));
  - blind-v5 (model 3.2): 72.4% [65.7–78.2] and 8.6% [4.9–14.7] ([record](../evidence/Blind-Evaluation.json)).

  Intervals and limits are in [`../docs/Validation-v3.md`](../docs/Validation-v3.md).

The checker does not verify an entity, certify safety, file a complaint or recover money. Real-user comprehension and outcomes, native Hindi review, physical low-end devices and real-message accuracy remain to be tested.
