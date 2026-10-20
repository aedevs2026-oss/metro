"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

const defaultSection = {
  eyebrow: "Our Premium Range",
  title: "Signature Collection",
  description: "Handpicked pieces that blend style, comfort and quality.",
  cta: { label: "View All Products", href: "/shop" },
  backgroundImage: "/homepage/brand/grand-luxury-living-room.webp",
};

export default function SignatureCollection({ products, section = defaultSection }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onInit = () => setSlideCount(emblaApi.scrollSnapList().length);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onInit);
    onSelect();
    onInit();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onInit);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!products?.length) return null;

  const ProductCard = ({ product }) => (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white p-2.5 text-foreground shadow-[0_16px_48px_rgba(0,0,0,0.25)] sm:p-3.5">
      <Link
        href={`/product/${product.slug}`}
        className="product-image-canvas group relative block w-full aspect-[4/3] overflow-hidden rounded-xl text-left"
        aria-label={`View ${product.name} product details`}
      >
        <Image
          src={product.image}
          alt={product.imageAlt || product.name}
          fill
          quality={HOME_PHOTO_QUALITY}
          sizes="(max-width: 639px) 88vw, (max-width: 1023px) 68vw, 320px"
          className="product-image-blend object-cover p-0 transition duration-500 group-hover:scale-[1.05]"
        />
        {product.showcaseFeatured ? (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-dark">
            Best Seller
          </span>
        ) : product.offer ? (
          <span className="absolute right-3 top-3 rounded-full bg-stone-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {product.offer}
          </span>
        ) : null}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col px-1 pb-1 pt-3 sm:px-2 sm:pb-2 sm:pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-dark">
          {product.category}
          {product.model ? ` · ${product.model}` : ""}
        </p>
        <h3 className="mt-1 break-words font-heading text-base font-semibold leading-snug text-foreground sm:text-lg">{product.name}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-body sm:text-sm">{product.tagline || product.material}</p>
        {product.priceLabel && !product.onRequest ? (
          <p className="mt-3 text-xs font-semibold text-foreground sm:text-sm">Price <span className="font-heading text-lg">{product.priceLabel}</span></p>
        ) : null}
        <Link
          href={`/product/${product.slug}`}
          className="btn-pill-primary mt-4 min-h-10 w-full justify-center text-center text-[11px] sm:text-sm"
        >
          View Product Details
        </Link>
      </div>
    </article>
  );

  const bgImage = section.backgroundImage;

  return (
    <>
      <section id="signature-collection" className="relative overflow-hidden bg-[#0a0a0a] py-16 text-white md:py-20 lg:py-24">
      {bgImage ? (
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={bgImage}
            alt=""
            fill
            quality={HOME_PHOTO_QUALITY}
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/88 to-[#0a0a0a]/92" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[#0a0a0a]" aria-hidden />
      )}

      <div className="container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-12 xl:grid-cols-[minmax(0,320px)_1fr] xl:gap-16">
          <div className="max-w-md lg:max-w-none">
            {section.eyebrow ? (
              <p className="section-eyebrow text-accent-light">{section.eyebrow}</p>
            ) : null}
            <h2 className={`home-h2 text-white ${section.eyebrow ? "mt-3" : ""}`}>{section.title}</h2>
            <p className="home-body mt-4 text-white/75">{section.description}</p>
            <Link href={section.cta?.href || "/shop"} className="btn-pill-primary mt-7 inline-flex text-sm">
              {section.cta?.label || "View All Products"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="relative min-w-0">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous products"
              className="absolute -left-1 top-[42%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-accent/45 bg-[#141518]/90 text-accent-light shadow-lg transition hover:border-accent hover:bg-[#1a1b1f] sm:flex lg:-left-5 xl:-left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next products"
              className="absolute -right-1 top-[42%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-accent/45 bg-[#141518]/90 text-accent-light shadow-lg transition hover:border-accent hover:bg-[#1a1b1f] sm:flex lg:-right-5 xl:-right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="overflow-hidden px-1 sm:px-8 lg:px-6" ref={emblaRef}>
              <div className="flex gap-4 md:gap-5">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="home-signature-slide min-w-0 flex-[0_0_88%] sm:flex-[0_0_72%] md:flex-[0_0_52%] lg:flex-[0_0_calc((100%-2.5rem)/3)]"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            {slideCount > 1 ? (
              <div className="mt-6 flex justify-center gap-1.5 sm:hidden">
                {Array.from({ length: slideCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === selectedIndex ? "w-7 bg-accent" : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      </section>

    </>
  );
}
