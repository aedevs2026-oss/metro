"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Info, Ruler } from "lucide-react";
import { business } from "@/data/business";
import { openTrackedWhatsAppLead } from "@/lib/campaign-attribution";

const fieldClass = "mt-1.5 w-full rounded-xl border border-black/10 bg-white/80 px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

export default function RoomMeasurementAssistant({ products = [], initialProductSlug = "" }) {
  const firstSofa = products.find((p) => p.slug === initialProductSlug) || products.find((p) => /sofa|corner|recliner/i.test(`${p.name} ${p.category}`)) || products[0];
  const [productSlug, setProductSlug] = useState(firstSofa?.slug || "");
  const [form, setForm] = useState({ roomWidth: "360", roomLength: "420", sofaWidth: "260", sofaDepth: "95", doorway: "90", walkway: "75", name: "", phone: "", city: "Dharmapuri", consent: false });
  const [measurementComplete, setMeasurementComplete] = useState(false);
  const selectedProduct = products.find((p) => p.slug === productSlug) || firstSofa;
  const number = (key) => Math.max(0, Number(form[key]) || 0);
  const rw = number("roomWidth");
  const rl = number("roomLength");
  const sw = number("sofaWidth");
  const sd = number("sofaDepth");
  const door = number("doorway");
  const walkway = number("walkway");
  const roomArea = rw * rl / 10000;
  const sofaFootprint = sw * sd / 10000;
  const widthLeft = rw - sw;
  const depthLeft = rl - sd;
  const room = {
    area: roomArea,
    footprint: sofaFootprint,
    available: Math.max(0, roomArea - sofaFootprint),
    widthLeft,
    depthLeft,
    floorFits: sw <= rw && sd <= rl,
    circulation: sw <= rw && sd <= rl && widthLeft >= 30 && depthLeft >= walkway,
    doorLikely: door >= Math.min(sw, sd),
    walkway,
  };

  function onSubmit(event) {
    event.preventDefault();
    if (!form.consent) return;
    const detail = `Product: ${selectedProduct?.name || "Sofa to be decided"}\nRoom size: ${form.roomWidth} × ${form.roomLength} cm\nSofa footprint: ${form.sofaWidth} × ${form.sofaDepth} cm\nDoorway width: ${form.doorway} cm\nPreferred front walkway: ${form.walkway} cm\nEstimated room area: ${room.area.toFixed(2)} m²\nEstimated sofa footprint: ${room.footprint.toFixed(2)} m²\nEstimated floor area remaining: ${room.available.toFixed(2)} m²\nInitial fit estimate: ${room.floorFits ? "Footprint fits by entered dimensions" : "May not fit by entered dimensions"}\nCirculation estimate: ${room.circulation ? "Preferred clearance seems available" : "Clearance needs review"}\nDoorway estimate: ${room.doorLikely ? "Door width may be workable; confirm turning/packaging" : "Doorway may be too narrow; check delivery access"}\nCustomer city: ${form.city}`;
    openTrackedWhatsAppLead({
      whatsappUrl: business.whatsappUrl,
      message: `Hi Metro Furniture, please help me verify the room fit and availability for ${selectedProduct?.name || "a sofa"}.\n\n${detail}\n\nCustomer: ${form.name}\nPhone: ${form.phone}`,
      leadType: "room_measurement",
      leadDetails: { roomWidthCm: form.roomWidth, roomLengthCm: form.roomLength, sofaWidthCm: form.sofaWidth, sofaDepthCm: form.sofaDepth, doorwayWidthCm: form.doorway, preferredWalkwayCm: form.walkway, city: form.city, result: { area: room.area, footprint: room.footprint, availableArea: room.available, floorFits: room.floorFits, circulation: room.circulation, doorwayMayFit: room.doorLikely } },
      product: selectedProduct,
      customer: { name: form.name, phone: form.phone, city: form.city },
      consent: form.consent,
    });
    setMeasurementComplete(true);
  }

  return <div className="container py-10 sm:py-14 md:py-16">
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[.22em] text-accent-dark">Plan with confidence</p>
        <h1 className="mt-3 font-heading text-4xl leading-tight tracking-tight sm:text-5xl">Will it fit your room?</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-body sm:text-base">Enter your room, doorway and sofa measurements to estimate floor space and everyday clearance before you enquire. Use centimetres throughout.</p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div className="glass rounded-[28px] p-5 shadow-[0_22px_60px_rgba(30,25,17,.08)] sm:p-7">
          <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-dark"><Image src="/icons/features/room-measurement.svg" alt="" width={24} height={24} /></span><div><h2 className="font-heading text-xl">Your measurements</h2><p className="mt-0.5 text-xs text-body">Measure clear usable space, not wall-to-wall if there are obstructions.</p></div></div>
          <label className="mt-6 block text-sm font-semibold">Furniture you are checking<select value={productSlug} onChange={(e) => setProductSlug(e.target.value)} className={fieldClass}>{products.map((p) => <option value={p.slug} key={p.slug}>{p.name} · {p.model || p.category}</option>)}</select></label>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <NumberField id="roomWidth" label="Room width (cm)" value={form.roomWidth} onChange={(v) => setForm({ ...form, roomWidth: v })} min="50" required />
            <NumberField id="roomLength" label="Room length (cm)" value={form.roomLength} onChange={(v) => setForm({ ...form, roomLength: v })} min="50" required />
            <NumberField id="sofaWidth" label="Sofa overall width (cm)" value={form.sofaWidth} onChange={(v) => setForm({ ...form, sofaWidth: v })} min="40" required />
            <NumberField id="sofaDepth" label="Sofa depth (cm)" value={form.sofaDepth} onChange={(v) => setForm({ ...form, sofaDepth: v })} min="30" required />
            <NumberField id="doorway" label="Narrowest doorway (cm)" value={form.doorway} onChange={(v) => setForm({ ...form, doorway: v })} min="30" required />
            <NumberField id="walkway" label="Preferred front walkway (cm)" value={form.walkway} onChange={(v) => setForm({ ...form, walkway: v })} min="30" required />
          </div>
          <div className="mt-6 rounded-2xl border border-accent/20 bg-white/65 p-4">
            <div className="flex items-start gap-2"><Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"/><p className="text-xs leading-5 text-body">Catalogue dimensions may not be available for every model. Enter the dimensions confirmed by the showroom or from the product label. Delivery access can also depend on stairs, lift size, turning space and removable parts.</p></div>
          </div>
        </div>

        <aside className="glass h-fit rounded-[28px] p-5 shadow-[0_22px_60px_rgba(30,25,17,.08)] sm:p-7">
          <h2 className="font-heading text-xl">Your space estimate</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Metric label="Room area" value={`${room.area.toFixed(2)} m²`} />
            <Metric label="Sofa footprint" value={`${room.footprint.toFixed(2)} m²`} />
            <Metric label="Floor area left" value={`${room.available.toFixed(2)} m²`} />
            <Metric label="Width left over" value={`${room.widthLeft.toFixed(0)} cm`} />
          </div>
          <div className="mt-5 space-y-3">
            <CheckRow good={room.floorFits} title={room.floorFits ? "Footprint fits the room" : "Furniture is larger than the entered room dimension"} detail="Based only on the width and length you entered." />
            <CheckRow good={room.circulation} title={room.circulation ? "Clearance looks reasonable" : "Check walking clearance"} detail={`Estimated side space ${room.widthLeft.toFixed(0)} cm · front space ${room.depthLeft.toFixed(0)} cm.`} />
            <CheckRow good={room.doorLikely} title={room.doorLikely ? "Doorway may be workable" : "Doorway needs a closer check"} detail="The sofa may need angled turning or partial disassembly; confirm with the delivery team." />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <label className="block text-sm font-medium">Your name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldClass} autoComplete="name" /></label>
            <label className="block text-sm font-medium">WhatsApp number<input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={fieldClass} autoComplete="tel" pattern="[+()0-9 .-]{7,40}" title="Enter a valid phone number" /></label>
            <label className="block text-sm font-medium">City / town<input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={fieldClass} autoComplete="address-level2" /></label>
          </div>
          <label className="mt-4 flex items-start gap-2 text-xs leading-5 text-body"><input type="checkbox" required checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 accent-[#b08c49]"/><span>I agree Metro Furniture may contact me about this measurement and product enquiry.</span></label>
          <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#d8c18f,#b08c49)] px-5 py-3.5 text-sm font-semibold text-[#211f1b] shadow-lg shadow-accent/20 transition hover:-translate-y-0.5"><CheckCircle2 className="h-4 w-4"/> Send measurements to showroom <ArrowRight className="h-4 w-4"/></button>
          {measurementComplete && <p role="status" className="mt-3 text-center text-xs text-body">WhatsApp should open with your measurements. If it did not, please use the showroom WhatsApp button in the site header.</p>}
          <p className="mt-4 text-[11px] leading-5 text-body/80">This is an initial planning estimate, not an architectural or delivery guarantee. Confirm final product dimensions with Metro Furniture before purchase.</p>
          {selectedProduct && <Link href={`/product/${selectedProduct.slug}`} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent-dark underline underline-offset-4">Return to {selectedProduct.name}<ArrowRight className="h-3.5 w-3.5"/></Link>}
        </aside>
      </form>
    </div>
  </div>;
}

function NumberField({ id, label, value, onChange, min, required }) {
  return <label htmlFor={id} className="block text-sm font-medium">{label}<input id={id} name={id} inputMode="decimal" type="number" min={min} max="2000" step="1" required={required} value={value} onChange={(e) => onChange(e.target.value)} className={fieldClass}/></label>;
}
function Metric({ label, value }) {
  return <div className="rounded-2xl border border-white/80 bg-white/70 p-3.5"><p className="text-[10px] font-semibold uppercase tracking-[.12em] text-body">{label}</p><p className="mt-1.5 font-heading text-xl font-semibold text-foreground">{value}</p></div>;
}
function CheckRow({ good, title, detail }) {
  return <div className="flex gap-3 rounded-2xl border border-white/75 bg-white/60 p-3"><span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${good ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}><CheckCircle2 className="h-4 w-4"/></span><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-body">{detail}</p></div></div>;
}
