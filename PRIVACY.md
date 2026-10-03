# Privacy

**In short:** Niveshak Saathi asks for no account and never sends what you type. It keeps nothing on your device either, with one exception that you choose: the Family asset map can be remembered on your phone.

## What the app does

- It runs as one web page in your browser. Message checks, "Before you pay", the reading of your own words in "Get help now", the complaint packet and the Family asset map all work on your device.
- It keeps your entries only in page memory. Closing or reloading the page, or "Clear this session", removes them. The one exception is the Family asset map, if you ask the app to remember it (below).
- It fetches one thing, and only when you tap "Save offline copy" or "Share this app": a fresh copy of its own page, from the address you opened it from.
- It opens an official website, or your phone's dialer for a helpline, only when you tap. Official sites are not told which page sent you (no referrer).
- Read-aloud uses your device's own voice. If you dictate with your keyboard's microphone, your keyboard app handles the audio under its own terms; the app receives only the text. The same holds if you copy the words of a message from a picture with your phone's gallery or camera: that feature works under its own terms, and the app receives only the text you paste.

## The Family asset map, if you ask the app to remember it

- **Off unless you turn it on.** When you turn on "Remember this list on this phone", the app keeps the list in this browser's local storage on this device, under one key (`ns-family-map-v1`). It keeps, for each row, the type of investment, the institution's name, the nominee status, where the papers are and who in the family knows, and the date the list was last changed. Nothing else: no account numbers, amounts, documents or people's names. The name field refuses numbers, e-mail addresses and PAN, and a name that looks like one is never kept.
- **It never leaves the device.** The app does not send, sync or back it up. (Your phone's or browser's own backup settings may copy browser data.)
- **Anyone who can open this browser on this phone can see it.** On a shared phone, leave it off.
- **To delete it:** turn the switch off, press "Forget the kept list", or use "Clear this session". Clearing this site's data in the browser deletes it too.
- It works only on the app's web link. A copy opened from a file (such as the offline copy) cannot keep the list, because the browser may share storage between files on the device; in a private window, or if the browser blocks storage, the switch also stays off and says so. You can always download the list instead.

## What the app does not do

- No cookies, and no browser storage apart from the family list you choose to remember (above). No accounts or sign-in.
- No analytics, trackers, ads, third-party scripts or cloud AI of its own.
- It never reads your SMS, OTPs, contacts, bank account or demat account, and opens a file only when you choose a saved family list to reopen.
- It never uploads what you type, the files you open or the files you download.
- It does not file complaints or contact anyone for you.

## Cookies set by the host

The live link (https://himanshi252005.github.io/Niveshak-Saathi/) is served by GitHub Pages, which sets no cookies (checked on 2 October 2026); like any web host, it may keep standard access logs. A second copy on the earlier host (Cloudflare) still serves the first Release 3.5 build, with checker 3.3. It is no longer maintained, and we have asked for it to be updated or taken down. Until then it sets cookies of its own. On 2 October 2026 we measured three cookies there. That host sets them, not the app, and the app neither sets nor reads them:

| Cookie | Set by | Lifetime |
|---|---|---|
| `__Host-appgarden-visitor` | the hosting platform | 90 days |
| `cf_clearance` | Cloudflare | 365 days |
| `__cf_bm` | Cloudflare | about 30 minutes |

That host also adds Cloudflare's bot-check script and may keep standard access logs. Hosts can change their cookies; this table records what we measured. To avoid these cookies, use the live link; to avoid any host at all, use an offline copy, or the app file downloaded from this repository (`prototype/dist/index.html`). The app's own privacy note names the host it was opened from.

## Offline copy

"Save offline copy" (under More tools) downloads the app as one HTML file. Opened from your device, it works without internet, has no host cookies or host script, and keeps nothing: it cannot remember the family list (download the list instead). Official links need internet.

## Downloads stay on your device

Files you choose to download, such as the complaint packet, a step-by-step guide, the Family asset map, the family card or your safety steps, are saved by your browser on your device. The app keeps no copy. Delete them when you no longer need them. When you reopen a saved family list, the file is read on your device and never uploaded.

## Facilitator pilot session

This tool is for facilitators running a consented test with fictional scenarios. It records an anonymous code (P01, P02 …) and task results in page memory, refuses notes that contain names, numbers or contact details, and gives the facilitator a CSV file to download. Nothing is kept after the page closes.

## Questions and corrections

Content corrections: GitHub Issues ([`CONTRIBUTING.md`](CONTRIBUTING.md)). Security problems: [`SECURITY.md`](SECURITY.md).
