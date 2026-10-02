# Security policy

## Report a problem privately

Use GitHub's private vulnerability reporting: open this repository's **Security** tab and choose **Report a vulnerability**.

If that option is not available, open an ordinary issue titled "Security contact request" and write no technical details in it. A maintainer will reply in the issue with a private way to share them.

- Never post exploit details, personal data or real financial details in a public issue.
- There is no personal e-mail contact for security reports.

## What is in scope

- the public app file, `prototype/dist/index.html`, and its in-page security policy (Content-Security-Policy and no-referrer);
- the detection of private details in the complaint packet (OTP, PIN, password, CVV, card number) and the input checks in the Family asset map;
- the content validator and the build (`prototype/content-schema.js`, `prototype/build.cjs`), including the official-domain allowlist and the fixed helpline numbers;
- the local Owner Studio (`prototype/owner-studio.html`);
- anything that could make the app show unsafe advice, send user text anywhere or store it.

## Out of scope

- **The hosts.** Each host controls its own headers and cookies. Measured on 2 October 2026: the live link (GitHub Pages) sends HSTS and sets no cookies, but sends no `nosniff` or framing-protection header; the second copy on the earlier host (Cloudflare) sends none of these headers and sets three cookies of its own ([`PRIVACY.md`](PRIVACY.md)). Please report host problems to the host.
- The official websites the app links to.
- Attacks that need physical access to an unlocked phone.

## Testing safely

- Use fictional data only.
- Do not test against official websites, helplines or other people's accounts.
- Do not run load or denial-of-service tests against the public link.

## What happens next

A maintainer confirms the report, fixes the problem in a new release, and says in the release notes what was fixed. Reporters are credited if they wish. Only the newest release in this repository receives fixes.
