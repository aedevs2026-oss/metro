"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { PriceOnly } from "@/components/PriceTag";

export default function RelatedProductsCarousel({ products }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!products?.length) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous products"
        className="absolute -left-2 top-[42%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5d9c8] bg-white shadow-sm hover:border-accent md:flex"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next products"
        className="absolute -right-2 top-[42%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5d9c8] bg-white shadow-sm hover:border-accent md:flex"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex gap-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_48%] lg:flex-[0_0_24%]"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-md border border-[#e5d9c8] bg-white shadow-[0_4px_20px_rgba(17,24,39,0.06)]">
                <Link
                  href={`/product/${product.slug}`}
                  className="product-image-canvas relative block aspect-[4/3]"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="280px"
                    className="product-image-blend object-contain p-2"
                  />
                  <span className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-body shadow-sm">
                    <Heart className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-accent-dark">
                    {product.category}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-semibold text-foreground">
                    <Link href={`/product/${product.slug}`} className="hover:text-accent-dark">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-body">
                    {product.tagline || product.material}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <PriceOnly product={product} size="sm" />
                    {product.offer ? (
                      <span className="product-sale-badge !py-0.5 !text-[10px]">{product.offer}</span>
                    ) : null}
                  </div>
                  <Link
                    href={`/product/${product.slug}`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-[#e5d9c8] bg-white py-2.5 text-xs font-semibold text-foreground transition hover:border-accent hover:text-accent-dark"
                  >
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
