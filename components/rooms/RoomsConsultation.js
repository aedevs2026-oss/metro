import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, LayoutTemplate, Sparkles } from "lucide-react";
import { roomsConsultation } from "@/data/rooms";

const PERK_ICONS = {
  design: Sparkles,
  plan: LayoutTemplate,
  guide: Compass,
};

export default function RoomsConsultation() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[380px] md:min-h-[420px]">
        <Image
          src={roomsConsultation.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" aria-hidden />
        <div className="container relative flex min-h-[380px] flex-col justify-center py-16 md:min-h-[420px] md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-xl text-white">
              <p className="section-eyebrow text-accent-light">{roomsConsultation.eyebrow}</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
                {roomsConsultation.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">
                {roomsConsultation.description}
              </p>
              <Link
                href={roomsConsultation.cta.href}
                className="btn-pill-primary mt-8 inline-flex"
              >
                {roomsConsultation.cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <ul className="flex flex-wrap gap-3 lg:max-w-md lg:justify-end">
              {roomsConsultation.perks.map((perk) => {
                const Icon = PERK_ICONS[perk.id] || Sparkles;
                return (
                  <li
                    key={perk.id}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm"
                  >
                    <Icon className="h-4 w-4 text-accent" aria-hidden />
                    {perk.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
