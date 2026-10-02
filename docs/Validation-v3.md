# Niveshak Saathi validation

**Build checked:** 2026-10-02 in installed Microsoft Edge (headless). The verified public file is 509,588 bytes, with SHA-256 `055455709CAA0AA479C309CAB84A9EA668D9B553532696A511D4AEC05CE7BBAB`.

The evidence records are `Browser-Validation.json`, `Rule-Evaluation.json`, `Blind-Evaluation.json` and `Release-3.3-Verification.json`.

## Checks that passed

- **1,229 automated checks** across the canonical suites, including 449/449 developer message expectations.
- **Browser journeys:** 130/130 checks in each of three independent runs, with no runtime errors.
- **Real-world users and stress inputs (Release 3.3):** 14/14 checks.
  - **Who:** 100 realistic users written by four separate agents that never saw the code. They cover ages 18–80, Hindi and English screens, phones 320–412 px wide and large text.
  - **What they did:** each used one tool in their own words, from Home.
  - **Result:** 92 fully right, 8 partly right, 0 wrong. Release 3.2 scored 83, 9 and 8.
  - **Stress inputs:** 15 of them, including a 9,659-character forward, pasted HTML and script, and the phone Back button.
  - **Details:** see `REAL-WORLD-USER-TEST.md`. These users were used to fix problems, so they are now a regression test, not an accuracy result.
- **Public-scale reliability and personas:** 26/26 checks. They cover the three fixed plans, official-source steps, absence of profile/financial inputs, English and Hindi rendering, action routing, all five reliability states, no storage, no user-data requests, and a 320-pixel Hindi phone view.
- **App shell:** 30/30 checks across 320, 360 and 390-pixel phones, Hindi and English, normal/large/200% text, keyboard navigation and print layout.
- **On-device assistant:** 176 checks for English, Hindi and Roman Hindi own-words input, return maths and before-payment decisions.
- **Content and Owner Studio:** all validator and editor suites passed. Unsafe content prevents a build.
- **Emergency, grievance, packet and family coverage:** all 60 emergency combinations, 272 grievance route states and 60 family combinations are covered.
- **Privacy:** the public file contains no Studio or file-writing code; the tested journeys use no browser storage, cookies, analytics, cloud inference or third-party request.
- **Offline:** the downloaded file works with networking disabled. Official links naturally require internet.

## Model evidence

The checker combines multilingual warning-sign rules, a fitted logistic model and hard safety floors. The interface now explains the agreement around each result and abstains when the language is outside coverage or there is insufficient evidence.

Three sealed synthetic sets of 320 messages each were written separately and scored once for their intended model version. On the final untouched set:

| Measure | Result | 95% interval |
|---|---:|---:|
| Fraud or suspicious messages warned | 72.4% | 65.7–78.2% |
| Fraud messages at High | 71.9% | 63.5–78.9% |
| Ordinary messages warned | 8.6% | 4.9–14.7% |
| Ordinary messages at High | 7.0% | 3.7–12.8% |

These are synthetic-message results, not evidence of nationwide accuracy or avoided financial loss.

**Checker 3.3 (Release 3.3)** adds patterns from the real-world user test:
- Hindi, Hinglish and English electricity, gas or SIM disconnection threats;
- task scams that promise money back "with profit";
- loan-app shaming threats;
- a narrow "beware of those who promise…" awareness pattern.

It also fixes a bug where a decimal deposit rate such as "7.25%" was read as "25%", which gave genuine bank FD offers a false "High risk".

Regression checks:
- all earlier developer cases still pass, and 14 new cases were added (449/449);
- the independent boundary set passes 38/38;
- the first two sealed sets give identical results;
- on the third sealed set, the only changes are two scams now caught and one false alarm removed.

The table above remains the last untouched measurement (model 3.2). The third set has now been seen, so the improvement is not claimed as a new accuracy figure.

**Fresh sealed set (blind-v6, scored once on 2 October 2026).** A separate agent that never saw the checker or earlier sets wrote 120 messages:
- **Mix:** 50 fraud, 20 suspicious and 50 benign. The fraud includes 28 everyday scams: electricity cut-offs, KYC blocks, parcels, "digital arrest", task scams and loan-app threats. 38 of the 50 benign messages are deliberately tricky look-alikes.
- **Languages:** 40% Hindi, 30% Roman Hindi, 25% English and 5% mixed.

| Measure | Checker 3.2 | Checker 3.3 |
|---|---:|---:|
| Fraud or suspicious messages warned | 84.3% [74.0–91.0] | 87.1% [77.3–93.1] |
| Fraud warned | 90.0% [78.6–95.7] | 94.0% [83.8–97.9] |
| Fraud at High | 78.0% [64.8–87.2] | 82.0% [69.2–90.2] |
| Everyday-scam fraud warned | 86.2% [69.4–94.5] | 93.1% [78.0–98.1] |
| Ordinary messages warned | 30.0% [19.1–43.8] | 24.0% [14.3–37.4] |
| Ordinary messages at High | 24.0% [14.3–37.4] | 18.0% [9.8–30.8] |

Every ordinary message flagged was a tricky look-alike; none of the 12 everyday ones was flagged.

**Main remaining weakness:** some genuine messages still reach High:
- messages that mention an OTP or code in a routine or protective way, such as a Hindi OTP SMS, a delivery or LPG code, or an income-tax message;
- some awareness messages.

This set has now been inspected, so it is development data. The next improvement must be measured on another fresh set.

## Size and speed

- 509,588 bytes uncompressed and 151,758 bytes with gzip.
- Simulated slow network (400 ms latency, 50,000 bytes/second, 4× CPU slowdown): median 11,569 ms uncompressed and 4,406 ms gzip-served across the latest three-run record.
- Message analysis remains local and takes about 1 ms for ordinary inputs.

## Still unproven

- avoided fraud or loss in real use;
- real-user comprehension and completion;
- native-speaker review of Hindi;
- physical low-end device and screen-reader conformance;
- accuracy on a representative, consented real-message corpus;
- CDN and operations performance at national traffic volumes.

No complaint was filed and no helpline was called during verification.
