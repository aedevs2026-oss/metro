import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { branches, business } from "@/data/business";
import { formatPhone, telHref } from "@/lib/format";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

export default function AboutVisitShowroom({ section }) {
  const branch = branches[0];
  if (!branch) return null;

  return (
    <section className="metro-about-visit py-16 md:py-20 lg:py-24">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)_minmax(0,1fr)] lg:gap-6 xl:gap-10">
          <AnimateIn>
            <p className="section-eyebrow text-accent-dark">{section.eyebrow}</p>
            <h2 className="home-h2 mt-3 text-foreground">{section.title}</h2>
            <p className="home-body mt-4 max-w-md text-body">{section.description}</p>
            <Link
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-primary mt-7 inline-flex"
            >
              Get Directions
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </AnimateIn>

          <AnimateIn delay={0.06}>
            <article className="metro-about-address-card rounded-[1.6rem] border border-white/80 bg-white/75 p-6 shadow-[0_16px_48px_rgba(17,24,39,0.09)] backdrop-blur-xl md:p-7">
              <h3 className="flex items-start gap-2 font-heading text-base font-semibold text-foreground md:text-lg">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                {branch.name}
              </h3>
              <address className="mt-3 not-italic text-sm leading-relaxed text-body">
                {branch.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="mt-2 block font-medium text-accent">{branch.landmark}</span>
              </address>
              <p className="mt-4 flex items-start gap-2 text-sm text-body">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                {business.hours}
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground">
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                <a href={telHref(business.primaryPhone)} className="hover:text-accent">
                  +91 {formatPhone(business.primaryPhone)}
                </a>
              </p>
            </article>
          </AnimateIn>

          <AnimateIn delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_56px_rgba(17,24,39,0.12)] lg:aspect-auto lg:min-h-[280px]">
            <Image
              src={section.image}
              alt="Metro Furniture showroom interior"
              fill
              quality={HOME_PHOTO_QUALITY}
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
