"use client";

import Link from "next/link";
import { Heart, GitCompareArrows } from "lucide-react";
import { useEffect, useState } from "react";
import {
  COMPARE_KEY,
  CUSTOMER_LIST_EVENT,
  readCustomerList,
  toggleCustomerItem,
  WISHLIST_KEY,
} from "@/lib/customer-lists";

export default function ProductSaveControls({
  product,
  compact = false,
  showWishlist = true,
  showCompare = true,
  showSavedLink = true,
}) {
  const [saved, setSaved] = useState(false);
  const [compared, setCompared] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const sync = () => {
      setSaved(readCustomerList(WISHLIST_KEY).some((p) => p.slug === product.slug));
      setCompared(readCustomerList(COMPARE_KEY).some((p) => p.slug === product.slug));
    };
    sync();
    window.addEventListener(CUSTOMER_LIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CUSTOMER_LIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [product.slug]);

  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-full border border-white/75 bg-white/90 text-xs font-semibold text-foreground shadow-[0_3px_12px_rgba(40,30,18,.12)] backdrop-blur-xl transition hover:border-accent/60 hover:text-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {showWishlist ? (
        <button
          type="button"
          onClick={() => {
            const result = toggleCustomerItem(WISHLIST_KEY, product);
            setSaved(!result.exists);
            setNotice(result.exists ? "Removed from saved favourites" : "Saved to your favourites");
          }}
          aria-pressed={saved}
          className={`${base} ${compact ? "h-8 w-8 sm:h-9 sm:w-9" : "px-3 py-2.5"}`}
          aria-label={saved ? "Remove from favourites" : "Save to favourites"}
          title={saved ? "Saved to favourites" : "Save to favourites"}
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-rose-500 text-rose-500" : ""}`} />
          {compact ? null : saved ? "Saved" : "Save"}
        </button>
      ) : null}

      {showCompare ? (
        <button
          type="button"
          onClick={() => {
            const list = readCustomerList(COMPARE_KEY);
            if (!list.some((p) => p.slug === product.slug) && list.length >= 4) {
              setNotice("Compare up to 4 products at a time");
              return;
            }
            const result = toggleCustomerItem(COMPARE_KEY, product);
            setCompared(!result.exists);
            setNotice(result.exists ? "Removed from comparison" : "Added to comparison");
          }}
          aria-pressed={compared}
          className={`${base} ${compact ? "h-8 w-8 sm:h-9 sm:w-9" : "px-3 py-2.5"}`}
          aria-label={compared ? "Remove from compare" : "Compare product"}
          title="Compare products"
        >
          <GitCompareArrows className="h-4 w-4" />
          {compact ? null : compared ? "Comparing" : "Compare"}
        </button>
      ) : null}

      {!compact && showSavedLink ? (
        <Link href="/wishlist" className="text-xs text-body underline-offset-4 hover:underline">
          Saved items
        </Link>
      ) : null}

      {notice ? (
        <span role="status" className="w-full text-[11px] text-body">
          {notice} ·{" "}
          <Link
            className="underline"
            href={notice.includes("comparison") || notice.includes("Compare") ? "/compare" : "/wishlist"}
          >
            View
          </Link>
        </span>
      ) : null}
    </div>
  );
}
