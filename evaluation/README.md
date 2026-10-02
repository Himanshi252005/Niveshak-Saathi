# Sealed synthetic evaluation sets

These message sets measure the message checker. Each was written by a separate AI agent: an AI assistant in a fresh session that did not see the checker, the tests, earlier sets or the project's documents. The messages are synthetic. They were not written by people and are not real messages.

| Set | Messages | Mix | Scored once for |
|---|---:|---|---|
| `blind-v5.json` | 320 | English, Hindi and Roman Hindi; 128 fraud, 64 suspicious, 128 ordinary | model 3.2 (Release 3.2) |
| `blind-v6.json` | 120 | 40% Hindi, 30% Roman Hindi, 25% English, 5% mixed; 50 fraud (29 of them everyday scams), 20 suspicious, 50 ordinary | checkers 3.2 and 3.3 (Release 3.3) |
| `blind-v8.json` | 200 | 70 Hindi, 60 Roman Hindi, 60 English, 10 mixed; 80 fraud, 30 suspicious, 90 ordinary | checker 3.3, shipped in Release 3.4, and a candidate checker that was not shipped |
| `blind-v9.json` | 200 | 70 Hindi, 60 Roman Hindi, 60 English, 10 mixed; 80 fraud, 30 suspicious, 90 ordinary | checker 3.5, shipped in Release 3.5, and checker 3.3 |

`blind-v6.json` adds the everyday scams people actually forward: electricity cut-offs, KYC blocks, parcels, "digital arrest", task scams, loan-app threats and prizes. 38 of its 50 ordinary messages are deliberately tricky look-alikes.

`blind-v8.json` was written after the Release 3.4 candidate checker was frozen.
- **What it contains:**
  - 25 subtle fraud messages and 12 subtle suspicious ones;
  - 50 tricky ordinary look-alikes and 40 everyday ordinary messages;
  - 162 categories, spread over the three personas.
- **What it found:** the candidate checker showed no significant difference from checker 3.3, so Release 3.4 shipped checker 3.3. Checker 3.3 warned on 60.9% [51.6–69.5] of fraud or suspicious messages (the measure used for the earlier sets) and on 67.5% [56.6–76.8] of fraud alone.
- **Labels:** in `Blind-Evaluation-v8.json`, the key "v3.4" is the candidate checker (not shipped) and "v3.3" is the checker shipped in Release 3.4.

`blind-v9.json` was written before checker 3.5 was frozen and was checked by counts only until both checkers were scored once. Checker 3.5 warned on 87.5% of fraud (3.3: 82.5%), 18 of 25 subtle frauds (3.3: 15) and 12.2% of ordinary messages (3.3: 11.1%). Details and the owner's decision: [`../evidence/Blind-Evaluation-v9.json`](../evidence/Blind-Evaluation-v9.json) and [`../docs/Validation-v3.md`](../docs/Validation-v3.md).

**Other sets.** The first two 320-message sets, blind-v3 and blind-v4, are scored in `Blind-Evaluation.json`, but their messages are not published. blind-v7 guided the Release 3.4 candidate checker and is not published.

Run the current engine against any set from this folder with:

```text
node score-blind.cjs ../prototype/engine.js blind-v9.json
```

The scorer prints aggregate metrics and never prints message text. The published aggregates are in:
- [`../evidence/Blind-Evaluation.json`](../evidence/Blind-Evaluation.json) (blind-v3, v4 and v5);
- [`../evidence/Blind-Evaluation-v6.json`](../evidence/Blind-Evaluation-v6.json) (blind-v6);
- [`../evidence/Blind-Evaluation-v8.json`](../evidence/Blind-Evaluation-v8.json) (blind-v8);
- [`../evidence/Blind-Evaluation-v9.json`](../evidence/Blind-Evaluation-v9.json) (blind-v9).

**Data safety.** Every phone number, UPI ID, link and registration number in these sets is made up. Some in the older sets (blind-v5 and blind-v6) look like real ones. Do not call, pay or open any of them.

**Limits**
- The sets are synthetic, each has one annotator, and they use a designed class mix. They do not estimate real-world prevalence or prove real-world accuracy.
- The writers were AI agents. They may share blind spots with the AI assistants that helped build the app.
- Once a result has been inspected and used to change the checker, the set is development data rather than blind evidence. All four sets here are now development data.

## How the checker's weights were fitted

The checker scores a message by adding one weight per warning category it finds, then turning the sum into a 0–1 score (logistic). The weights were fitted, not set by hand:
- **Method:** L2-regularised logistic regression (λ = 1) with one 0/1 feature per category. Labels: fraud = 1, suspicious = 0.5, ordinary = 0. Messages the checker cannot read are left out.
- **Data:** 1,083 readable messages: the developer cases plus the first two sealed sets (blind-v3 and blind-v4), after they had been scored once.
- **Rounding and thresholds:** weights are rounded to 0.5 so the score can be explained as a sum. The Caution threshold sits halfway between "no sign" and the weakest single sign. The High threshold, 0.65, was chosen by hand so that High means a safety floor, any two different signs or one strong sign.
- **Versions:** the weights were fitted for model 3.2 (Release 3.2). Checkers 3.3 and 3.5 kept the same bias and weights and changed the rules that find the categories and trigger the safety floors. (Checker 3.3's `engine.js` labels the weights "3.2"; checker 3.5's labels them "3.5", with the same values.) The feature table records the categories checker 3.3 found in the training messages. A refit on checker 3.5's categories was tried and not adopted: its own threshold made any single moderate sign High, and at the shipped threshold it caught slightly fewer development frauds at High.

[`fit-weights.cjs`](fit-weights.cjs) is the script, and [`fit-features.json`](fit-features.json) is its input: the categories found in each training message and its label, with no message text. This command reproduces the shipped weights and thresholds exactly (the release script refuses to publish if it does not):

```text
node fit-weights.cjs --features fit-features.json --lambda 1 --high 0.65 --out fit-report.json
```

`fit-report.json` then lists the raw and rounded weights, the trade-off table behind the threshold, and the training messages that stay below High.

## 100-persona simulated test

[`real-world-test/`](real-world-test/) holds the 100 fictional personas (written by AI; no real users), the stress inputs and the scripts that run them in the real app and score the results. The folder keeps its earlier name. See [`real-world-test/README.md`](real-world-test/README.md).
