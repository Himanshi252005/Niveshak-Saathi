# Publishing checklist

1. Publish `prototype/dist/index.html` exactly as verified. Its SHA-256 is in `Release-3.2-Verification.json`.
2. Serve it with gzip or brotli. The current file is 495,106 bytes raw and 146,742 bytes with gzip.
3. Keep the public app free of the Owner Studio, analytics, trackers, third-party scripts and credentials.
4. After publishing, confirm Hindi and English, the three persona plans, all five message reliability states, phone navigation, offline download and app sharing.
5. Open the public link without signing in and record the deployment id, source commit and served hash in `Delivery-Status.md`.
6. Keep the verified offline package as a fallback for judges.

Do not edit the built HTML by hand. Change the source/content, rebuild, rerun the evidence, and deploy the new verified file.
