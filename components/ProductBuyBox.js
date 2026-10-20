"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
  Award,
  ClipboardList,
  Heart,
  MapPin,
  MessageCircleMore,
  Share2,
  Users,
  Ruler,
  SlidersHorizontal,
  CalendarDays,
} from "lucide-react";
import RoomPreview from "@/components/RoomPreview";
import { StockBadge } from "@/components/PriceTag";
import { branches } from "@/data/business";
import { getColorOptions } from "@/lib/product-highlights";
import { buildWhatsAppUrl, productEnquiryMessage } from "@/lib/whatsapp";
import { colorToHex } from "@/data/shop";

function tagFromMaterial(material) {
  if (!material) return null;
  if (/velvet|fabric/i.test(material)) return "Premium fabric";
  if (/wood|hardwood/i.test(material)) return "Engineered hardwood frame";
  if (/leather/i.test(material)) return "Leatherette finish";
  return null;
}

function tagFromFeatures(product) {
  const hay = [...(product.features || []), product.configuration].join(" ").toLowerCase();
  if (/modular|sectional|corner|l-shape/i.test(hay)) return "Modular design";
  if (/reclin/i.test(hay)) return "Recliner mechanism";
  return null;
}

function addToQuoteList(slug) {
  try {
    const raw = localStorage.getItem("metro-quote");
    const list = raw ? JSON.parse(raw) : [];
    if (!list.includes(slug)) list.push(slug);
    localStorage.setItem("metro-quote", JSON.stringify(list));
    return list.length;
  } catch {
    return 0;
  }
}

function ProductPriceBlock({ product }) {
  if (product.onRequest || product.price == null) {
    return (
      <div className="product-price-card p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-dark">
          Special Offer
        </p>
        <p className="mt-2 font-heading text-3xl font-semibold text-accent">Get Best Price</p>
        <p className="mt-1 text-sm text-body">Enquire for size &amp; finish quote</p>
      </div>
    );
  }

  const unit = product.priceUnit === "set" ? "set" : "pc";

  return (
    <div className="product-price-card grid min-w-0 gap-4 p-4 sm:gap-5 sm:p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-dark">
          Special Offer
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-[2rem]">
            {product.priceLabel}
          </span>
          <span className="text-sm font-medium text-body/80">/ {unit}</span>
        </div>
        {product.mrp ? (
          <p className="mt-1 text-base font-medium text-body/55 line-through">
            MRP ₹{product.mrp.toLocaleString("en-IN")}
          </p>
        ) : null}
        {product.offer ? (
          <span className="product-sale-badge mt-2">{product.offer}</span>
        ) : null}
      </div>

      <ul className="grid min-w-0 gap-3 border-t border-accent/20 pt-4 sm:grid-cols-3 sm:gap-2 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
        {[
          { icon: Award, label: "Premium Quality" },
          { icon: Users, label: "Customization Available" },
          { icon: MessageCircleMore, label: "Expert Guidance" },
        ].map((item) => (
          <li key={item.label} className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-white"
              aria-hidden
            >
              <item.icon className="h-4 w-4 text-accent-dark" strokeWidth={1.5} />
            </span>
            <p className="text-xs font-semibold leading-snug text-foreground">{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductBuyBox({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.color || "");
  const [quoteNote, setQuoteNote] = useState("");
  const colors = getColorOptions(product);
  const branch = branches[0];

  const extraTags = [
    tagFromMaterial(product.material),
    tagFromFeatures(product),
    product.upholstery ? "Premium upholstery" : null,
  ].filter(Boolean);

  const enquiryBase = productEnquiryMessage(product);
  const enquiry =
    selectedColor && selectedColor !== product.color
      ? `${enquiryBase}\nPreferred colour: ${selectedColor}`
      : enquiryBase;
  const whatsappUrl = buildWhatsAppUrl(enquiry);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        setQuoteNote("Link copied to clipboard");
        setTimeout(() => setQuoteNote(""), 2500);
      }
    } catch {
      /* user cancelled */
    }
  }

  function handleAddToQuote() {
    const count = addToQuoteList(product.slug);
    setQuoteNote(`Added to quote list (${count} item${count === 1 ? "" : "s"})`);
    setTimeout(() => setQuoteNote(""), 3000);
  }

  return (
    <div className="glass flex min-w-0 flex-col rounded-[22px] p-4 shadow-[0_22px_60px_rgba(30,25,17,.08)] backdrop-blur-2xl sm:rounded-[26px] sm:p-5 md:p-6 lg:p-6">
      <div className="flex flex-wrap gap-2">
        <span className="product-pill-tag">{product.category}</span>
        {product.model ? <span className="product-pill-tag">{product.model}</span> : null}
        {extraTags.map((tag) => (
          <span key={tag} className="product-pill-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3">
        <StockBadge onRequest={product.onRequest} />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <h1
          id="product-heading"
          className="min-w-0 flex-1 break-words font-heading text-[1.45rem] font-semibold leading-tight tracking-tight text-foreground sm:text-[1.75rem] md:text-[2.15rem] xl:text-[2.35rem]"
        >
          {product.name}
        </h1>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => setWishlisted((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5d9c8] bg-white text-body transition hover:border-accent hover:text-accent"
          >
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-accent text-accent" : ""}`} />
          </button>
          <button
            type="button"
            aria-label="Share product"
            onClick={handleShare}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5d9c8] bg-white text-body transition hover:border-accent hover:text-accent"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {product.tagline ? (
        <p className="mt-3 text-[15px] italic leading-relaxed text-body">{product.tagline}</p>
      ) : null}

      <div className="mt-6">
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-body/70">Colour</p>
        <div className="flex flex-wrap gap-2.5">
          {colors.map((c) => {
            const active =
              selectedColor.toLowerCase() === c.name.toLowerCase() ||
              (!selectedColor && product.color?.toLowerCase() === c.name.toLowerCase());
            return (
              <button
                key={c.name}
                type="button"
                title={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`h-9 w-9 rounded-full border-2 transition ${
                  active ? "border-accent ring-2 ring-accent/35" : "border-white shadow-sm"
                }`}
                style={{ backgroundColor: c.hex || colorToHex(c.name) }}
                aria-label={`Colour ${c.name}`}
                aria-pressed={active}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <ProductPriceBlock product={product} />
      </div>

      {quoteNote ? (
        <p className="mt-4 rounded-md bg-accent/10 px-3 py-2 text-center text-sm font-medium text-accent-dark">
          {quoteNote}
        </p>
      ) : null}

      <div className="mt-5 flex flex-col gap-3">
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill-primary flex w-full items-center justify-center gap-2.5 py-3.5 text-[0.9375rem]"
          aria-label={`Ask Metro Furniture for the exact price of ${product.name} on WhatsApp`}
        >
          <Image src="/icons/common/whatsapp-white.svg" alt="" width={21} height={21} className="h-5 w-5 object-contain" />
          Get Exact Price on WhatsApp
        </Link>
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 text-xs font-semibold text-body transition hover:text-accent-dark"
        >
          <Image
            src="/icons/common/whatsapp.svg"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4"
          />
          Prefer WhatsApp? Message the showroom directly
        </Link>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleAddToQuote}
            className="inline-flex min-w-0 items-center justify-center gap-1.5 whitespace-normal rounded-md bg-[#2a2a2a] px-2.5 py-3 text-center text-xs font-semibold text-white transition hover:bg-[#1a1a1a] sm:gap-2 sm:px-3 sm:text-sm"
          >
            <ClipboardList className="h-4 w-4" aria-hidden />
            Add to Quote
          </button>
          <Link
            href={branch?.mapUrl || "/contact"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-0 items-center justify-center gap-1.5 whitespace-normal rounded-md border border-accent/60 bg-white px-2.5 py-3 text-center text-xs font-semibold text-foreground transition hover:border-accent sm:gap-2 sm:px-3 sm:text-sm"
          >
            <MapPin className="h-4 w-4 text-accent" aria-hidden />
            Visit Showroom
          </Link>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Link href={`/customize?product=${product.slug}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-accent/30 bg-white/75 px-3 py-2.5 text-center text-[11px] font-semibold text-foreground transition hover:border-accent hover:bg-white">
          <SlidersHorizontal className="h-4 w-4 text-accent-dark" /> Customize
        </Link>
        <Link href={`/room-measurement?product=${product.slug}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-accent/30 bg-white/75 px-3 py-2.5 text-center text-[11px] font-semibold text-foreground transition hover:border-accent hover:bg-white">
          <Ruler className="h-4 w-4 text-accent-dark" /> Check room fit
        </Link>
        <Link href={`/book-showroom?product=${product.slug}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-accent/30 bg-white/75 px-3 py-2.5 text-center text-[11px] font-semibold text-foreground transition hover:border-accent hover:bg-white">
          <CalendarDays className="h-4 w-4 text-accent-dark" /> Book a visit
        </Link>
      </div>

      <div className="mt-4">
        <RoomPreview productImage={product.image} productName={product.name} variant="product" />
      </div>

    </div>
  );
}
