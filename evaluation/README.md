# Independent synthetic evaluation

`blind-v5.json` is a 320-message synthetic evaluation set written by an independent agent that did not see the checker, earlier sets, or project outputs. It contains English, Hindi, and Roman Hindi examples labelled fraud, suspicious, or benign.

Run the current engine against it with:

```text
node score-blind.cjs ../prototype/engine.js blind-v5.json
```

The scorer prints aggregate metrics and never prints message text. The published Release 3.2 aggregate is in `../evidence/Blind-Evaluation.json`.

The set is synthetic, has one annotator, and uses a designed class mix. It does not estimate real-world prevalence or prove real-world accuracy. Once a result has been inspected and used to change the model, the set is development data rather than blind evidence.

