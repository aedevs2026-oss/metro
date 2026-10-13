import Link from "next/link";
import { ArrowRight, Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { business, branches } from "@/data/business";
import { buildWhatsAppUrl, productEnquiryMessage } from "@/lib/whatsapp";

export default function ProductLocalServiceCard({ product }) {
  const branch = branches[0];
  const contactUrl = buildWhatsAppUrl(productEnquiryMessage(product));

  return (
    <section className="container py-8 sm:py-10" aria-labelledby="product-showroom-heading">
      <div className="glass relative grid gap-6 overflow-hidden rounded-[28px] p-5 shadow-[0_18px_52px_rgba(30,25,17,.07)] sm:p-7 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:p-9">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-accent/15" aria-hidden="true" />
        <div className="relative">
          <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-accent-dark">Local showroom support</p>
          <h2 id="product-showroom-heading" className="mt-2 max-w-xl font-heading text-2xl font-medium leading-tight text-foreground sm:text-3xl">See {product.name} at Metro Furniture, Dharmapuri</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-body">Want to compare finishes or check whether this model suits your room? Visit our Salem Main Road showroom or message our team with your preferred colour, room dimensions and questions. We will confirm current availability and any delivery charges with you.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={contactUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#d8c18f,#b08c49)] px-5 py-3 text-xs font-semibold text-[#211f1b] transition hover:-translate-y-0.5 hover:shadow-md"><MessageCircle className="h-4 w-4" /> Ask about this product</a>
            <Link href={`/book-showroom?product=${product.slug}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/35 bg-white/75 px-5 py-3 text-xs font-semibold text-foreground transition hover:bg-white"><Clock3 className="h-4 w-4 text-accent-dark" /> Book a showroom visit</Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/35 bg-white/75 px-5 py-3 text-xs font-semibold text-foreground transition hover:bg-white"><ArrowRight className="h-4 w-4 text-accent-dark" /> Contact & directions</Link>
          </div>
        </div>
        <div className="relative rounded-[22px] border border-white/80 bg-white/60 p-4 backdrop-blur-xl sm:p-5">
          <p className="text-xs font-semibold text-foreground">{business.name} showroom</p>
          <div className="mt-4 space-y-3">
            <LocalRow icon={MapPin} text={`${business.address.line1}, ${business.address.line2}, ${business.address.city}, ${business.address.state} ${business.address.pin}`} />
            <LocalRow icon={Clock3} text={business.hours} />
            <LocalRow icon={Phone} text={`+91 ${business.primaryPhone} · ${business.email}`} />
          </div>
          <a href={branch?.mapUrl || "https://www.google.com/maps/search/?api=1&query=Metro+Furniture+Dharmapuri"} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-accent-dark hover:underline">Open Google Maps <ArrowRight className="h-3.5 w-3.5" /></a>
        </div>
      </div>
    </section>
  );
}

function LocalRow({ icon: Icon, text }) {
  return <div className="flex items-start gap-3"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-white text-accent-dark"><Icon className="h-4 w-4" /></span><p className="text-xs leading-5 text-body">{text}</p></div>;
}
