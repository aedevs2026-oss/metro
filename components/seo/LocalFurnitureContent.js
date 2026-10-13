import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Ruler, Store } from "lucide-react";
import { business } from "@/data/business";
import { areaServed } from "@/data/seo-local";

/**
 * Helpful, visible local product information. Copy varies with the real product
 * or category record so the target phrases support users rather than form a hidden keyword list.
 */
export default function LocalFurnitureContent({ product = null, category = null, productCount = null, mode = "shop" }) {
  const places = areaServed.filter((place) => place !== "Tamil Nadu").slice(0, 6);
  const address = `${business.address.line1}, ${business.address.line2}, ${business.address.city}, ${business.address.state} ${business.address.pin}`;

  if (product) {
    const detail = [
      product.color ? `${product.color} colour` : null,
      product.material ? product.material.toLowerCase() : null,
      product.configuration ? product.configuration.toLowerCase() : null,
    ].filter(Boolean).join(", ");

    return (
      <section className="local-furniture-content border-y border-[#b98e4b]/15 bg-[linear-gradient(180deg,#fbf7ef,#f5ecdf)] py-10 sm:py-14" aria-labelledby="local-product-content-heading">
        <div className="container">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,.85fr)] lg:items-start lg:gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#98703a]">Local product guidance</p>
              <h2 id="local-product-content-heading" className="mt-2 font-heading text-2xl leading-tight text-[#241e14] sm:text-3xl">
                Explore {product.name} at Metro Furniture, Dharmapuri
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#746957] sm:text-base">
                Considering the {product.name}{product.model ? ` (${product.model})` : ""}? Review its {product.category.toLowerCase()} details, product photographs and listed specifications before visiting. {detail ? `The catalogue describes this model with ${detail}. ` : ""}For the latest showroom availability, finish choices, measurements, quote and delivery details, please contact the Metro Furniture team on Salem Main Road.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href={`/shop/${product.category.toLowerCase().replaceAll(" ", "-")}`} className="inline-flex items-center gap-1.5 rounded-full border border-[#b98e4b]/30 bg-white/75 px-4 py-2.5 text-xs font-semibold text-[#775426] transition hover:bg-white">
                  Browse {product.category.toLowerCase()} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link href={`/room-measurement?product=${product.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-[#b98e4b]/30 bg-white/75 px-4 py-2.5 text-xs font-semibold text-[#775426] transition hover:bg-white">
                  Check room fit <Ruler className="h-3.5 w-3.5" />
                </Link>
              </div>
              <p className="mt-5 text-xs leading-6 text-[#857967]">
                Product availability, custom options, final pricing and delivery timelines should be confirmed with the showroom before ordering.
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-[#b98e4b]/20 bg-white/70 p-5 shadow-[0_12px_32px_rgba(46,34,16,.05)] backdrop-blur-xl sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#b98e4b]/25 bg-[#f4e7ce] text-[#8b642f]">
                  <Store className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-heading text-xl text-[#282116]">See it in person</h3>
                  <p className="mt-1 text-sm leading-6 text-[#766b5b]">{address}</p>
                  <p className="mt-2 text-xs text-[#8a7b66]">{business.hours}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <Link href="/book-showroom" className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#efdaa8] via-[#d1aa67] to-[#ae7a34] px-4 py-3 text-xs font-bold text-[#21180c] shadow-sm transition hover:-translate-y-0.5">
                  Book a visit <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={business.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#b98e4b]/30 bg-white px-4 py-3 text-xs font-semibold text-[#6d4c20] transition hover:bg-[#fcf5e8]">
                  <MessageCircle className="h-4 w-4" /> Ask about this product
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (category) {
    return (
      <section className="local-furniture-content border-y border-[#b98e4b]/15 bg-[linear-gradient(180deg,#fbf7ef,#f5ecdf)] py-10 sm:py-14" aria-labelledby="local-category-content-heading">
        <div className="container">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(270px,.72fr)] lg:gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#98703a]">Collection guide · Dharmapuri</p>
              <h2 id="local-category-content-heading" className="mt-2 font-heading text-2xl leading-tight text-[#241e14] sm:text-3xl">
                {category.name} at Metro Furniture
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#746957] sm:text-base">
                Explore the {category.name.toLowerCase()} collection from Metro Furniture in Dharmapuri. {category.description} {productCount > 0 ? `There ${productCount === 1 ? "is" : "are"} ${productCount} listed ${productCount === 1 ? "product" : "products"} in this online view. Compare the available information and ask our Salem Main Road showroom team about current stock, finishes, sizes and final pricing.` : `This category currently has no listed products in this online view. Contact the showroom to ask whether matching options are available in person.`}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(category.materials || []).slice(0, 4).map((material) => (
                  <span key={material} className="rounded-full border border-[#b98e4b]/20 bg-white/70 px-3 py-1.5 text-[11px] font-medium text-[#756044]">{material}</span>
                ))}
              </div>
            </div>
            <aside className="rounded-[1.35rem] border border-[#b98e4b]/20 bg-white/70 p-5 shadow-[0_12px_32px_rgba(46,34,16,.05)] backdrop-blur-xl">
              <h3 className="font-heading text-xl text-[#282116]">Visit or ask the showroom</h3>
              <p className="mt-2 text-sm leading-6 text-[#766b5b]">{business.address.line1}, {business.address.city}, Tamil Nadu. Confirm display availability before travelling.</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row lg:flex-col">
                <Link href="/book-showroom" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#efdaa8] via-[#d1aa67] to-[#ae7a34] px-4 py-3 text-xs font-bold text-[#21180c]">Book a visit <ArrowRight className="h-4 w-4" /></Link>
                <a href={business.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#b98e4b]/30 bg-white px-4 py-3 text-xs font-semibold text-[#6d4c20]"><MessageCircle className="h-4 w-4" /> Ask availability</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="local-furniture-content border-y border-[#b98e4b]/15 bg-[linear-gradient(180deg,#fbf7ef,#f5ecdf)] py-10 sm:py-14" aria-labelledby="local-shop-content-heading">
      <div className="container">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#98703a]">Local showroom · Tamil Nadu</p>
            <h2 id="local-shop-content-heading" className="mt-2 font-heading text-2xl leading-tight text-[#241e14] sm:text-3xl">
              Shop furniture in Dharmapuri with showroom support
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#746957] sm:text-base">
              Browse the online catalogue for sofas, corner sofas, chairs, mattresses and designer lighting. Metro Furniture is located on Salem Main Road in Senthil Nagar, Dharmapuri. Ask the team to confirm sizes, available finishes, current pricing and delivery arrangements before deciding.
            </p>
            <p className="mt-3 text-xs leading-6 text-[#857967]">
              Nearby areas customers may enquire from include {places.join(", ")}. Availability and delivery should be confirmed directly with the showroom.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
            <Link href="/book-showroom" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#efdaa8] via-[#d1aa67] to-[#ae7a34] px-5 py-3 text-xs font-bold text-[#21180c]">Plan a showroom visit <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#b98e4b]/30 bg-white/80 px-5 py-3 text-xs font-semibold text-[#6d4c20]"><MapPin className="h-4 w-4" /> Contact Metro Furniture</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
