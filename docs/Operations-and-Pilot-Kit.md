# Operations and pilot kit

## Public-release gates

The prototype is ready for fictional demonstrations. The following responsibilities need named owners before broad investor-facing use; no review team or partner has been secured yet.

| Role | Required evidence |
|---|---|
| Content owner (named: Himanshi Rathore, 2 October 2026) | Verify official routes; keep dated source changes; sign each snapshot |
| Hindi reviewer | Native-speaker review of UI, explanations, scenarios and drafts; comprehension testing |
| Safety reviewer | Independent representative messages; false-alarm/missed-warning analysis; no false safety claims |
| Accessibility reviewer | Screen-reader, keyboard, contrast and zoom tasks on supported devices |
| Privacy/security owner | Review network traffic, input handling, logs, exports and reset behaviour |
| Pilot lead | Consent, fictional tasks, anonymous records and complete outcome reporting |

## Content-maintenance procedure

Review monthly, after regulatory announcements and before real-user events. Snapshot: 2 October 2026; next review: 1 November 2026. Use official sources and retain old snapshots. A source checked during development but not yet confirmed by the content owner shows "review pending" in the app until she confirms it in the Owner Studio. Resolve conflicting pages against current authoritative instructions with qualified review. If source access fails, remove unsupported detail and point to the official institution. Update both languages and rerun regression/workflow checks. The UI's overdue notice is a reminder, not an automated monitoring service.

## Consent script

“We are testing an educational prototype with fictional messages. We are testing the product, not you. Do not enter real account information, passwords, OTPs or documents. You can skip a question or stop. With your agreement, we will record an anonymous code, broad persona, language preference, task success, time and assistance needed. The results sheet will not contain your name or contact details. This cannot resolve a real financial incident.”

Obtain affirmative consent before recording. Voice/video recording needs separate explicit consent. Keep recruitment contacts separate. Establish the organiser's retention/deletion policy first; a proposed period for anonymous pilot data is 90 days, subject to consent and institutional requirements.

## Protocol

Recruit 24 adults: 8 newer graduate/gig-worker investors, 8 homemakers managing savings, 8 pensioners/older-holding users. Balance language preferences where feasible and report actual recruitment; this is exploratory, not nationally representative.

Assign 12 to official-information-first and 12 to prototype-first. Use different matched scenarios across conditions. Predefine correct actions with a qualified reviewer. Time from scenario display to stated next action; cap at five minutes and record timeouts. Record assistance rather than counting coached completion as independent success.

| Pair | Scenario A | Scenario B | Expected action |
|---|---|---|---|
| Urgent loss | Fake IPO payment suspected | Fake app demands release fee after payment | Bank/payment-provider contact; prompt official financial-cybercrime reporting; no additional payment |
| Grievance | Broker service issue, no complaint yet | Listed-company service issue, no complaint yet | First approach the relevant entity through its official grievance channel |
| Uncertainty | Unfamiliar text gets no matches | Indirect offer gets no matches | No assumption of safety; independent verification |

Family-holding scenarios require separate reviewed facts; do not invent universal inheritance answers.

## Scoring

Record correct route, essential safety action and unaided completion as yes/no. Draft completeness is 0–4: clear problem, dates/reference placeholders, requested resolution, evidence list/placeholders. It does not establish legal sufficiency. Ask explicitly whether no matches proves safety; correct requires “no” and recognition of limited coverage.

Report numerators/denominators, median times and ranges, language/persona breakdowns, failures, assistance and withdrawals. Suggested gates: ≥80% correct routes, ≥90% uncertainty comprehension, ≥80% unaided completion and ≥30% lower median next-action time. These are targets, not observed results. They are the project's single set of pilot targets; the submission uses the same four.

## Running the pilot with the app's facilitator mode

The app includes a **Pilot session** for facilitators. Open the app link with `?pilot=1` at the end (https://himanshi252005.github.io/Niveshak-Saathi/?pilot=1), then **More tools → Pilot session (facilitators)**. Everyday users never see it. It follows this protocol exactly.

1. **Consent.** Read the consent script shown on screen. Tick "The participant agreed" only after they say yes; the session cannot start without it.
2. **Set up.** Choose the persona, preferred language and condition order. The app gives an anonymous code (P01, P02 …) and never asks for a name.
3. **Six fictional scenarios:** urgent loss, grievance and uncertainty, versions A and B, counterbalanced by condition order. For each one:
   - Press **Show the scenario and start the timer**, and read it in the participant's language.
   - Press **Answer given** when they state their next action. Time is capped at five minutes.
   - Record correct route, essential safety action, completion without help and help requested. Also record draft completeness (grievance only), understanding that no warning is not proof of safety (uncertainty only), and the outcome.
   - The expected action is behind "Expected action (facilitator only)", so the participant should not see the screen while you score.
4. **Observation (optional).** Notes are refused if they contain names, numbers or contact details.
5. **Download after each participant.** **Download results (CSV)** gives rows in exactly the `Pilot-Results.csv` columns. Results live only in page memory: closing or refreshing the page removes them.
6. **Between participants:** press "Next participant". Use "Clear this session" to wipe the app's own inputs; the recorded pilot rows are kept until you close the page.

**Small pilot first.** With 5–10 consenting adults, an evening session gives real numerators and denominators for the three tasks. Report them as exploratory (small sample, no randomisation beyond the order), alongside the denominators.

## Built-in practice is a separate measure

The app has three questions before and after an explicit lesson. It has no control group. Do not present a scripted demo score improvement as proof of product impact. Link exported practice results to a pilot code only under consent and an agreed research process.

## Rollout and incident handling

Complete independent review/pilot, fix observed confusion, recruit assisted-use partners, then expand language coverage. A real ongoing-loss disclosure should stop the research task: direct the person to their bank/payment provider and official reporting channels without collecting financial evidence or promising recovery. For product defects, retain only a minimal de-identified reproduction, remove misleading guidance and release a reviewed fix.

No recruitment, outreach, partnership or real financial intervention has been carried out by this project yet. `Pilot-Results.csv` stays blank until a real, consented session takes place.
