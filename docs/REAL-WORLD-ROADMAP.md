# Niveshak Saathi: real-world product roadmap

## The goal

Niveshak Saathi should help a first-time Indian investor recognise a suspicious investment message, avoid the next harmful action, and reach the correct official help or grievance route with minimal confusion.

The primary user is a Hindi or Roman-Hindi speaking investor in a Tier-2 or Tier-3 city who has received a suspicious message or has recently sent money. The first release should solve that urgent moment well. Complaint drafting, rights guidance and safer-decision practice support the same journey. A broad nominee and family-wealth tracker should wait until the safety and grievance journey is proven useful.

The north-star outcome is:

> A user facing possible investment fraud can identify the danger, stop an unsafe action and begin the appropriate official next step without sharing private financial data with Niveshak Saathi.

This is a public-good safety tool. It does not recommend investments, rate brokers or instruments, predict prices, promote trading, sell subscriptions, collect leads or claim affiliation with a regulator.

## What the product should promise

The product can promise to:

- point out listed warning signs in a message;
- explain why each sign matters in simple Hindi and English;
- show an urgent protective action before a complaint process;
- guide the user to the relevant official channel;
- help organise a factual complaint without sending or storing it;
- teach repeatable safety habits through short scenarios;
- state clearly when the checker cannot determine whether something is genuine.

It must not promise that a message is safe, that money will be recovered, or that its list of warning signs is complete. A no-match result means only that the local rules did not find a listed pattern.

## Product strategy

The best near-term product is a focused **Fraud-to-Action Assistant** with four connected steps:

1. **Check:** paste or dictate a message and see specific warning signs.
2. **Protect:** receive the first safe action, such as stopping payment, protecting credentials or preserving evidence.
3. **Route:** answer a few simple questions and open the appropriate official route.
4. **Prepare:** create a private, copyable complaint checklist or draft.

The existing practice module remains useful because it builds habits before a crisis. It should reinforce the same protective actions and never become a trading-education module.

This focus serves all three brief personas while keeping one coherent journey:

| Persona | Immediate job | Product value |
|---|---|---|
| New graduate or gig worker | Recognise tip-channel pressure, borrowed-money risk and credential/payment requests | Warning explanation, stop action and official reporting route |
| Homemaker managing savings | Understand fake IPO, Ponzi and urgency claims in familiar language | Hindi/Roman-Hindi checking, visual guidance and complaint preparation |
| Retired holder | Find the correct route for old holdings, transfer, nominee or recovery-fee claims | Rights/process navigation and protection from paid-agent impersonation |

Nominee and dormant-holding guidance can grow later as a bounded rights navigator. A family wealth tracker would introduce sensitive records, account maintenance and a much larger privacy burden, so it is outside the present goal.

## Principles for every decision

1. **Prevent harm before explaining process.** The first screen after a risky message should say what to stop or protect now.
2. **Show uncertainty.** Explain what matched, what was not checked and when to seek human or official help.
3. **Keep data on the device.** Use local processing by default and avoid persistent storage, analytics and silent network calls.
4. **Design for comprehension.** Use short sentences, one decision at a time, Hindi/English parity, Roman-Hindi coverage and visible icons that support rather than replace text.
5. **Use official routes.** Maintain a dated source register and show when each route was last checked.
6. **Measure outcomes, not feature count.** A smaller tool that reliably changes a dangerous next action is better than a larger dashboard.
7. **Do not optimise for a perfect judging claim.** Scores follow verified evidence. Safety gaps and failed tests remain visible until fixed.

## Priority order

### Tier 0 — trustworthy safety engine

Fix every known missed warning and false alarm before a pilot. The current priority is:

1. S-1 and T-1: match-scoped negation and intact credential lists;
2. T-2: ordinary safety advice, postal PIN, screenshots, official apps and family groups;
3. S-2: percentage returns across realistic ranges and periods;
4. S-3: supported-script share and honest language-coverage notices;
5. S-4: all eleven persona-shaped scenarios plus general boundary cases;
6. integrated rule and browser verification in a scratch copy, followed by independent review and canonical evidence refresh.

The previously recorded 78/100 judging estimate is stale because later review found unscored safety gaps. It must not be reused until the fixes and evidence refresh are complete.

### Tier 1 — urgent protective action

For each warning category, define one plain-language immediate action and one escalation condition. Examples include stopping a transfer, never sharing an OTP, contacting the bank, preserving screenshots and using the national cybercrime route for recent digital fraud. Validate every instruction against current official sources before release.

### Tier 2 — grievance completion

Reduce complaint friction with a short route questionnaire, an evidence checklist, a locally generated draft and clear hand-off to the official portal. The product should never imply that it submitted the complaint or guarantee resolution.

### Tier 3 — prevention habits

Use brief scenarios that teach pause-and-verify behaviour, borrowing-risk awareness, credential protection and independent verification. Track learning only within the current session unless the user explicitly chooses a future privacy-preserving method.

## Delivery stages and gates

### Stage 0 — agree the plan

**Output:** this roadmap, an ordered collaboration board and a frozen v2 baseline.

**Gate:** the owner accepts the focus, priorities and success measures. Implementation remains queued until that review.

### Stage 1 — make the core reliable

**Work:** complete C-1 through C-6; review all route text and official links; verify offline behaviour, privacy constraints, keyboard access and 390 px layout.

**Gate:** all known S-1 through S-4 and T-1 through T-2 examples have explicit expected outcomes; no unexplained regression remains; the built file and reports agree; limitations are displayed in the product and documents.

### Stage 2 — Bharat-first expert and device review

**Work:** obtain native Hindi and Roman-Hindi review; test the critical journey on low-end Android hardware, slow connectivity and offline mode; check screen-reader, keyboard, zoom, speech-input fallback and comprehension.

**Gate:** critical instructions are understood without assistance, official routes open correctly, and severe language or accessibility failures are fixed. Record device, language and reviewer coverage without presenting it as user-impact evidence.

### Stage 3 — consented pilot

**Work:** run fictional scenarios with approximately 24 participants across the three personas. Do not ask for real OTPs, account numbers, complaints or investment records. Use the existing operations and pilot kit, and keep raw notes de-identified.

**Provisional success thresholds:**

- at least 90% choose the correct protective action for high-risk scenarios;
- at least 85% choose the correct official route without coaching;
- at least 80% complete the core journey unaided;
- median time to the correct next action is under three minutes;
- at least 85% understand that “no warning found” does not mean “safe”;
- zero instances of the prototype requesting or retaining sensitive credentials;
- every harmful or confusing failure is logged, even if aggregate targets are met.

These are targets, not achieved results. `Pilot-Results.csv` stays blank until real, consented sessions occur.

**Gate:** no severe false reassurance, routing or privacy failure remains open. If a target is missed, revise and repeat the affected scenarios before rollout.

### Stage 4 — limited assisted rollout

**Work:** release through a suitable investor-education, consumer-help or community partner to a small cohort. Assign named owners for official-content review, language quality, security/privacy, accessibility and incident handling. Provide a feedback and correction route.

**Gate:** the team can update urgent content, respond to a safety issue, publish a correction and roll back a release. Official links and statements have a scheduled review cadence.

### Stage 5 — evidence-led expansion

Add languages, nominee guidance or new warning categories only when pilot evidence identifies the need and the team can maintain the content. Consider an optional model-assisted classifier only after the local baseline has an independent test set, clear abstention behaviour and a privacy-preserving deployment design.

## Measurement framework

| Outcome | Measure | Why it matters |
|---|---|---|
| Harm avoided | User rejects the unsafe payment, credential-sharing or borrowing action in a scenario | Direct resilience impact |
| Correct route | First official route chosen matches the scenario | Reduces delay and abandonment |
| Honest uncertainty | User can explain that a no-match result is not verification | Prevents false reassurance |
| Completion | Core journey completed without facilitator intervention | Tests Tier-2/3 usability |
| Speed | Time from scenario start to correct next action | Tests usefulness during stress |
| Complaint readiness | Required facts/evidence captured in the draft checklist | Improves grievance quality |
| Warning quality | Recall on harmful cases and false-alarm rate on benign near-neighbours | Balances missed harm and warning fatigue |
| Language usability | Correct action and comprehension by Hindi, Roman-Hindi and English group | Tests Bharat-first value |
| Accessibility | Completion with keyboard, zoom and relevant assistive technology | Tests inclusive use |
| Content freshness | Percentage of official routes reviewed within the stated cycle | Tests operational trust |

Report counts and scenario-level failures with every percentage. Separate developer-authored regression data, expert review and participant evidence; they answer different questions.

## Technical direction

- Keep the safety engine deterministic and local for the next release. Improve it with explicit multilingual rules, match-scoped context and a reviewed regression corpus.
- Separate detection from advice: a warning category maps to reviewed explanations, immediate actions and source-backed routes.
- Create a structured source register with authority, URL, claim supported, language, last-reviewed date and review owner.
- Treat unsupported or ambiguous language as an abstention path with clear manual/official next steps.
- Keep the distributable as one offline-capable file and avoid persistent identifiers or financial records.
- Maintain a labelled set containing harmful messages, benign near-neighbours, mixed-script examples and persona journeys. Preserve an independent holdout before evaluating any future ML component.
- Use voice as an input convenience with a visible text confirmation. Never imply that speech recognition is authoritative.
- Add AI/ML only where measured evidence shows the local rules cannot meet the user need. Any future model must support abstention, explanation, privacy review, red-team testing and deterministic fallback.

## Ownership

| Role | Responsibility |
|---|---|
| Human owner | Accepts product scope, supplies deadlines, approves pilot/rollout and resolves priority decisions |
| GPT/Codex | Orchestrates priorities; reviews evidence; maintains documentation, release claims, packaging and deployment |
| Claude | Implements assigned source changes, regression cases and scratch verification; reports exact results and limitations |
| Native-language reviewers | Review meaning, tone and comprehension in Hindi and Roman-Hindi |
| Domain/content reviewer | Checks official routes, rights explanations and escalation actions |
| Pilot facilitator | Obtains consent, uses fictional scenarios, records de-identified observations and stops unsafe data sharing |

## Stop conditions

Do not pilot, promote or deploy a new build when any of these is true:

- a known high-risk scenario produces false reassurance;
- a critical official route or urgent action is unverified;
- the build, evidence and documentation disagree;
- user text leaves the device unexpectedly or sensitive data is persisted;
- Hindi and English critical actions differ in meaning;
- a severe accessibility blocker prevents the core journey;
- the team cannot identify who will respond to a reported safety issue.

## Immediate execution plan

1. Owner reviews this focus and the provisional pilot thresholds.
2. Claude completes C-1 through C-6 in the order recorded in `COLLABORATION.md`.
3. GPT/Codex reviews the changes and refreshes canonical evidence only after the integrated scratch run is credible.
4. The team completes language, official-content, accessibility and device review.
5. The owner approves a consented fictional-scenario pilot; results are recorded without inflation or fabricated data.
6. The product is revised from observed failures, then considered for a limited assisted rollout.

No calendar deadline has been supplied. Dates should be added by the owner without changing these quality gates.

## Approved enhancement direction

The owner's 1 October 2026 direction expands the roadmap into the buildable feature package in `WINNING-PRODUCT-SPEC.md`. The safety baseline remains the first gate. After it passes independent review, Release 3.0 should add the local Owner Control Studio, Emergency Mode, Grievance Navigator v2, private Action Packet, family/nominee readiness card and integrated verification in that order. Broad wealth tracking, automatic message harvesting, automatic complaint submission and public crowdsourced accusations remain outside scope.
