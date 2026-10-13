"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, GitCompareArrows, Trash2 } from "lucide-react";
import { COMPARE_KEY, CUSTOMER_LIST_EVENT, readCustomerList, writeCustomerList, WISHLIST_KEY } from "@/lib/customer-lists";

export default function SavedProductsPage({ mode = "wishlist" }) {
  const isCompare = mode === "compare";
  const key = isCompare ? COMPARE_KEY : WISHLIST_KEY;
  const [items, setItems] = useState([]);
  useEffect(() => { const sync = () => setItems(readCustomerList(key)); sync(); window.addEventListener(CUSTOMER_LIST_EVENT, sync); window.addEventListener("storage", sync); return () => { window.removeEventListener(CUSTOMER_LIST_EVENT, sync); window.removeEventListener("storage", sync); }; }, [key]);
  const remove = (slug) => { const next = items.filter((p) => p.slug !== slug); writeCustomerList(key, next); setItems(next); };
  return <section className="container min-h-[65vh] py-12 md:py-16">
    <div className="mx-auto max-w-4xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-accent-dark">Your personal collection</p>
      <h1 className="font-heading text-4xl tracking-tight sm:text-5xl">{isCompare ? "Compare your favourites" : "Saved favourites"}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-body">{isCompare ? "Review dimensions, materials, finishes and starting prices side by side before visiting our Dharmapuri showroom." : "Keep the pieces you love in one place. Your saved list stays on this device, so you can return to your shortlist anytime."}</p>
      {items.length === 0 ? <div className="mt-10 rounded-[28px] border border-white/70 bg-white/65 p-8 text-center shadow-xl shadow-black/5 backdrop-blur-xl sm:p-12"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent-dark">{isCompare ? <GitCompareArrows /> : <Heart />}</div><h2 className="mt-4 font-heading text-2xl">{isCompare ? "Nothing to compare yet" : "Your shortlist starts here"}</h2><p className="mx-auto mt-2 max-w-md text-sm text-body">Browse the collection and tap {isCompare ? "Compare" : "Save"} on products you like.</p><Link href="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-primary-dark">Explore furniture <ArrowRight className="h-4 w-4" /></Link></div> : <>
        {isCompare && <div className="mt-7 overflow-x-auto rounded-2xl border border-white/70 bg-white/70 shadow-lg backdrop-blur-xl"><table className="w-full min-w-[620px] border-collapse text-left text-sm"><thead><tr><th className="w-32 p-4 text-body">Compare</th>{items.map((p) => <th key={p.slug} className="p-4"><span className="font-heading text-base">{p.name}</span><button onClick={() => remove(p.slug)} className="ml-2 text-body hover:text-red-600" aria-label={`Remove ${p.name}`}><Trash2 className="inline h-3.5 w-3.5" /></button></th>)}</tr></thead><tbody>{[["Category", "category"], ["Starting price", "priceLabel"], ["Material", "material"], ["Colour", "color"], ["Configuration", "configuration"]].map(([label, field]) => <tr key={field} className="border-t border-black/5"><th className="p-4 font-medium text-body">{label}</th>{items.map((p) => <td key={p.slug} className="p-4 align-top">{p[field] || "Ask our team"}</td>)}</tr>)}<tr className="border-t border-black/5"><th className="p-4">Details</th>{items.map((p) => <td key={p.slug} className="p-4"><Link href={`/product/${p.slug}`} className="font-semibold text-accent-dark underline underline-offset-4">View product</Link></td>)}</tr></tbody></table></div>}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((p) => <article key={p.slug} className="overflow-hidden rounded-3xl border border-white/75 bg-white/75 shadow-lg shadow-black/5 backdrop-blur-xl"><Link href={`/product/${p.slug}`} className="relative block aspect-[4/3] bg-[#f0e9de]"><Image src={p.image || "/hero.png"} alt={`${p.name} at Metro Furniture Dharmapuri`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-contain p-3" /></Link><div className="p-4"><p className="text-[10px] font-semibold uppercase tracking-widest text-accent-dark">{p.category}</p><h2 className="mt-1 font-heading text-lg">{p.name}</h2><p className="mt-1 text-sm font-semibold">{p.priceLabel || "Get a showroom quote"}</p><div className="mt-4 flex items-center justify-between gap-3"><Link href={`/product/${p.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-accent-dark">View details <ArrowRight className="h-4 w-4" /></Link><button onClick={() => remove(p.slug)} className="inline-flex items-center gap-1.5 text-xs text-body hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /> Remove</button></div></div></article>)}</div>
      </>}
    </div>
  </section>;
}
