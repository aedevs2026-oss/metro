"use client";

import AnimateIn from "@/components/AnimateIn";
import { BadgeCheck, Boxes, Headset, House, Palette, Truck } from "lucide-react";

const iconById = {
  range: Boxes,
  custom: Palette,
  expert: Headset,
  materials: BadgeCheck,
  showroom: House,
  support: Truck,
};

export default function ServiceHighlights({ items }) {
  return (
    <section className="metro-service-ribbon border-y border-[rgba(185,142,75,.2)] py-7 sm:py-9" aria-label="Metro Furniture services">
      <div className="container">
        <ul className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-5">
          {items.map((item, i) => {
            const Icon = iconById[item.id] || BadgeCheck;
            return (
              <AnimateIn key={item.id} delay={i * .035}>
                <li className="metro-service-item flex h-full items-center gap-3 rounded-2xl border border-white/65 bg-white/55 px-3 py-3 backdrop-blur-xl sm:flex-col sm:justify-center sm:gap-3 sm:px-2 sm:py-4 sm:text-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[rgba(185,142,75,.28)] bg-gradient-to-br from-[#fff7e6] to-[#e7d1a5] text-[#7c5628] shadow-[0_6px_16px_rgba(117,83,34,.10)] sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden="true" />
                  </span>
                  <p className="text-[11px] font-semibold leading-snug text-[#302a20] sm:max-w-[9rem] sm:text-xs">{item.title}</p>
                </li>
              </AnimateIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
