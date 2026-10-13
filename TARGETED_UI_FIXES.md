# Metro Furniture — Targeted Navbar, Hero and Collections UI Fixes

## Applied changes
- Updated the homepage hero asset with a new cinematic luxury living-room image and added a dedicated portrait crop for phone-width viewports.
- Added the `home-hero-section` hook to the hero markup so the existing hero-specific responsive rules apply consistently.
- Refined the hero headline and changed the primary CTA to `/collections`; the secondary CTA now starts the showroom visit-request flow.
- Replaced the account/person glyph inside the navbar search field with an accessible magnifying-glass submit button; submitting the field navigates to `/shop?q=...`.
- Added a consistent white WhatsApp glyph for green WhatsApp buttons and updated the desktop/floating/product CTA icon handling.
- Updated the navbar and footer logo path to `/metro-logo-transparent.png`; removed the decorative pseudo-element background behind the navbar logo so the PNG remains genuinely transparent.
- Refreshed the `/collections` landing page with premium showroom photography, an editorial hero, category cards, benefit strip, featured products, room-fit link and showroom CTA.
- Added `/collections` to the primary navigation and mobile More sheet, and confirmed it is included in the sitemap.
- Preserved product data and existing catalogue routes.

## Verification
- JavaScript / JSX / TypeScript source parsing: 240 files parsed, zero syntax diagnostics (TypeScript parser).
- Updated image files opened and verified successfully.
- Logo transparency verified (RGBA; transparent corner pixel).
- Key route, icon and CTA wiring assertions passed.
- CSS brace counts balanced.
- Archive integrity checked after packaging.
- A full Next.js build, lint and browser screenshot comparison could not be completed in this environment because project dependencies are not installed. Run the validation commands below before deploying.

## Local validation
```bash
npm ci
npm run lint
npm run build
```

Recommended viewport checks: 375px, 390px, 768px, 1024px and 1440px.
