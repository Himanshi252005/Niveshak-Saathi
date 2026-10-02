# Niveshak Saathi

Open `dist/index.html` in a modern browser. No installation is required. The app works offline and keeps the user's entries in the current page session.

## What it does

Niveshak Saathi is a Hindi-first, English-supported investor-protection companion. It helps a person check a suspicious message, verify before paying, take urgent action after fraud, find the right complaint route, prepare a privacy-safe Action Packet, protect family holdings, and practise safer habits.

The Home page also offers three fixed safety plans:

- **Praveen, 22:** pauses Telegram tips, borrowing and F&O pressure;
- **Kavita, 39:** checks Ponzi, fake IPO and payment requests in simple Hindi;
- **Babulal, 63:** organises dormant folios, nominee, RTA/DP and IEPF next steps.

Choosing a plan creates no account or financial profile. It asks for no identity, holdings, income or account number, and the choice stays only in page memory.

The message checker combines multilingual warning-sign rules, a fitted logistic model and hard safety floors. Beside the risk result it shows one of five reliability states: strong warning agreement, multiple signals, one known signal, outside language coverage, or insufficient evidence. “No known signs” is always described as insufficient evidence, never as proof that a message is safe.

Other features include read-aloud, large text, a labelled phone menu, official-source citations, a clean offline copy, safe app sharing and an anonymous facilitator pilot mode. There are no tips, ads, analytics, accounts, cloud inference or third-party data calls.

## Build and files

Run `node build.cjs` to validate the content and rebuild the self-contained `dist/index.html`, `release-manifest.json` and local `owner-studio.html`. No package installation is required.

| File or folder | Role |
|---|---|
| `base.html` | Original app structure |
| `engine.js` | Explainable message-risk and reliability model |
| `assist.js` | Own-words, before-payment and return-maths logic |
| `upgrade.js`, `upgrade.css` | Public interface and accessibility |
| `content/*.json` | Owner-editable reviewed content, including persona plans |
| `content-schema.js` | Safety and content validator |
| `studio/` | Local Owner Studio; see `OWNER-GUIDE.md` |

Keep the Site identity in `.openai/hosting.json` when redeploying the same public link.

## Scale design

The public app is a static, cacheable file. Analysis happens on the device, so adding users does not add inference servers, message databases or per-check API cost. The verified build is 509,588 bytes raw and 151,758 bytes with gzip. A nationwide rollout still needs CDN capacity, regional monitoring, native-language review, security testing and staged pilots; “16 crore accounts” is a capacity target, not a completed load test. See `../SCALE-AND-RELIABILITY.md`.

## Evidence and limits

- 449/449 developer regression expectations pass. These are not an accuracy benchmark.
- Three sealed synthetic blind sets are recorded in `../Blind-Evaluation.json`. On the final untouched set, the checker warned on 72.4% of fraud or suspicious messages and 8.6% of ordinary messages; 95% intervals and limitations are in `../Validation-v3.md`.
- The full release record is `../Release-3.3-Verification.json`.

The checker does not verify an entity, certify safety, file a complaint or recover money. Real-user comprehension, outcomes, native Hindi review, physical low-end devices and real-message accuracy remain to be tested.
