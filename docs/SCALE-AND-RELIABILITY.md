# Scale and reliability plan

## What "ready for 16 crore demat accounts" can honestly mean

India has more than 16 crore demat accounts (hackathon brief). That is a count of accounts, not of people: one investor can hold several.

Niveshak Saathi does not connect to demat accounts and keeps no record per account or per user. Its core safety check runs inside the visitor's browser, so the service never receives the message and needs no central AI inference for each check.

This architecture can **reach** that population through static distribution, but the prototype has not been load-tested at that scale, and no such usage claim is made. National readiness also needs an independent security review, native-language review, real-device accessibility testing, real-user evaluation, support operations and accountable owners for the regulatory content.

## Scale architecture

```text
Official reviewed sources
          |
          v
Owner Control Studio -> validation -> versioned static build (reproducible, hash recorded)
                                          |
                              CDN / partner / offline sharing
                                          |
                                          v
User's browser: language coverage + rules + fitted risk score + safety floors
                                          |
                                  result stays on the device
```

Release 3.5 is one HTML file of 848,230 bytes, 244,877 bytes with gzip.
- **Cold downloads:** one download by each of 16 crore users would be about 39.2 TB of transfer before ordinary CDN caching (earlier Release 3.5 builds: 30.8 to 38.0 TB; Release 3.4: 26.4 TB; Release 3.3: 24.3 TB).
- **How the load is shared:** the central system serves the same unchanging file, and the user's device does the analysis. Repeat use can run from the downloaded offline copy.
- **Daily use:** at 1% daily active use, 16 lakh cold downloads would be about 392 GB before caching (Release 3.4: 264 GB; Release 3.3: 243 GB; an earlier version of this page said 235 GB in error).
- **Today's host:** GitHub Pages, which serves the live link, has a soft bandwidth limit of 100 GB a month ([GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)): about 4 lakh first-time downloads of this file (the 46 MB demo video counts against the same budget). Repeat visits within ten minutes and the saved offline copy cost nothing. That is enough for pilots, not for a national rollout, which needs a CDN or partner hosting.
- **Caveat:** real national capacity depends on peak traffic, geography, cache-hit rate, hosting limits and partner distribution. These estimates are planning inputs, not a load-test result.

## Hosting and browser security

**What the page enforces itself (since Release 3.4):**
- a Content-Security-Policy in the page:
  - scripts and styles only inline or from the page's own site;
  - images only from the page itself, `data:` or `blob:`;
  - network calls only to the page's own site;
  - no plugins, base-address changes or form submissions;
- a no-referrer policy, so an official site opened from the app is not told where the visitor came from.

The app's only network request is a fresh copy of its own page, for "Save offline copy" and "Share this app". A browser test checks all of this, including the offline copy and a simulated copy of the host's script (internal script).

**What only the host can set:**
- HSTS;
- `X-Content-Type-Options: nosniff`;
- protection against being framed by another site (`frame-ancestors` or `X-Frame-Options`; browsers ignore `frame-ancestors` in a page's own policy);
- cache validators.

**Measured on the live link (GitHub Pages) on 2 October 2026:**
- HTTPS with HSTS (`max-age` one year); no `nosniff` or framing-protection header, which only the host could add;
- gzip, `Cache-Control: max-age=600` with ETag and Last-Modified validators, so repeat visits within ten minutes come from the browser cache and later ones can be answered with "not modified";
- served by GitHub's content-delivery network; from India the response came from a Mumbai edge cache;
- no cookies and no script added by the host.

**The second copy on the earlier host** (measured the same day) sends none of the security headers, sends `Cache-Control: public, max-age=0, must-revalidate` with no validators (every visit downloads the whole page again), adds Cloudflare's bot-check script in a hidden frame and sets three cookies of its own: `__Host-appgarden-visitor` (90 days), `cf_clearance` (365 days) and `__cf_bm` (about 30 minutes). The app neither sets nor reads any of them, and the saved offline copy has none ([privacy](../PRIVACY.md)).

**Hosting decision:** since 2 October 2026 the live link is GitHub Pages (https://himanshi252005.github.io/Niveshak-Saathi/). It was checked before it was announced: the served file equals the verified build; HTTPS with HSTS; gzip; no cookies. The earlier host is kept only as a second copy.

## Hybrid AI/ML reliability design

The message checker combines three layers of protection:

1. **Explainable language signals:** local English, Hindi and Roman-Hindi patterns identify warning categories, suspicious links, return promises and payment details.
2. **A fitted statistical risk model:** an L2-regularised logistic model combines the warning categories into a score. Its weights and thresholds are visible to the user.
3. **Fixed safety floors and abstention:** credential requests, paid recovery offers, withdrawal fees and payment-backed threats stay High risk even when the fitted score is uncertain. Unsupported languages and no-match results explicitly abstain from a safety claim.

The reliability result reports one of five states:

| State | Meaning | Required behaviour |
|---|---|---|
| Strong warning agreement | A critical safety floor and the fitted model point to danger | Stop and verify independently |
| Several warning signs agree | Multiple distinct signals support the result | Do not act until verified |
| Limited evidence | One known warning sign was found | Pause; the app cannot verify the sender |
| Outside coverage | The wording is outside reliable English/Hindi coverage | Ask a trusted person; never infer safety |
| Insufficient evidence | No known signal was found | This is abstention, not a safe verdict |

This layer improves how uncertainty is communicated without changing the risk thresholds or claiming new accuracy.

## Access for the three priority audiences

The public app offers three owner-editable, privacy-safe example plans:

- **Praveen:** Telegram/WhatsApp F&O tips, borrowing pressure, SEBI's F&O loss study, intermediary checks and official payment routes.
- **Kavita:** Hindi-first guidance, read-aloud, fake IPO and high-return offers, ASBA, SEBI Check and RBI Sachet.
- **Babulal:** old folios, nominees, paper shares, company/RTA/DP routes, IEPF next steps and paid recovery-agent warnings. Release 3.5 adds the IEPF-5 and SCORES step-by-step guides, the nominee guide and the Family asset map.

Selecting a plan stores no profile, and no plan asks for a name, account number, holdings, income or documents. Users of languages other than Hindi and English are pointed to official helplines that speak their language (SEBI in seven languages; RBI 14448 in English, Hindi and ten regional languages; IRDAI in Hindi, English and other major languages). Owners update every plan in the local Owner Control Studio; the build refuses missing bilingual text, invalid tool links or unapproved source references.

## Reliability controls required for a national rollout

### Before a limited public pilot

- native Hindi and Roman-Hindi review;
- physical low-end Android, keyboard, screen-reader and installed-voice testing;
- red-team messages from people outside the team, including image and voice-note scenarios handled through safe manual guidance;
- a published incident contact and correction process (in place: [`SECURITY.md`](../SECURITY.md) and [`CONTRIBUTING.md`](../CONTRIBUTING.md));
- monthly official-source review with named owners and a change log, and reviewer confirmation of every source marked "review pending".

### Before a broad rollout

- a multi-region CDN with compression, unchanging versioned files and rollback;
- a signed release manifest and reproducible-build checks;
- uptime, download-failure and performance monitoring that collects no message text, account data or identifiers;
- opt-in, aggregate outcome measurement with minimum-cell privacy rules;
- a security and privacy assessment, an accessibility audit and a disaster-recovery drill;
- partner distribution through investor-awareness and community channels;
- separate native review and evaluation for every added language.

### Model operations

- maintain a frozen regression set and fresh held-out sets;
- report missed-warning and false-alarm rates by language and scam type;
- require a safety review for every rule, weight or threshold change;
- keep an immediate rollback build: the release that was live before each redeploy;
- never train on private user messages without explicit, informed consent and a separate data-governance process.

## Evidence for the current build

**Release 3.5** ([release record](../evidence/Release-3.5-Verification.json))
- **Checks:** 1,820 automated checks: 25 release suites plus 842/842 developer-case expectations; browser journeys 130/130 in each of 3 runs.
- **Fresh sealed set (blind-v10), scored once:** checker 3.6 warned on 83.8% [74.2–90.3] of fraud messages (67 of 80), 16 of 25 subtle frauds and 13.3% [7.8–21.9] of ordinary messages (12 of 90); fraud rated High 70% [59.2–78.9]. The rule written before scoring (no new false alarm and no fraud warning lost) held, so checker 3.6 replaced 3.5 inside Release 3.5. ([record](../evidence/Blind-Evaluation-v10.json)).
- **Fresh sealed set (blind-v9), checker 3.5, scored once:** fraud warned 87.5% [78.5–93.1]; fraud or suspicious 80% [71.6–86.4]; ordinary messages warned 12.2% [7–20.6] ([record](../evidence/Blind-Evaluation-v9.json)).
- **Speed of checker 3.5 (internal benchmark):** about 0.4 ms per ordinary message on the test computer, about 1.8 times checker 3.3; an unusual long input can take about 0.1–0.2 s the first time.
- **Load:** Home usable in 5.9 s on an emulated slow connection (about 400 kbps with a 4x slower CPU, gzip as the host serves it); on DevTools "Slow 3G" with a 6x slower CPU (internal), the Hindi loading screen with the 1930 button shows in 2.4 s and Home is usable in about 8 s.

**Release 3.4 (history; never deployed)**
- **Release suites:** all 22 passed against the same 561,637-byte build: 1,297 automated checks in total, that is the suites plus 449 developer-case expectations ([`Release-3.4-Verification.json`](../evidence/Release-3.4-Verification.json)).
- **Browser:** 130/130 checks in each of three runs. **Personas:** 26/26 persona, privacy, mobile and reliability checks. **Privacy and security:** 27/27, including no policy violation next to a simulated copy of the host's script.
- **Sealed set blind-v8 (200 messages, scored once):** the shipped checker 3.3 warned on 60.9% [51.6–69.5] of fraud or suspicious messages (67.5% [56.6–76.8] of fraud alone) and on 13.3% [7.8–21.9] of ordinary messages. Release 3.4's targets were missed. A candidate checker was not shipped because it showed no significant difference ([`Blind-Evaluation-v8.json`](../evidence/Blind-Evaluation-v8.json)).
- **Volume test of checker 3.3 (internal):** 1,000,000 checks with 0 errors and the same verdict on every repeat; 1,034 per second on one core, p99 9.6 ms; 20,000 adversarial inputs with 0 errors.
- **Load times (internal):** Home usable in 1.7 s (slow 4G), 4.7 s (weak 3G, low-end phone) and 8.4 s (2G), gzip-served: 10–15% slower than Release 3.3, because of the larger sourced content.

These are engineering checks. They do not demonstrate prevented loss, national concurrency, real-world model accuracy or successful navigation by actual users.
