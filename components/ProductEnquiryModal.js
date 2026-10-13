"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, MapPin, MessageCircle, Phone, User, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { business } from "@/data/business";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { formatCampaignAttribution, getCampaignAttribution } from "@/lib/campaign-attribution";

const initialForm = {
  name: "",
  phone: "",
  city: "",
  message: "",
  consent: false,
};

function galleryFor(product) {
  if (product?.images?.length) return product.images.slice(0, 4);
  return product?.image ? [product.image] : [];
}

function normalisePhone(value) {
  return value.replace(/\D/g, "").replace(/^91/, "").slice(0, 10);
}

function enquiryMessage(product, form, source) {
  return [
    `Hi ${business.shortName}, I am interested in ${product.name}.`,
    product.model ? `Model: ${product.model}` : null,
    `Source: ${source}`,
    form.name ? `Name: ${form.name}` : null,
    form.phone ? `WhatsApp: +91 ${form.phone}` : null,
    form.city ? `City: ${form.city}` : null,
    form.message ? `Message: ${form.message}` : null,
  ].filter(Boolean).join("\n");
}

export default function ProductEnquiryModal({ product, open, onClose, source = "Website Product Enquiry" }) {
  const images = useMemo(() => galleryFor(product), [product]);
  const [active, setActive] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState("");

  useEffect(() => {
    if (!open) return;
    setActive(0);
    setSubmitted(false);
    setSubmittedWhatsAppUrl("");
    setForm(initialForm);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event) {
      if (event.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!product) return null;

  const currentImage = images[active] || product.image;
  const whatsappUrl = submittedWhatsAppUrl || buildWhatsAppUrl(enquiryMessage(product, form, source));
  const productPath = `/product/${product.slug}`;

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "phone" ? normalisePhone(value) : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const attribution = getCampaignAttribution();
    const normalizedSource = source.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const campaignDetails = formatCampaignAttribution(attribution);
    const message = `${enquiryMessage(product, form, source)}\n\n--- Campaign attribution ---\n${campaignDetails}`;
    const completedWhatsAppUrl = buildWhatsAppUrl(message);
    setSubmittedWhatsAppUrl(completedWhatsAppUrl);
    // Open the WhatsApp draft synchronously during the user's submit gesture.
    // The customer still needs to tap Send inside WhatsApp.
    try {
      window.open(completedWhatsAppUrl, "_blank", "noopener,noreferrer");
    } catch {
      // The on-screen "Continue to WhatsApp" link remains available.
    }
    const payload = {
      leadType: /facebook|instagram|ads/i.test(source) ? "facebook_ads" : "product_quote",
      customerName: form.name,
      phone: form.phone,
      city: form.city,
      productSlug: product.slug,
      productName: product.name,
      leadDetails: { message: form.message, source, normalizedSource, submittedAt: new Date().toISOString() },
      attribution,
      landingUrl: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      consent: form.consent,
    };
    try {
      const existing = JSON.parse(localStorage.getItem("metro-enquiries") || "[]");
      localStorage.setItem("metro-enquiries", JSON.stringify([{ ...payload, submittedAt: new Date().toISOString() }, ...existing].slice(0, 25)));
    } catch {
      // Browser storage is optional; the API and WhatsApp are the conversion channels.
    }
    try {
      void fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), keepalive: true }).catch(() => {});
    } catch {
      // Keep the enquiry flow available even if tracking cannot run.
    }
    setSubmitted(true);
  }

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-[#0b0b0c]/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Enquire about ${product.name}`}
            initial={{ opacity: 0, y: 26, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[91] flex max-h-[94vh] w-[calc(100%-1rem)] max-w-6xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[28px] border border-[#dac8aa]/55 bg-[#f7f3ed] shadow-[0_32px_120px_rgba(0,0,0,0.36)] md:w-[calc(100%-2rem)] lg:grid lg:grid-cols-[1.03fr_.97fr]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close enquiry"
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/95 text-foreground shadow-md transition hover:border-accent hover:text-accent md:right-4 md:top-4"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <div className="min-h-0 overflow-auto bg-[#efe7dc] p-4 sm:p-5 md:p-7 lg:overflow-hidden lg:p-8">
              <div className="mb-5 flex items-end justify-between gap-4 pr-10">
                <div>
                  <p className="section-eyebrow text-accent-dark">Premium Collection</p>
                  <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-body/65">
                    {product.category}{product.model ? ` · ${product.model}` : ""}
                  </p>
                </div>
                {product.offer ? <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">{product.offer}</span> : null}
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-[#ddd0bd] bg-white shadow-[0_18px_44px_rgba(26,28,32,0.10)]">
                <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                  <Image src={currentImage} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-contain p-3 sm:p-5" priority />
                </div>
              </div>

              {images.length > 1 ? (
                <div className="mt-3 grid grid-cols-4 gap-2.5">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={`${image}-${index}`}
                      onClick={() => setActive(index)}
                      aria-label={`View product image ${index + 1}`}
                      aria-current={active === index ? "true" : undefined}
                      className={`relative aspect-[4/3] overflow-hidden rounded-xl border bg-white transition ${active === index ? "border-accent ring-2 ring-accent/20" : "border-[#ddd0bd] hover:border-accent/60"}`}
                    >
                      <Image src={image} alt="" fill sizes="140px" className="object-cover" />
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(product.features || []).slice(0, 4).map((feature) => (
                  <div key={feature} className="rounded-xl border border-[#dfd4c7] bg-white/75 px-3.5 py-3 text-xs text-body">
                    <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/12 text-accent-dark"><Check className="h-3.5 w-3.5" /></span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="min-h-0 overflow-auto bg-white p-5 sm:p-7 md:p-8 lg:p-10">
              {submitted ? (
                <div className="flex min-h-full flex-col justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary-dark shadow-lg shadow-accent/20">
                    <Check className="h-7 w-7" strokeWidth={2.4} />
                  </span>
                  <p className="section-eyebrow mt-7 text-accent-dark">Enquiry received</p>
                  <h3 className="mt-3 max-w-md font-heading text-3xl font-semibold tracking-tight text-foreground">
                    Your {product.name} enquiry is ready.
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-body">
                    Your enquiry is being processed by the website. WhatsApp opens with the same details prefilled; tap Send inside WhatsApp to deliver your message.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill-primary mt-7 inline-flex w-full items-center justify-center gap-2 py-3.5 text-sm sm:max-w-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Continue on WhatsApp
                  </a>
                  <Link href={productPath} onClick={onClose} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent-dark">
                    View full product details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex min-h-full flex-col">
                  <p className="section-eyebrow text-accent-dark">Get the exact price</p>
                  <h3 className="mt-3 font-heading text-[2rem] font-semibold leading-tight tracking-tight text-foreground sm:text-[2.25rem]">
                    Tell us what you need.
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-body">
                    Just four quick details. We will help with the exact quote, available finishes and showroom availability.
                  </p>

                  <div className="mt-7 space-y-4">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">Name <span className="text-accent-dark">*</span></span>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/45" />
                        <input name="name" value={form.name} onChange={updateField} required autoComplete="name" placeholder="Your name" className="w-full rounded-xl border border-[#e8e0d7] bg-[#f8f6f2] py-3.5 pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-body/45 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                      </div>
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">WhatsApp number <span className="text-accent-dark">*</span></span>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/45" />
                        <input name="phone" value={form.phone} onChange={updateField} required inputMode="numeric" autoComplete="tel" pattern="[0-9]{10}" placeholder="10-digit mobile number" className="w-full rounded-xl border border-[#e8e0d7] bg-[#f8f6f2] py-3.5 pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-body/45 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                      </div>
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">City <span className="text-accent-dark">*</span></span>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/45" />
                        <input name="city" value={form.city} onChange={updateField} required autoComplete="address-level2" placeholder="Dharmapuri" className="w-full rounded-xl border border-[#e8e0d7] bg-[#f8f6f2] py-3.5 pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-body/45 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                      </div>
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">Anything specific?</span>
                      <textarea name="message" value={form.message} onChange={updateField} rows={3} placeholder="Colour, size, room or other preference (optional)" className="w-full resize-none rounded-xl border border-[#e8e0d7] bg-[#f8f6f2] px-4 py-3.5 text-sm text-foreground outline-none transition placeholder:text-body/45 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                    </label>
                  </div>

                  <label className="mt-5 flex items-start gap-2 text-xs leading-5 text-body"><input name="consent" type="checkbox" required checked={form.consent} onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))} className="mt-1 accent-[#b08c49]" /><span>I agree Metro Furniture may contact me about this product enquiry.</span></label>

                  <button type="submit" className="btn-pill-primary mt-6 inline-flex w-full items-center justify-center gap-2 py-3.5 text-sm">
                    Get My Exact Price <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="mt-5 rounded-xl border border-accent/20 bg-[#fbf6ec] px-4 py-3 text-xs leading-5 text-body">
                    <strong className="text-foreground">No payment required.</strong> This form is only for a furniture enquiry. We will contact you with the next steps.
                  </div>

                  <div className="mt-auto pt-6 text-center text-xs text-body/55">
                    Prefer to message directly? <a href={buildWhatsAppUrl(`Hi ${business.shortName}, I am interested in ${product.name} (${product.model || product.slug}).`)} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-dark hover:underline">WhatsApp us</a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
