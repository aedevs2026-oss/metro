import AnimateIn from "@/components/AnimateIn";
import { BadgeCheck, Boxes, Headset, Palette } from "lucide-react";

const icons = [BadgeCheck, Boxes, Headset, Palette];

export default function WhyMetro({ items }) {
  return (
    <section className="metro-why-ribbon border-y border-[rgba(185,142,75,.18)] py-12 md:py-16">
      <div className="container">
        <ul className="grid grid-cols-2 gap-7 md:grid-cols-4 md:gap-6">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <AnimateIn key={item.id} delay={i * .05}>
                <li className="metro-why-item flex flex-col items-center text-center">
                  <span className="flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-[1.35rem] border border-[rgba(185,142,75,.27)] bg-gradient-to-br from-[#fff8e9] to-[#e9d5ad] text-[#805a2a] shadow-[0_10px_26px_rgba(128,90,42,.1)]">
                    <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <p className="mt-3.5 text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-xs text-body">{item.sub}</p>
                </li>
              </AnimateIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
