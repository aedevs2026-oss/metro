# Metro Furniture — WhatsApp Icon Correction

## What changed
- Replaced the previous custom bubble illustration with a consistent WhatsApp phone-in-speech-bubble brand mark.
- `public/icons/common/whatsapp-white.svg` now provides a white glyph for green WhatsApp buttons in the navbar, mobile bottom navigation, floating contact button, product quote CTA and mobile More sheet.
- `public/icons/common/whatsapp.svg` now provides the green glyph for light backgrounds and neutral/gold customizer and appointment CTAs.
- Updated the reusable `WhatsAppButton` so every variant uses the actual WhatsApp glyph rather than the generic Lucide chat bubble.
- Updated furniture customizer and showroom appointment CTAs to use the WhatsApp glyph.
- No destinations, lead data, product data or form behaviours were changed.

## Verification
- TypeScript parser: all JavaScript/JSX/TypeScript files parsed without syntax diagnostics.
- Both SVG files rendered to PNG during validation and their non-empty alpha bounds were checked.
- CSS brace counts are balanced.
- ZIP archive integrity was checked after packaging.
- A full browser build and visual QA are not claimed here.

## Local validation
Run `npm ci`, `npm run lint` and `npm run build` before deployment.
