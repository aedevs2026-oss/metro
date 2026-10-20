"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProductSaveControls from "@/components/customer-tools/ProductSaveControls";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product }) {
  const productUrl = `/product/${product.slug}`;

  return (
    <motion.article layout whileHover={{ y: -5 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} data-premium-card className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-white/75 bg-white/70 shadow-[0_12px_36px_rgba(30,25,17,.06)] backdrop-blur-xl transition-shadow hover:shadow-[0_22px_55px_rgba(30,25,17,.13)]">
      <div className="relative">
        <Link href={productUrl} className="block" aria-label={`View ${product.name} details`}>
          <div className="product-image-canvas relative aspect-[4/3] overflow-hidden">
            <Image src={product.image} alt={`${product.name} ${product.category} at Metro Furniture Dharmapuri`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="product-image-blend object-cover p-0 transition duration-700 ease-out group-hover:scale-[1.05]" loading="lazy" />
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {product.featured ? <Badge>Premium</Badge> : null}
              {product.offer ? <Badge variant="secondary">{product.offer}</Badge> : null}
            </div>
          </div>
        </Link>
        <div className="absolute right-3 top-3"><ProductSaveControls product={product} compact /></div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-accent-dark">{product.category}{product.model ? ` · ${product.model}` : ""}</p>
        <h3 className="line-clamp-2 min-h-[2.75rem] font-heading text-base font-semibold leading-snug tracking-tight"><Link href={productUrl} className="transition hover:text-accent-dark">{product.name}</Link></h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-body">{product.tagline || product.description}</p>
        <ProductSaveControls product={product} />
        <div className="mt-auto pt-1">
          {product.priceLabel && !product.onRequest ? <p className="text-sm font-semibold text-foreground">Starting from <span className="font-heading text-lg">{product.priceLabel}</span></p> : <p className="text-sm font-semibold text-foreground">Custom quote available</p>}
          <Link href={productUrl} className="metro-luxe-glint mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-[linear-gradient(120deg,#ead5a6,#c49a56_58%,#a97834)] px-4 py-3 text-xs font-semibold text-[#211f1b] shadow-[0_8px_20px_rgba(168,124,54,.18),inset_0_1px_0_rgba(255,255,255,.48)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(168,124,54,.28)]">Explore Product <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </motion.article>
  );
}
