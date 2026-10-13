"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { business } from "@/data/business";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

export default function ContactHero({ content }) {
  const [heroSrc, setHeroSrc] = useState(content.image);

  useEffect(() => {
    setHeroSrc(content.image);
  }, [content.image]);

  return (
    <section className="relative isolate min-h-[min(82vh,680px)] overflow-hidden border-b border-[#e8e2da]/60">
      <Image
        src={heroSrc}
        alt={`${business.name} luxury interior`}
        fill
        priority
        quality={HOME_PHOTO_QUALITY}
        sizes="100vw"
        className="object-cover object-center"
        onError={() => {
          if (content.imageFallback && heroSrc !== content.imageFallback) {
            setHeroSrc(content.imageFallback);
          }
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#f8f4f0] from-0% via-[#f8f4f0]/92 via-[42%] to-[#f8f4f0]/25 to-100% lg:via-[#f8f4f0]/88 lg:via-[38%] lg:to-transparent lg:to-[52%]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5" aria-hidden />

      <div className="container relative z-10 grid min-h-[min(82vh,680px)] items-center gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,46%)_1fr] lg:gap-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="section-eyebrow text-accent-dark">{content.eyebrow}</p>
          <h1 className="home-h2 mt-4 max-w-lg whitespace-pre-line text-foreground lg:text-[2.65rem]">
            {content.title}
          </h1>
          <p className="home-body mt-5 max-w-md text-body">{content.description}</p>

          <ul className="mt-9 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {content.features.map((item) => (
              <li
                key={item.id}
                className="flex flex-col items-center rounded-xl border border-[#e8e2da] bg-white px-2 py-4 text-center shadow-[0_2px_14px_rgba(17,24,39,0.04)] sm:py-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-[#faf7f2] sm:h-11 sm:w-11">
                  <Image src={item.icon} alt="" width={22} height={22} className="h-5 w-5 object-contain" />
                </span>
                <p className="mt-2.5 text-[10px] font-semibold leading-tight text-foreground sm:text-[11px]">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="pointer-events-none relative min-h-[10rem] lg:min-h-full">
          <div className="absolute right-0 top-0 rounded-2xl border border-white/12 bg-[#141414]/92 px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-sm sm:right-2 md:top-2">
            <Image
              src={business.navLogo}
              alt=""
              width={200}
              height={68}
              className="h-11 w-auto max-w-[156px] object-contain md:h-[3.25rem]"
            />
          </div>
          <p className="contact-script-tagline absolute bottom-0 right-0 sm:bottom-2 sm:right-2">
            {content.scriptTagline}
          </p>
        </div>
      </div>
    </section>
  );
}
