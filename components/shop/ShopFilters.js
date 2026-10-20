"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { categories } from "@/data/categories";
import {
  featureOptions,
  filterMaterials,
  priceRange,
  seatingOptions,
  styleOptions,
} from "@/data/shop";
import { collectColors, countBySubcategory } from "@/lib/shop-filters";
import { colorToHex } from "@/data/shop";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

const SOFA_CATEGORIES = new Set(["Corner Sofas", "Sofas"]);

export default function ShopFilters({ products, allProducts, categoryId }) {
  const catalog = allProducts || products;
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const material = searchParams.get("material") || "all";
  const minPrice = searchParams.get("min") ? Number(searchParams.get("min")) : priceRange.min;
  const maxPrice = searchParams.get("max") ? Number(searchParams.get("max")) : priceRange.max;
  const color = searchParams.get("color") || "all";
  const seating = searchParams.get("seating") || "all";
  const style = searchParams.get("style") || "all";
  const feature = searchParams.get("feature") || "all";
  const sub = searchParams.get("sub") || "all";
  const activeFilterCount = [
    material !== "all",
    minPrice > priceRange.min,
    maxPrice < priceRange.max,
    color !== "all",
    seating !== "all",
    style !== "all",
    feature !== "all",
    sub !== "all",
  ].filter(Boolean).length;

  const colors = useMemo(() => collectColors(products), [products]);
  const showSofaSubs =
    !categoryId || SOFA_CATEGORIES.has(categoryId);
  const sofaSubs = useMemo(
    () =>
      showSofaSubs
        ? countBySubcategory(
            products.filter((p) =>
              categoryId ? p.category === categoryId : SOFA_CATEGORIES.has(p.category)
            )
          )
        : [],
    [products, categoryId, showSofaSubs]
  );

  function updateParams(mutator) {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-expanded={mobileOpen}
        aria-controls="shop-filter-panel"
        className="mb-3 flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border border-border/70 bg-surface px-4 py-3 text-left text-sm font-semibold text-foreground shadow-sm transition hover:border-accent lg:hidden"
      >
        <span className="inline-flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-accent-dark" aria-hidden />
          Filters and categories
          {activeFilterCount > 0 ? (
            <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-accent px-1.5 py-0.5 text-[11px] text-white">
              {activeFilterCount}
            </span>
          ) : null}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`} aria-hidden />
      </button>
      <aside
        id="shop-filter-panel"
        className={`${mobileOpen ? "block" : "hidden"} mb-4 grid grid-cols-1 gap-4 space-y-0 rounded-2xl border border-border/70 bg-surface p-4 shadow-sm sm:grid-cols-2 lg:sticky lg:top-28 lg:mb-0 lg:grid-cols-1 lg:gap-6 lg:p-5`}
      >
      <div>
        <h3 className="text-sm font-semibold text-foreground">Categories</h3>
        <ul className="mt-3 space-y-1">
          <li>
            <Link
              href="/shop"
              className={`block rounded-lg px-2 py-1.5 text-sm transition ${
                pathname === "/shop"
                  ? "bg-accent/15 font-semibold text-accent-dark"
                  : "text-body hover:bg-muted hover:text-foreground"
              }`}
            >
              All Products ({catalog.length})
            </Link>
          </li>
          {categories.map((cat) => {
            const count = catalog.filter((p) => p.category === cat.id).length;
            if (!count) return null;
            const href = `/shop/${cat.slug}`;
            const active = pathname === href;
            return (
              <li key={cat.id}>
                <Link
                  href={href}
                  className={`block rounded-lg px-2 py-1.5 text-sm transition ${
                    active
                      ? "bg-accent/15 font-semibold text-accent-dark"
                      : "text-body hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {cat.name} ({count})
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {showSofaSubs && sofaSubs.length ? (
        <FilterGroup title="Sofa types">
          <ul className="space-y-1">
            {sofaSubs.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() =>
                    updateParams((p) => {
                      if (item.id === "all") p.delete("sub");
                      else p.set("sub", item.id);
                    })
                  }
                  className={`w-full rounded-lg px-2 py-1.5 text-left text-sm transition ${
                    sub === item.id || (item.id === "all" && sub === "all")
                      ? "bg-accent/15 font-semibold text-accent-dark"
                      : "text-body hover:bg-muted"
                  }`}
                >
                  {item.label} ({item.count})
                </button>
              </li>
            ))}
          </ul>
        </FilterGroup>
      ) : null}

      <FilterGroup title="Price range">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-body">
            <span>₹{minPrice.toLocaleString("en-IN")}</span>
            <span>₹{maxPrice.toLocaleString("en-IN")}+</span>
          </div>
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            step={priceRange.step}
            value={maxPrice}
            onChange={(e) =>
              updateParams((p) => p.set("max", e.target.value))
            }
            className="shop-range w-full"
            aria-label="Maximum price"
          />
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            step={priceRange.step}
            value={minPrice}
            onChange={(e) =>
              updateParams((p) => p.set("min", e.target.value))
            }
            className="shop-range w-full"
            aria-label="Minimum price"
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Material">
        <CheckboxList
          options={[{ value: "all", label: "All materials" }, ...filterMaterials.map((m) => ({ value: m, label: m }))]}
          value={material}
          onChange={(v) =>
            updateParams((p) => {
              if (v === "all") p.delete("material");
              else p.set("material", v);
            })
          }
        />
      </FilterGroup>

      <FilterGroup title="Seating capacity">
        <select
          value={seating}
          onChange={(e) =>
            updateParams((p) => {
              if (e.target.value === "all") p.delete("seating");
              else p.set("seating", e.target.value);
            })
          }
          className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
        >
          {seatingOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup title="Style">
        <CheckboxList
          options={styleOptions}
          value={style}
          onChange={(v) =>
            updateParams((p) => {
              if (v === "all") p.delete("style");
              else p.set("style", v);
            })
          }
        />
      </FilterGroup>

      <FilterGroup title="Features">
        <CheckboxList
          options={featureOptions}
          value={feature}
          onChange={(v) =>
            updateParams((p) => {
              if (v === "all") p.delete("feature");
              else p.set("feature", v);
            })
          }
        />
      </FilterGroup>

      {colors.length ? (
        <FilterGroup title="Colour">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              title="All colours"
              onClick={() => updateParams((p) => p.delete("color"))}
              className={`h-8 w-8 rounded-full border-2 text-[10px] font-bold ${
                color === "all" ? "border-accent" : "border-border"
              }`}
            >
              All
            </button>
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                title={c}
                onClick={() => updateParams((p) => p.set("color", c))}
                className={`h-8 w-8 rounded-full border-2 transition ${
                  color === c ? "border-accent ring-2 ring-accent/30" : "border-white shadow-sm"
                }`}
                style={{ backgroundColor: colorToHex(c) }}
                aria-label={`Colour ${c}`}
              />
            ))}
          </div>
        </FilterGroup>
      ) : null}

      <button
        type="button"
        onClick={clearAll}
        className="w-full rounded-xl border border-border py-2.5 text-sm font-semibold text-body transition hover:border-accent hover:text-accent"
      >
        Clear All Filters
      </button>
      </aside>
    </>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="border-t border-border/60 pt-5">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function CheckboxList({ options, value, onChange }) {
  return (
    <ul className="space-y-1.5">
      {options.map((opt) => (
        <li key={opt.value}>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-body">
            <input
              type="radio"
              name="filter"
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-accent"
            />
            {opt.label}
          </label>
        </li>
      ))}
    </ul>
  );
}
