# Metro Furniture — premium storefront

A Next.js App Router storefront for Metro Furniture, Dharmapuri, Tamil Nadu. The project includes the public catalogue, individual product pages, a separate paid-ad lead landing page, showroom/local SEO content and a retrieval-grounded chat assistant.

## Run locally

Requirements: Node.js compatible with the Next.js version in `package.json` and npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Start with `npm run build` and `npm start` when preparing a production deployment.

## Product journeys

- **Normal website browsing:** Homepage/shop product cards navigate to `/product/<slug>`. The product page contains the gallery, details, specifications, related products and showroom/WhatsApp contact. It does not automatically show a lead form.
- **Facebook / Instagram ads:** Use `/facebook-ads?product=<product-slug>&utm_campaign=<campaign-name>`. The separate page is `noindex`, shows product-led creative/content, and opens its short enquiry form only after a quote CTA is clicked.
- **Chat assistant:** Runs in local RAG mode by default. It retrieves from product catalogue data, verified business/showroom facts and FAQs, returns grounded responses with relevant links, and does not require OpenAI or any model API key.
- **Unlisted category:** Category pages with no current online products show a showroom availability enquiry rather than an empty product grid. The product catalogue itself has not been padded with invented items.

## Environment configuration

**The chatbot works without OpenAI by default.** Keep `CHATBOT_MODE=local`; it uses the local catalogue, showroom/business data and FAQ retriever. `NEXT_PUBLIC_CHATBOT_ENABLED=true` controls display of the chat widget.

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SITE_URL`: browser-safe canonical production URL. It defaults to `https://metrofurnitures.vercel.app`; change it only when the custom domain is live and configured.
- `NEXT_PUBLIC_CHATBOT_ENABLED=true`: controls whether the chatbot widget is rendered in the website UI. This is a public, non-secret setting.
- `CHATBOT_MODE=local`: default and recommended mode. The chatbot uses the local catalogue/business/FAQ retriever and grounded response templates. It works without OpenAI, external LLMs, or an API key.
- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`: optional server-only lead persistence variables. Never add the `NEXT_PUBLIC_` prefix to the service-role key.
- `SMTP_*`: optional server-only email notifications for enquiries. Never add the `NEXT_PUBLIC_` prefix to mail credentials.

The current local RAG retriever uses weighted lexical relevance against the product catalogue and verified business/FAQ content; it does not require a vector database or embedding service. Optional external generation exists only if you deliberately set `CHATBOT_MODE=hybrid` and configure a server-only `OPENAI_API_KEY`. Do not expose API keys with `NEXT_PUBLIC_` variables.

## SEO checks

```bash
npm run verify:seo
npm run verify:seo:live
```

Use one canonical domain in the deployment environment, and verify the production domain, sitemap, robots rules and metadata after deployment.

## Lead handling note

The paid-ad form opens WhatsApp with the enquiry details prefilled. The `/api/leads` endpoint sends SMTP notifications when configured and can persist lead attribution to Supabase when the server-only credentials and migration are configured.


## Customer shopping tools added

- **Saved favourites** at `/wishlist`: save and remove products with a persistent browser-local shortlist.
- **Product comparison** at `/compare`: compare up to four products by category, starting price, material, colour and configuration.
- Product cards now expose Save and Compare controls and link customers to the relevant list.
- Header includes quick links to favourites and comparison.
- These tools store data in the visitor's browser (`localStorage`) and do not require a customer account or send personal data to the server.

### Verification note
The new features were added to the source project. Run `npm ci`, `npm run lint`, and `npm run build` in the deployment environment to complete dependency-backed validation before publishing.


## Customer planning and lead tracking tools

This project includes `/room-measurement`, `/customize`, and `/book-showroom` for room checks, product customisation requests and showroom visit requests. The `/api/leads` route can persist customer enquiries and ad attribution to Supabase. Apply `supabase/migrations/006_marketing_leads.sql`, then set the server-only `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` variables to enable storage. Do not use a `NEXT_PUBLIC_` prefix for the service-role key. See `FEATURES_ADDED.md` for UTM URL patterns, validation steps and customer privacy notes.
