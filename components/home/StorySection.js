import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import AnimateIn from "@/components/AnimateIn";
import { business } from "@/data/business";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

export default function StorySection({ story }) {
  if (!story) return null;

  const slides = story.slides?.length ? story.slides : ["01", "02", "03"];
  const activeSlide = story.activeSlide ?? 0;

  return (
    <section className="relative overflow-hidden home-section-cream">
      <div className="relative min-h-[520px] md:min-h-[580px] lg:min-h-[640px]">
        <Image
          src={story.image}
          alt="Metro Furniture — crafted living spaces"
          fill
          quality={HOME_PHOTO_QUALITY}
          sizes="100vw"
          className="object-cover object-[center_45%] lg:object-[40%_center]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-[#f7f3f0]/20 lg:to-[#f7f3f0]/40"
          aria-hidden
        />

        <p
          className="pointer-events-none absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 text-[10px] font-medium uppercase tracking-[0.45em] text-white/85 [writing-mode:vertical-rl] sm:left-5 md:block lg:left-8 lg:text-[11px]"
          aria-hidden
        >
          {business.name}
        </p>

        <div className="relative flex min-h-[520px] flex-col justify-end md:min-h-[580px] lg:min-h-[640px] lg:justify-center">
          <AnimateIn className="ml-auto w-full lg:w-[min(100%,520px)] xl:w-[min(46%,560px)]">
            <div className="home-story-panel relative flex min-h-[420px] flex-col justify-center rounded-t-[2rem] border border-white/50 bg-[#f7f3f0]/88 px-6 py-10 shadow-[0_24px_80px_rgba(17,24,39,0.12)] backdrop-blur-xl sm:px-10 sm:py-12 lg:min-h-[560px] lg:rounded-l-[3rem] lg:rounded-tr-none lg:px-12 lg:py-14 xl:px-16">
              {story.eyebrow ? (
                <p className="section-eyebrow text-body/90">{story.eyebrow}</p>
              ) : null}
              <h2
                className={`home-story-title whitespace-pre-line text-foreground ${story.eyebrow ? "mt-4" : ""}`}
              >
                {story.title}
              </h2>
              <p className="home-body mt-5 max-w-md text-body">{story.description}</p>
              <Link href={story.cta.href} className="btn-pill-primary mt-8 inline-flex w-fit">
                {story.cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>

              <div
                className="mt-10 flex items-center justify-end gap-2 lg:absolute lg:bottom-10 lg:right-12 xl:bottom-12 xl:right-16"
                aria-label="Story highlights"
              >
                {slides.map((label, index) => (
                  <span
                    key={label}
                    className={`inline-flex min-w-[2.25rem] items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold tabular-nums tracking-wide ${
                      index === activeSlide
                        ? "border border-foreground/20 bg-white/70 text-foreground"
                        : "border border-transparent text-body/55"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
