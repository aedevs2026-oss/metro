import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Gem,
  Scissors,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { business } from "@/data/business";
import { buildMetadata } from "@/lib/seo";
import { getShopSeoTargets } from "@/data/seo-targets";
import ShopProductCard from "@/components/shop/ShopProductCard";
import LocalFurnitureContent from "@/components/seo/LocalFurnitureContent";

export const metadata = buildMetadata({
  title: "Furniture Collections in Dharmapuri",
  description: `Explore curated sofa, bedroom, dining, mattress and lighting collections at ${business.name}, Salem Main Road, Dharmapuri. Discover premium designs, customisation choices and showroom assistance.`,
  path: "/collections",
  keywords: [
    ...getShopSeoTargets(),
    "furniture collections Dharmapuri",
    "premium sofa collection Dharmapuri",
    "dining furniture showroom Dharmapuri",
    "luxury furniture collections Salem Main Road",
  ],
  ogImage: "/collections/metro-collections-hero.webp",
});

const categoryCopy = {
  "Corner Sofas": "Statement-making comfort for generous living spaces.",
  "Sofas": "Everyday seating, elevated with considered details.",
  "Dining": "Ask our showroom about current dining sets, finishes and confirmed pricing.",
  "Chairs": "Supportive, sculptural seating for work and home.",
  "Mattresses": "Comfort-focused choices for a more restful night.",
  "Chandeliers": "Sculptural lighting to give a room its signature.",
  "Wall Lights": "Warm accents that create atmosphere after dark.",
  "Bathroom Fittings": "Thoughtful finishing touches for modern homes.",
};

const promiseItems = [
  { icon: Gem, title: "Curated quality", text: "A considered range of styles and finishes" },
  { icon: Scissors, title: "Personalisation", text: "Ask about fabric, size and configuration options" },
  { icon: ShieldCheck, title: "Showroom guidance", text: "Get practical advice before you decide" },
  { icon: Truck, title: "Local assistance", text: "Discuss delivery across Dharmapuri and nearby areas" },
];

export default function CollectionsPage() {
  const featuredProducts = products.filter((product) => /^mtc-\d+$/.test(product.id) && !product.upcoming).slice(0, 4);

  return (
    <main className="collections-page">
      <section className="collections-hero relative isolate overflow-hidden">
        <Image
          src="/collections/metro-collections-hero.webp"
          alt="Premium furniture showroom with curated sofas and warm architectural lighting"
          fill
          priority
          sizes="100vw"
          className="collections-hero-image object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#100d09]/90 via-[#17120b]/66 to-[#17120b]/16" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100d09]/45 via-transparent to-black/10" aria-hidden />
        <div className="container relative z-10 grid min-h-[460px] items-end gap-8 py-12 sm:min-h-[500px] sm:py-16 lg:min-h-[550px] lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:py-20">
          <div className="max-w-3xl text-white">
            <p className="collections-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-[#e9d29d]/35 bg-black/25 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.22em] text-[#f0d9a6] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Considered designs · Made for real homes
            </p>
            <h1 className="max-w-3xl font-heading text-4xl leading-[.98] tracking-[-.045em] sm:text-5xl md:text-6xl lg:text-7xl">
              Collections that make a house feel <span className="italic text-[#e8c98c]">yours.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base md:text-lg">
              Explore furniture selected for comfort, character and everyday living. Find a style you love, then speak with our Dharmapuri showroom team about details, dimensions and customisation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#curated-categories" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#f2dca8] via-[#d4ad69] to-[#b48239] px-6 py-3 text-sm font-semibold text-[#1a140b] shadow-[0_10px_30px_rgba(165,117,46,.27)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(165,117,46,.36)]">
                Explore collections <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link href="/book-showroom" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/35 bg-white/[.07] px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-[#e8c98c]/75 hover:bg-white/[.13]">
                Visit our showroom <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/70">
              <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#e8c98c]" /> Thoughtfully curated</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#e8c98c]" /> Showroom assistance</span>
              <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#e8c98c]" /> Custom options available</span>
            </div>
          </div>
          <aside className="collections-hero-note hidden rounded-[1.6rem] border border-white/20 bg-black/25 p-5 text-white shadow-2xl backdrop-blur-xl lg:block">
            <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#e8c98c]">The Metro experience</p>
            <p className="mt-3 font-heading text-2xl leading-tight">Choose with confidence.</p>
            <p className="mt-2 text-sm leading-6 text-white/70">Compare styles, check your space and talk through finishes before making a decision.</p>
            <div className="mt-5 h-px bg-gradient-to-r from-[#e8c98c]/70 to-transparent" />
            <Link href="/room-measurement" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#f0d9a6] hover:text-white">
              Check room fit <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="collections-promise border-b border-[#b99052]/15">
        <div className="container grid gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:py-6">
          {promiseItems.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/60 p-3 shadow-[0_5px_20px_rgba(50,36,16,.035)] backdrop-blur-sm sm:p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c29a58]/25 bg-gradient-to-br from-[#fff9ec] to-[#ead7b4] text-[#8c642d] shadow-sm">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} aria-hidden />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-[#282116]">{title}</h2>
                <p className="mt-0.5 text-xs leading-5 text-[#756b5b]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="curated-categories" className="container py-12 sm:py-14 lg:py-20">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9a713b]">Explore by category</p>
            <h2 className="mt-2 font-heading text-3xl tracking-tight text-[#211b13] sm:text-4xl lg:text-5xl">Find your signature piece</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#756b5b] sm:text-base">From a welcoming sofa to the finishing details, start with the collection that fits your space.</p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 rounded-full border border-[#b99052]/30 bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#6f4d20] transition hover:border-[#b99052]/60 hover:bg-white">
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="collections-category-grid grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {categories.map((category, index) => {
            const count = products.filter((product) => product.category === category.id).length;
            const image = category.image || "/collections/metro-collections-hero.webp";
            const isProductImage = /\/Metro_Product_Galleries\/|\/Metro_Product_Images\/|\/Lights_Products\//i.test(image);

            return (
              <Link
                key={category.id}
                href={`/shop/${category.slug}`}
                className="collections-category-card group relative isolate flex h-full min-h-[250px] flex-col overflow-hidden rounded-[1.2rem] border border-[#b99052]/22 bg-[#fcf8f0] shadow-[0_12px_28px_rgba(43,31,17,.07)] transition duration-500 hover:-translate-y-1 hover:border-[#b99052]/50 hover:shadow-[0_22px_44px_rgba(43,31,17,.14)] sm:min-h-[318px] sm:rounded-[1.5rem] lg:min-h-[342px]"
              >
                <div
                  className={`collections-category-media relative h-[132px] shrink-0 overflow-hidden sm:h-[178px] lg:h-[195px] ${
                    isProductImage
                      ? "bg-[linear-gradient(145deg,#fffdf9_0%,#f8f0e4_48%,#efe1cf_100%)]"
                      : "bg-[#e8dfd3]"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${category.name} furniture collection at Metro Furniture`}
                    fill
                    sizes="(max-width:639px) 50vw, (max-width:1023px) 50vw, 25vw"
                    className={`collections-category-image transition duration-700 ease-out group-hover:scale-[1.04] ${
                      isProductImage ? "object-cover p-0 mix-blend-multiply" : "object-cover"
                    }`}
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.13em] text-[#6f542f] shadow-sm backdrop-blur-md sm:left-4 sm:top-4 sm:text-[10px]">
                    {String(index + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col bg-gradient-to-b from-[#fffdf8] to-[#f5ead9] p-3.5 sm:p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#98703a] sm:text-[10px]">
                    {count > 0 ? `${count} listed ${count === 1 ? "product" : "products"}` : "Showroom enquiry"}
                  </p>
                  <div className="mt-1.5 flex items-start justify-between gap-2">
                    <h3 className="min-w-0 font-heading text-[1.05rem] font-semibold leading-tight text-[#261d13] sm:text-xl">
                      {category.name}
                    </h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#b99052]/35 bg-white/80 text-[#855f2a] transition duration-300 group-hover:border-[#b99052] group-hover:bg-[#d4ad69] group-hover:text-[#1d160a] sm:h-9 sm:w-9">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                  <p className="mt-2 hidden text-xs leading-5 text-[#756b5b] sm:block">
                    {categoryCopy[category.id] || category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {featuredProducts.length ? (
        <section className="collections-featured-section py-12 sm:py-14 lg:py-20">
          <div className="container">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#d3b16f]">Customer favourites</p>
                <h2 className="mt-2 font-heading text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">The signature edit</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">A small selection to help you begin—open any item to view its details and available options.</p>
              </div>
              <Link href="/shop" className="inline-flex items-center gap-2 rounded-full border border-[#e4c98e]/30 bg-white/[.05] px-4 py-2.5 text-sm font-semibold text-[#efd5a0] transition hover:bg-white/[.1]">
                Explore the catalogue <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {featuredProducts.map((product) => <ShopProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </section>
      ) : null}

      <LocalFurnitureContent mode="collections" />

      <section className="container py-12 sm:py-14 lg:py-20">
        <div className="collections-visit-card relative isolate overflow-hidden rounded-[1.5rem] border border-[#c39a59]/25 bg-[#17130d] p-6 shadow-[0_22px_60px_rgba(36,25,11,.14)] sm:rounded-[2rem] sm:p-9 lg:p-12">
          <Image src="/collections/metro-collections-hero.webp" alt="" fill sizes="100vw" className="absolute inset-0 -z-10 object-cover object-center opacity-35" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#15110b]/95 via-[#17130d]/80 to-[#17130d]/55" aria-hidden />
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div className="max-w-2xl text-white">
              <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c787]">See it in person</p>
              <h2 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">Good design is even better when you experience it.</h2>
              <p className="mt-3 text-sm leading-6 text-white/72 sm:text-base">Visit Metro Furniture on Salem Main Road, Senthil Nagar, Dharmapuri, and talk through the styles, dimensions and finishes that suit your home.</p>
              <p className="mt-3 text-xs text-white/55">{business.hours}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/book-showroom" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f2dca8] via-[#d4ad69] to-[#b48239] px-6 py-3 text-sm font-bold text-[#1a140b] transition hover:-translate-y-0.5">
                Book showroom visit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={business.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/[.06] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[#e8c98c]/65 hover:bg-white/[.12]">
                Chat on WhatsApp <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
