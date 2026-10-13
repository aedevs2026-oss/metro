"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ShopFilters from "@/components/shop/ShopFilters";
import ShopProductCard from "@/components/shop/ShopProductCard";
import EmptyState from "@/components/EmptyState";
import { priceRange } from "@/data/shop";
import { applyShopFilters } from "@/lib/shop-filters";

const PAGE_SIZE = 9;

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
];

function sortProducts(list, sort) {
  const next = [...list];
  switch (sort) {
    case "price-asc":
      return next.sort(
        (a, b) =>
          (a.price ?? Number.MAX_SAFE_INTEGER) -
          (b.price ?? Number.MAX_SAFE_INTEGER)
      );
    case "price-desc":
      return next.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    case "name-asc":
      return next.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return next.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

function readFilters(searchParams) {
  const minRaw = searchParams.get("min");
  const maxRaw = searchParams.get("max");
  return {
    material: searchParams.get("material") || "all",
    minPrice: minRaw != null ? Number(minRaw) : priceRange.min,
    maxPrice: maxRaw != null ? Number(maxRaw) : priceRange.max,
    color: searchParams.get("color") || "all",
    seating: searchParams.get("seating") || "all",
    style: searchParams.get("style") || "all",
    feature: searchParams.get("feature") || "all",
    sub: searchParams.get("sub") || "all",
  };
}

function Pagination({ currentPage, totalPages, onPage }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);
  for (let i = start; i <= end; i += 1) pages.push(i);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 pt-8" aria-label="Pagination">
      <PageBtn
        disabled={currentPage <= 1}
        onClick={() => onPage(currentPage - 1)}
        label="Previous"
      />
      {pages.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onPage(n)}
          aria-current={n === currentPage ? "page" : undefined}
          className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
            n === currentPage
              ? "bg-primary text-white"
              : "border border-border bg-surface text-body hover:border-accent"
          }`}
        >
          {n}
        </button>
      ))}
      <PageBtn
        disabled={currentPage >= totalPages}
        onClick={() => onPage(currentPage + 1)}
        label="Next"
      />
    </nav>
  );
}

function PageBtn({ disabled, onClick, label }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-10 items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold disabled:opacity-40"
    >
      {label}
    </button>
  );
}

export default function ShopCollectionLayout({
  products,
  allProducts,
  categoryId = null,
  query = "",
}) {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const filters = useMemo(() => readFilters(searchParams), [searchParams]);

  const filtered = useMemo(
    () => applyShopFilters(products, filters),
    [products, filters]
  );
  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [searchParams, sort, products]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <ShopFilters
        products={products}
        allProducts={allProducts}
        categoryId={categoryId}
      />

      <div>
        <div className="mb-6 flex flex-col gap-3 border-b border-border/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-body">
            <span className="font-semibold text-foreground">{sorted.length}</span> Products
            {query ? (
              <>
                {" "}
                for <span className="text-accent">“{query}”</span>
              </>
            ) : null}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="shop-sort" className="text-sm text-body">Sort by:</label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium outline-none focus:border-accent"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {pageItems.length ? (
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
            {pageItems.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState title="No products match your filters" />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPage={setPage}
        />
      </div>
    </div>
  );
}
