import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

export default function CtaBanner({ stats = [], backgroundImage = "/homepage/cta/luxury-dining-living-cta.webp" }) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative py-20 md:py-28">
        <Image
          src={backgroundImage}
          alt=""
          fill
          quality={HOME_PHOTO_QUALITY}
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/68" aria-hidden />
        <div className="container relative z-10 text-center">
          <AnimateIn>
            <h2 className="home-h2 text-white">Ready to Transform Your Home?</h2>
            <p className="home-body mx-auto mt-4 max-w-2xl text-white/85">
              Explore our premium furniture collections or visit our showroom on Salem Main Road, Dharmapuri —
              touch fabrics, compare finishes and get expert help from our team.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/shop" className="btn-pill-primary inline-flex">
                Explore Collections
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/contact" className="btn-pill-outline-light inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-light" aria-hidden />
                Visit Our Showroom
              </Link>
            </div>
          </AnimateIn>
        </div>
      </div>

      {stats.length ? (
        <div className="border-t border-white/10 bg-[#121212]">
          <ul className="container grid grid-cols-2 gap-8 py-10 md:grid-cols-4 md:py-12">
            {stats.map((item, index) => (
              <li
                key={item.id}
                className={`flex flex-col items-center text-center md:items-start md:text-left ${
                  index > 0 ? "md:border-l md:border-white/10 md:pl-8" : ""
                }`}
              >
                <p className="home-stat-label text-accent-light">{item.label}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-white/55">{item.sub}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
