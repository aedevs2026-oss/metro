import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { branches } from "@/data/business";
import { contactMap } from "@/data/contact";

export default function ContactMapSection() {
  const branch = branches[0];
  if (!branch) return null;

  return (
    <section className="bg-[#f7f3f0] pb-14 md:pb-20 pt-2 md:pt-0">
      <div className="container">
        <div className="overflow-hidden rounded-2xl border border-[#e8e2da] bg-white shadow-[0_18px_56px_rgba(17,24,39,0.08)]">
          <div className="grid lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
            <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10 xl:p-12">
              <p className="section-eyebrow text-accent-dark">{contactMap.eyebrow}</p>
              <h2 className="home-h2 mt-3 text-foreground">{contactMap.title}</h2>
              <p className="home-body mt-4 text-body">{contactMap.description}</p>
              <p className="mt-2 text-sm font-medium text-accent">{branch.landmark}</p>
              <Link
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-primary mt-7 inline-flex w-fit text-sm"
              >
                Open in Google Maps
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="relative min-h-[280px] border-t border-[#e8e2da] lg:min-h-[400px] lg:border-t-0 lg:border-l">
              <iframe
                title={`Map of ${branch.name}`}
                src={branch.embedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute bottom-5 right-5 z-10 max-w-[240px] rounded-xl border border-[#e8e2da] bg-white p-3.5 shadow-lg sm:bottom-6 sm:right-6">
                <p className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {branch.name}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-body">
                  {branch.lines.slice(0, 2).join(" ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}