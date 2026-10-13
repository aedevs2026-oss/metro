# Metro Furniture — Premium UI Refresh

## Included in this update

- App-like mobile and tablet experience scoped to viewports below 1024px. Desktop/laptop layout rules are not overridden by the new responsive system.
- More app-like mobile navigation: refined dark glass bottom bar, safe-area spacing, touch feedback, larger tap targets, rounded form controls, cleaner card shadows and horizontally scrollable rails where components opt in.
- Premium interaction layer: restrained card lift, image transitions, focus-visible rings, soft gold sheen/glow utilities, and reduced-motion support.
- Reduced-motion handling in `components/AnimateIn.js` so reveal animations are disabled when the visitor requests reduced motion.
- Five consistent champagne-gold feature SVGs in `public/icons/features/` for room measurement, customisation, showroom appointments, campaign tracking and premium highlights. The room measurement, customizer and appointment form headers now use these assets.
- Generated UI/UX reference preview at `public/reference/premium-mobile-desktop-ui-concept.webp`. This is a concept reference, not a furniture product image.

## Responsive scope

The new app-like responsive rules are limited to `max-width: 1023px`, with phone-specific adjustments at `max-width: 639px` and tablet adjustments from 640px through 1023px. Laptop and desktop screens (1024px and wider) keep their existing page layout and navigation.

## Motion and accessibility

- CSS interactions use restrained transitions and do not require additional JavaScript.
- Framer Motion reveal helpers honour `prefers-reduced-motion`.
- Keyboard focus indicators are visible for links, buttons and form controls.
- OS/browser reduced-motion preference disables the new decorative animation layer.

## Verification

- `node scripts/verify-seo.mjs`: 16 static checks passed.
- CSS brace balance checked.
- New feature SVG assets exist and are referenced by the intended tool components.
- Full Next.js build and ESLint have not been run because dependencies are not installed in this environment. Run `npm ci`, `npm run lint`, and `npm run build` before deployment.


## Final brand and cross-device polish
- Refined and upscaled the Metro wordmark for crisp display in headers and POS areas, harmonized around champagne gold and warm ivory.
- Added a square transparent Metro monogram asset (`public/metro-mark.png`) and configured it for app/apple icon use.
- Added shared premium interaction polish for cards, images, buttons and page entry transitions.
- Tightened mobile/tablet header and glass surfaces under 1024px only; desktop layout rules remain untouched.
- Respects `prefers-reduced-motion`.

## Website-wide luxury UI pass (October 2026)
- Added a unified Metro luxury design layer for all public routes using champagne gold, warm ivory, stone neutrals and charcoal glass surfaces.
- Refined global navigation, active navigation states, primary actions, form focus rings, product surface treatment, footer, mobile bottom bar, and reduced-motion behavior.
- Reworked shared page banners to use an editorial premium treatment with subtle gold geometry, refined eyebrow typography, and consistent shop/showroom calls to action.
- Refined shared section headings with balanced typography and a restrained gold rule.
- Updated product card imagery framing, premium CTA treatment, card motion, and persistent wishlist/compare controls on shop product cards.
- Refined category and collection cards with a warmer image overlay and slower, more restrained image zoom.
- Added `public/reference/metro-luxury-ui-reference.webp` as a visual reference only; it is not used as a product image.
- Mobile/tablet overrides are scoped below 1024px. The desktop layout and information architecture are preserved; shared colors and components are polished at all sizes.
