import Image from "next/image";
import AnimateIn from "@/components/AnimateIn";
import { BadgeCheck, CircleDollarSign, Headset, Palette } from "lucide-react";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

const icons = { curated: BadgeCheck, pricing: CircleDollarSign, custom: Palette, support: Headset };

export default function AboutWhyChoose({ section }) {
  return (
    <section className="metro-about-why border-y border-[#e8e2da]/70 py-16 md:py-20 lg:py-24">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div>
            <p className="section-eyebrow">Why Metro Furniture</p>
            <h2 className="home-h2 mt-3 text-foreground">{section.title}</h2>
            {section.description ? <p className="home-body mt-4 max-w-lg text-body">{section.description}</p> : null}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {section.items.map((item, i) => {
                const Icon = icons[item.id] || BadgeCheck;
                return (
                  <AnimateIn key={item.id} delay={i * .05}>
                    <li className="metro-about-reason h-full rounded-[1.25rem] border border-white/80 bg-white/65 p-4 shadow-[0_10px_28px_rgba(34,26,14,.04)] backdrop-blur-lg sm:p-5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(185,142,75,.24)] bg-gradient-to-br from-[#fff8e9] to-[#e9d5ad] text-[#805a2a]"><Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden="true" /></span>
                      <h3 className="mt-3 font-heading text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-body">{item.description}</p>
                    </li>
                  </AnimateIn>
                );
              })}
            </ul>
          </div>
          <AnimateIn delay={.08} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="metro-about-feature-photo relative aspect-[3/4] overflow-hidden rounded-[1.75rem] shadow-[0_24px_70px_rgba(17,24,39,.14)]">
              <Image src={section.image} alt="Premium furniture in a warm, contemporary interior" fill quality={HOME_PHOTO_QUALITY} sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover" />
              <div className="absolute inset-x-4 bottom-4 z-[2] rounded-2xl border border-white/35 bg-[#17130e]/72 p-4 text-white backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#e9cb8f]">Made for living</p>
                <p className="mt-2 font-heading text-xl font-medium leading-tight sm:text-2xl">{section.bannerText.replace("\n", " ")}</p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
