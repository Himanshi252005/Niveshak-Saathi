# Independent synthetic evaluation

Two sealed synthetic sets are included. Each was written by a separate agent that did not see the checker, earlier sets or project outputs.

| Set | Messages | Mix | Scored once for |
|---|---:|---|---|
| `blind-v5.json` | 320 | English, Hindi and Roman Hindi; fraud, suspicious and benign | model 3.2 (Release 3.2) |
| `blind-v6.json` | 120 | 40% Hindi, 30% Roman Hindi, 25% English, 5% mixed; 50 fraud, 20 suspicious, 50 benign | models 3.2 and 3.3 (Release 3.3) |

`blind-v6.json` adds the everyday scams people actually forward: electricity cut-offs, KYC blocks, parcels, "digital arrest", task scams, loan-app threats and prizes. 38 of its 50 benign messages are deliberately tricky look-alikes.

Run the current engine against either set with:

```text
node score-blind.cjs ../prototype/engine.js blind-v6.json
```

The scorer prints aggregate metrics and never prints message text. The published aggregates are in `../evidence/Blind-Evaluation.json` (blind-v5) and `../evidence/Blind-Evaluation-v6.json` (blind-v6).

**Limits:**
- The sets are synthetic, each has one annotator, and they use a designed class mix. They do not estimate real-world prevalence or prove real-world accuracy.
- Once a result has been inspected and used to change the model, the set is development data rather than blind evidence. Both sets are now development data.
