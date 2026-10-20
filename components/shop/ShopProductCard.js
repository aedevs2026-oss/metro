"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductSaveControls from "@/components/customer-tools/ProductSaveControls";
import { colorToHex } from "@/data/shop";

function productBadge(product) {
  if (product.upcoming) return { label: "New Arrival", tone: "new" };
  if (product.featured) return { label: "Bestseller", tone: "best" };
  if (product.offer) return { label: "Trending", tone: "trend" };
  return null;
}

export default function ShopProductCard({ product }) {
  const badge = productBadge(product);
  const swatchColors = [product.color].filter(Boolean);
  const productUrl = `/product/${product.slug}`;

  return (
    <article data-premium-card className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/80 bg-white/70 shadow-[0_12px_36px_rgba(30,25,17,.055)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-white/90 hover:shadow-[0_22px_55px_rgba(30,25,17,.12)]">
      <div className="relative">
        <Link href={productUrl} className="block" aria-label={`View ${product.name} product details`}>
          <div className="product-image-canvas relative aspect-[4/3] overflow-hidden">
            <Image
              src={product.image}
              alt={product.imageAlt || `${product.name} ${product.category} at Metro Furniture Dharmapuri`}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="product-image-blend object-cover p-0 transition duration-700 group-hover:scale-[1.05]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/35 to-transparent" />
            {badge ? (
              <span className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.14em] text-white shadow-sm ${badge.tone === "best" ? "bg-[#9a793d]" : badge.tone === "new" ? "bg-amber-800" : "bg-stone-700"}`}>
                {badge.label}
              </span>
            ) : null}
          </div>
        </Link>
        <div className="absolute right-3 top-3 rounded-full border border-white/70 bg-white/80 p-1 shadow-md backdrop-blur-xl">
          <ProductSaveControls product={product} compact />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[.15em] text-accent-dark">{product.category}{product.model ? ` · ${product.model}` : ""}</p>
        <h3 className="mt-1.5 font-heading text-lg font-semibold leading-snug text-foreground"><Link href={productUrl} className="transition hover:text-accent-dark">{product.name}</Link></h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-body">{product.tagline || product.description}</p>

        <div className="mt-3 flex items-center gap-1.5" aria-label="Available colours">
          {swatchColors.map((colour) => <span key={colour} className="h-4 w-4 rounded-full border border-border/80" style={{ backgroundColor: colorToHex(colour) }} title={colour} />)}
          {product.color ? <span className="ml-1 text-[10px] text-body/70">{product.color}</span> : null}
        </div>

        <div className="mt-auto pt-4">
          {product.priceLabel && !product.onRequest ? (
            <p className="text-sm font-semibold text-foreground">Price <span className="font-heading text-lg">{product.priceLabel}</span></p>
          ) : <p className="text-sm font-semibold text-foreground">Personalised quote available</p>}
          <Link href={productUrl} className="metro-luxe-glint mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-[linear-gradient(120deg,#ead5a6,#c49a56_58%,#a97834)] px-4 py-3 text-xs font-semibold text-[#211f1b] shadow-[0_8px_20px_rgba(168,124,54,.18),inset_0_1px_0_rgba(255,255,255,.48)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(168,124,54,.28)]">
            View Product Details <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
