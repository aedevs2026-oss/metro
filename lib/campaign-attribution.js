export const CAMPAIGN_STORAGE_KEY = "metro_campaign_attribution_v1";

const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "ad_id",
  "campaign_id",
  "adset_id",
  "placement",
];

function clean(value, max = 240) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function readRaw() {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CAMPAIGN_STORAGE_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function captureCampaignAttribution(search, pathname) {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(search ?? window.location.search);
  const now = new Date().toISOString();
  const touch = {};
  for (const key of CAMPAIGN_KEYS) {
    const value = clean(params.get(key));
    if (value) touch[key] = value;
  }
  if (!Object.keys(touch).length) return readRaw();

  const current = readRaw();
  const visit = {
    ...touch,
    landing_url: clean(`${window.location.origin}${pathname ?? window.location.pathname}${window.location.search}`, 1000),
    referrer: clean(document.referrer, 1000),
    captured_at: now,
  };
  const next = {
    first_touch: current.first_touch || visit,
    last_touch: visit,
    updated_at: now,
  };
  try {
    window.localStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Attribution is best-effort when browser storage is unavailable.
  }
  return next;
}

export function getCampaignAttribution() {
  return readRaw();
}

export function formatCampaignAttribution(attribution = getCampaignAttribution()) {
  const first = attribution?.first_touch || {};
  const last = attribution?.last_touch || {};
  const value = (key) => last[key] || first[key] || "";
  const display = (key) => value(key) || "Not provided";
  return [
    `Source: ${display("utm_source")}`,
    `Medium: ${display("utm_medium")}`,
    `Campaign: ${display("utm_campaign")}`,
    `Ad / content: ${display("utm_content")}`,
    `Ad ID / click ID: ${value("ad_id") || value("fbclid") || "Not provided"}`,
    `Landing page: ${last.landing_url || first.landing_url || (typeof window !== "undefined" ? window.location.href : "Not provided")}`,
  ].join("\n");
}

export function openTrackedWhatsAppLead({
  whatsappUrl,
  message,
  leadType,
  leadDetails = {},
  product = null,
  customer = {},
  consent = true,
}) {
  if (typeof window === "undefined") return false;
  const attribution = getCampaignAttribution();
  const campaignSection = formatCampaignAttribution(attribution);
  const fullMessage = `${message}\n\n--- Website enquiry details ---\nLead type: ${leadType}\n${campaignSection}`;
  const finalUrl = `${whatsappUrl}?text=${encodeURIComponent(fullMessage)}`;

  // Open synchronously during the user's submit/click event so popup blockers do not interfere.
  window.open(finalUrl, "_blank", "noopener,noreferrer");

  const payload = {
    leadType,
    customerName: clean(customer.name, 120),
    phone: clean(customer.phone, 40),
    email: clean(customer.email, 254),
    city: clean(customer.city, 120),
    productSlug: clean(product?.slug, 160),
    productName: clean(product?.name, 200),
    leadDetails,
    attribution,
    landingUrl: clean(window.location.href, 1000),
    referrer: clean(document.referrer, 1000),
    consent: Boolean(consent),
  };
  try {
    void fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // WhatsApp handoff must still work if tracking is blocked or unavailable.
  }
  return true;
}
