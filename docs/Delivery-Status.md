# Delivery status — Niveshak Saathi v2

**Private deployment succeeded on 1 October 2026.**

[Open Niveshak Saathi](https://niveshak-saathi-safety.himanshirathore25102.chatgpt.site)

Access remains owner-private. Change sharing settings before expecting judges to open the hosted link; the downloadable offline pack is an alternative that requires no application account.

- Product version: 2.0
- Exact source commit: `92609db52df6c85b9a81e3c1898b02e608654cb2`
- Deployment: `appgdep_6abdd78526548191b1314853f2676ffc`
- Deployment status: succeeded
- Delivered HTML SHA-256: `7430D900DE1F71B113ADBB15C7EF5D1621DB8BFD64BAB18D021548FCEAF00C1C`

The deployment service confirmed publication. Functional, privacy, mobile and offline checks were performed against this local build; no logged-in production browser audit was performed.

**Local build status on 1 October 2026:** the canonical local `prototype/dist/index.html` is newer than this deployment. It is 94,508 bytes and has SHA-256 `9B36C353FFD3E6B4322325A3E79CA480B4E7150767EE9172CBE81A5407C9E772`. Canonical local evidence records 187/189 developer-authored expectations and 42/42 browser checks. The deployed hash above remains unchanged until a real redeployment succeeds.

The Windows workflow saved and pushed the source successfully, but its shell-based packaging step could not launch. The same bundled static-build preparation helper and native archive tool produced the deployment archive; the staged HTML hash matched the tested build. This archive was successfully published through Sites.

## Release 3.2: prepared and verified, not deployed (supersedes the Release 3.1 preparation)

**Status:** prepared and verified locally on 2 October 2026 by Claude (orchestrator). It has not been published.

- **Build:** `prototype/dist/index.html` is 473,298 bytes with SHA-256 `E377FB4EF8024F00C647C4D2D2C1CE82146DDADC48C26C43E6D5BD274001DAC6`. It is about 138 KB with gzip and 110 KB with brotli.
- **New since 3.1 (owner request: a professional, simpler layout for less-experienced users):**
  - the app opens on a Home page with one question and six large choices in everyday words;
  - a sidebar menu groups every tool under three plain headings; on phones it slides out from a labelled Menu button;
  - "Get urgent help" stays in the top bar on every page; less-used tools sit under More tools;
  - every emoji is removed, replaced by simple line icons;
  - the model, advice content and sources are unchanged.
- **Evidence:** `Release-3.2-Verification.json`, `Browser-Validation.json`, `Blind-Evaluation.json` and `Rule-Evaluation.json`, summarised in `Validation-v3.md`.
- **Package:** `Niveshak-Saathi-v3.2.zip`. The earlier zips (`Niveshak-Saathi-v3.1.zip`, `Niveshak-Saathi-v3.zip`, `Niveshak-Saathi-v2.zip`) are unchanged.
- **Publishing:** follow `Publish-Checklist.md`. The owner actions listed under Release 3.0 below still apply.

## Release 3.1: prepared and verified, not deployed (supersedes the Release 3.0 preparation)

**Status:** prepared and verified locally on 2 October 2026 by Claude (orchestrator). It has not been published.

- **Build:** `prototype/dist/index.html` is 455,432 bytes with SHA-256 `2799A7650D79877E4BFE0ED49257433175FED3EA1014723AEFCA7B415DD35F38`. It is about 133 KB with gzip and 106 KB with brotli.
- **New since 3.0:**
  - model v3.2, measured once on a third sealed set;
  - quick-start buttons;
  - "Share this app";
  - a facilitator pilot session;
  - sources reviewed by Himanshi Rathore;
  - 120 Hindi fixes from an independent review.
- **Evidence:** `Release-3.1-Verification.json`, `Browser-Validation.json`, `Blind-Evaluation.json` and `Rule-Evaluation.json`, summarised in `Validation-v3.md`.
- **Package:** `Niveshak-Saathi-v3.1.zip`. `Niveshak-Saathi-v3.zip` (the 3.0 preparation) and `Niveshak-Saathi-v2.zip` are unchanged.
- **Publishing:** follow `Publish-Checklist.md`. The owner actions listed under Release 3.0 below still apply.

## Release 3.0: prepared and verified, not deployed

**Status:** prepared and verified locally on 1 October 2026 by Claude (orchestrator). It has not been published: the hosted site above still serves version 2.

- **Build:** `prototype/dist/index.html` is 414,653 bytes with SHA-256 `632E95543D2C6BD66C22B05288F6FA5A7CB2D184E01DA68691B2166319CE3FD3`, built from the sources in `prototype/`. It is byte-identical to the tested preview.
- **Evidence:** `Release-3.0-Verification.json`, `Browser-Validation.json`, `Blind-Evaluation.json` and `Rule-Evaluation.json`, summarised in `Validation-v3.md`.
- **Package:** `Niveshak-Saathi-v3.zip`. `Niveshak-Saathi-v2.zip` is unchanged.

**Owner actions before publishing:**
1. **Decide who publishes** Release 3.0 (the owner, or GPT/Codex through Sites). Claude does not publish to Sites.
2. **Serve the file compressed** (gzip or brotli). It is about 120 KB compressed against 415 KB raw, which matters on slow connections.
3. **Make the GitHub repository private.** Until then, Release 3.0 commits stay local and are not pushed.
4. **Arrange a native Hindi review** before a public launch, and a check of the official links from your own network.
