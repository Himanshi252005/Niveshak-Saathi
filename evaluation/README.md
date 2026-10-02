# Independent synthetic evaluation

Three sealed synthetic sets are included. Each was written by a separate agent that did not see the checker, earlier sets or project outputs.

| Set | Messages | Mix | Scored once for |
|---|---:|---|---|
| `blind-v5.json` | 320 | English, Hindi and Roman Hindi; fraud, suspicious and benign | model 3.2 (Release 3.2) |
| `blind-v6.json` | 120 | 40% Hindi, 30% Roman Hindi, 25% English, 5% mixed; 50 fraud, 20 suspicious, 50 benign | models 3.2 and 3.3 (Release 3.3) |
| `blind-v8.json` | 200 | 70 Hindi, 60 Roman Hindi, 60 English, 10 mixed; 80 fraud, 30 suspicious, 90 benign | checker 3.3 and a candidate checker (Release 3.4) |

`blind-v6.json` adds the everyday scams people actually forward: electricity cut-offs, KYC blocks, parcels, "digital arrest", task scams, loan-app threats and prizes. 38 of its 50 benign messages are deliberately tricky look-alikes.

`blind-v8.json` was written after the Release 3.4 candidate checker was frozen.
- **What it contains:**
  - 25 subtle fraud messages and 12 subtle suspicious ones;
  - 50 tricky benign look-alikes and 40 everyday benign messages;
  - 162 categories, spread over the three personas.
- **Data safety:** every phone number, UPI ID, link and registration number in it is fictional.
- **What it found:** the candidate checker showed no significant difference from checker 3.3, so Release 3.4 ships checker 3.3.

Run the current engine against any set with:

```text
node score-blind.cjs ../prototype/engine.js blind-v8.json
```

The scorer prints aggregate metrics and never prints message text. The published aggregates are in:
- `../evidence/Blind-Evaluation.json` (blind-v5);
- `../evidence/Blind-Evaluation-v6.json` (blind-v6);
- `../evidence/Blind-Evaluation-v8.json` (blind-v8).

**Limits:**
- The sets are synthetic, each has one annotator, and they use a designed class mix. They do not estimate real-world prevalence or prove real-world accuracy.
- Once a result has been inspected and used to change the model, the set is development data rather than blind evidence. All three sets are now development data.

## 100-user real-world test

`real-world-test/` holds the 100 fictional users, the stress inputs and the scripts that run them in the real app and score the results. See `real-world-test/README.md`.
