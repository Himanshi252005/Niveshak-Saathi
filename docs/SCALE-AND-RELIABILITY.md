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

The current public app is one 509,588-byte HTML file, 151,758 bytes with gzip. A one-time cold download by 16 crore users would be about 24.3 TB of transfer before ordinary CDN caching. The central system serves the same immutable file; the user's device performs the analysis. Repeat use can run from the downloaded offline copy.

At 1% daily active use, 16 lakh cold downloads would be about 235 GB before caching. Actual national capacity depends on peak traffic, geography, cache-hit rate, hosting limits and partner distribution, so these arithmetic estimates are planning inputs rather than a load-test result.

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

## Evidence for the current build

- 449/449 developer regression expectations passed.
- The sealed 320-message synthetic set remains unchanged: 72.4% of fraud or suspicious messages warned; 8.6% of ordinary messages warned; 7% of ordinary messages received High.
- 26/26 new persona, privacy, mobile and reliability checks passed.
- 130/130 browser checks passed in each of three runs.
- All 20 release suites passed against the same 509,588-byte build.

These are engineering checks. They do not demonstrate prevented loss, national concurrency, real-world model accuracy or successful navigation by actual users.
