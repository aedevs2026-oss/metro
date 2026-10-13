import Image from "next/image";
import { Quote } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

export default function AboutMissionVision({ section }) {
  return (
    <section className="metro-about-mission relative overflow-hidden py-20 md:py-28">
      <Image
        src={section.image}
        alt=""
        fill
        quality={HOME_PHOTO_QUALITY}
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0b09]/90 via-[#15120d]/86 to-[#0a0a09]/95" aria-hidden />

      <div className="container relative z-10">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <AnimateIn className="md:border-r md:border-accent/35 md:pr-10 lg:pr-14">
            <Quote className="h-10 w-10 text-accent" aria-hidden />
            <h2 className="home-h2 mt-4 text-white">{section.mission.title}</h2>
            <p className="home-body mt-5 max-w-lg font-heading text-white/85 md:text-[1.02rem]">
              {section.mission.text}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.08} className="md:pl-2 lg:pl-4">
            <h2 className="home-h2 text-white">{section.vision.title}</h2>
            <p className="home-body mt-5 max-w-lg font-heading text-white/85 md:text-[1.02rem]">
              {section.vision.text}
            </p>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
