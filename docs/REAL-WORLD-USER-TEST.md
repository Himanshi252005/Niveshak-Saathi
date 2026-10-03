# 100-persona simulated test (AI-written personas; no real users)

**What this is:** 100 fictional users, written by AI, run through the real app in a headless browser. It found real bugs and gaps, which Release 3.3 fixed. It is a simulated test and a regression test. It is not a study with real people and not a measure of real-world accuracy.

**Date:** 2 October 2026. Release 3.2 and the next development build gave identical results; Release 3.3 contains the fixes below. Results for Releases 3.4 and 3.5 are at the end.

## How it was tested

**Personas.** Four separate AI agents, which never saw the code, wrote 100 fictional Indian users:
- **People:** aged 18 to 80, from villages to big cities.
- **Screens:** 73 used the Hindi screens and 27 the English ones.
- **Devices:** 83 phones 320–412 pixels wide, 7 tablets and 10 desktops; 26 personas had large text on.

**Journeys.** Each persona ran one journey in the real app, starting from Home, in their own words:

| Journey | Personas |
|---|---:|
| Check a message (Hindi, Roman Hindi, English, mixed, Tamil, Bengali, Marathi) | 50 |
| Before you pay | 18 |
| Get help now, in their own words | 13 |
| Prepare a complaint | 7 |
| Where to complain | 5 |
| Family safety | 7 |

**Stress inputs.** 15 pasted inputs tried what people do by accident, such as a 9,659-character paste, emoji only, hidden characters, pasted HTML and script, and right-to-left text. 4 interaction checks added a double tap, the phone Back button, and an empty and a 1,700-character urgent-help story.

**Limit.** These are AI-written personas, not real people. They find bugs and gaps; they do not measure real-world accuracy. They were used to fix the problems below, so they are now a regression test, not an accuracy result.

## Results

| | Before (Release 3.2) | Release 3.3 |
|---|---:|---:|
| Fully right | 83 | 92 |
| Partly right | 9 | 8 |
| Wrong | 8 | 0 |

**Every run, both versions:**
- no crashes or errors;
- nothing sent from the page;
- no sideways scrolling on any phone;
- pasted script never ran.

**Already right before the fixes:**
- **Before you pay:** all 18 personas got the right answer: STOP for each scam among them and VERIFY for each genuine payment. This does not cover every kind of request. A later review of Release 3.4 found that a fee to "recover old shares" had no matching choice and got VERIFY; Release 3.5 adds the choice "A fee to get back lost money, old shares or a claim", which gives STOP (no agent is needed for an IEPF claim, and RBI Ombudsman complaints are free).
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
   - Fix: it now uses the same neutral style as the "insufficient evidence" state.
9. **Checker 3.3 (Hindi and Hinglish everyday scams):**
   - **Electricity, gas or SIM disconnection threats:** "आज रात ९:३० बजे बिजली काट दी जाएगी" is now "High risk".
   - **Task scams:** "VIP prepaid task, 30% profit ke saath wapas" is now "High risk".
   - **Loan-app shaming threats:** "photo… contacts me bhej denge" is now "High risk".
   - **Bank deposit offers:** they no longer get a false "High risk". This removed a real bug: a decimal rate such as "7.25%" was read as "25%", so genuine FD offers lost their exemption.
   - **"Beware of those who promise guaranteed returns" messages:** these are no longer flagged.
   - **Scams that copy that wording stay "High risk":** "गारंटीड रिटर्न देने वाले हम हैं, नकली लोगों से सावधान" or "beware… join our VIP group".

**Regression checks for the checker change:**
- all 435 earlier developer cases still pass, and 14 new ones were added (449 of 449);
- the boundary set written by a different AI model passes 38 of 38;
- the first two 320-message sealed sets (blind-v3 and v4) give identical results;
- on the third (blind-v5), the only changes are two scams now caught and one false alarm removed.

## Fresh sealed test of checker 3.3 (blind-v6)

To measure the checker honestly after these changes, a separate AI agent wrote 120 new messages without seeing the code. They were scored once:
- **Mix:** 50 fraud (29 of them everyday scams), 20 suspicious and 50 ordinary. 38 of the ordinary messages are tricky look-alikes.
- **Languages:** 40% Hindi.

| | Checker 3.2 | Checker 3.3 |
|---|---:|---:|
| Fraud or suspicious messages warned | 84.3% | 87.1% |
| Everyday scams warned | 86.2% | 93.1% |
| Ordinary messages warned | 30% | 24% |
| Ordinary messages at High | 24% | 18% |

Every ordinary message that was flagged was a tricky look-alike. The biggest remaining source of false alarms is genuine messages that mention an OTP or a code (a Hindi OTP SMS, a delivery or LPG code). Full numbers and intervals are in [`Blind-Evaluation-v6.json`](../evidence/Blind-Evaluation-v6.json).

## Release 3.4

- **Result:** the same 100 personas and the stress inputs pass 14/14 checks: 92 fully right, 8 partly right, 0 wrong. The checker was unchanged from 3.3.
- **Timing:** on the test machine, up to 3 personas can move from "fully right" to "partly right" between runs of the same build, because the scorer marks any result that takes more than 1.5 seconds as partly right. In those runs the verdicts were identical and no persona was ever wrong.
- **Fresh sealed test:** a further set (blind-v8, 200 messages) was written by a separate AI agent and scored once. A candidate checker aimed at the false alarms above showed no significant difference on it, so Release 3.4 kept checker 3.3 ([`Blind-Evaluation-v8.json`](../evidence/Blind-Evaluation-v8.json); [validation](Validation-v3.md)).

## Release 3.5

- **Result** on the build with the design refresh (3 October 2026): 91 fully right, 9 partly right, 0 wrong (14/14 checks). One "partly right" is only a speed flag: P020's check took 1,506 ms, over the 1.5-second limit for "fully right"; the verdict was right. Timed side by side on a quiet test computer (internal; the 50 message checks, 2 runs each), a check took a median of 228 ms with the refresh against 180 ms before it, and none took over 1.5 s. The release run of the same build recorded 89 fully right, 11 partly right and 0 wrong (that run keeps no per-persona details). The per-persona results are in [`Real-World-User-Test.json`](../evidence/Real-World-User-Test.json).
- **Checker:** Release 3.5 ships checker 3.5; its one-time result on the fresh sealed set blind-v9 is in the [validation](Validation-v3.md). The 100 personas were run again with it, before the design refresh: 92 fully right, 8 partly right, 0 wrong (14/14 checks).

## Still open

- **Urgent-help details:** some still need a tap, for example whether the caller still has access, and how and when the money was paid.
- **Family safety:** Release 3.5 adds the Family asset map, the nominee guide and the IEPF-5 guide. Earlier releases added sourced help for heirs and unclaimed money: transmission first, then the IEPF-5 claim; SEBI MITRA; RBI UDGAM; the SEBI Consolidated Account Statement. MF Central and DigiLocker are not covered yet, because their official text could not be verified.
- **Languages:** a message in another language is still checked but gets an "outside coverage" or "may miss signs" note, never a safe verdict, and the Rights and help page points to official helplines that speak them.
- **Sharing a message into the app:** a WhatsApp "Share to Niveshak Saathi" option would remove copy-paste. It needs an installable app, which is the owner's decision.
- **Real people:** a consented pilot and a native Hindi review are still the next evidence milestone.

## Test kit

The 100 personas, the stress inputs, the runner and the scorer are in [`evaluation/real-world-test/`](../evaluation/real-world-test/), so anyone can run the test again.

Before publishing, three details in scam messages that could have belonged to real people were replaced with made-up ones: a research-analyst registration number and two UPI IDs. All 100 results stayed the same.
