# Niveshak Saathi validation

**Build checked:** 2026-10-02 in installed Microsoft Edge (headless). The verified public file is 495,106 bytes, with SHA-256 `DFFF70E703656669048C58D0D319C2FB3E842B60297AB18AE29D7F5145FF2B4F`.

The evidence records are `Browser-Validation.json`, `Rule-Evaluation.json`, `Blind-Evaluation.json` and `Release-3.2-Verification.json`.

## Checks that passed

- **1,201 automated checks** across the canonical suites, including 435/435 developer message expectations.
- **Browser journeys:** 130/130 checks in each of three independent runs, with no runtime errors.
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

## Size and speed

- 495,106 bytes uncompressed and 146,742 bytes with gzip.
- Simulated slow network (400 ms latency, 50,000 bytes/second, 4× CPU slowdown): median 11,515 ms uncompressed and 4,427 ms gzip-served across the latest three-run record.
- Message analysis remains local and takes about 1 ms for ordinary inputs.

## Still unproven

- avoided fraud or loss in real use;
- real-user comprehension and completion;
- native-speaker review of Hindi;
- physical low-end device and screen-reader conformance;
- accuracy on a representative, consented real-message corpus;
- CDN and operations performance at national traffic volumes.

No complaint was filed and no helpline was called during verification.
