"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Play } from "lucide-react";
import { OfferBadge } from "@/components/PriceTag";

function buildSlides(images) {
  const base = [...new Set((images || []).filter(Boolean))];
  return base.slice(0, 5);
}

export default function ProductGallery({
  images,
  name,
  imageAlt,
  offer,
  onViewInRoom,
}) {
  const slides = useMemo(() => buildSlides(images), [images]);
  const [active, setActive] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const current = slides[active] || slides[0];

  const onMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  }, []);

  const goPrev = () => setActive((i) => (i <= 0 ? slides.length - 1 : i - 1));
  const goNext = () => setActive((i) => (i >= slides.length - 1 ? 0 : i + 1));

  if (!current) return null;

  return (
    <div className="min-w-0 space-y-3 sm:space-y-4">
      <div
        className="product-gallery-canvas group relative aspect-[4/3] min-w-0 overflow-hidden rounded-[18px] border border-white/80 shadow-[0_18px_55px_rgba(30,25,17,.10)] sm:rounded-[24px] md:aspect-[5/4] md:rounded-[28px]"
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={onMove}
      >
        <Image
          src={current}
          alt={imageAlt || name}
          fill
          priority
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 48vw, 52vw"
          className={`product-image-blend object-contain p-2 transition duration-300 ${
            zooming ? "scale-125" : "scale-100"
          }`}
          style={
            zooming
              ? { transformOrigin: `${origin.x}% ${origin.y}%` }
              : { transformOrigin: "center" }
          }
        />
        <div className="absolute left-3 top-3 z-10 md:left-4 md:top-4">
          <OfferBadge offer={offer} variant="sale" />
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/95 text-foreground shadow-md transition hover:bg-white md:left-3 md:h-10 md:w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/95 text-foreground shadow-md transition hover:bg-white md:right-3 md:h-10 md:w-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}

        {onViewInRoom ? (
          <button
            type="button"
            onClick={onViewInRoom}
            className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full border border-accent/70 bg-black/45 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-[2px] transition hover:border-accent hover:bg-black/55 md:bottom-4 md:right-4"
          >
            <Eye className="h-3.5 w-3.5 text-accent-light" aria-hidden />
            View in Room
          </button>
        ) : null}
      </div>

      <ul className="flex min-w-0 gap-2 overflow-x-auto pb-1 no-scrollbar" aria-label="Product thumbnails">
        {slides.map((image, index) => {
          const selected = index === active;
          return (
            <li key={`${image}-${index}`} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={selected ? "true" : undefined}
                className={`relative block h-14 w-14 overflow-hidden rounded-xl border-2 transition sm:h-[4.25rem] sm:w-[4.25rem] md:h-[5rem] md:w-[5rem] ${
                  selected ? "border-accent shadow-md" : "border-[#e5d9c8] bg-white"
                }`}
              >
                <Image src={image} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          );
        })}
        <li className="shrink-0">
          <button
            type="button"
            onClick={onViewInRoom}
            aria-label="Open room preview"
            className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-[#e5d9c8] bg-[#f3ebe0] sm:h-[4.25rem] sm:w-[4.25rem] md:h-[5rem] md:w-[5rem]"
          >
            <span className="absolute inset-0 bg-black/20" aria-hidden />
            <Play className="relative z-[1] h-6 w-6 fill-white text-white" aria-hidden />
          </button>
        </li>
      </ul>
    </div>
  );
}
