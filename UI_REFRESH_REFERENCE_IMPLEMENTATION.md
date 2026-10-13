# Metro Furniture — Luxury UI Reference Refresh

Updated: 11 October 2026

## Implemented from the supplied UI reference

- Replaced the homepage hero source with a new wide, warm-lit luxury living-room image designed with negative space for the hero copy.
- Added a generated premium showroom image for the About story, showroom visit and supporting brand sections.
- Added a longer homepage customer-tools section for Room Measurement, Furniture Customizer and Showroom Booking, with quick links to Saved Favourites, Compare Products and Contact.
- Refined the home service ribbon with a consistent Lucide line-icon system instead of mixed raster/SVG icons.
- Refined the homepage trust ribbon with the same line-icon treatment.
- Expanded the About page with a new brand-promise section and redesigned the journey, why-choose, stats, visit and mission/vision sections around warm ivory, charcoal and champagne-gold surfaces.
- Updated About metadata with Dharmapuri-specific product and showroom keywords.
- Added shared responsive styling for glass surfaces, fine gold borders, soft depth, touch-friendly cards, active navigation and reduced-motion preferences. Existing desktop structure remains governed by the original desktop breakpoints; new homepage tools and About sections collapse to stacked layouts on mobile.

## New image assets

- `public/homepage/hero/metro-luxury-hero.webp` — wide homepage/About hero image.
- `public/homepage/about/metro-showroom-story.webp` — portrait showroom image for About and brand sections.

Both images are optimized WebP files and are referenced through the project data files so the assets remain easy to replace later.

## Validation performed

- Parsed 261 JavaScript/JSX/MJS files using the installed TypeScript parser: 0 syntax errors.
- Ran `node scripts/verify-seo.mjs`: 16 SEO checks passed.
- Checked CSS brace balance.
- Verified both new WebP assets are present in the project.

## Not verified in this environment

- A Next.js production build, ESLint run and browser screenshots at desktop/tablet/mobile widths. The archive does not include `node_modules`, so install dependencies and run `npm ci`, `npm run lint`, and `npm run build` before deployment.
- Generated lifestyle imagery is used for hero/brand sections only; it is not mapped as an exact replacement for specific catalogue SKUs.
