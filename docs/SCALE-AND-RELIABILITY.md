# Scale and reliability plan

## What “ready for 16 crore accounts” can honestly mean

Niveshak Saathi does not connect to demat accounts and should not maintain one record per account. Its core safety check runs inside the visitor's browser, so the service does not receive the message and does not need a central AI inference request for every user.

This architecture can **address** a population of 16 crore account holders through static distribution, but the prototype has not been load-tested with 16 crore people and no such usage claim should be made. National readiness also requires independent security review, native-language review, real-device accessibility testing, real-user evaluation, support operations and accountable regulatory-content owners.

## Scale architecture

```text
Official reviewed sources
          |
          v
Owner Control Studio -> validation -> signed/versioned static build
                                          |
                              CDN / partner / offline sharing
                                          |
                                          v
User's browser: language coverage + rules + fitted risk score + safety floors
                                          |
                                  result stays on-device
```

Release 3.4 is one 561,637-byte HTML file, 164,699 bytes with gzip (Release 3.3: 509,588 and 151,758).
- **Cold downloads:** a one-time download by 16 crore users would be about 26.4 TB of transfer before ordinary CDN caching (Release 3.3: 24.3 TB).
- **How the load is shared:** the central system serves the same immutable file, and the user's device performs the analysis. Repeat use can run from the downloaded offline copy.
- **Daily use:** at 1% daily active use, 16 lakh cold downloads would be about 264 GB before caching (Release 3.3: 243 GB; an earlier version of this page said 235 GB in error).
- **Caveat:** actual national capacity depends on peak traffic, geography, cache-hit rate, hosting limits and partner distribution. These arithmetic estimates are planning inputs, not a load-test result.

## Hosting and browser security

**What the page enforces itself (Release 3.4 work in progress):**
- a Content-Security-Policy in the page:
  - inline scripts and styles only;
  - images only from the page itself, `data:` or `blob:`;
  - network calls only to the page's own site;
  - no plugins, base-address changes or form submissions;
- a no-referrer policy, so an official site opened from the app is not told where the visitor came from.

The app's only network request is a fresh copy of the page itself, for "Save offline copy" and "Share this app". `work/claude-tests/c25-p2-privacy.cjs` checks all of this in the browser, including the offline copy and a simulated host script.

**What only the host can set:**
- HSTS;
- `X-Content-Type-Options: nosniff`;
- protection against being framed by another site (`frame-ancestors` or `X-Frame-Options`; browsers ignore `frame-ancestors` in a page's own policy);
- cache validators.

**Measured on the public host on 2 October 2026:**
- none of those headers is sent;
- there is no Content-Security-Policy, Referrer-Policy or Permissions-Policy header;
- `Cache-Control` is `public, max-age=0, must-revalidate`, with no ETag or Last-Modified date. A conditional request still returns the full page, so every visit downloads it again: about 152 KB compressed for Release 3.3, and about 165 KB for the Release 3.4 work in progress.

**What the host adds:**
- Cloudflare's bot-check script, in a hidden frame;
- a `__cf_bm` security cookie, HttpOnly and Secure, which expires after 30 minutes. It is scoped to the whole `chatgpt.site` domain.

The app neither sets nor reads either. The page's policy still lets the host script run.

**Owner decision (O-4):** keep ChatGPT Sites and accept these limits, or add a mirror on a host that lets the owner set these headers and cache validators. Check any new host's headers before relying on it.

## Hybrid AI/ML reliability design

The message checker combines three independent protections:

1. **Explainable language signals:** local English, Hindi and Roman-Hindi patterns identify 15 warning categories, suspicious links, return promises and payment details.
2. **Fitted statistical risk model:** an L2-regularised logistic model combines the warning categories into a score. Its weights and thresholds are visible to the user.
3. **Deterministic safety floors and abstention:** credential requests, paid recovery offers, withdrawal fees and payment-backed threats stay High risk even when the fitted score is uncertain. Unsupported language and no-match results explicitly abstain from a safety claim.

The new reliability result reports one of five states:

| State | Meaning | Required behaviour |
|---|---|---|
| Strong warning agreement | A critical safety floor and the fitted model point to danger | Stop and verify independently |
| Several warning signs agree | Multiple distinct signals support the result | Do not act until verified |
| Limited evidence | One known warning sign was found | Pause; the app cannot verify the sender |
| Outside coverage | The wording is outside reliable English/Hindi coverage | Ask a trusted person; never infer safety |
| Insufficient evidence | No known signal was found | This is abstention, not a safe verdict |

This layer improves how uncertainty is communicated without changing the underlying risk thresholds or claiming new accuracy.

## Access for the three priority audiences

The public app now offers three owner-editable, privacy-safe example plans:

- **Praveen:** Telegram/WhatsApp F&O tips, borrowing pressure, intermediary verification and official payment routes.
- **Kavita:** Hindi-first guidance, read-aloud support, fake IPO and high-return offers, ASBA, SEBI Check and RBI Sachet.
- **Babulal:** old folios, nominees, paper shares, company/RTA/DP routes, IEPF-related next steps and paid recovery-agent warnings.

Selecting a plan stores no profile, and the plan asks for no name, account number, holdings, income or documents. Owners can update every plan in the local Owner Control Studio; the build refuses missing bilingual text, invalid tool links or unapproved source references.

## Reliability controls required for a national rollout

### Before a limited public pilot

- native Hindi and Roman-Hindi review;
- physical low-end Android, keyboard, screen-reader and installed-voice testing;
- independent red-team messages, including images and voice-note scenarios handled through safe manual guidance;
- published incident contact and correction process;
- monthly official-source review with named owners and a change log.

### Before a broad rollout

- multi-region CDN with compression, immutable versioned assets and rollback;
- signed release manifest and reproducible build checks;
- uptime, download failure and performance monitoring that collects no message text, account data or identifiers;
- opt-in, aggregate outcome measurement with minimum-cell privacy rules;
- security and privacy assessment, accessibility audit and disaster-recovery drill;
- partner distribution through investor-awareness and community channels;
- separate native review and evaluation for every added language.

### Model operations

- maintain a frozen regression set and fresh held-out sets;
- report missed-warning and false-alarm rates by language and scam type;
- require a safety review for every rule, weight or threshold change;
- keep an immediate rollback build;
- never train on private user messages without explicit, informed consent and a separate data-governance process.

## Evidence for the current build (Release 3.4)

- **Release suites:** all 22 passed against the same 561,637-byte build, 1,297 automated checks in total (`Release-3.4-Verification.json`).
- **Developer cases:** 449/449 regression expectations passed.
- **Browser:** 130/130 checks in each of three runs.
- **Personas:** 26/26 persona, privacy, mobile and reliability checks.
- **Privacy and security:** 27/27 checks, including no policy violation next to a simulated copy of the host's injected script.
- **Fresh sealed set (blind-v8, 200 messages, scored once):** the shipped checker 3.3 warned on 67.5% [56.6–76.8] of fraud, and on 13.3% [7.8–21.9] of ordinary messages. A candidate checker was not shipped because it showed no significant difference (`Blind-Evaluation-v8.json`).
- **Volume:** the shipped checker is unchanged since Release 3.3, so the C-22 volume test still applies:
  - 1,000,000 checks with 0 errors and the same verdict on every repeat;
  - 1,034 per second on one core, p99 9.6 ms;
  - 20,000 adversarial inputs with 0 errors.
- **Load times:** Home is usable in 1.7 s (slow 4G), 4.7 s (weak 3G, low-end phone) and 8.4 s (2G), gzip-served. That is 10–15% slower than Release 3.3, because of the larger sourced content.

These are engineering checks. They do not demonstrate prevented loss, national concurrency, real-world model accuracy or successful navigation by actual users.
