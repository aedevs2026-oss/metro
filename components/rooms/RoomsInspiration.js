import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { roomsInspiration } from "@/data/rooms";

export default function RoomsInspiration() {
  return (
    <section className="container py-14 md:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-semibold md:text-3xl">
            {roomsInspiration.title}
          </h2>
          <p className="mt-2 text-sm text-body md:text-base">{roomsInspiration.description}</p>
        </div>
        <Link
          href={roomsInspiration.galleryHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-dark"
        >
          View Gallery
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {roomsInspiration.images.map((src, i) => (
          <li key={src} className="overflow-hidden rounded-xl border border-border/60 bg-muted">
            <div className="relative aspect-[4/3]">
              <Image
                src={src}
                alt={`Showroom inspiration ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
