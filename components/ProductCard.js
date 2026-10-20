"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function formatPrice(value) {
  if (!Number.isFinite(value) || value <= 0) return null;
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function getPriceDetails(product) {
  const currentPrice = formatPrice(product.price);
  const mrpIsValid =
    Number.isFinite(product.mrp) &&
    Number.isFinite(product.price) &&
    product.mrp > product.price &&
    product.price > 0;

  return {
    currentPrice: product.onRequest ? (product.priceLabel || "Get Best Price") : (currentPrice || product.priceLabel || "Get Best Price"),
    oldPrice: mrpIsValid ? formatPrice(product.mrp) : null,
    discount: mrpIsValid
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null,
  };
}

export default function ProductCard({ product }) {
  const productUrl = `/product/${product.slug}`;
  const { currentPrice, oldPrice, discount } = getPriceDetails(product);

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
        {discount ? (
          <span className="absolute left-2.5 top-2.5 rounded-full border border-white/75 bg-[#a86f28] px-2.5 py-1.5 text-[9px] font-bold tracking-wide text-white shadow-md sm:left-3.5 sm:top-3.5 sm:px-3 sm:text-[10px]">
            {discount}% OFF
          </span>
        ) : null}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5 px-3 pb-3 pt-3 sm:gap-3 sm:px-4 sm:pb-4 sm:pt-4 md:px-5 md:pb-5">
        <h3 className="line-clamp-2 min-h-[2.35em] font-heading text-[15px] font-semibold leading-[1.2] tracking-[-.015em] text-[#28231c] sm:text-base md:text-lg">
          <Link href={productUrl} className="transition hover:text-[#8c672e] focus-visible:outline-none focus-visible:underline">
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-[#eadfce] pt-2.5 sm:pt-3">
          {oldPrice ? (
            <span className="text-[11px] font-medium text-[#8b8173] line-through decoration-[#a77b45] sm:text-xs md:text-sm">
              {oldPrice}
            </span>
          ) : null}
          {discount ? (
            <span className="rounded-md bg-[#f5e7cf] px-1.5 py-0.5 text-[9px] font-bold text-[#89551b] sm:text-[10px]">
              Save {discount}%
            </span>
          ) : null}
          <p className="w-full break-words font-heading text-lg font-bold leading-tight text-[#29241d] sm:text-xl md:text-2xl">
            {currentPrice}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
