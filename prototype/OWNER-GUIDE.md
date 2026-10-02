# Owner Control Studio: owner guide

The Owner Control Studio lets you change the reviewed content of Niveshak Saathi yourself, then rebuild the app. It is a single file that runs on your computer:

- It has no login, no server and no network access.
- It is never part of the public app. Its file, `owner-studio.html`, sits in the repository next to the app, never inside `dist/`.
- Nothing you do in it reaches users until you save your edits, rebuild, and publish a reviewed release.

## What you can change

| Studio section | What it controls |
|---|---|
| Sources & review dates | Each official source: name (English and Hindi), authority, link, what it supports, an optional caution note, last-reviewed date, review-due date and review owner. Also each helpline's button label, its note (hours, languages, what it helps with) and its source; the numbers themselves are fixed in code |
| Warning texts | The title and explanation shown for each warning sign, and its official source. Also the optional question "Where did this message come from?" and the advice each answer shows under the result (the answer never changes which warnings are found) |
| Help routes | The "Find help" navigator. Each route button is one of three kinds:<br>• **Escalation route:** who to contact first, then the official levels in order (for example SCORES, then SMART ODR), plus the evidence to keep.<br>• **Question route:** one question whose answers lead to outcome cards, as for suspected fraud.<br>• **"Not sure" route:** safe first steps and official pages, without guessing.<br>Also the official levels, the scopes (who handles each kind of problem) and the navigator texts |
| Emergency mode | What users see after **Get urgent help**: the call-now box, the questions and their answer labels, the page texts, and the ordered safety steps. "How did you pay?" and "When did you pay?" appear only after "I sent money". For each step you set its text, when it shows (including a payment method), its official source (or "general safety step") and an optional helpline button. Paying "today" or "not sure" adds the act-now note |
| Action Packet | The "Prepare a complaint" tab. You can edit:<br>• the label and the reason shown under each input;<br>• the "already done" and evidence tick lists;<br>• the labels of the complaint essentials checked before saving;<br>• the never-include reminder and its source;<br>• the packet texts, such as the header, the acknowledgement line and the buttons |
| Family readiness | The "Family readiness" tab. You can edit:<br>• the two tick-only questions (what the family holds; whether nominees were checked) and their answer labels;<br>• the checklist items: text, which holdings show each one, and its official source or "general safety step";<br>• the family card texts |
| Persona plans | The three fixed safety plans (Praveen, Kavita, Babulal): labels, situations, first actions, warning signs, ordered steps with their sources, and buttons into the tools |
| Rights cards & guides | The rights cards, shown on the Rights and help page (grouped by institution) and under each help route. Also the step-by-step guides on that page (Release 3.5): title, when to use the guide, the steps in order (each with an official source), an optional list of papers, the helpline to suggest, and which help routes link to the guide |
| Practice | The questions before and after the lesson, the correct answers, the lesson cards and the habit card |
| App texts | Labels such as the urgent-help banner, button names and the practice title |
| Overview | Product version, content version, guidance snapshot date and next review date |

## What you cannot change here, and why

These are reviewed code, not content:

- **Detection rules and the risk model** (`engine.js`). A content edit cannot hide a warning. Each warning category's title, explanation and source are content (`warnings.json`), and the build refuses an engine category without one. The fitted weights, the High and Caution thresholds and the "always High" safety floors are code, shown to users under "How the risk level was decided".
- **The on-device keyword-based parser** (`assist.js`): reading the user's own words in Emergency mode, and the "Before you pay" answers. Its reason and check texts cite source ids from `sources.json` (or are labelled general safety steps), so keep those sources enabled; changing the texts or rules is a developer change.
- **Safety caveats and legal disclaimers.** For example, "no warning signs does not mean safe" and "not affiliated with SEBI".
- **The list of allowed link domains:** `gov.in`, `nic.in`, `rbi.org.in`, `npci.org.in`, `nseindia.com`, `bseindia.com`, `nsdl.co.in`, `cdslindia.com`, `amfiindia.com`, `pfrda.org.in`. A lookalike or mistyped link is refused.
- **Approved helpline numbers:** 1930, 14448, 1800 266 7575, 1800 22 7575, 155255, 1800 425 4732 and 14453, each read on its official page. Adding a number is a code change.
- **The Family asset map.** Its choices, its single typed field (the institution's name, which refuses numbers, e-mail addresses and PAN) and the rule that nothing is saved are code.
- **The urgent route.** The "money already sent" route can be edited, but it cannot be removed or lose its helpline. Emergency mode hands users over to it.
- **Route scope rules.**
  - An escalation route can only use levels of its own scope, so a bank, insurance or pension complaint can never be escalated to SCORES, and a securities complaint can never be sent to the RBI ombudsman.
  - There must always be an enabled "not sure" route, so users with an unclear problem are never forced into a wrong route.
- **Action Packet safety rules.**
  - Finding and masking private details is code, so a content edit can never switch it off. It covers OTPs, PINs, CVV, passwords, card and account numbers, PAN, Aadhaar, phone numbers, email addresses and UPI IDs, written with English or Hindi digits, and it never looks inside official links.
  - Users can save or print only after ticking the review box, never while an OTP, PIN, CVV, password or full card number remains, and never after changing an answer without creating the packet again.
  - The packet's first line must say it is "not submitted" (in Hindi, "जमा नहीं"), so the packet can never imply that the app submitted it.
- **Family readiness rules.**
  - Answers are ticks only. Content cannot add a question that asks for values, account numbers, passwords, documents or relatives' details.
  - The six items from the product specification cannot be removed: nominee, contact and KYC details, where records are kept, old holdings, official contacts, and no paid recovery agents. Their text can change.
  - Every holding type needs at least one specific item, and the nominee item must cover both demat accounts and mutual funds.
  - The card warning must tell families not to write down passwords.
- **Emergency answers and plan rules.** The four "What happened?" answers (`received`, `clicked`, `shared`, `paid`) and the three "Is it still happening?" answers (`yes`, `no`, `unsure`) drive the plan, so only their labels can change. Every answer, alone or combined with others, must lead to at least one specific step. "Still happening" must add a step, and every "sent money" plan must keep a step with the helpline button. The build checks all 15 combinations of the four "What happened?" answers. The browser tests also vary "Is it still happening?" (not answered, yes, no, not sure), which makes 60 combinations.

To change any of these, ask a developer for a reviewed code change.

## Open the Studio

You need Node.js 18 or later. From the `prototype` folder, run the build once. It creates `owner-studio.html` next to it, never inside `dist/`:

```text
node build.cjs
```

Then double-click `owner-studio.html`. Microsoft Edge or Google Chrome is recommended. Each build refreshes the Studio with the current content and app code.

## Everyday tasks

**Record a source review.** Open **Sources & review dates**, check the official page, then press **Mark reviewed today**. This sets today's date and a review-due date 30 days later; change either if needed. The Overview tab lists every source with its status: OK, due soon, or overdue.

**Confirm a source marked "review pending" (Release 3.5).** A source that was checked against its official page during development, but not yet confirmed by the named reviewer, shows "review pending" in the app. The reviewer opens the official page, checks that it still supports what the source says, and then confirms the source in **Sources & review dates**. After the next build, the app shows the reviewer's name instead of "review pending".

**Edit a question, route step or warning text.** Type in the English and Hindi boxes, which sit side by side. Every text needs both languages. Hindi without Devanagari letters gets a warning so that untranslated text is caught.

**Add an item.** Use the **+ Add** buttons. New sources, routes and cards start hidden ("Shown in the app" unticked) until you complete them.

**Change an emergency step.** Open **Emergency mode**. Steps appear to users in the order listed; use ↑ and ↓ to reorder them. Under each step:

1. Tick the answers that should show it.
2. Optionally, tick answers that should hide it. Use this when another step already covers the same action. For example, the general "report a suspected cybercrime" step is hidden when the user sent money, because the 1930 step already covers reporting.
3. Choose what backs it:
   - **An official source.** Users see the source name, link and review date.
   - **General safety step.** For advice that no single official page states. Users see the general-step label instead of a source.

The table at the top shows which steps each answer gives and the longest possible plan, and updates as you edit. A new step starts as a general step with no answers ticked; the build refuses it until you tick at least one answer and write both languages.

**Change a complaint route.** Open **Help routes**. The table at the top shows, for every route button, who handles it and where it leads, and updates as you edit. An escalation route has three parts:

- **Step 1, the institution itself:** who to contact, how, and the official source that says to start there.
- **The official levels, in order.** Each level is defined once under **Official escalation levels**, with its plain-language explanation and the official page users open.
- **The evidence to keep.**

To change where complaints go next, edit or reorder the levels of that route. Users see each level's source and review date, so update the review date (**Sources & review dates**) whenever you recheck an official page.

**Change a persona safety plan.** Open **Persona plans**. The three identities are fixed examples—Praveen, Kavita and Babulal—so the public app never becomes a store of personal profiles. You can edit their English and Hindi labels, situations, first actions, warning signs, reasons, ordered steps, official sources and buttons. Every step must cite an enabled official source. The editor does not add identity, account, holding or income fields.

**See the result.** Open **Preview**. It assembles the app from your edits exactly as the build would, and the copy for unchanged content is byte-identical to the build. You can also download the preview as one HTML file to show someone.

## Validation

The Studio checks every edit with the same rules the build uses (`content-schema.js`). The status bar shows **Content valid** or **N error(s)**, invalid fields turn red, and the Overview tab lists every problem. The build refuses content that has:

- English or Hindi text missing;
- duplicate or badly formed IDs;
- links that are not `https`, not on the allowed official domains, or that contain a user name or password;
- missing or impossible review dates, review-due dates before the review date, or review dates in the future;
- references to unknown or hidden sources, routes or outcomes;
- a missing explanation for any warning the checker can raise;
- practice questions whose "correct" answer does not exist, or no usable questions;
- a route that escalates to another scope's level, an unknown or repeated level, a missing first contact or evidence list, or no enabled "not sure" route;
- an Action Packet with a renamed input or essential, an empty tick list, a never-include reminder without an enabled source, or a header that does not say "not submitted";
- a family checklist missing one of the six required items, a holding type without a specific item, or a card warning that does not mention passwords;
- an emergency plan that breaks the rules above: a renamed or missing answer, an answer or combination with no specific step, no "still happening" step, a "sent money" plan without the helpline, a step that both shows and hides for the same answer, or a step with both or neither of a source and the general label;
- HTML (`<` `>`) or anything that looks like a password, token or key;
- an unsupported schema version, or content larger than 300 KB.

Overdue review dates are warnings, not errors. The app itself shows users an overdue notice.

## Save your edits

You can save in either of two ways:

1. **Save into the content folder…** (Edge or Chrome). Choose the `prototype/content` folder. Only valid content can be saved, and only the sections you changed are rewritten.
2. **Export content pack** (any browser). This downloads one JSON file. Apply it from the `prototype` folder with:

   ```text
   node validate-content.cjs --apply niveshak-content-pack-<version>.json
   ```

   An invalid pack is refused and nothing is written.

**Import a content pack** loads a pack back into the Studio, for example to continue someone else's edits.

## Rebuild and release

Run `node build.cjs` in the `prototype` folder. The build:

- validates the content again and stops with **Build refused** if there is any error;
- writes `dist/index.html`, the public single-file app;
- writes `release-manifest.json`, which records the product and content versions, build time, app size and SHA-256, a checksum for every content section, the sections changed since the previous build, and any content warnings;
- refreshes `owner-studio.html`.

**A rebuilt app is a new release.** Before it is published:

- a reviewer runs the release checks (developer cases, browser journeys and the other release suites);
- the owner is shown a labelled preview;
- the previous verified package stays available for rollback.

The Studio's **Download draft manifest** button gives you the same checksums for your unsaved edits, to attach to a review request.

## Security

- The Studio has no password and no admin page. A password inside a static web app could be read by anyone, so control comes from who can change the source files and publish a release: keep your working copy on your own computer, and limit who can push to the repository and deploy the public link. The repository itself is public.
- The public app (`dist/index.html`) contains no Studio code, editor or file-writing code; the build checks this.
- Never type passwords, OTPs, API keys or tokens into content. The validator refuses them.
- Keep two-factor authentication and recovery options on your GitHub and hosting accounts under your sole control.
