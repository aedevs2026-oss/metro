"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Armchair,
  Bath,
  BedDouble,
  Lightbulb,
  Sofa,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { shopNavItems } from "@/data/shop";

const ICONS = {
  "corner-sofas": Sofa,
  dining: UtensilsCrossed,
  mattresses: BedDouble,
  chandeliers: Sparkles,
  "wall-lights": Lightbulb,
  chairs: Armchair,
  sofas: Sofa,
  "bathroom-fittings": Bath,
};

function resolveActiveSlug(pathname) {
  const match = pathname.match(/^\/shop\/([^/]+)/);
  return match?.[1] || null;
}

export default function ShopCategoryNav() {
  const pathname = usePathname();
  const activeSlug = resolveActiveSlug(pathname);

  return (
    <nav
      className="border-b border-border/70 bg-muted/50"
      aria-label="Shop categories"
    >
      <div className="container">
        <ul className="flex gap-1 overflow-x-auto py-3 no-scrollbar md:justify-center md:gap-2">
          {shopNavItems.map((item) => {
            const Icon = ICONS[item.slug] || Sofa;
            const active = activeSlug === item.slug;
            return (
              <li key={item.slug} className="shrink-0">
                <Link
                  href={`/shop/${item.slug}`}
                  className={`flex min-w-[108px] flex-col items-center gap-2 rounded-2xl px-3 py-2.5 transition md:min-w-[120px] ${
                    active
                      ? "bg-accent text-white shadow-md shadow-accent/25"
                      : "text-body hover:bg-surface hover:text-foreground"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                      active
                        ? "border-white/30 bg-white/15"
                        : "border-border/80 bg-surface"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="text-center text-[11px] font-semibold leading-tight md:text-xs">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
