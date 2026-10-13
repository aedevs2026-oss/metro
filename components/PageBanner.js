import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export default function PageBanner({
  title,
  description,
  breadcrumbs = [],
  compact = false,
}) {
  return (
    <section className={`metro-page-banner relative isolate overflow-hidden border-b border-[rgba(185,142,75,.2)] ${compact ? "is-compact" : ""}`}>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_100%_at_80%_0%,rgba(217,189,131,.24),transparent_62%),linear-gradient(120deg,#fffdf9_0%,#f8f1e7_52%,#f2e8d8_100%)]" />
      <div className="pointer-events-none absolute right-[-7rem] top-[-10rem] -z-10 h-[22rem] w-[22rem] rounded-full border border-[rgba(185,142,75,.18)]" />
      <div className="pointer-events-none absolute right-[-3rem] top-[-6rem] -z-10 h-[14rem] w-[14rem] rounded-full border border-[rgba(185,142,75,.15)]" />
      <div className={`container relative ${compact ? "py-8 md:py-10" : "py-10 md:py-16 lg:py-[4.5rem]"}`}>
        {breadcrumbs.length ? (
          <div className="mb-5 text-sm text-stone-500">
            <Breadcrumb items={breadcrumbs} />
          </div>
        ) : null}
        <div className="max-w-4xl metro-luxe-enter">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(185,142,75,.28)] bg-white/60 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[.19em] text-[#8f642b] shadow-sm backdrop-blur-md sm:text-[11px]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Metro Furniture · Thoughtfully Curated
          </p>
          <h1 className="max-w-4xl font-heading text-3xl font-semibold leading-[1.04] tracking-[-.035em] text-[#211e18] md:text-5xl lg:text-[3.65rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 md:mt-5 md:text-base md:leading-8">
              {description}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#ead3a0,#c49a56_58%,#a97834)] px-5 py-3 text-sm font-semibold text-[#211a10] shadow-[0_9px_24px_rgba(168,124,54,.2),inset_0_1px_0_rgba(255,255,255,.55)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(168,124,54,.27)]">
              Explore Furniture <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/book-showroom" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#b98e4b]/40 bg-white/55 px-5 py-3 text-sm font-semibold text-[#3d3324] backdrop-blur-md transition hover:border-[#b98e4b]/70 hover:bg-white/85">
              Visit Our Showroom
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
