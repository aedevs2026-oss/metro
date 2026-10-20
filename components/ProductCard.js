"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductSaveControls from "@/components/customer-tools/ProductSaveControls";
import { colorToHex } from "@/data/shop";

function cardBadge(product) {
  if (product.upcoming) return "Coming soon";
  if (product.offer) return product.offer;
  if (product.featured) return "Bestseller";
  return null;
}

export default function ProductCard({ product }) {
  const productUrl = `/product/${product.slug}`;
  const colorName = product.color || "Finish options on request";
  const price = product.priceLabel && !product.onRequest
    ? product.priceLabel
    : Number.isFinite(product.price) && !product.onRequest
      ? `₹${Number(product.price).toLocaleString("en-IN")}`
      : null;
  const badge = cardBadge(product);

  return (
    <motion.article
      layout
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      data-premium-card
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#e6d9c5] bg-[#fffdf8] shadow-[0_7px_24px_rgba(43,32,18,.07)] transition duration-300 hover:border-[#c8a56a]/70 hover:shadow-[0_18px_38px_rgba(43,32,18,.12)] sm:rounded-[24px] md:rounded-[26px]"
    >
      <div className="relative p-1.5 sm:p-2">
        <Link
          href={productUrl}
          className="group/image relative block overflow-hidden rounded-[14px] bg-[linear-gradient(145deg,#fffdf9_0%,#f7efe4_55%,#eee1ce_100%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#b88c45] sm:rounded-[17px]"
          aria-label={`View ${product.name} product details`}
        >
          <div className="relative aspect-square overflow-hidden sm:aspect-[4/3]">
            <Image
              src={product.image}
              alt={product.imageAlt || `${product.name} ${product.category} at Metro Furniture Dharmapuri`}
              fill
              sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, (max-width: 1279px) 29vw, 23vw"
              className="object-cover object-center transition duration-700 ease-out group-hover/image:scale-[1.045]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#211a10]/15 to-transparent sm:h-16" />
            {badge ? (
              <span className="absolute bottom-2 left-2 rounded-full border border-white/75 bg-white/90 px-2 py-1 text-[8px] font-bold uppercase tracking-[.1em] text-[#76572b] shadow-sm backdrop-blur-md sm:bottom-3 sm:left-3 sm:px-2.5 sm:text-[9px]">
                {badge}
              </span>
            ) : null}
          </div>
        </Link>

        <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
          <ProductSaveControls
            product={product}
            compact
            showCompare={false}
            showSavedLink={false}
          />
        </div>
        <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
          <ProductSaveControls
            product={product}
            compact
            showWishlist={false}
            showSavedLink={false}
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-3 pb-3 pt-1 sm:px-4 sm:pb-4 sm:pt-2 md:px-5 md:pb-5">
        <p className="truncate text-[8px] font-bold uppercase tracking-[.14em] text-[#99743a] sm:text-[9px] md:text-[10px]">
          {product.category}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.35em] font-heading text-[15px] font-semibold leading-[1.18] tracking-[-.015em] text-[#28231c] sm:mt-1.5 sm:text-base md:text-lg">
          <Link href={productUrl} className="transition hover:text-[#8c672e] focus-visible:outline-none focus-visible:underline">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 min-h-[2.7em] text-[10px] leading-[1.5] text-[#756d61] sm:mt-2 sm:text-[11px] sm:leading-[1.6] md:text-xs">
          {product.tagline || product.description || "Explore this piece and ask our showroom team about available options."}
        </p>

        <div className="mt-2.5 flex min-w-0 items-center gap-2 sm:mt-3">
          <span
            className="h-4 w-4 shrink-0 rounded-full border border-black/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,.35)] sm:h-[18px] sm:w-[18px]"
            style={{ backgroundColor: product.color ? colorToHex(product.color) : "#d7c9b2" }}
            aria-label={`Listed colour: ${colorName}`}
            title={colorName}
          />
          <span className="min-w-0 truncate text-[10px] font-medium text-[#6f6556] sm:text-[11px]">
            {colorName}
          </span>
        </div>

        <div className="mt-auto pt-3 sm:pt-4">
          <div className="mb-2 flex min-h-8 items-end justify-between gap-1.5 sm:mb-3">
            <div className="min-w-0">
              <p className="text-[8px] font-semibold uppercase tracking-[.11em] text-[#92836a] sm:text-[9px] sm:tracking-[.13em]">
                {price ? "Catalogue price" : "Personalised quote"}
              </p>
              <p className="mt-0.5 truncate font-heading text-[15px] font-semibold leading-tight text-[#29241d] sm:text-lg md:text-xl">
                {price || "Ask us"}
              </p>
            </div>
          </div>
          <Link
            href={productUrl}
            className="metro-luxe-glint inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full border border-[#c6a56a]/65 bg-[linear-gradient(120deg,#ecd8a9,#c8a15c_58%,#ad813e)] px-2.5 py-2.5 text-[10px] font-bold text-[#231d14] shadow-[0_5px_13px_rgba(168,124,54,.16)] transition hover:-translate-y-0.5 hover:shadow-[0_9px_20px_rgba(168,124,54,.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e7335] focus-visible:ring-offset-2 sm:min-h-11 sm:gap-2 sm:px-3 sm:text-[11px] md:text-xs"
          >
            <span>View Details</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
