# Publishing checklist: owner or GPT/Codex

Claude prepares and verifies releases but does not publish to Sites. Use this list when publishing the new version.

1. **Use the verified file.** Publish `prototype/dist/index.html` exactly as built. Its SHA-256 is recorded in `Release-3.2-Verification.json` (`app.sha256`) and in `Delivery-Status.md`; a different hash means a different file.
2. **Turn on compression.** Serve it gzip or brotli compressed. The file is about 462 KB raw, 138 KB with gzip and 110 KB with brotli. The slow-network simulation (400 ms latency, 50,000 bytes per second, 4× CPU slowdown) loads it much faster gzip-served than uncompressed; the measured medians are in `Validation-v3.md`.
3. **Make the link reachable for judges.** The hosted site is currently owner-private. Change its sharing setting before sending the link, then open it in a private browser window to confirm it loads without signing in.
4. **Check after publishing:**
   - On a phone, open the link: it should open on Home. Switch Hindi and English.
   - Open the **Menu**, choose "Check a message" and run the built-in example.
   - Open "Before you pay" from the menu, and press "Get urgent help" in the top bar.
   - Use "Share this app"; it should share the link.
   - Download the offline copy (More tools) and open it with the network off.
5. **Record it.** Add the deployment id, date and served hash to `Delivery-Status.md`.
6. **Keep the fallback.** `Niveshak-Saathi-v3.2.zip` and the offline HTML work without any hosting, for judges who cannot open the link.

**Do not:**
- publish the Owner Studio (`owner-studio.html`); it refuses to run from a website anyway;
- add analytics, trackers or third-party scripts;
- edit the built file by hand.
