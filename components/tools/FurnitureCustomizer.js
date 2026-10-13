"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Ruler, Sparkles } from "lucide-react";
import { business } from "@/data/business";
import { openTrackedWhatsAppLead } from "@/lib/campaign-attribution";

const fieldClass = "mt-1.5 w-full rounded-xl border border-black/10 bg-white/85 px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";
const fabrics = ["Premium woven fabric", "Velvet", "Leatherette", "Easy-clean performance fabric", "Natural wood / hard finish", "Please advise"];
const colours = ["Beige", "Ivory", "Warm grey", "Charcoal", "Teal", "Wine", "Caramel brown", "Walnut", "Custom colour"];
const sizes = ["Compact", "Standard", "Large", "Custom dimensions", "Please advise"];
const configs = ["Use the model's listed configuration", "3-seater", "2-seater", "3+2+1 set", "L-shape 5-seater", "L-shape 6-seater", "Sectional / modular", "Custom configuration", "Please advise"];

export default function FurnitureCustomizer({ products = [], initialProduct = null }) {
  const base = initialProduct || products[0];
  const [productSlug, setProductSlug] = useState(base?.slug || "");
  const [form, setForm] = useState({ fabric: "Premium woven fabric", colour: base?.color || "Beige", size: "Standard", configuration: "Use the model's listed configuration", width: "", depth: "", name: "", phone: "", city: "Dharmapuri", notes: "", consent: false });
  const [submitted, setSubmitted] = useState(false);
  const product = products.find((p) => p.slug === productSlug) || base;
  function update(name, value) { setForm((current) => ({ ...current, [name]: value })); }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.consent || !product) return;
    const configuration = form.configuration === "Use the model's listed configuration" ? (product.configuration || "Please confirm with the showroom") : form.configuration;
    const details = `Furniture: ${product.name}\nModel: ${product.model || "Not listed"}\nPreferred fabric/material: ${form.fabric}\nPreferred colour/finish: ${form.colour}\nSize preference: ${form.size}\nConfiguration: ${configuration}\nCustom dimensions: ${form.width || "Not provided"} cm wide × ${form.depth || "Not provided"} cm deep\nCustomer city: ${form.city}\nAdditional notes: ${form.notes || "None"}\nCustomer: ${form.name}\nPhone: ${form.phone}`;
    openTrackedWhatsAppLead({
      whatsappUrl: business.whatsappUrl,
      message: `Hi Metro Furniture, I would like a customised quote for ${product.name}. Please confirm feasible options and exact pricing.\n\n${details}`,
      leadType: "customizer_quote",
      leadDetails: { productSlug: product.slug, fabric: form.fabric, colour: form.colour, size: form.size, configuration, widthCm: form.width, depthCm: form.depth, city: form.city, notes: form.notes },
      product,
      customer: { name: form.name, phone: form.phone, city: form.city },
      consent: form.consent,
    });
    setSubmitted(true);
  }

  if (!product) return <div className="container py-16"><p>No products are available to customise right now. Please contact our showroom.</p></div>;

  return <div className="container py-10 sm:py-14 md:py-16">
    <div className="mx-auto max-w-6xl">
      <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.22em] text-accent-dark">Made around your home</p><h1 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">Make it yours.</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-body sm:text-base">Choose your preferred fabric, finish, size and configuration. Our Dharmapuri showroom team will confirm availability, feasibility and your exact quote before you decide.</p></div>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[.82fr_1.18fr]">
        <aside className="glass overflow-hidden rounded-[28px] shadow-[0_22px_60px_rgba(30,25,17,.08)]">
          <div className="relative aspect-[4/3] bg-[#f0e8dc]">
            <Image src={product.image || "/hero.png"} alt={`${product.name} at Metro Furniture`} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-5" priority />
            <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-xl">Selected model</div>
          </div>
          <div className="p-5 sm:p-6"><label className="block text-sm font-semibold">Select product<select value={productSlug} onChange={(e) => { setProductSlug(e.target.value); const next = products.find((p) => p.slug === e.target.value); if (next) setForm((old) => ({ ...old, colour: next.color || old.colour })); }} className={fieldClass}>{products.filter((p) => !p.upcoming).map((p) => <option key={p.slug} value={p.slug}>{p.name} · {p.model || p.category}</option>)}</select></label><h2 className="mt-5 font-heading text-2xl">{product.name}</h2><p className="mt-1 text-xs text-body">{product.model ? `Model ${product.model} · ` : ""}{product.category}</p><p className="mt-3 text-sm leading-6 text-body">{product.description || product.tagline || "A considered piece from the Metro Furniture collection."}</p><div className="mt-5 flex flex-wrap gap-2">{[product.material, product.configuration].filter(Boolean).map((text) => <span key={text} className="rounded-full border border-accent/20 bg-white/65 px-3 py-2 text-[11px] text-body">{text}</span>)}</div><Link href={`/product/${product.slug}`} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-accent-dark underline underline-offset-4">See full product details <ArrowRight className="h-3.5 w-3.5"/></Link></div>
        </aside>

        <form onSubmit={handleSubmit} className="glass rounded-[28px] p-5 shadow-[0_22px_60px_rgba(30,25,17,.08)] sm:p-7">
          <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-dark"><Image src="/icons/features/customize.svg" alt="" width={24} height={24} /></span><div><h2 className="font-heading text-xl">Your configuration</h2><p className="mt-0.5 text-xs text-body">Selections are preferences, not a confirmed product specification.</p></div></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold">Fabric / material<select value={form.fabric} onChange={(e) => update("fabric", e.target.value)} className={fieldClass}>{fabrics.map((v) => <option key={v}>{v}</option>)}</select></label>
            <label className="block text-sm font-semibold">Colour / finish<select value={form.colour} onChange={(e) => update("colour", e.target.value)} className={fieldClass}>{[...new Set([form.colour, ...colours].filter(Boolean))].map((v) => <option key={v}>{v}</option>)}</select></label>
            <label className="block text-sm font-semibold">Preferred size<select value={form.size} onChange={(e) => update("size", e.target.value)} className={fieldClass}>{sizes.map((v) => <option key={v}>{v}</option>)}</select></label>
            <label className="block text-sm font-semibold">Configuration<select value={form.configuration} onChange={(e) => update("configuration", e.target.value)} className={fieldClass}>{configs.map((v) => <option key={v}>{v}</option>)}</select></label>
          </div>
          <div className="mt-5 rounded-2xl border border-accent/20 bg-white/55 p-4"><div className="flex items-center gap-2"><Ruler className="h-4 w-4 text-accent-dark"/><p className="text-sm font-semibold">Have specific room dimensions?</p></div><div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="text-xs font-medium">Width (cm)<input inputMode="numeric" type="number" min="0" max="2000" value={form.width} onChange={(e) => update("width", e.target.value)} className={fieldClass} placeholder="e.g. 240"/></label><label className="text-xs font-medium">Depth (cm)<input inputMode="numeric" type="number" min="0" max="2000" value={form.depth} onChange={(e) => update("depth", e.target.value)} className={fieldClass} placeholder="e.g. 90"/></label></div><Link href={`/room-measurement?product=${product.slug}`} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-dark underline underline-offset-4">Open the room measurement assistant <ArrowRight className="h-3.5 w-3.5"/></Link></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="block text-sm font-semibold">Your name<input required autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} className={fieldClass}/></label><label className="block text-sm font-semibold">WhatsApp number<input required type="tel" autoComplete="tel" pattern="[+()0-9 .-]{7,40}" title="Enter a valid phone number" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={fieldClass}/></label><label className="block text-sm font-semibold sm:col-span-2">City / town<input value={form.city} onChange={(e) => update("city", e.target.value)} className={fieldClass}/></label><label className="block text-sm font-semibold sm:col-span-2">Anything else? <textarea rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} className={fieldClass} placeholder="Usage, room style, preferred budget or reference details…"/></label></div>
          <label className="mt-4 flex items-start gap-2 text-xs leading-5 text-body"><input type="checkbox" required checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 accent-[#b08c49]"/><span>I agree Metro Furniture may contact me about this custom quote request.</span></label>
          <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#d8c18f,#b08c49)] px-5 py-3.5 text-sm font-semibold text-[#211f1b] shadow-lg shadow-accent/20 transition hover:-translate-y-0.5"><Image src="/icons/common/whatsapp.svg" alt="" width={18} height={18} className="h-[18px] w-[18px]"/> Get my exact quote on WhatsApp <ArrowRight className="h-4 w-4"/></button>
          {submitted && <p role="status" className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-800"><Check className="h-4 w-4"/> Your configuration is ready to share with the showroom on WhatsApp.</p>}
        </form>
      </div>
    </div>
  </div>;
}
