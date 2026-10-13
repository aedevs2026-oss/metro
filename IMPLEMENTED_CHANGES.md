# Metro Furniture — Premium UX, Product Journey, Local SEO and RAG Update

## Correct product journey
- Regular homepage and shop product cards now navigate to `/product/<slug>`.
- The normal single-product page remains a full detail page: gallery, product details, specifications/features, related items and local showroom information.
- Removed the enquiry popup from standard website product cards and the standard single-product page.
- The enquiry modal is used only by the separate paid-campaign landing page at `/facebook-ads?product=<slug>` and opens only after the visitor clicks a quote/enquiry CTA.
- The ad modal labels the lead source as Facebook/Instagram and adds the selected product/model to the WhatsApp handoff.

## Chatbot retrieval-augmented system
- Added `app/api/chat/route.js` as the chat API.
- Added `lib/rag/retriever.js`, a catalogue-and-business knowledge retriever that indexes product descriptions, models, price labels, features, materials, available customisation details, showroom contact information, opening hours, FAQ content and nearby service-area guidance.
- The retriever ranks relevant content and supplies source links/product cards so replies can be verified against the catalogue and site.
- Local RAG mode is the default and works without any OpenAI key or external model. `CHATBOT_MODE=local` retrieves local catalogue, showroom/business and FAQ content, then creates a grounded response. `CHATBOT_MODE=hybrid` is optional and uses a server-only model key if configured.
- The chatbot is now visible on the homepage and other normal website routes, does not open itself unexpectedly, has a glass-style responsive panel, quick actions, typing feedback and catalogue source links.
- Existing WhatsApp enquiry/order conversation steps are retained.

## Premium glass UI
- Updated standard product cards to use a soft glass background, gold accent controls, improved spacing and a clear `View Product Details` action.
- Updated product image and buy-box surfaces to use the existing Metro ivory, charcoal and champagne-gold visual system.
- Retained Playfair Display + Inter typography and local WebP gallery assets where available.
- Ad landing now uses a distinct conversion-focused glass UI with product gallery thumbnails, product highlights, trust details, showroom information, responsive sticky CTA and the enquiry modal.

## Local content and SEO
- Added a Dharmapuri showroom guide with useful category links, directions, phone, opening hours, nearby areas and visible FAQ answers.
- Corrected Dining category handling: because the current catalogue has no product records in that category, visitors see a useful showroom availability page with WhatsApp/call actions and available online collection links, rather than an empty product grid.
- Updated the catalogue FAQ and chatbot retrieval context to state which categories are actually present online and to recommend confirming unlisted items with the showroom instead of implying stock exists.
- Refined natural location-led metadata/keywords and reused the local showroom facts already present in the business data.
- Changed the canonical base URL to `NEXT_PUBLIC_SITE_URL`, defaulting to the verified deployed Vercel URL until a custom domain is live.
- Changed the default Open Graph image to a local, high-quality homepage hero image.
- Removed redirect-only legacy pages from the sitemap so the sitemap primarily advertises canonical destinations.
- Aligned the showroom postal code in the website's branch record with the current `business.address.pin` value.

## Important configuration
- Set `NEXT_PUBLIC_SITE_URL` in Vercel to the single canonical domain you want search engines to index. Do not split indexing between the Vercel URL and a custom domain.
- `CHATBOT_MODE=local` requires no OpenAI variables. The API health endpoint `/api/chat` reports `mode: local-rag` when the local chatbot route is ready. `NEXT_PUBLIC_CHATBOT_ENABLED` only controls widget visibility.
- Lead details are stored in the visitor's browser as a convenience and then handed off to WhatsApp. They are not saved to a server-side CRM/database by this change.

## Verification status
- Static SEO verification: 16 checks passed.
- Parsed 245 JavaScript/TypeScript files with no syntax/transpilation diagnostics.
- Chat retrieval smoke tests passed for showroom address, opening hours, Alaska Corner product/price, mattress search, contact information and the unlisted Dining category.
- Catalogue audit found 46 products, no broken local image references and 36 complete four-image WebP gallery folders.
- `npm ci` could not complete in the working environment because npm registry access failed (`EAI_AGAIN`), so the production build and ESLint have not been verified here. Run `npm ci`, `npm run lint` and `npm run build` in the development/Vercel environment before release.


## Additional shopping features (2026-10-11)

- Persistent **Saved Favourites** page at `/wishlist`.
- Side-by-side **Compare Products** page at `/compare`, limited to four products at once.
- Save/Compare controls are available on product cards, with direct links to the saved lists.
- Header shortcuts to both tools.
- Data stays in browser local storage, no account or backend storage required.
- Added local SEO metadata for both utility pages.


## Added in the latest feature update

- `/room-measurement`: room/furniture dimension calculator with footprint, remaining area, clearance and doorway guidance.
- `/customize`: product-specific fabric/material, colour/finish, size, configuration and optional measurements, sent with quote details.
- `/book-showroom`: request a visit using date/time preference and contact details; clearly requests confirmation rather than assuming a booking.
- First-touch and last-touch campaign capture for UTM, Facebook click, Google click, ad/adset/campaign ID and placement values.
- `/api/leads` lead endpoint with optional server-side Supabase persistence; migration added at `supabase/migrations/006_marketing_leads.sql`.
- Facebook/Instagram enquiry popup now posts lead attribution and includes it in the WhatsApp draft.
- Product pages and footer link to the new customer tools.

Apply `supabase/migrations/006_marketing_leads.sql` and set `SUPABASE_URL` plus `SUPABASE_SERVICE_ROLE_KEY` on the server for persistent campaign reporting. See `FEATURES_ADDED.md` for setup and test steps. The room-fit estimator is preliminary and does not replace showroom-confirmed dimensions or delivery clearance checks.

## Premium responsive UI refresh (2026-10-11)

- Added app-like mobile/tablet styling below 1024px only; desktop/laptop layout is intentionally left outside these media queries.
- Refined the mobile bottom navigation, glass header, safe-area spacing, touch states, input sizing, product cards, horizontal rails, section spacing and sticky CTA support.
- Added restrained hover/lift, image transition, gold sheen/glow and focus-visible styles; added global reduced-motion handling.
- Updated Framer Motion reveal helpers to respect `prefers-reduced-motion`.
- Added coordinated gold SVG feature icons under `public/icons/features/` and applied them to the room measurement, furniture customizer and showroom booking forms.
- Added generated UI concept reference at `public/reference/premium-mobile-desktop-ui-concept.webp` (reference image only, not a product image).
- Static SEO verifier passes all 16 checks. Full build/lint remain pending dependency installation.
