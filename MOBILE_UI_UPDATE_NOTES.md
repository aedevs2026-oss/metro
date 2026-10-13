# Metro Furniture — Mobile App UI Update

## Scope
- Improved mobile/tablet header spacing, search field sizing, safe-area-aware bottom navigation and tap targets.
- Refined product cards, form controls, hero typography, product detail layout and tool-page cards for smaller viewports.
- Added compact spacing and narrow-device refinements at 639px and 380px.
- All new responsive declarations are scoped to max-width: 1023px, 639px or 380px so laptop/desktop styling (1024px and wider) is not changed by this patch.
- Preserved product data, routes, API logic, catalogue image mappings and desktop component structure.

## Validation
- CSS braces balanced.
- Mobile/tablet patch contains responsive media queries and is isolated from desktop breakpoints.
- This is static source validation only. A full browser screenshot comparison and production build have not been run in this environment.

## Local validation
Run `npm ci`, `npm run lint`, and `npm run build`, then inspect 375px, 390px, 768px, 1024px and 1440px viewports.
