"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

function TrendingCard({ item }) {
  return (
    <Link
      href={item.href}
      className="group block h-full overflow-hidden rounded-2xl border border-[#e8e2da] bg-white shadow-[0_4px_22px_rgba(17,24,39,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(17,24,39,0.09)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            quality={HOME_PHOTO_QUALITY}
            sizes="(max-width: 1024px) 78vw, 300px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="px-4 pb-6 pt-5 text-center">
        <h3 className="font-heading text-base font-semibold text-foreground md:text-lg">{item.name}</h3>
        <span className="btn-pill-trending mt-4 inline-flex items-center gap-1">
          Explore
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export default function TrendingNow({ section, items }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const title = section?.title ?? "Trending Now";
  const viewAllHref = section?.viewAllHref ?? "/shop";

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="home-trending-section bg-white py-16 md:py-20 lg:py-24">
      <div className="container">
        <AnimateIn className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            {section?.eyebrow ? (
              <p className="section-eyebrow text-accent-dark">{section.eyebrow}</p>
            ) : null}
            <span className="luxury-gold-line" aria-hidden />
            <h2 className={`home-h2 text-foreground ${section?.eyebrow ? "mt-4" : "mt-2"}`}>{title}</h2>
          </div>
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark transition hover:text-accent"
          >
            View All
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </AnimateIn>

        <ul className="hidden gap-5 lg:grid lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.id}>
              <TrendingCard item={item} />
            </li>
          ))}
        </ul>

        <div className="home-trending-carousel relative lg:hidden">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous categories"
            className="home-trending-prev absolute -left-1 top-[42%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-md transition hover:border-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next categories"
            className="home-trending-next absolute -right-1 top-[42%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-md transition hover:border-accent"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="home-trending-viewport overflow-hidden px-6" ref={emblaRef}>
            <ul className="flex gap-4">
              {items.map((item) => (
                <li key={item.id} className="home-trending-slide min-w-0 flex-[0_0_78%] sm:flex-[0_0_55%]">
                  <TrendingCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
