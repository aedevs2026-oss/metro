# Metro Furniture — Measurement, Customizer, Booking & Ads Attribution

This update adds four conversion features using the existing Next.js App Router, product catalogue, WhatsApp destination and glass-style visual system.

## New routes

- `/room-measurement` — room/sofa footprint, residual floor area, clearance and doorway pre-check. Supports `?product=<slug>`.
- `/customize` — product selection, preferred material/fabric, finish/colour, size, configuration, optional dimensions and quote handoff. Supports `?product=<slug>`.
- `/book-showroom` — visit request with date, preferred time window, customer contact, product of interest and visitor count. Supports `?product=<slug>`.
- `/api/leads` — validates and records enquiry payloads where Supabase storage is configured.

Product detail pages link to all three tools. Footer links make the tools discoverable site-wide. The Facebook / Instagram product-enquiry popup now includes captured campaign attribution in its WhatsApp message and posts lead details to `/api/leads`.

## Lead source tracking

`components/marketing/CampaignAttributionCapture.js` captures campaign parameters at the first page view with campaign values, then updates the last-touch values for later tagged visits. Captured query values include `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `gclid`, `ad_id`, `campaign_id`, `adset_id` and `placement`. First-touch and last-touch values are saved in browser local storage and included in WhatsApp messages/API requests.

### Enable persistent lead storage

1. Apply `supabase/migrations/006_marketing_leads.sql` in the Supabase SQL editor.
2. Configure these **server-only** environment values on the deployment:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Redeploy the application.
4. Query `public.metro_marketing_leads` in Supabase to compare lead count by source, medium, campaign, ad ID, product and lead type. Example:

```sql
select
  date_trunc('day', created_at)::date as lead_date,
  coalesce(utm_source, 'unknown') as source,
  coalesce(utm_campaign, 'untagged') as campaign,
  coalesce(utm_content, ad_id, 'unknown') as creative,
  coalesce(product_slug, 'unspecified') as product,
  lead_type,
  count(*) as leads
from public.metro_marketing_leads
group by 1, 2, 3, 4, 5, 6
order by lead_date desc, leads desc;
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` in a `NEXT_PUBLIC_` variable or client bundle. If credentials are not configured, `/api/leads` deliberately returns `stored: false`, and the WhatsApp conversion path remains usable.

## Suggested ad URL format

Use Meta Ads destination URLs with UTMs, for example:

`https://metrofurnitures.vercel.app/facebook-ads?product=alaska-corner&utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}}&placement={{placement}}`

Meta Ads Manager can replace these dynamic URL macros with the real source, campaign, ad set, ad and placement values. Keep the destination URL intact when setting up the ad. Do not reuse the same `utm_content` for materially different creatives if you want to compare creative performance.

## Measurement and quote caveats

The room tool uses customer-entered dimensions because the current catalogue does not provide verified dimensions for each SKU. Its fit/doorway result is only a preliminary estimate. Product dimensions, packaging, door turns, stairs and lift access must be confirmed with the showroom/delivery team. The customizer collects preferences for a quote; selections do not imply inventory availability or a guaranteed custom build.

Showroom appointment time slots are preference windows, not confirmed reservations. A team member must confirm availability on WhatsApp.

## Tests and deployment

Run from the project root:

```bash
npm ci
npm run lint
npm run build
```

Then test these flows in a browser:

1. Open a product page, check each new product tool link.
2. On `/room-measurement?product=alaska-corner`, change dimensions and submit a test enquiry.
3. On `/customize?product=alaska-corner`, choose options and submit.
4. On `/book-showroom?product=alaska-corner`, select a future date and submit.
5. Open `/facebook-ads?product=alaska-corner&utm_source=facebook&utm_medium=paid_social&utm_campaign=qa_test&utm_content=carousel_a`; submit the ad enquiry popup and verify the WhatsApp draft carries campaign values.
6. When Supabase is configured, verify test rows are created in `metro_marketing_leads` and the values match the campaign parameters.

Do not submit real customer personal information during test runs. Dependency installation and full production build must be run in an environment with access to the npm registry.
