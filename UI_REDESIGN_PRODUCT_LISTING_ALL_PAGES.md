# Metro Furniture — All Pages Luxury UI Update

## Scope
- Refined shared styling across public routes with champagne gold, warm ivory, charcoal, glass-like surfaces, softer borders, and consistent elevation.
- Improved product listing cards and filter surfaces, category/collection hero tiles, product detail price panel, feature ribbon, information tabs, and related-product section styling.
- Added two optimized local editorial images: a wide cinematic living-room hero and a portrait luxury showroom image.
- Mapped the new wide hero to the homepage, About hero, and Contact hero fallbacks; mapped the showroom image to About journey/visit imagery.
- Kept product catalogue image URLs and individual product identity unchanged; editorial imagery is used for brand/room context, not as a substitute for SKU-specific product photos.
- Applied touch-feedback and responsive refinements to mobile/tablet without changing the defined desktop grid breakpoints; reduced-motion preferences are respected.
- Preserved the existing RAG chatbot, enquiry, customizer, room measurement, appointment, comparison, favourites, and campaign tracking implementation.

## Validation performed
- Parsed all JavaScript/JSX source files with the TypeScript parser.
- Checked all new image paths referenced by the marketing image data.
- Checked CSS brace balance.
- Verified archive integrity after packaging.

## Remaining validation
- A full Next.js production build, ESLint run, and rendered browser QA at desktop/tablet/mobile widths still need to be run in an environment where dependencies can be installed. Static checks do not prove every page renders correctly.
