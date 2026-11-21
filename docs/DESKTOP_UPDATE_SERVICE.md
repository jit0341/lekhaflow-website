# LekhaFlow Desktop Update Service — deployment notes

## Routes added
- GET /api/desktop-updates/v1/manifest?product=standard&current=15.1.0&platform=windows&architecture=x64&channel=stable
- GET /api/desktop-updates/v1/download?product=standard&version=15.2.0
- Existing GET /api/github-release now resolves Standard Full and Standard Trial from explicit release tags, not the repository-wide latest release.

## Vercel environment variables
Set these in the Production environment only after review:
- LEKHAFLOW_UPDATE_SIGNING_PRIVATE_KEY — Ed25519 PKCS#8 PEM. Store as an encrypted/sensitive value. Never put it in Git.
- LEKHAFLOW_UPDATE_SIGNING_KEY_ID — key identifier embedded in the desktop client's public-key map.
- LEKHAFLOW_STANDARD_STABLE_TAG — approved Standard stable release tag for the desktop updater.
- LEKHAFLOW_PROFESSIONAL_STABLE_TAG — set only after a Professional installer/release has passed QA.
- LEKHAFLOW_GOLD_STABLE_TAG — set only after a Gold installer/release has passed QA.
- LEKHAFLOW_STANDARD_FULL_TAG and LEKHAFLOW_STANDARD_TRIAL_TAG optionally override Download Center tags.
- LEKHAFLOW_GOLD_FULL_TAG optionally enables a Gold download card.

The public Download Center defaults to the existing V15.1.0 Standard Full and v1.0 Standard Trial releases. The desktop updater uses its separate stable-tag mapping. Do not activate a NEXT installer until its final Inno Setup package has passed clean-install and in-place-upgrade testing.

## Signing-key rotation
The private key previously shared as a downloadable chat artifact must be considered exposed and must not be used. Generate a fresh Ed25519 key pair locally and offline. Add the PEM private key to Vercel's encrypted Production environment variable. Embed only the matching public key in the updater's UPDATE_PUBLIC_KEYS map and rebuild the desktop application. Never commit the private key or put it in a GitHub release asset.

## Current release inventory checked 2026-11-22
- Standard Full: V15.1.0, asset Lekhaflow_Standard_setup.exe.
- Standard Trial: v1.0, asset lekhaflow-standard-trial-setup.exe.
- Professional and Gold: no approved installer assets found in the current public releases.
- The current NEXT desktop build is still version 15.1.0; its installer is not yet published. It must not be advertised as an update until the installer is built and tested.

## Release process
1. Build the product's Inno Setup installer.
2. Test clean install and upgrade in a disposable Windows test profile or VM.
3. Choose a new version (for example 15.2.0) and immutable asset name: LekhaFlow_Standard_Setup_15.2.0.exe.
4. Create a GitHub Release with that installer asset and its generated SHA-256 digest.
5. Set the product-specific stable release tag in Vercel only after sign-off.
6. Rotate the update signing key. Use only the new public key in the desktop client.

This update API returns only exact edition-specific assets. No generic .exe fallback is allowed.
