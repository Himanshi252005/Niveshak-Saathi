# Real-world user test, Release 3.3 fixes and Release 3.4 results

**Date:** 2 October 2026.

**Builds tested:** Release 3.2 and the persona build (`DFFF70E7…`) gave identical results. Release 3.3 contains the fixes below.

## How it was tested

**Users.** Four separate AI writers, which never saw the code, created 100 realistic Indian users:
- **People:** aged 18 to 80, from villages to big cities.
- **Screens:** 73 used the Hindi screens and 27 the English ones.
- **Devices:** 83 phones 320–412 pixels wide, 7 tablets and 10 desktops. 26 users had large text on.

**Journeys.** Each user ran one journey in the real app, starting from Home, in their own words:

| Journey | Users |
|---|---:|
| Check a message (Hindi, Roman Hindi, English, mixed, Tamil, Bengali, Marathi) | 50 |
| Before you pay | 18 |
| Get urgent help, in their own words | 13 |
| Prepare a complaint | 7 |
| Where to complain | 5 |
| Family safety | 7 |

**Stress inputs.** 15 inputs tried what people do by accident: a 10,000-character paste, emoji only, hidden characters, pasted HTML and script, right-to-left text, double taps and the phone Back button.

**Limit.** These are AI-written users, not real people. They find bugs and gaps; they do not measure real-world accuracy. They were used to fix the problems below, so they are now a regression test, not an accuracy result.

## Results

| | Before (3.2 and the persona build) | Release 3.3 |
|---|---:|---:|
| Fully right | 83 | 92 |
| Partly right | 9 | 8 |
| Wrong | 8 | 0 |

**Every run, both versions:**
- no crashes or errors;
- nothing sent from the page;
- no sideways scrolling on any phone;
- pasted script never ran.

**Unchanged and already right:**
- **Before you pay:** 18 of 18 correct, so every scam got STOP and every genuine payment VERIFY.
- **Complaint drafts:** 7 of 7. Every OTP, PIN, CVV, password and card number blocked saving and was masked, including Hindi digits.
- **Where to complain:** 5 of 5 routes named the right office.

## Problems found and fixed in Release 3.3

1. **Urgent help missed money that was taken rather than sent.**
   - Examples: "2 debits came from my card", "₹४९९९९ कम है… कैसे कटे".
   - Effect: two victims were never told to call 1930.
   - Fix: these phrasings now count as money lost.
2. **Remote-access apps described in everyday words were missed.**
   - Examples: "downloaded Rust Desk… he could see my phone", "anydesk app dala".
   - Fix: these now count as an app installed and access shared, so the plan says to remove the app and change PINs.
3. **Long forwards were cut at 6,000 characters with no notice.**
   - Effect: a 9,659-character forward with the scam at its end got "No known signs".
   - Fix: long messages (up to 30,000 characters) are now checked in overlapping parts, and the result says so.
4. **The phone Back button left the app** and lost everything typed.
   - Fix: it now returns to the previous page.
5. **Urgent-help stories were cut at 1,000 characters.**
   - Fix: the limit is now 4,000, with a notice.
6. **A typed question ("ye msg sahi hai kya?") got a result as if a message had been checked.**
   - Fix: the app now asks for the actual message.
7. **Marathi written in Devanagari was read as Hindi.**
   - Fix: it now carries a "may miss signs" note.
8. **"No known signs" was shown in green, which reads as "safe".**
   - Fix: it now uses the same neutral style as Codex's "insufficient evidence" state.
9. **Checker version 3.3 (Hindi and Hinglish real-world scams):**
   - **Electricity, gas or SIM disconnection threats:** "आज रात ९:३० बजे बिजली काट दी जाएगी" is now "High risk".
   - **Task scams:** "VIP prepaid task, 30% profit ke saath wapas" is now "High risk".
   - **Loan-app shaming threats:** "photo… contacts me bhej denge" is now "High risk".
   - **Bank deposit offers:** they no longer get a false "High risk". This removed a real bug: a decimal rate such as "7.25%" was read as "25%", so genuine FD offers lost their exemption.
   - **"Beware of those who promise guaranteed returns" messages:** these are no longer flagged.
   - **Scams that copy that wording stay "High risk":** "गारंटीड रिटर्न देने वाले हम हैं, नकली लोगों से सावधान" or "beware… join our VIP group".

**Regression checks for the checker change:**
- all 435 earlier developer cases still pass, and 14 new ones were added (449 of 449);
- the independent boundary set passes 38 of 38;
- the first two sealed sets give identical results;
- on the third sealed set, the only changes are two scams now caught and one false alarm removed.

## Fresh sealed test of checker 3.3

To measure the checker honestly after these changes, a further independent agent wrote 120 new messages, without seeing the code. They were scored once:
- **Mix:** 50 fraud (28 of them everyday scams), 20 suspicious and 50 benign. 38 of the benign messages are tricky look-alikes.
- **Languages:** 40% Hindi.

| | Checker 3.2 | Checker 3.3 |
|---|---:|---:|
| Fraud or suspicious messages warned | 84.3% | 87.1% |
| Everyday scams warned | 86.2% | 93.1% |
| Ordinary messages warned | 30% | 24% |
| Ordinary messages at High | 24% | 18% |

Every ordinary message that was flagged was a tricky look-alike. The biggest remaining source of false alarms is genuine messages that mention an OTP or a code (a Hindi OTP SMS, a delivery or LPG code). That is the next improvement; it will need yet another fresh set to measure. Full numbers are in `evidence/Blind-Evaluation-v6.json`.

## Release 3.4

- **Result:** the same 100 users and 15 stress inputs pass 14/14 checks: 92 fully right, 8 partly right, 0 wrong. The checker is unchanged from 3.3.
- **Timing:** on this machine, up to 3 users can move from "fully right" to "partly right" between runs of the same build. The judge marks any result that takes more than 1.5 seconds as partly right. In those runs the verdicts were identical and no user was ever wrong.
- **Fresh sealed test:** a further fresh set (blind-v8, 200 messages) was written blind and scored once for Release 3.4; see `evidence/Blind-Evaluation-v8.json`. A candidate checker aimed at the false alarms above showed no significant difference on it, so Release 3.4 keeps checker 3.3.

## Still open

- **Urgent-help details:** some still need a tap, for example whether the caller still has access, and how and when money was paid.
- **Family safety:** Release 3.4 adds sourced help for heirs and unclaimed money, each from an official page:
  - transmission first, then the IEPF-5 claim;
  - SEBI MITRA;
  - RBI UDGAM;
  - the SEBI Consolidated Account Statement.

  MF Central and DigiLocker are not covered yet, because their official text could not be verified.
- **Languages:** other languages get the "outside coverage" or "may miss signs" note instead of a check.
- **Sharing a message into the app:** a WhatsApp "Share to Niveshak Saathi" option would remove copy-paste. It needs an installable app, which is the owner's decision.
- **Real people:** a consented pilot and a native Hindi review are still the next evidence milestone.

## Test kit

The 100 users, the stress inputs, the runner and the scorer are in `evaluation/real-world-test/`, so anyone can run the test again. The per-user results for Release 3.4 are in `evidence/Real-World-User-Test.json`.

Before publishing, three details in scam messages that could have belonged to real people were replaced with made-up ones: a research-analyst registration number and two UPI IDs. All 100 results stayed the same.
