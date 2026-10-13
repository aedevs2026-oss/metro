"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { business } from "@/data/business";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

export default function HomeHero({ content }) {
  const card = content.showroomCard;
  const [heroSrc, setHeroSrc] = useState(content.image);

  useEffect(() => {
    setHeroSrc(content.image);
  }, [content.image]);

  return (
    <section className="home-hero-section relative isolate min-h-[calc(100svh-4.25rem)] overflow-hidden bg-primary-dark sm:min-h-[calc(100svh-4.5rem)]">
      <picture className="homepage-hero-picture absolute inset-0 block">
        <source
          media="(max-width: 639px)"
          srcSet="/homepage/hero/metro-luxury-hero-mobile.webp"
        />
        <Image
          src={heroSrc}
          alt={`${business.name} — premium living room furniture in Dharmapuri`}
          fill
          priority
          quality={HOME_PHOTO_QUALITY}
          sizes="100vw"
          className="homepage-hero-image object-cover object-[center_42%]"
          onError={() => {
            if (content.imageFallback && heroSrc !== content.imageFallback) {
              setHeroSrc(content.imageFallback);
            } else if (content.imageLocalFallback && heroSrc !== content.imageLocalFallback) {
              setHeroSrc(content.imageLocalFallback);
            }
          }}
        />
      </picture>
      <div className="hero-overlay absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/20 to-black/35" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#100d09]/50 via-[#100d09]/12 to-transparent lg:from-[#100d09]/42" aria-hidden />

      <div className="container relative z-10 flex min-h-[calc(100svh-4.25rem)] flex-col pb-32 pt-10 md:pb-36 md:pt-14 lg:pb-40">
        <div className="flex flex-1 flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-white lg:max-w-xl xl:max-w-2xl"
        >
          <p className="home-hero-eyebrow text-accent-light">{content.eyebrow}</p>
          <span className="luxury-gold-line" aria-hidden />
          <h1 className="home-hero-title mt-5 whitespace-pre-line">{content.title}</h1>
          <p className="home-hero-lead mt-5 max-w-xl text-white/88">{content.description}</p>
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
        </motion.div>
        </div>

        {card?.image ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex justify-start lg:mt-auto lg:justify-end"
          >
            <Link
              href={card.href || "/contact"}
              className="group flex max-w-[min(100%,22rem)] overflow-hidden rounded-2xl border border-white/15 bg-black/55 shadow-2xl backdrop-blur-md transition hover:border-accent/45"
            >
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-light">
                  {card.label || "Our New Showroom"}
                </p>
                <p className="font-heading text-lg font-semibold leading-tight text-white sm:text-xl">
                  {card.location || "Dharmapuri"}
                </p>
                {card.subtitle ? (
                  <p className="mt-1 text-[10px] leading-relaxed text-white/60 sm:text-[11px]">{card.subtitle}</p>
                ) : null}
              </div>
              <div className="relative w-24 shrink-0 self-stretch sm:w-28">
                <Image
                  src={card.image}
                  alt={`${business.name} showroom`}
                  fill
                  quality={HOME_PHOTO_QUALITY}
                  sizes="112px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          </motion.div>
        ) : null}
      </div>

      {content.stats?.length ? (
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#0c0c0c]/80 backdrop-blur-md">
          <ul className="container grid grid-cols-2 gap-x-6 gap-y-4 py-5 sm:grid-cols-4 sm:gap-8 sm:py-6">
            {content.stats.map((stat, index) => (
              <li
                key={stat.id}
                className={`flex flex-col ${
                  index > 0 ? "sm:border-l sm:border-white/10 sm:pl-6" : ""
                }`}
              >
                <p className="font-heading text-lg font-semibold leading-none text-accent-light md:text-xl">
                  {stat.label}
                </p>
                <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/55 md:text-xs">
                  {stat.sub}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
