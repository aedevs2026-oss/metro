# Metro Furniture — Homepage Mobile 2-Card Layout Update

## Implemented
- Changed the homepage room cards to a two-column grid on screens up to 767px.
- Changed Signature Collection product slides to show two cards side by side on mobile, with swipe navigation.
- Changed Trending Now category slides to show two cards side by side; chevron controls are hidden on phones so the cards remain clear and swipeable.
- Changed the room-planning/customizer/showroom cards to a two-column app-style grid through tablet sizes, returning to three columns at the desktop `lg` breakpoint.
- Changed the homepage testimonial cards to two columns on phones (home variant only).
- Reduced mobile section spacing, card padding, labels and text sizes where needed to keep 2-column cards readable.
- Existing service-highlight and Why Metro cards already used two columns on phones and were left intact.

## Desktop safety
- New mobile homepage styles are limited to `max-width: 767px`.
- Carousel sizing for tablet is limited to `640px–1023px`.
- The new responsive patch does not override desktop layouts at `1024px` and above.
- Product data, image assets, URLs, search/quote flows and API logic were not changed.

## Verification
- JavaScript/JSX/TypeScript syntax parsing passed.
- CSS brace counts are balanced.
- Responsive layout wiring checks passed for Discover by Space, Signature Collection, Trending Now, Customer Tools and Home Testimonials.
- Full browser screenshot QA and Next.js production build are not available in this environment; run the build locally before deployment.

## Recommended viewport checks
375px, 390px, 430px, 768px, 1024px, 1280px and 1440px.
