-- Marketing and showroom lead attribution for Metro Furniture.
-- Apply this migration in the Supabase SQL editor before enabling SUPABASE_SERVICE_ROLE_KEY.
create table if not exists public.metro_marketing_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_type text not null check (lead_type in ('room_measurement', 'customizer_quote', 'showroom_appointment', 'facebook_ads', 'product_quote')),
  customer_name text,
  phone text,
  city text,
  product_slug text,
  product_name text,
  lead_details jsonb not null default '{}'::jsonb,
  landing_url text,
  referrer text,
  consent boolean not null default false,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  fbclid text,
  gclid text,
  ad_id text,
  campaign_id text,
  adset_id text,
  placement text,
  campaign_attribution jsonb not null default '{}'::jsonb
);

create index if not exists metro_marketing_leads_created_at_idx on public.metro_marketing_leads (created_at desc);
create index if not exists metro_marketing_leads_campaign_idx on public.metro_marketing_leads (utm_campaign, utm_source, utm_medium);
create index if not exists metro_marketing_leads_type_idx on public.metro_marketing_leads (lead_type, created_at desc);

alter table public.metro_marketing_leads enable row level security;
revoke all on public.metro_marketing_leads from anon, authenticated;
grant all on public.metro_marketing_leads to service_role;
-- Server-only inserts use SUPABASE_SERVICE_ROLE_KEY, which must never be exposed to the browser.
