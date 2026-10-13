"use client";

import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";

const TABS = [
  { id: "details", label: "Details" },
  { id: "specs", label: "Specifications" },
  { id: "features", label: "Features" },
  { id: "care", label: "Care & Maintenance" },
  { id: "delivery", label: "Delivery & Installation" },
];

export default function ProductDetailsTabs({ product }) {
  const [tab, setTab] = useState("details");

  const visibleTabs = TABS.filter((t) => {
    if (t.id === "specs") return product.specs?.length;
    if (t.id === "features") return product.features?.length;
    return true;
  });

  const detailsTitle =
    product.category?.toLowerCase().includes("sofa") &&
    !product.name.toLowerCase().includes("sofa")
      ? `${product.name} Sofa`
      : product.name;

  return (
    <section className="product-tabs-panel border-t border-[#e8ddd0] py-10 md:py-14">
      <div className="container">
        <div
          className="flex gap-0 overflow-x-auto border-b border-[#e0d4c4] no-scrollbar"
          role="tablist"
          aria-label="Product information"
        >
          {visibleTabs.map((item) => {
            const selected = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(item.id)}
                className={`relative shrink-0 px-4 py-3.5 text-sm font-semibold transition md:px-5 ${
                  selected ? "text-accent-dark" : "text-body hover:text-foreground"
                }`}
              >
                {item.label}
                {selected ? (
                  <span className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-accent md:inset-x-4" />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="animate-fade-in" role="tabpanel">
            {tab === "details" ? (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-semibold text-foreground">{detailsTitle}</h2>
                <p className="text-[15px] leading-relaxed text-body">{product.description}</p>
                {product.features?.length ? (
                  <ul className="space-y-2.5">
                    {product.features.slice(0, 7).map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-body">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            {tab === "specs" && product.specs?.length ? (
              <dl className="divide-y divide-[#e8ddd0] overflow-hidden rounded-md border border-[#e8ddd0]">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex gap-4 bg-white px-4 py-3 even:bg-[#faf6f0]">
                    <dt className="w-2/5 shrink-0 text-sm text-body">{spec.label}</dt>
                    <dd className="text-sm font-medium text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {tab === "features" && product.features?.length ? (
              <ul className="space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-body">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    {feature}
                  </li>
                ))}
              </ul>
            ) : null}

            {tab === "care" ? (
              <ul className="space-y-3 text-sm leading-relaxed text-body">
                <li>Wipe with a soft, dry cloth. Avoid harsh chemicals on fabric and wood finishes.</li>
                <li>Rotate cushions periodically for even wear.</li>
                <li>Keep away from direct sunlight to preserve upholstery colour.</li>
                {product.upholstery ? <li>Upholstery: {product.upholstery}</li> : null}
              </ul>
            ) : null}

            {tab === "delivery" ? (
              <ul className="space-y-3 text-sm leading-relaxed text-body">
                <li>Delivery across Dharmapuri and nearby towns — charges depend on location and item size.</li>
                <li>Assembly/installation available for sofas and large items; confirm when ordering.</li>
                <li>Showroom pickup available on Salem Main Road, Senthil Nagar.</li>
                <li>No online payment — confirm final price and delivery on WhatsApp with our team.</li>
              </ul>
            ) : null}
          </div>

          <div className="relative overflow-hidden rounded-md border border-[#e5d9c8] bg-[#ebe3d8]">
            <div className="relative aspect-[4/3]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <p className="font-heading text-xl font-semibold md:text-2xl">Designed for Modern Homes</p>
                <p className="mt-2 text-sm text-white/85">Comfort • Style • Functionality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
