import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { branches, business } from "@/data/business";
import AnimateIn from "@/components/AnimateIn";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

export default function ShowroomSection({ promo }) {
  const branch = branches[0];
  const sectionBg = promo.backgroundImage || promo.exteriorImage;
  const interiorImages = (promo.interiorImages || []).filter(Boolean).slice(0, 2);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-16 text-white md:py-20 lg:py-24">
      {sectionBg ? (
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={sectionBg}
            alt=""
            fill
            quality={HOME_PHOTO_QUALITY}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d]/94 via-[#0a0b0d]/82 to-[#0a0b0d]/55" />
        </div>
      ) : null}

      <div className="container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <AnimateIn>
            <p className="section-eyebrow text-accent-light">{promo.eyebrow || "Visit Our Showroom"}</p>
            <h2 className="home-h2 mt-3 text-white">{promo.title}</h2>
            <p className="home-body mt-4 max-w-md text-white/75">{promo.description}</p>
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5">
              {promo.perks.map((perk) => (
                <li key={perk.id} className="flex items-center gap-3 text-sm text-white/90">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-white/[0.06]">
                    <Image src={perk.icon} alt="" width={22} height={22} className="h-5 w-5 object-contain" />
                  </span>
                  <span className="font-medium leading-snug">{perk.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={branch?.mapUrl || "/contact"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-primary inline-flex"
              >
                Get Directions
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/contact" className="btn-pill-outline-light">
                Contact Us
              </Link>
              <Link href="/book-showroom" className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/55 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10">
                <CalendarDays className="h-4 w-4 text-accent-light" aria-hidden />
                Book a Visit
              </Link>
            </div>
            <p className="mt-5 text-xs text-white/50">{business.hours}</p>
          </AnimateIn>

          {interiorImages.length ? (
            <AnimateIn delay={0.08} className="flex flex-col gap-4 sm:ml-auto sm:max-w-md lg:max-w-none">
              {interiorImages.map((src, index) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.45)] ${
                    index === 0 ? "aspect-[16/10]" : "aspect-[16/11] sm:ml-8"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${business.name} showroom interior ${index + 1}`}
                    fill
                    quality={HOME_PHOTO_QUALITY}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </AnimateIn>
          ) : null}
        </div>
      </div>
    </section>
  );
}
