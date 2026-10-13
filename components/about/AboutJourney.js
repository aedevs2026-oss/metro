import Image from "next/image";
import AnimateIn from "@/components/AnimateIn";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";
import { BadgeCheck, Boxes, Headset, House } from "lucide-react";

const pillarIcons = { quality: BadgeCheck, range: Boxes, expert: Headset, trust: House };

export default function AboutJourney({ section }) {
  return (
    <section className="metro-about-journey py-16 md:py-20 lg:py-24">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <AnimateIn className="order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-4">
              <div className="metro-about-photo relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[0_24px_70px_rgba(17,24,39,0.15)]">
                <Image
                  src={section.exteriorImage}
                  alt="Metro Furniture showroom exterior"
                  fill
                  quality={HOME_PHOTO_QUALITY}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {section.galleryThumbs.map((src, index) => (
                  <div
                    key={src}
                    className="metro-about-thumb relative aspect-square overflow-hidden rounded-2xl border border-white/80 shadow-sm"
                  >
                    <Image
                      src={src}
                      alt={`Showroom display ${index + 1}`}
                      fill
                      quality={HOME_PHOTO_QUALITY}
                      sizes="(max-width: 1024px) 30vw, 15vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          <AnimateIn className="order-1 lg:order-2" delay={0.08}>
            <p className="section-eyebrow text-accent-dark">{section.eyebrow}</p>
            <h2 className="home-h2 mt-3 text-foreground">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="home-body mt-5 text-body">
                {paragraph}
              </p>
            ))}

            <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-4">
              {section.pillars.map((item) => {
                const Icon = pillarIcons[item.id] || BadgeCheck;
                return (
                  <li key={item.id} className="metro-about-pillar text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(185,142,75,.24)] bg-gradient-to-br from-[#fff8e9] to-[#e9d5ad] text-[#805a2a] shadow-sm sm:h-[3.75rem] sm:w-[3.75rem]">
                      <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <p className="mt-3 text-xs font-semibold text-foreground sm:text-sm">{item.title}</p>
                    {item.description ? <p className="mt-1 text-[10px] leading-snug text-body sm:text-[11px]">{item.description}</p> : null}
                  </li>
                );
              })}
            </ul>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
