import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { roomsHero } from "@/data/rooms";

export default function RoomsHero() {
  return (
    <section className="relative isolate min-h-[min(88vh,760px)] overflow-hidden bg-primary-dark">
      <Image
        src={roomsHero.image}
        alt="Luxury living room furniture"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden />
      <div className="hero-overlay absolute inset-0" aria-hidden />

      <div className="container relative z-10 flex min-h-[min(88vh,760px)] flex-col justify-center py-24 md:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl text-white">
            <p className="section-eyebrow text-accent-light">{roomsHero.eyebrow}</p>
            <h1 className="mt-4 font-heading text-4xl font-semibold leading-[1.08] md:text-5xl lg:text-[3.25rem]">
              {roomsHero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              {roomsHero.description}
            </p>
            <Link href={roomsHero.cta.href} className="btn-pill-primary mt-8 inline-flex">
              {roomsHero.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <p
            className="hidden max-w-xs text-right font-heading text-2xl leading-snug text-accent-light/95 lg:block lg:text-3xl"
            style={{ fontStyle: "italic" }}
          >
            {roomsHero.accentScript}
          </p>
        </div>
      </div>
    </section>
  );
}
