"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, LayoutGrid, Search } from "lucide-react";
import {
  Armchair,
  BedDouble,
  BookOpen,
  Flower2,
  Home,
  Lamp,
  Sun,
  UtensilsCrossed,
} from "lucide-react";
import { roomCards, roomFilters } from "@/data/rooms";

const FILTER_ICONS = {
  all: LayoutGrid,
  living: Home,
  bedroom: BedDouble,
  dining: UtensilsCrossed,
  office: Armchair,
  kids: Flower2,
  study: BookOpen,
  outdoor: Sun,
  pooja: Lamp,
};

export default function RoomsExplore() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return roomCards.filter((room) => {
      if (activeFilter !== "all" && room.filterId !== activeFilter) return false;
      if (!q) return true;
      const hay = `${room.name} ${room.items}`.toLowerCase();
      return hay.includes(q);
    });
  }, [activeFilter, query]);

  return (
    <>
      <nav
        className="border-b border-border/70 bg-primary"
        aria-label="Filter by room type"
      >
        <div className="container">
          <ul className="flex gap-2 overflow-x-auto py-4 no-scrollbar md:justify-center">
            {roomFilters.map((filter) => {
              const Icon = FILTER_ICONS[filter.id] || LayoutGrid;
              const active = activeFilter === filter.id;
              return (
                <li key={filter.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex min-w-[92px] flex-col items-center gap-2 rounded-xl px-2 py-2 transition md:min-w-[100px] ${
                      active ? "bg-accent text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                        active
                          ? "border-white/25 bg-white/10"
                          : "border-white/15 bg-white/5"
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    <span className="text-center text-[10px] font-semibold leading-tight md:text-xs">
                      {filter.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <section id="explore-rooms" className="bg-muted/30 py-14 md:py-20">
        <div className="container">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-eyebrow text-accent-dark">Explore by room</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
                Find the Perfect Room for Your Home
              </h2>
              <p className="mt-3 max-w-xl text-sm text-body md:text-base">
                Browse curated setups for every space — tap a room to shop matching collections
                or ask our team for a full-room plan.
              </p>
            </div>
            <div className="w-full max-w-sm">
              <label htmlFor="rooms-search" className="sr-only">Search rooms</label>
              <div className="flex items-center gap-2 rounded-full border border-border/80 bg-surface px-4 py-2.5 shadow-sm">
                <Search className="h-4 w-4 text-body/50" aria-hidden />
                <input
                  id="rooms-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search rooms…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-body/50"
                />
              </div>
            </div>
          </div>

          {visible.length ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((room) => (
                <li key={room.id}>
                  <RoomCard room={room} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl border border-border bg-surface p-8 text-center text-body">
              No rooms match your search. Try another keyword or select All Rooms.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

function RoomCard({ room }) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-sm transition hover:shadow-lg ${
        room.featured ? "ring-1 ring-accent/25" : ""
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {room.image ? (
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-xl font-semibold">{room.name}</h3>
          <Link
            href={room.href}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-accent transition hover:bg-accent hover:text-white"
            aria-label={`Open ${room.name}`}
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{room.items}</p>
        <Link href={room.href} className="btn-pill-primary mt-5 inline-flex w-full justify-center text-sm">
          {room.cta}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
