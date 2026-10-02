# Real-world user test and Release 3.3 fixes

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

## Still open

- **Urgent-help details:** some still need a tap, for example whether the caller still has access, and how and when money was paid.
- **Family safety:** there is no "after a death" path yet (transmission, the IEPF claim, RBI UDGAM). It needs official sources before it is added.
- **Languages:** other languages get the "outside coverage" or "may miss signs" note instead of a check.
- **Sharing a message into the app:** a WhatsApp "Share to Niveshak Saathi" option would remove copy-paste. It needs an installable app, which is the owner's decision.
- **Real people:** a consented pilot and a native Hindi review are still the next evidence milestone.

The test kit (the 100 users, the runner and the scorer) is kept in the local project folder and is not published.
