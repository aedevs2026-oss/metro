import { Award, Gem, Headphones, Store } from "lucide-react";
import { shopValueItems } from "@/data/shop";

const ICONS = {
  quality: Award,
  custom: Gem,
  expert: Headphones,
  showroom: Store,
};

export default function ShopValueBar() {
  return (
    <section className="border-y border-border/60 bg-muted/40 py-10 md:py-12">
      <div className="container">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {shopValueItems.map((item) => {
            const Icon = ICONS[item.id] || Award;
            return (
              <li key={item.id} className="flex gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent/45 bg-surface"
                  aria-hidden
                >
                  <Icon className="h-5 w-5 text-accent-dark" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-heading text-base font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-body">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
