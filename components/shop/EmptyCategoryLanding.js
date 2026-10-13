import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { business, branches } from "@/data/business";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function EmptyCategoryLanding({ category, suggestedCategories = [] }) {
  const enquiryUrl = buildWhatsAppUrl(
    `Hi ${business.shortName}, I'm looking for ${category.name.toLowerCase()} at your Dharmapuri showroom. Please share the currently available options, photos and price details.`
  );
  const image = category.slug === "dining"
    ? "/homepage/products/elegant-dining-set.webp"
    : (category.image || "/homepage/rooms/luxury-dining-room.webp");

  return (
    <section className="container py-10 md:py-16">
      <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/65 shadow-[0_24px_70px_rgba(37,31,23,0.09)] backdrop-blur-2xl">
        <div className="grid lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[280px] overflow-hidden bg-[#eee6dc] sm:min-h-[390px]">
            <Image
              src={image}
              alt={`${category.name} inspiration at Metro Furniture, Dharmapuri`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#15130f]/65 via-transparent to-white/10" />
            <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-8 sm:left-8">
              <span className="inline-flex rounded-full border border-white/40 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[.18em] backdrop-blur-xl">
                Ask our showroom
              </span>
              <p className="mt-3 max-w-md font-serif text-3xl sm:text-4xl">Find the right fit for your home.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#9b7947]">Made easier, in person</p>
            <h1 className="mt-3 font-serif text-3xl leading-tight text-[#24211d] sm:text-4xl">Looking for {category.name.toLowerCase()}?</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#686159] sm:text-base">
              Our online catalogue is being updated for this collection, so products are not listed here yet. Contact the Metro Furniture team to check current showroom options, request photos, discuss your measurements and confirm pricing before you visit.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Current availability and photos",
                "Guidance on size and finishes",
                "Price and delivery confirmation",
                "Support before your showroom visit",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-2xl border border-white/80 bg-white/70 p-3 text-sm text-[#4d473f] shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#a7834b]" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={enquiryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#29241e] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-[#9b7947]">
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask on WhatsApp
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={`tel:${business.primaryPhone}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d9c8b0] bg-white/60 px-6 py-3 text-sm font-semibold text-[#29241e] transition hover:bg-white">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call the showroom
              </a>
            </div>

            <div className="mt-7 grid gap-3 border-t border-[#e8dfd4] pt-5 text-sm text-[#6b6258] sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#9b7947]" aria-hidden="true" />
                <div><strong className="block text-[#29241e]">Visit us in Dharmapuri</strong>{branches[0]?.lines?.join(" ")}</div>
              </div>
              <div className="flex items-start gap-2">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#9b7947]" aria-hidden="true" />
                <div><strong className="block text-[#29241e]">Showroom hours</strong>{business.hours}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {suggestedCategories.length > 0 && (
        <div className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#9b7947]">Explore online now</p>
              <h2 className="mt-2 font-serif text-2xl text-[#29241e] sm:text-3xl">Browse available collections</h2>
            </div>
            <Link href="/shop" className="hidden items-center gap-2 text-sm font-semibold text-[#6e5738] hover:text-[#29241e] sm:inline-flex">All products <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {suggestedCategories.slice(0, 4).map((item) => (
              <Link key={item.slug} href={`/shop/${item.slug}`} className="group overflow-hidden rounded-3xl border border-white/80 bg-white/65 shadow-[0_12px_35px_rgba(37,31,23,0.06)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(37,31,23,0.11)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#eee6dc]">
                  <Image src={item.image || image} alt={`${item.name} collection in Dharmapuri`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div><span className="block font-serif text-lg text-[#29241e]">{item.name}</span><span className="mt-1 block text-xs text-[#766d62]">View collection</span></div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0d2be] bg-white text-[#8a6c40]"><ArrowRight className="h-4 w-4" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
