# Niveshak Saathi: winning product specification

## Product position

Niveshak Saathi should become an **Investor Safety and Grievance Companion**, not a general finance app. Its strongest hackathon story is a complete, private journey from a suspicious message to a safe next action:

> Check the warning → stop immediate harm → identify the right authority → prepare the complaint → understand the next escalation → build the habit that prevents a repeat.

This is more defensible than a long list of unrelated features. It creates measurable resilience, serves all three target personas and remains feasible as a local, single-file prototype.

## What is already strong

The current prototype already provides a Hindi-first and English interface, a local warning-sign checker, official-help routing, editable complaint drafts, local read-aloud support, an offline copy, practice scenarios, a habit card and a source/privacy register. These capabilities should be connected into one continuous case journey rather than replaced.

The C-1 through C-6 safety-engine work completed by Claude on 1 October 2026 is awaiting independent orchestrator review. Its reported scratch results are 169/171 rule cases and 42/42 browser checks across three runs. These are implementation results, not yet canonical evidence or an independent accuracy claim.

## The five features that create the most value

### 1. Emergency “What happened?” mode

Add one prominent entry point for a user who may be in danger now. Ask only:

- Did you only receive the message?
- Did you click a link or install an app?
- Did you share an OTP, PIN, password or screen access?
- Did you send money?
- Is the activity still happening?

The answer produces a short, ordered action plan. It should put urgent protective action before education or complaint drafting. For recent online financial fraud, the product can direct the user to contact the relevant bank/payment provider and the official 1930/cybercrime channel. It must not claim that recovery is guaranteed.

**Why it wins:** This directly demonstrates avoided harm, the highest-weight judging criterion.

**Feasibility:** High. It is a deterministic decision tree using existing UI and official links. No server or personal-data storage is required.

### 2. Rights and grievance navigator with escalation stages

Replace the current broad three-option route with a guided sequence:

1. What is the issue: suspected fraud, broker/trading account, listed company/RTA, mutual fund, old shares/unclaimed amount, nomination/transmission, bank/payment, insurance, pension or unknown?
2. Has the user first complained to the institution or intermediary?
3. Was there a reply, and was it satisfactory?
4. Is there an acknowledgement or complaint number?

Then show a route card with:

- who to contact first;
- what evidence to keep;
- the next escalation if unresolved;
- a plain-language explanation of SCORES, SMART ODR or the appropriate official system;
- the source and last-reviewed date;
- a direct official link, never an imitation form.

For securities grievances, the official flow generally begins with the concerned entity, followed by SCORES where applicable, with SMART ODR available for eligible unresolved disputes. The route engine must encode precise scope and avoid sending every financial problem to SEBI.

**Why it wins:** It turns investor rights into an actionable process instead of a page of information.

**Feasibility:** Medium. The decision engine is straightforward; official content review and maintenance are the main work.

### 3. Private case packet and complaint-quality checker

Turn the complaint draft into a locally generated **Action Packet** containing:

- a factual incident summary;
- the institution/entity involved;
- important dates;
- actions already taken;
- the requested resolution;
- an evidence checklist;
- the selected official route and next escalation;
- a blank place for the acknowledgement number;
- a “do not include” reminder for OTPs, PINs, passwords and complete account identifiers.

Before export, check for missing complaint essentials and risky private details. Mask common phone, email, PAN-like, account and UPI patterns locally, then ask the user to review the text. Export text/print only; do not upload or submit.

**Why it wins:** It measures complaint readiness and helps users finish a real task without taking custody of their records.

**Feasibility:** High to medium. The current draft and download flow provide the foundation.

### 4. Family safety and nominee readiness card

Provide a privacy-safe family checklist without creating a financial portfolio. It should record only user-selected completion states during the session:

- nominee added or checked;
- contact and KYC details reviewed;
- family knows where records are kept;
- old physical/dormant holdings need attention;
- official entity/RTA contact identified;
- no paid recovery agent trusted without independent verification.

Allow the user to print or download a blank family action card. Do not collect holding values, account numbers, passwords, document images or relatives’ personal information.

**Why it wins:** It serves the retired-holder and family-savings personas while preserving privacy.

**Feasibility:** High. It is local checklist logic plus source-backed guidance.

### 5. Owner Control Studio

Give the owner direct control of all changeable content without exposing an admin panel on the public site.

The implementation should separate reviewed content from application code:

```text
prototype/
  content/
    routes.json
    warnings.json
    rights.json
    practice.json
    translations.json
    sources.json
  owner-studio.html       # local-only; excluded from the deployed build
  validate-content.cjs
  build.cjs
```

The local Owner Control Studio should let the owner:

- edit English and Hindi labels side by side;
- add or disable a route, warning explanation, rights card or practice scenario;
- update an official URL and its review date;
- preview the resulting content;
- import and export a content pack;
- see validation errors before building;
- create a release manifest showing version, time, content checksum and changed sections.

The build must refuse content with missing Hindi/English pairs, invalid route IDs, unsafe URLs, duplicate IDs, missing review dates or unsupported schema versions. The public build must contain no editor, write API, password or deployment credential.

**Why it wins:** It demonstrates feasibility beyond the hackathon and gives the owner practical control without weakening user privacy.

**Feasibility:** Medium. A local static editor and validated JSON configuration are realistic. A secure web-admin login is not realistic in a purely static offline app because any password embedded in public JavaScript can be recovered.

## Helpful inputs to add

Ask only inputs that change the advice. All fields must explain why they are needed.

| Journey | Useful inputs | Inputs to reject or discourage |
|---|---|---|
| Emergency | What action occurred; when; payment channel; whether access is ongoing | OTP, UPI PIN, password, CVV, full card/account number |
| Scam check | Message text; optional channel such as SMS/WhatsApp/Telegram; optional “I already acted” state | Contact-list access, automatic SMS harvesting, screenshots containing unmasked private data |
| Grievance route | Product/entity type; first complaint made; reply received; acknowledgement available; broad event date | Login credentials, full PAN/Aadhaar, portal OTP |
| Complaint packet | Entity name; factual timeline; amount optional; last four reference characters optional; requested resolution; evidence types held | Full financial identifiers and uploaded originals |
| Nominee/old holdings | Holding form: demat, mutual fund, physical share or unknown; nominee status: checked/not checked/unknown | Portfolio values, account credentials and relatives’ identity documents |

## Features to defer

| Feature | Decision | Reason |
|---|---|---|
| Full family wealth tracker | Defer | Creates sensitive-data, security and account-maintenance burdens without improving the core safety outcome |
| Automatic SMS/WhatsApp scanning | Reject for this version | Conflicts with privacy-by-design and platform permissions |
| Automatic complaint submission | Defer | Requires authentication, personal data and regulator-specific integrations; the prototype should prepare, not impersonate the user |
| Public crowdsourced scam database | Defer | Requires moderation, defamation controls, evidence standards and abuse prevention |
| Cloud LLM analysis of user messages | Defer | Local rules are more auditable and private; a future model needs independent evaluation and an abstention path |
| Broker or instrument comparison | Reject | Risks becoming commercial advice and violates the product ethos |
| Gamified rewards or streak pressure | Defer | Adds little during a crisis and may weaken the public-good tone |

## Owner control and custody

No software can guarantee exclusive control if another person has the owner’s device or credentials. The practical control model should be:

1. The canonical repository is private and owned by the human owner’s GitHub account.
2. Only the owner has administrator access. Contributors return files or pull requests and do not receive permanent deployment credentials.
3. The Site remains under the owner’s hosting identity. Deployment occurs only from the owner-controlled checkout.
4. Source content is editable through the local Owner Control Studio. The editor is excluded from the published bundle.
5. Secrets, passwords and access tokens never appear in source files or content packs.
6. Each release creates a manifest and checksum so the owner can see exactly what was published.
7. The last verified package is retained as a rollback artifact with a new version name; the v2 baseline is never overwritten.

Repository privacy and access controls still depend on the owner configuring the GitHub and hosting accounts. Multi-factor authentication and recovery methods should remain solely with the owner; the product must not attempt to store them.

## Hackathon demonstration

Use one three-minute story rather than touring every screen:

1. A Hindi/Roman-Hindi fake IPO or Telegram-tip message arrives.
2. The checker explains specific warning signs and its uncertainty.
3. The user selects “I sent money” and receives the urgent action order.
4. The navigator identifies the correct official path.
5. The product creates a private Action Packet and shows what evidence is missing.
6. The presenter disconnects the network and repeats the core check to prove local operation.
7. The local Owner Control Studio updates a source review date or practice scenario, validates it and rebuilds the preview.
8. The impact slide distinguishes verified automated checks from the planned real-user pilot.

This demonstrates safety impact, Bharat-first usability, privacy, technical purpose and operational scalability in one flow.

## Delivery order

### Release 2.1 — evidence-correct safety baseline

1. Independently review C-1 through C-6.
2. Resolve the two documented known limitations or state them visibly.
3. Refresh canonical evidence and show the live preview.

### Release 3.0 — winning prototype package

1. **C-7:** Owner Control Studio, content schema, validators and owner documentation.
2. **C-8:** Emergency mode and category-specific immediate actions.
3. **C-9:** Grievance Navigator v2 with escalation stages and source-backed routes.
4. **C-10:** Action Packet and local complaint-quality/privacy checks.
5. **C-11:** Family safety and nominee readiness card.
6. **C-12:** Integrated accessibility, language, privacy, offline and browser verification.

Owner control comes first in Release 3.0 so every later content feature is editable through the same reviewed system.

## Definition of done

The enhanced prototype is ready for judging when:

- every known severe warning failure is fixed or clearly blocked with an abstention message;
- the emergency path reaches an appropriate action in three decisions or fewer;
- the grievance navigator never treats all financial complaints as SEBI matters;
- every route displays its source and review date;
- the Action Packet works without uploading or storing user data;
- the local owner editor changes content, validates it and rebuilds the public single-file app;
- the public build contains no owner editor or credential;
- Hindi and English critical instructions have reviewed parity;
- mobile, keyboard, zoom, offline and no-storage checks pass;
- every judging claim is linked to evidence and no pilot result is fabricated;
- the owner is shown a live preview for every milestone and the verified deployed Site after release.

## Official basis reviewed for this plan

- [SEBI SCORES](https://scores.sebi.gov.in/scores-home/) states that investors should first take grievances to the concerned entity and describes SCORES as a grievance-redressal facilitation platform for the securities market.
- [SEBI’s investor charter for stock exchanges](https://www.sebi.gov.in/sebi_data/attachdocs/may-2024/1717058632756.pdf) describes escalation through the market participant, SCORES and SMART ODR.
- [SEBI Investor education material](https://investor.sebi.gov.in/iematerial.html) includes fraud, grievance, derivatives, KYC and other awareness resources.
- [National Cyber Crime Reporting Portal](https://www.cybercrime.gov.in/webform/Crime_NodalGrivanceList.aspx) identifies 1930 for reporting online financial fraud.
- [RBI Sachet information](https://rbi.org.in/scripts/PublicationsView.aspx?Id=18086) describes checking deposit-taking entities and reporting unauthorised deposit schemes.
- [RBI Complaint Management System](https://systemhealth.rbi.org.in/cms.rbi.org.in/cms/indexpage.html) covers complaints against eligible RBI-regulated entities.
- [IRDAI Bima Bharosa](https://bimabharosa.irdai.gov.in/Home/AboutUs) provides insurance-grievance registration and tracking; it is relevant only if the product later expands beyond securities-market scope.

Official content must be checked again immediately before release. This specification does not itself validate every route, eligibility rule or deadline.
