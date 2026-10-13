"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

export default function DiscoverBySpace({ section }) {
  const featured = section.rooms.find((r) => r.featured);
  const others = section.rooms.filter((r) => !r.featured);
  const [bedroom, dining, decor, office] = others;
  const eyebrowHref = section.eyebrowHref || "/rooms";

  return (
    <section id="discover-spaces" className="bg-white py-16 md:py-20 lg:py-24">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,32%)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:gap-14">
          <AnimateIn className="lg:max-w-[20rem] xl:max-w-[22rem]">
            {section.eyebrow ? (
              <Link
                href={eyebrowHref}
                className="section-eyebrow inline-flex items-center gap-0.5 font-heading text-accent-dark transition hover:text-accent"
              >
                {section.eyebrow}
                <ChevronRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden />
              </Link>
            ) : null}
            <h2
              className={`home-h2 whitespace-pre-line leading-[1.14] text-foreground ${
                section.eyebrow ? "mt-4" : ""
              }`}
            >
              {section.title}
            </h2>
            {section.description ? (
              <p className="home-body mt-5 max-w-[18rem] leading-relaxed text-body">{section.description}</p>
            ) : null}
            {section.cta ? (
              <Link href={section.cta.href} className="btn-pill-primary mt-8 inline-flex text-sm">
                {section.cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            ) : null}
          </AnimateIn>

          <div className="home-discover-mosaic flex min-w-0 flex-col gap-3.5 sm:gap-4">
            <div className="home-discover-row flex min-h-[200px] flex-col gap-3.5 sm:min-h-[220px] sm:flex-row sm:gap-4 lg:min-h-[240px]">
              {featured ? (
                <AnimateIn className="min-h-[200px] min-w-0 flex-[6] sm:min-h-[220px] lg:min-h-[240px]">
                  <RoomCard room={featured} variant="living" />
                </AnimateIn>
              ) : null}
              {bedroom ? (
                <AnimateIn
                  className="min-h-[200px] min-w-0 flex-[4] sm:min-h-[220px] lg:min-h-[240px]"
                  delay={0.05}
                >
                  <RoomCard room={bedroom} variant="bedroom" />
                </AnimateIn>
              ) : null}
            </div>

            <div className="home-discover-row flex min-h-[180px] flex-col gap-3.5 sm:min-h-[200px] sm:flex-row sm:gap-4 lg:min-h-[210px]">
              {dining ? (
                <AnimateIn className="min-h-[180px] min-w-0 flex-[33] sm:min-h-[200px] lg:min-h-[210px]" delay={0.08}>
                  <RoomCard room={dining} variant="compact" />
                </AnimateIn>
              ) : null}
              {decor ? (
                <AnimateIn className="min-h-[180px] min-w-0 flex-[27] sm:min-h-[200px] lg:min-h-[210px]" delay={0.1}>
                  <RoomCard room={decor} variant="compact" />
                </AnimateIn>
              ) : null}
              {office ? (
                <AnimateIn className="min-h-[180px] min-w-0 flex-[40] sm:min-h-[200px] lg:min-h-[210px]" delay={0.12}>
                  <RoomCard room={office} variant="compact" />
                </AnimateIn>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoomCard({ room, variant = "compact" }) {
  const focus = room.imagePosition || "50% 50%";
  const titleClass =
    variant === "living"
      ? "text-xl md:text-[1.35rem]"
      : variant === "bedroom"
        ? "text-lg md:text-xl"
        : "text-base md:text-lg";

  return (
    <Link
      href={room.href}
      className="home-discover-card group relative block h-full min-h-[inherit] w-full overflow-hidden rounded-[14px] shadow-[0_4px_20px_rgba(17,24,39,0.08)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(17,24,39,0.12)]"
    >
      {room.image ? (
        <Image
          src={room.image}
          alt={room.name}
          fill
          quality={HOME_PHOTO_QUALITY}
          sizes={
            variant === "living"
              ? "(max-width: 1024px) 100vw, 38vw"
              : variant === "bedroom"
                ? "(max-width: 1024px) 100vw, 22vw"
                : "(max-width: 1024px) 100vw, 18vw"
          }
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          style={{ objectPosition: focus }}
        />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-black/5"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <h3 className={`font-heading font-semibold leading-tight text-white ${titleClass}`}>{room.name}</h3>
        <p className="mt-1.5 flex items-center gap-1 text-[0.8125rem] text-white/90 md:text-sm">
          <span className="font-normal">{room.items}</span>
          <ArrowRight
            className="h-3.5 w-3.5 shrink-0 text-accent transition group-hover:translate-x-0.5"
            aria-hidden
          />
        </p>
      </div>
    </Link>
  );
}
