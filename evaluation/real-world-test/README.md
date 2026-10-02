# 100-persona simulated test kit (AI-written personas; no real users)

This is the test behind [`docs/REAL-WORLD-USER-TEST.md`](../../docs/REAL-WORLD-USER-TEST.md); the folder and file names keep their earlier "real-world" wording. It runs 100 fictional personas in the real app, plus 15 pasted stress inputs and 4 interaction checks, then scores what the app did.

## What is in it

| File | Purpose |
|---|---|
| `personas/part-1.json` to `part-4.json` | The 100 personas, written by four separate AI agents that never saw the code |
| `run-personas.cjs` | Opens the app in a headless browser and runs each persona's journey as that person would: their screen size, language and text size, starting from Home and typing their own words |
| `judge.cjs` | The scorer: grades each result against what a careful app should do, and lists the problems (the file name is historical) |
| `stress.cjs` | 15 pasted inputs people produce by accident, such as a 9,659-character paste, emoji only, hidden characters, pasted HTML and script, and right-to-left text; plus 4 interaction checks: a double tap, the phone Back button, and an empty and a 1,700-character urgent-help story |
| `c20-realworld.cjs` | Runs all three and applies the 14 release checks |

**Each persona has:**
- `persona`: who they are, in one sentence;
- `device`: screen width and height, phone or not, large text or not;
- `uiLanguage`: `hi` or `en`;
- `journey`: what they do (see the table below);
- `input`: what they type or choose, in their own words;
- `truth` and `why`: what a careful app should do, and why.

| Journey | Personas |
|---|---:|
| Check a message (`check`) | 50 |
| Before you pay (`paycheck`) | 18 |
| Get help now (`emergency`) | 13 |
| Prepare a complaint (`draft`) | 7 |
| Family safety (`family`) | 7 |
| Where to complain (`route`) | 5 |

## Run it

You need Node.js 18 or later and Playwright (`npm install playwright`). The scripts use Microsoft Edge when it is installed; otherwise run `npx playwright install chromium` once. To use another Chromium-based browser, set `BROWSER_PATH`.

From the repository root:

```text
node evaluation/real-world-test/c20-realworld.cjs prototype/dist/index.html --report real-world-report.json
```

It prints the 14 checks and the right / partly right / wrong count, and writes the per-persona grades to the report file. It takes a few minutes. Everything else is written to a temporary folder and deleted.

To run the steps one at a time and keep a screenshot of every persona's result:

```text
node evaluation/real-world-test/run-personas.cjs prototype/dist/index.html evaluation/real-world-test/personas out --workers 3
node evaluation/real-world-test/judge.cjs evaluation/real-world-test/personas out/results.json out/report.json
node evaluation/real-world-test/stress.cjs prototype/dist/index.html out
```

## Results

| | Release 3.2 | Release 3.3 | Release 3.4 |
|---|---:|---:|---:|
| Fully right | 83 | 92 | 92 |
| Partly right | 9 | 8 | 8 |
| Wrong | 8 | 0 | 0 |

- **Release 3.5:** 92 fully right, 8 partly right, 0 wrong (14/14 checks).
- **Releases 3.3 and 3.4:** all 14 checks pass. The per-persona grades and stress results for the newest release are in [`evidence/Real-World-User-Test.json`](../../evidence/Real-World-User-Test.json).
- **Timing:** a result that takes more than 1.5 seconds is graded "partly right", so on a slow machine up to 3 personas can move between "fully right" and "partly right" from run to run. No persona was graded wrong in any run of Releases 3.3 and 3.4.

**The 8 partly right results (Releases 3.3 and 3.4):**
- **6 urgent-help stories:** one detail still needs a tap, such as whether the caller still has access, or how or when the money was paid.
- **2 family-safety personas:** they had an answer about a nominee, but the app asks that question only for some holdings, and not for the ones they chose.

## Limits

- **Not real people.** The personas are written by AI. They find bugs and gaps; they do not measure real-world accuracy.
- **Development data.** These personas were used to find and fix problems in Release 3.3, so they are now a regression test, not an accuracy result.
- **Made-up details.** All names, phone numbers, UPI IDs, account numbers and links in the scam messages are made up. Do not call, pay or open them. Ordinary messages may mention real official websites and helplines.
