import Image from "next/image";
import { siteHeroImage } from "@/data/business";
import { shopHero } from "@/data/shop";

export default function ShopHero() {
  const bg = siteHeroImage;

  return (
    <section className="relative isolate min-h-[320px] overflow-hidden bg-primary-dark md:min-h-[380px]">
      <Image src={bg} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/60" aria-hidden />
      <div className="hero-overlay absolute inset-0" aria-hidden />

      <div className="container relative z-10 py-16 text-center md:py-20">
        <p className="section-eyebrow text-accent-light">{shopHero.eyebrow}</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {shopHero.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
          {shopHero.description}
        </p>
        <p
          className="mt-6 hidden font-heading text-2xl text-accent-light/90 md:block md:text-3xl"
          style={{ fontStyle: "italic" }}
        >
          {shopHero.accentScript}
        </p>
      </div>
    </section>
  );
}
