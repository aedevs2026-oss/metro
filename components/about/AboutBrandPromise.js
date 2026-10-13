import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, Handshake, Sparkles } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

const principles = [
  { icon: Compass, number: "01", title: "Find your style", text: "Explore curated designs for living rooms, bedrooms, dining spaces and everyday work." },
  { icon: Sparkles, number: "02", title: "Make it personal", text: "Discuss fabric, finish, dimensions and configuration options for your needs." },
  { icon: Handshake, number: "03", title: "Choose with confidence", text: "Get practical guidance from our team before confirming product availability and price." },
];

export default function AboutBrandPromise() {
  return (
    <section className="metro-about-promise relative overflow-hidden py-16 sm:py-20 lg:py-24" aria-labelledby="about-promise-title">
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-start lg:gap-16">
          <AnimateIn>
            <p className="section-eyebrow">The Metro experience</p>
            <h2 id="about-promise-title" className="mt-3 max-w-xl font-heading text-3xl font-medium leading-tight tracking-[-.04em] text-foreground sm:text-4xl lg:text-5xl">
              Thoughtful choices. Beautiful spaces.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-body sm:text-base">
              Choosing furniture should feel inspiring, not overwhelming. We help you explore the look, understand the fit and ask the right questions—so every choice feels considered.
            </p>
            <ul className="mt-6 space-y-3">
              {["Guidance for your space and lifestyle", "Product-specific details before you decide", "A local showroom team to speak with"].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#494238]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#a77b3e]" />{item}</li>
              ))}
            </ul>
            <Link href="/book-showroom" className="btn-pill-primary mt-7 inline-flex items-center gap-2">Plan a showroom visit <ArrowRight className="h-4 w-4" /></Link>
          </AnimateIn>

          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {principles.map((item, index) => {
              const Icon = item.icon;
              return (
                <AnimateIn key={item.number} delay={index * .07}>
                  <article className="metro-about-principle h-full rounded-[1.4rem] border border-white/80 bg-white/70 p-5 shadow-[0_15px_42px_rgba(36,27,15,.055)] backdrop-blur-xl sm:p-5 lg:p-6">
                    <div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f2e3c3] to-[#e4c68c] text-[#6c4a20]"><Icon className="h-5 w-5" strokeWidth={1.7} /></span><span className="font-heading text-sm text-[#b08a51]">{item.number}</span></div>
                    <h3 className="mt-7 font-heading text-xl font-medium text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-body">{item.text}</p>
                  </article>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
