import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, GitCompareArrows, Heart, MessageCircle, Palette, Ruler } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

const tools = [
  {
    title: "Measure your room",
    description: "Check sofa dimensions, doorway clearance and floor space before choosing.",
    href: "/room-measurement",
    label: "Room fit assistant",
    icon: Ruler,
    image: "/homepage/rooms/living-room.webp",
    tone: "measurement",
  },
  {
    title: "Make it yours",
    description: "Explore fabric, colour, size and configuration options for your furniture.",
    href: "/customize",
    label: "Furniture customizer",
    icon: Palette,
    image: "/homepage/products/luxury-fabric-sofa.webp",
    tone: "customize",
  },
  {
    title: "Visit our showroom",
    description: "Request a visit to explore furniture and discuss your space with our team.",
    href: "/book-showroom",
    label: "Personal showroom visit",
    icon: CalendarDays,
    image: "/homepage/showroom/luxury-showroom-interior.webp",
    tone: "showroom",
  },
];

export default function CustomerToolsSection() {
  return (
    <section className="metro-tools-section relative overflow-hidden py-16 sm:py-20 lg:py-24" aria-labelledby="metro-tools-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container relative">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Thoughtful tools for your home</p>
            <h2 id="metro-tools-title" className="mt-3 font-heading text-3xl font-medium leading-tight tracking-[-.035em] text-foreground sm:text-4xl lg:text-5xl">
              Feel confident before you choose.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-body sm:text-base">
              Explore ideas, check the fit and personalise your favourites before speaking with the Metro Furniture team.
            </p>
          </div>
          <Link href="/shop" className="metro-text-link inline-flex w-fit items-center gap-2 text-sm font-semibold">
            Explore all furniture <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="home-tools-grid grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <AnimateIn key={tool.title} delay={index * 0.07}>
                <Link href={tool.href} className={`metro-tool-card home-tool-card metro-tool-card--${tool.tone} group relative flex min-h-[370px] flex-col overflow-hidden rounded-[1.6rem] border border-white/20 shadow-[0_20px_60px_rgba(24,18,11,.14)] sm:min-h-[410px]`}>
                  <Image src={tool.image} alt="" fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.045]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100e0b]/95 via-[#17130e]/40 to-black/5" aria-hidden="true" />
                  <div className="home-tool-card-top relative z-10 flex items-start justify-between p-5 sm:p-6">
                    <span className="metro-tool-icon flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-black/25 text-[#f0d8a6] backdrop-blur-xl"><Icon className="h-5 w-5" strokeWidth={1.7} /></span>
                    <span className="home-tool-card-label rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.15em] text-white/90 backdrop-blur-md">{tool.label}</span>
                  </div>
                  <div className="home-tool-card-copy relative z-10 mt-auto p-5 pt-20 text-white sm:p-6 sm:pt-24">
                    <h3 className="home-tool-card-title font-heading text-2xl font-medium tracking-[-.025em] sm:text-3xl">{tool.title}</h3>
                    <p className="home-tool-card-description mt-3 max-w-sm text-sm leading-6 text-white/75">{tool.description}</p>
                    <span className="home-tool-card-action mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f2d9a7]">Get started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </AnimateIn>
            );
          })}
        </div>

        <div className="metro-tools-utility mt-5 grid grid-cols-2 gap-3 rounded-[1.4rem] border border-[rgba(185,142,75,.22)] bg-white/65 p-3 shadow-[0_12px_36px_rgba(37,29,17,.045)] backdrop-blur-xl sm:grid-cols-3 sm:p-4">
          <UtilityLink href="/wishlist" icon={Heart} title="Saved favourites" text="Keep your shortlist" />
          <UtilityLink href="/compare" icon={GitCompareArrows} title="Compare products" text="Choose with clarity" />
          <UtilityLink href="/contact" icon={MessageCircle} title="Talk to our team" text="Get personal guidance" className="col-span-2 sm:col-span-1" />
        </div>
      </div>
    </section>
  );
}

function UtilityLink({ href, icon: Icon, title, text, className = "" }) {
  return (
    <Link href={href} className={`group flex items-center gap-3 rounded-xl p-3 transition hover:bg-white hover:shadow-sm sm:px-4 ${className}`}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[rgba(185,142,75,.25)] bg-[#f8f1e5] text-[#91672f]"><Icon className="h-4 w-4" /></span>
      <span className="min-w-0"><span className="block text-xs font-semibold text-foreground sm:text-sm">{title}</span><span className="mt-0.5 block text-[10px] text-body sm:text-xs">{text}</span></span>
    </Link>
  );
}
