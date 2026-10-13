import { Box, Layers, Shield, Sparkles, Wrench } from "lucide-react";
import { getProductRibbonItems } from "@/lib/product-highlights";

const ICONS = [Layers, Box, Sparkles, Shield, Wrench];

export default function ProductFeatureRibbon({ product }) {
  const items = getProductRibbonItems(product);

  return (
    <section className="product-feature-ribbon py-7 md:py-9">
      <div className="container">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={item.id} className="flex flex-col items-center text-center lg:px-2">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent/50 bg-[#faf6f0]"
                  aria-hidden
                >
                  <Icon className="h-5 w-5 text-accent-dark" strokeWidth={1.5} />
                </span>
                <p className="mt-3 text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-0.5 text-xs text-body">{item.sub}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
