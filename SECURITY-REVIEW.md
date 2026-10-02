# Security review (internal, not independent)

Release 3.5, 2 October 2026. This review was done by the team with its AI coding assistants. **It is not an independent security review or penetration test.** We would welcome one; see [SECURITY.md](SECURITY.md) for how to report a problem.

## What could go wrong, and what stops it

| Risk | Control in the app | How it is tested |
|---|---|---|
| A pasted scam message carries code (HTML, script, `javascript:` links) | User text is only ever set as plain text (no `innerHTML`, `eval` or `new Function` anywhere in the app) | Stress test: pasted `<img onerror>`, `<script>` and `javascript:` messages are checked; nothing runs and nothing is inserted into the page (real-world suite, C-20) |
| The app leaks what people type | No network request except the app's own page (for "Save offline copy" and "Share this app"); no analytics, cookies, local storage, session storage or IndexedDB | Every browser journey records all requests: only the page itself, `data:` and `blob:` (C-17, C-25, C-26); a code scan finds no storage or tracking API |
| A script from elsewhere is injected | In-page Content-Security-Policy: scripts and styles only inline or from the app's own site, connections only to the app's own site; no plugins (`object-src 'none'`), no base-URL changes, no form posting; no referrer sent to linked sites | No policy violation in any journey, in the offline copy, or when a host injects its own bot-check script (C-25) |
| Content files smuggle markup into the page | Content is validated against a schema before every build and embedded with `<` escaped | Content validator (C-7) and integrated checks (C-12) |
| A link sends people to a fake site | Every source link must be https on an official government or regulator domain; phone links only for approved helpline numbers | Schema checks and the integrated suite, which also re-opens every official link (C-12) |
| A saved family map or complaint packet exposes private data | The family map accepts institution names only (numbers, e-mail and PAN are blocked); the packet blocks saving while an OTP, PIN, password or full card number is present | Rights and family suite (C-26), Action Packet suites (C-10, C-13) |

## What remains

- **Inline scripts are allowed** (`'unsafe-inline'`), because the app is one self-contained file that works offline. The policy still blocks scripts from any other address.
- **Host headers:** the live link (GitHub Pages) sends HTTPS with HSTS; it does not send `nosniff` or framing-protection headers, which only the host can add. The second copy's host sends none of these and injects its own bot-check script.
- **No external audit:** no penetration test, code audit or bug-bounty has been done. The code was written with AI assistants and reviewed by the team.
- **Phones and browsers:** tested in Microsoft Edge (Chromium) on Windows with phone emulation, not on physical low-end phones or other browsers.

All the checks above run in the release suites recorded in [`evidence/Release-3.5-Verification.json`](evidence/Release-3.5-Verification.json).
