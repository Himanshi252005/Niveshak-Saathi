# Contributing and reuse

Niveshak Saathi is investor-protection infrastructure, not a growth product. Corrections, reviews and careful reuse are welcome.

## Reuse terms

The code is under the MIT licence ([`LICENSE`](LICENSE)) and the original text under CC BY 4.0 ([`LICENSE-CONTENT.md`](LICENSE-CONTENT.md)). Those licences give broad permission. The terms below are the project's conditions for any copy that uses the Niveshak Saathi name, or is offered with this project or its contributors. They are also our firm request to everyone else who reuses it.

1. **Keep it free.** No fees, subscriptions or paid tiers for the people it helps.
2. **No commerce.** No ads, referral or affiliate links, upsells, lead capture, trading prompts or account-opening funnels. Do not add links to a broker, trading app, financial product or paid service.
3. **No advice.** No stock tips, buy/sell/hold signals, price predictions or promotion of any instrument or broker.
4. **Keep the disclaimers.** Not affiliated with any regulator; "No known signs" never means safe; the app does not file complaints, recover money or decide legal rights.
5. **Keep the official sources.** Every step keeps its official link and review date. Do not replace official pages with your own pages, forms or phone numbers.
6. **Keep privacy.** No tracking, analytics, accounts or collection of what people type. Do not add network calls that send user text anywhere.
7. **Say what you changed,** and credit the project.

## Report a content correction

Open a GitHub Issue in this repository:
- **Title:** "Content correction:" and a short topic. Start the title with "URGENT" if the error could cost someone money, for example a wrong helpline number or a wrong deadline.
- **Include:** the screen or guide, the language (Hindi or English), what it says now, what it should say, and a link to the official page that supports the change.
- **Do not include:** personal details, real account or phone numbers, OTPs, real scam messages with real numbers, or screenshots that show any of these.

A maintainer checks the official page before changing anything. The change is made in the Owner Studio, validated, rebuilt and released, and the source's review date is updated. Until the named content reviewer confirms a changed source, the app shows it as "review pending".

## Report a security problem

Do not post details in a public issue. Follow [`SECURITY.md`](SECURITY.md).

## Contributing changes

Please open an issue before a large change. Every change must follow these rules:
- **Official source for every advice change.** Cite the official page; if no official page confirms a fact, leave the fact out.
- **Hindi and English together.** Every new text needs both. A new language needs native-speaker review and its own tests, so open an issue first.
- **Fictional data only** in examples and tests. Use made-up phone numbers that start with 90000 (such as 90000-00000) and UPI IDs with `.demo@` in them (such as `profit.demo@ybl`).
- **Checker changes** add paired developer cases: the scam stays caught, and its genuine look-alike stays clear. Never weaken the safety floors for a real request for an OTP, PIN, password or remote access.
- **Rebuild with** `node prototype/build.cjs` (Node.js 18 or later). The build refuses invalid content, links outside the official-domain allowlist and anything that looks like a password or key.
- **Never commit credentials,** tokens or personal data.
