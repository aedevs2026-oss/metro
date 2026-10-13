"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { business } from "@/data/business";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

export default function AboutHero({ content }) {
  const [heroSrc, setHeroSrc] = useState(content.image);

  useEffect(() => {
    setHeroSrc(content.image);
  }, [content.image]);

  return (
    <section className="metro-about-hero relative isolate min-h-[min(86vh,800px)] overflow-hidden bg-primary-dark">
      <Image
        src={heroSrc}
        alt={`${business.name} — premium living room`}
        fill
        priority
        quality={HOME_PHOTO_QUALITY}
        sizes="100vw"
        className="object-cover object-[center_42%]"
        onError={() => {
          if (content.imageFallback && heroSrc !== content.imageFallback) {
            setHeroSrc(content.imageFallback);
          } else if (content.imageLocalFallback && heroSrc !== content.imageLocalFallback) {
            setHeroSrc(content.imageLocalFallback);
          }
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a08]/70 via-[#0b0a08]/35 to-[#0b0a08]/10" aria-hidden />
      <div className="hero-overlay absolute inset-0" aria-hidden />

      <div className="container relative z-10 flex min-h-[min(86vh,800px)] flex-col justify-center py-24 md:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl text-white">
            <p className="home-hero-eyebrow text-accent-light">{content.eyebrow}</p>
            <h1 className="home-hero-title mt-4">{content.title}</h1>
            <p className="mt-3 font-heading text-xl font-medium text-white/95 md:text-2xl">{content.subtitle}</p>
            <p className="home-hero-lead mt-5 max-w-xl text-white/82">{content.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={content.primaryCta.href} className="btn-pill-primary px-6 py-3 text-[0.9375rem]">
                {content.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={content.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/5 px-6 py-3 text-[0.9375rem] font-semibold text-white backdrop-blur-sm transition hover:border-white/70 hover:bg-white/10"
              >
                <MapPin className="h-4 w-4 shrink-0 text-accent-light" aria-hidden />
                {content.secondaryCta.label}
              </Link>
            </div>
          </div>
          <p
            className="contact-script-tagline hidden max-w-[240px] whitespace-pre-line text-right lg:block"
            aria-hidden
          >
            {content.accentScript}
          </p>
        </div>
      </div>
    </section>
  );
}
