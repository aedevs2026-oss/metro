import { NextResponse } from "next/server";
import { business } from "@/data/business";
import { getMailConfigurationStatus, sendSmtpMail } from "@/lib/smtp-mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function text(value, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function campaignFields(attribution = {}) {
  const first = attribution?.first_touch || {};
  const last = attribution?.last_touch || {};
  const val = (key) => text(last[key] || first[key], 240) || null;
  return {
    utm_source: val("utm_source"),
    utm_medium: val("utm_medium"),
    utm_campaign: val("utm_campaign"),
    utm_content: val("utm_content"),
    utm_term: val("utm_term"),
    fbclid: val("fbclid"),
    gclid: val("gclid"),
    ad_id: val("ad_id"),
    campaign_id: val("campaign_id"),
    adset_id: val("adset_id"),
    placement: val("placement"),
    campaign_attribution: attribution && typeof attribution === "object" ? attribution : {},
  };
}

function humanise(value = "") {
  return String(value).replace(/[_-]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDetails(value, indent = "") {
  if (value === null || value === undefined || value === "") return `${indent}Not provided`;
  if (Array.isArray(value)) {
    if (!value.length) return `${indent}None`;
    return value.map((item, index) => `${indent}${index + 1}. ${formatDetails(item, "")}`).join("\n");
  }
  if (typeof value === "object") {
    const entries = Object.entries(value);
    if (!entries.length) return `${indent}None`;
    return entries.map(([key, item]) => {
      if (item && typeof item === "object") return `${indent}${humanise(key)}:\n${formatDetails(item, `${indent}  `)}`;
      return `${indent}${humanise(key)}: ${text(String(item ?? ""), 1600) || "Not provided"}`;
    }).join("\n");
  }
  return `${indent}${text(String(value), 2400)}`;
}

function buildEnquiryEmail({ leadType, customerName, phone, email, city, productName, productSlug, leadDetails, landingUrl, referrer, attribution, createdAt }) {
  const campaign = campaignFields(attribution);
  const lines = [
    "METRO FURNITURE — NEW WEBSITE ENQUIRY",
    "======================================",
    "",
    `Lead type: ${humanise(leadType)}`,
    `Received at (UTC): ${createdAt}`,
    "",
    "CUSTOMER",
    "--------",
    `Name: ${customerName || "Not provided"}`,
    `Phone / WhatsApp: ${phone || "Not provided"}`,
    `Email: ${email || "Not provided"}`,
    `City / town: ${city || "Not provided"}`,
    "",
    "PRODUCT / REQUEST",
    "-----------------",
    `Product: ${productName || "Not specified"}`,
    `Product slug: ${productSlug || "Not specified"}`,
    "",
    "ALL FORM DETAILS",
    "----------------",
    formatDetails(leadDetails),
    "",
    "CAMPAIGN ATTRIBUTION",
    "--------------------",
    `Source: ${campaign.utm_source || "Not provided"}`,
    `Medium: ${campaign.utm_medium || "Not provided"}`,
    `Campaign: ${campaign.utm_campaign || "Not provided"}`,
    `Content / creative: ${campaign.utm_content || "Not provided"}`,
    `Keyword: ${campaign.utm_term || "Not provided"}`,
    `Ad ID: ${campaign.ad_id || "Not provided"}`,
    `Facebook click ID: ${campaign.fbclid || "Not provided"}`,
    `Google click ID: ${campaign.gclid || "Not provided"}`,
    `Campaign ID: ${campaign.campaign_id || "Not provided"}`,
    `Ad set ID: ${campaign.adset_id || "Not provided"}`,
    `Placement: ${campaign.placement || "Not provided"}`,
    `Landing URL: ${landingUrl || "Not provided"}`,
    `Referrer: ${referrer || "Not provided"}`,
    "",
    "SHOWROOM",
    "--------",
    `${business.address.line1}, ${business.address.line2}, ${business.address.city}, ${business.address.state} ${business.address.pin}`,
    `Showroom phone: +91 ${business.primaryPhone}`,
    `Showroom WhatsApp: ${business.whatsappUrl}`,
  ];
  return lines.join("\n");
}

export async function POST(request) {
  let body;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 24000) {
      return NextResponse.json({ ok: false, error: "Request too large" }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const leadType = text(body?.leadType, 60);
  const allowedTypes = new Set([
    "room_measurement",
    "customizer_quote",
    "showroom_appointment",
    "facebook_ads",
    "product_quote",
    "contact_enquiry",
  ]);
  if (!allowedTypes.has(leadType)) {
    return NextResponse.json({ ok: false, error: "Unsupported lead type" }, { status: 400 });
  }
  if (body?.consent !== true) {
    return NextResponse.json({ ok: false, error: "Contact consent is required" }, { status: 400 });
  }

  const customerName = text(body?.customerName, 120);
  const phone = text(body?.phone, 40);
  const email = text(body?.email || body?.leadDetails?.email, 254);
  const city = text(body?.city, 120);
  const phoneDigits = phone.replace(/\D/g, "");
  if (!customerName || phoneDigits.length < 7 || phoneDigits.length > 15 || !/^[+()\d\s.-]{7,40}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: "A valid name and phone number are required" }, { status: 400 });
  }
  if (email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email address is required" }, { status: 400 });
  }

  const suppliedDetails = body?.leadDetails && typeof body.leadDetails === "object" && !Array.isArray(body.leadDetails)
    ? body.leadDetails
    : {};
  if (JSON.stringify(suppliedDetails).length > 12000) {
    return NextResponse.json({ ok: false, error: "Lead details too large" }, { status: 413 });
  }
  const leadDetails = email ? { ...suppliedDetails, customerEmail: email } : suppliedDetails;
  const createdAt = new Date().toISOString();
  const productName = text(body?.productName, 200);
  const productSlug = text(body?.productSlug, 160);
  const landingUrl = text(body?.landingUrl, 1000);
  const referrer = text(body?.referrer, 1000);
  const attribution = body?.attribution && typeof body.attribution === "object" ? body.attribution : {};

  const mailText = buildEnquiryEmail({
    leadType, customerName, phone, email, city, productName, productSlug,
    leadDetails, landingUrl, referrer, attribution, createdAt,
  });
  let emailStatus;
  try {
    emailStatus = await sendSmtpMail({
      subject: `[Metro Furniture] ${humanise(leadType)}${productName ? ` — ${productName}` : ""}`,
      text: mailText,
    });
  } catch (error) {
    console.error("[leads] SMTP notification could not be sent:", error?.message || "unknown error");
    emailStatus = {
      sent: false,
      configured: getMailConfigurationStatus().configured,
      reason: "smtp_configuration_invalid",
    };
  }

  const row = {
    lead_type: leadType,
    customer_name: customerName,
    phone: phone || null,
    city: city || null,
    product_slug: productSlug || null,
    product_name: productName || null,
    lead_details: leadDetails,
    landing_url: landingUrl || null,
    referrer: referrer || null,
    consent: Boolean(body?.consent),
    ...campaignFields(attribution),
  };

  let stored = false;
  let storageReason = "lead_storage_not_configured";
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    try {
      const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/metro_marketing_leads`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(row),
        cache: "no-store",
      });
      stored = response.ok;
      storageReason = response.ok ? "" : "lead_storage_failed";
    } catch {
      storageReason = "lead_storage_unavailable";
    }
  }

  const mailConfig = getMailConfigurationStatus();
  return NextResponse.json({
    ok: true,
    emailSent: emailStatus.sent,
    emailConfigured: mailConfig.configured,
    stored,
    storageReason: stored ? undefined : storageReason,
    emailReason: emailStatus.sent ? undefined : emailStatus.reason,
  });
}
