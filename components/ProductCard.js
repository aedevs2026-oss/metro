"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProductPromotion } from "@/lib/format";

function formatPrice(value) {
  if (!Number.isFinite(value) || value <= 0) return null;
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default function ProductCard({ product }) {
  const productUrl = `/product/${product.slug}`;
  const promotion = getProductPromotion(product);
  const priceLabel =
    product.onRequest || !Number.isFinite(product.price)
      ? product.priceLabel || "Get Best Price"
      : formatPrice(product.price) || product.priceLabel || "Get Best Price";

  return (
    <motion.article
      layout
      whileHover={{ y: -3 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      data-premium-card
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[18px] border border-[#e7dac7] bg-[#fffdf8] shadow-[0_6px_22px_rgba(43,32,18,.065)] transition duration-300 hover:border-[#c8a56a]/70 hover:shadow-[0_16px_36px_rgba(43,32,18,.12)] sm:rounded-[22px] md:rounded-[24px]"
    >
      <Link
        href={productUrl}
        className="group/image relative block overflow-hidden bg-[linear-gradient(145deg,#fffdf9_0%,#f7efe4_55%,#eee1ce_100%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#b88c45]"
        aria-label={`View ${product.name} details`}
      >
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
          <Image
            src={product.image}
            alt={product.imageAlt || `${product.name} at Metro Furniture`}
            fill
            sizes="(max-width: 639px) 48vw, (max-width: 1023px) 31vw, (max-width: 1279px) 29vw, 23vw"
            className="object-cover object-center transition duration-700 ease-out group-hover/image:scale-[1.04]"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5 px-3 pb-3 pt-3 sm:gap-3 sm:px-4 sm:pb-4 sm:pt-4 md:px-5 md:pb-5">
        <h3 className="line-clamp-2 min-h-[2.35em] font-heading text-[15px] font-semibold leading-[1.2] tracking-[-.015em] text-[#28231c] sm:text-base md:text-lg">
          <Link href={productUrl} className="transition hover:text-[#8c672e] focus-visible:outline-none focus-visible:underline">
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto min-w-0 border-t border-[#eadfce] pt-2.5 sm:pt-3">
          {promotion ? (
            <>
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
                <span className="whitespace-nowrap text-[11px] font-medium text-[#8b8173] line-through decoration-[#a77b45] sm:text-xs md:text-sm">
                  {formatPrice(promotion.originalPrice)}
                </span>
                <span className="shrink-0 rounded-full bg-[#f3e5cb] px-2 py-1 text-[9px] font-bold text-[#85551d] sm:px-2.5 sm:text-[10px] md:text-[11px]">
                  {promotion.discountPercent}% OFF
                </span>
              </div>
              <p className="mt-1.5 break-words font-heading text-xl font-bold leading-tight text-[#29241d] sm:text-2xl md:text-[1.65rem]">
                {formatPrice(promotion.offerPrice)}
              </p>
            </>
          ) : (
            <p className="break-words font-heading text-lg font-bold leading-tight text-[#29241d] sm:text-xl md:text-2xl">
              {priceLabel}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}
