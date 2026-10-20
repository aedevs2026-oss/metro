"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import ProductEnquiryModal from "@/components/ProductEnquiryModal";
import { business } from "@/data/business";
import { getProductPromotion } from "@/lib/format";

function fallbackFor(product) {
  const category = product?.category || "";
  if (/sofa|corner/i.test(category)) return "/homepage/collections/modern-blue-sofa.webp";
  if (/chandelier/i.test(category)) return "/Lights_Products/LL-D5463.jpg";
  if (/wall light/i.test(category)) return "/Lights_Products/LL-D6054.jpg";
  if (/chair/i.test(category)) return "/chair-furniture (1).jpg";
  if (/mattress/i.test(category)) return "/homepage/collections/luxury-bed-mattress.webp";
  if (/bathroom/i.test(category)) return "/bathroom-fitting.png";
  return "/homepage/hero/metro-luxury-hero-v2.webp";
}

function galleryFor(product) {
  const list = product?.images?.length ? product.images : product?.image ? [product.image] : [];
  return [...new Set(list)].filter(Boolean).slice(0, 4);
}

function formatCurrency(value) {
  if (!Number.isFinite(value) || value <= 0) return null;
  return "₹" + Math.round(value).toLocaleString("en-IN");
}

function getProductPrice(product) {
  if (product?.priceLabel && !product?.onRequest) return product.priceLabel;
  if (Number.isFinite(product?.price) && !product?.onRequest) {
    return formatCurrency(product.price);
  }
  return null;
}

// Facebook Ads uses the same product promotion as the home, shop and detail pages.
function getFacebookOffer(product) {
  return getProductPromotion(product);
}

function swatchColorFor(color) {
  const value = String(color || "").toLowerCase();
  if (/light grey|light gray|silver/.test(value)) return "#b9b6b0";
  if (/grey|gray|slate/.test(value)) return "#777773";
  if (/cream|ivory|white|off.white/.test(value)) return "#eee5d7";
  if (/sand|beige|stone|oat/.test(value)) return "#d9c4a7";
  if (/taupe|mushroom/.test(value)) return "#9b8776";
  if (/brown|coffee|walnut|chocolate|tan|camel/.test(value)) return "#714a32";
  if (/green|olive|sage/.test(value)) return "#315548";
  if (/blue|navy/.test(value)) return "#315a78";
  if (/black|charcoal/.test(value)) return "#292825";
  if (/gold|brass/.test(value)) return "#b18a48";
  if (/pink|blush|rose/.test(value)) return "#c99d9a";
  return "#bda884";
}

function ProductCard({ product, onQuickView }) {
  const [imageFailed, setImageFailed] = useState(false);
  const offer = getFacebookOffer(product);
  const image = imageFailed ? fallbackFor(product) : product.image;

  useEffect(() => {
    setImageFailed(false);
  }, [product.image]);

  // The Facebook Ads grid only contains products with a published catalogue price.
  if (!offer) return null;

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[17px] border border-[#e8dece] bg-[#fffdf9] shadow-[0_7px_22px_rgba(43,32,18,.065)] transition duration-300 sm:rounded-[22px] sm:shadow-[0_12px_32px_rgba(43,32,18,.06)] md:rounded-[24px] md:hover:-translate-y-1 md:hover:border-[#c8a96a]/70 md:hover:shadow-[0_22px_48px_rgba(43,32,18,.13)]">
      <button
        type="button"
        onClick={() => onQuickView(product)}
        aria-label={"View details for " + product.name}
        className="relative block w-full shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#b88c45]"
      >
        <div className="relative aspect-[1.08/1] overflow-hidden bg-[linear-gradient(145deg,#fffdf9,#eee3d4)] sm:aspect-[1.12/1] md:aspect-[1.05/1] xl:aspect-[4/3]">
          <Image
            src={image}
            alt={product.imageAlt || product.name}
            fill
            sizes="(max-width: 639px) 48vw, (max-width: 1023px) 31vw, (max-width: 1279px) 23vw, 300px"
            className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.035]"
            onError={() => {
              if (!imageFailed) setImageFailed(true);
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#221b12]/20 to-transparent sm:h-20" />
          <span className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/95 text-[#372c1c] shadow-md transition group-hover:bg-[#25221d] group-hover:text-[#efd9a8] sm:bottom-3 sm:right-3 sm:h-9 sm:w-9">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </button>

      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-3.5 md:p-4 lg:p-5">
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="min-h-[2.4em] break-words text-left font-heading text-[15px] font-semibold leading-[1.18] tracking-[-.015em] text-[#27231d] transition hover:text-[#94703a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88c45] sm:text-base md:text-lg"
        >
          {product.name}
        </button>

        <div className="mt-auto border-t border-[#eadfce] pt-3 sm:pt-4">
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
            <span className="whitespace-nowrap text-[11px] font-medium text-[#8b8173] line-through decoration-[#a77b45] sm:text-xs md:text-sm">
              {formatCurrency(offer.originalPrice)}
            </span>
            <span className="shrink-0 rounded-full bg-[#f3e5cb] px-2.5 py-1 text-[10px] font-bold text-[#85551d] sm:text-[11px]">
              {offer.discountPercent}% OFF
            </span>
          </div>
          <p className="mt-2 break-words font-heading text-2xl font-bold leading-tight text-[#29241d] sm:text-2xl md:text-[1.65rem]">
            {formatCurrency(offer.offerPrice)}
          </p>
        </div>
      </div>
    </article>
  );
}

function ProductQuickView({ product, onClose, onGetQuote }) {
  const [active, setActive] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const images = useMemo(() => galleryFor(product), [product]);
  const currentImage = imageFailed ? fallbackFor(product) : (images[active] || product.image);
  const price = getProductPrice(product);
  const offer = getFacebookOffer(product);

  useEffect(() => {
    setActive(0);
    setImageFailed(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [product, onClose]);

  const specifications = [
    product.color ? { label: "Colour", value: product.color } : null,
    product.model ? { label: "Model", value: product.model } : null,
    product.material && !/to be confirmed/i.test(product.material) ? { label: "Material", value: product.material } : null,
    product.configuration ? { label: "Configuration", value: product.configuration } : null,
    product.seating ? { label: "Seating", value: product.seating } : null,
  ].filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        key="facebook-ads-quickview-backdrop"
        className="fixed inset-0 z-[70] bg-[#100f0d]/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        key="facebook-ads-quickview-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={"Quick view: " + product.name}
        className="fixed left-1/2 top-1/2 z-[71] flex max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-[22px] border border-[#dfcfb3] bg-[#f8f3eb] shadow-[0_38px_120px_rgba(0,0,0,.4)] sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)] sm:rounded-[28px] md:grid md:h-[min(92dvh,850px)] md:max-h-[92dvh] md:grid-cols-[.94fr_1.06fr] md:overflow-hidden md:rounded-[32px]"
        initial={{ opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.985 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product preview"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#e7dbc8] bg-white/95 text-[#2b261d] shadow-md transition hover:bg-[#25221d] hover:text-white sm:right-4 sm:top-4"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative bg-[linear-gradient(145deg,#f4ebdc,#e8dbc7)] p-3 sm:p-5 md:min-h-0 md:overflow-y-auto lg:p-6">
          <div className="relative overflow-hidden rounded-[20px] border border-white/80 bg-[linear-gradient(145deg,#fffdfa,#f4e9d8)] shadow-[0_18px_46px_rgba(43,32,18,.10)] sm:rounded-[24px]">
            <div className="relative aspect-[4/3]">
              <Image
                src={currentImage}
                alt={product.imageAlt || product.name}
                fill
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="object-contain p-5 sm:p-8"
                priority
                onError={() => {
                  if (!imageFailed) setImageFailed(true);
                }}
              />
              <div className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.14em] text-[#71562c] shadow-sm sm:left-4 sm:top-4 sm:text-[10px]">
                {product.upcoming ? "Coming soon" : "Metro selection"}
              </div>
            </div>
          </div>
          {images.length > 1 ? (
            <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
              {images.map((src, index) => (
                <button
                  type="button"
                  key={src + "-" + index}
                  onClick={() => { setActive(index); setImageFailed(false); }}
                  aria-label={"Show " + product.name + " image " + (index + 1)}
                  aria-pressed={active === index}
                  className={"relative aspect-[4/3] overflow-hidden rounded-xl border-2 bg-white transition " + (active === index ? "border-[#b38b4a] shadow-md" : "border-white/80 opacity-80 hover:opacity-100")}
                >
                  <Image src={src} alt="" fill sizes="120px" className="object-contain p-1" />
                </button>
              ))}
            </div>
          ) : null}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-white/70 bg-white/55 p-3 text-center">
              <ShieldCheck className="mx-auto h-4 w-4 text-[#9a783c]" />
              <p className="mt-1.5 text-[9px] font-semibold text-[#40382a] sm:text-[10px]">Showroom guidance</p>
            </div>
            <div className="rounded-xl border border-white/70 bg-white/55 p-3 text-center">
              <Sparkles className="mx-auto h-4 w-4 text-[#9a783c]" />
              <p className="mt-1.5 text-[9px] font-semibold text-[#40382a] sm:text-[10px]">Style options</p>
            </div>
            <div className="rounded-xl border border-white/70 bg-white/55 p-3 text-center">
              <MapPin className="mx-auto h-4 w-4 text-[#9a783c]" />
              <p className="mt-1.5 text-[9px] font-semibold text-[#40382a] sm:text-[10px]">Dharmapuri</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 md:min-h-0 md:overflow-y-auto md:p-7 lg:p-9">
          <p className="text-[10px] font-bold uppercase tracking-[.19em] text-[#94723a]">
            {product.category}{product.model ? " / " + product.model : ""}
          </p>
          <h2 className="mt-3 max-w-lg pr-7 font-heading text-[1.8rem] font-medium leading-[1.1] tracking-[-.03em] text-[#28231b] sm:text-4xl">
            {product.name}
          </h2>
          <p className="mt-4 text-sm leading-6 text-[#777064]">
            {product.tagline || product.description || "Ask our showroom team about product details and current availability."}
          </p>

          <div className="mt-5 rounded-[20px] border border-[#e6d9c4] bg-[linear-gradient(135deg,#fffdf7,#f8f0e2)] p-4 sm:p-5">
            <p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#9a7a43]">
              {offer ? "Exclusive Facebook offer" : price ? "Listed catalogue price" : "Made for your next home update"}
            </p>
            {offer ? (
              <>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-[#8b8173] line-through decoration-[#a77b45]">{formatCurrency(offer.originalPrice)}</span>
                  <span className="rounded-full bg-[#a66c27] px-2.5 py-1 text-[10px] font-bold text-white">{offer.discountPercent}% OFF</span>
                </div>
                <p className="mt-1 font-heading text-3xl font-bold text-[#29241d] sm:text-4xl">{formatCurrency(offer.offerPrice)}</p>
                <p className="mt-1 text-xs font-semibold text-[#8a642b]">You save {formatCurrency(offer.savings)} on this Facebook offer.</p>
              </>
            ) : (
              <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
                <p className="font-heading text-2xl font-semibold text-[#29241d] sm:text-3xl">{price || "Request a quote"}</p>
                {product.upcoming ? <span className="rounded-full border border-[#d8c5a1] bg-white/75 px-2.5 py-1 text-[9px] font-semibold text-[#79613a]">Availability on request</span> : null}
              </div>
            )}
            <p className="mt-2 text-xs leading-5 text-[#7c7365]">
              {offer ? "Facebook campaign pricing applies to listed-price products. Confirm current availability, delivery and finish options with our showroom team." : price ? "Confirm current availability, delivery and finish options with our showroom team." : "Ask about availability, options and a personalised quote before you decide."}
            </p>
          </div>

          {specifications.length ? (
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {specifications.map((item) => (
                <div key={item.label} className="rounded-xl border border-[#eee6da] bg-[#fcfaf6] p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-[.12em] text-[#a08a69]">{item.label}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#4b4234]">{item.value}</p>
                </div>
              ))}
            </div>
          ) : null}

          {product.features?.length ? (
            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-[.13em] text-[#6c604d]">Worth a closer look</p>
              <ul className="mt-3 space-y-2.5">
                {product.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs leading-5 text-[#726a5e]">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#f2e6d0] text-[#8a6937]"><Check className="h-3 w-3" /></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onGetQuote(product)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#e9d4a5,#c49a54_60%,#a77a35)] px-4 py-3 text-xs font-bold text-[#231d14] shadow-[0_10px_24px_rgba(168,124,54,.2)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(168,124,54,.29)]"
            >
              <MessageCircle className="h-4 w-4" /> Get exact price & options
            </button>
            <Link
              href={"/product/" + product.slug}
              onClick={onClose}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d9cbb5] bg-white px-4 py-3 text-xs font-bold text-[#453a28] transition hover:border-[#b18a49] hover:bg-[#fbf5e9]"
            >
              Full product details <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 text-center text-[10px] leading-4 text-[#948a7b]">No payment now · Just an enquiry · WhatsApp follow-up available</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function FacebookAdsLanding({
  products: catalogProducts = [],
  product: initialProduct,
  campaign = "facebook-instagram",
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [enquiryProduct, setEnquiryProduct] = useState(null);

  // This ad catalogue only includes products with confirmed numeric catalogue prices,
  // because unpriced/quote-only products cannot truthfully show an old price and discount.
  const saleProducts = useMemo(
    () => catalogProducts.filter((item) => Boolean(getFacebookOffer(item))),
    [catalogProducts]
  );
  const primaryProduct =
    (initialProduct && getFacebookOffer(initialProduct) ? initialProduct : null) ||
    saleProducts[0] ||
    catalogProducts[0];

  const categories = useMemo(() => {
    return ["All", ...new Set(saleProducts.map((item) => item.category).filter(Boolean))];
  }, [saleProducts]);

  const visibleProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    let list = saleProducts.filter((item) => {
      if (activeCategory !== "All" && item.category !== activeCategory) return false;
      if (!searchTerm) return true;
      const text = [
        item.name, item.model, item.category, item.color, item.material,
        item.tagline, item.description, ...(item.tags || []),
      ].filter(Boolean).join(" ").toLowerCase();
      return text.includes(searchTerm);
    });

    if (sort === "price-low") {
      list.sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER));
    } else if (sort === "price-high") {
      list.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    } else if (sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => {
        if (a.id === initialProduct?.id) return -1;
        if (b.id === initialProduct?.id) return 1;
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      });
    }
    return list;
  }, [saleProducts, activeCategory, search, sort, initialProduct?.id]);

  if (!catalogProducts.length) return null;

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f3eb] text-[#27231d]">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 top-64 h-96 w-96 rounded-full bg-[#ddc69b]/20 blur-[100px]" />
        <div className="absolute -right-24 top-[60rem] h-96 w-96 rounded-full bg-[#d7c6ae]/30 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-3 pb-28 pt-3 sm:px-5 sm:pt-5 lg:px-9 lg:pb-14">
        <header className="flex items-center justify-between gap-3 rounded-[20px] border border-white/80 bg-white/80 px-3.5 py-3 shadow-[0_12px_36px_rgba(43,32,18,.055)] backdrop-blur-2xl sm:rounded-[25px] sm:px-6 sm:py-4">
          <Link href="/" aria-label="Metro Furniture homepage" className="inline-flex min-w-0 items-center gap-2.5 sm:gap-4">
            <Image src={business.navLogo} alt={business.name} width={398} height={136} priority className="h-8 w-auto max-w-[132px] object-contain sm:h-10 sm:max-w-[190px]" />
            <span className="hidden h-8 w-px bg-[#dfd0b7] sm:block" />
            <span className="hidden text-[10px] font-bold uppercase tracking-[.18em] text-[#7f6b4a] sm:block">Furniture · Lighting · Living</span>
          </Link>
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#24211c] px-3.5 py-2.5 text-[10px] font-bold text-[#f4dfad] shadow-[0_8px_22px_rgba(32,31,28,.16)] transition hover:-translate-y-0.5 hover:bg-black sm:gap-2 sm:px-5 sm:py-3 sm:text-xs"
          >
            <MessageCircle className="h-4 w-4" /> <span className="hidden sm:inline">Ask our showroom</span><span className="sm:hidden">Enquire</span>
          </a>
        </header>

        <section className="mt-4 overflow-hidden rounded-[26px] bg-[#201d18] text-white shadow-[0_24px_70px_rgba(43,32,18,.16)] sm:mt-6 sm:rounded-[34px] lg:rounded-[40px]">
          <div className="grid min-h-[360px] lg:grid-cols-[.88fr_1.12fr]">
            <div className="relative z-10 flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-10 xl:px-14 xl:py-14">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d6b777]/30 bg-white/[.06] px-3 py-2 text-[9px] font-bold uppercase tracking-[.19em] text-[#e6ca8f] sm:text-[10px]">
                <Sparkles className="h-3.5 w-3.5" /> The Metro edit
              </p>
              <h1 className="mt-5 max-w-xl font-heading text-[2.35rem] font-medium leading-[1.04] tracking-[-.04em] sm:mt-6 sm:text-5xl xl:text-[4rem]">
                Find the piece that feels like <span className="text-[#ddc18a]">home.</span>
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/70 sm:mt-5 sm:text-base sm:leading-7">
                Discover furniture and lighting selected for everyday living. Explore the details, compare your favourites, and ask our showroom team about the options that suit your space.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                <a href="#all-products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#edd9aa,#c49b54_60%,#aa7c38)] px-5 py-3 text-xs font-bold text-[#211c13] shadow-[0_10px_28px_rgba(176,136,65,.2)] transition hover:-translate-y-0.5 sm:px-6 sm:text-sm">
                  Explore the collection <ArrowRight className="h-4 w-4" />
                </a>
                <button type="button" onClick={() => setEnquiryProduct(primaryProduct)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[.06] px-5 py-3 text-xs font-semibold text-white transition hover:bg-white/10 sm:px-6 sm:text-sm">
                  <MessageCircle className="h-4 w-4 text-[#ddc18a]" /> Ask for a quote
                </button>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-[10px] text-white/55 sm:mt-9 sm:gap-x-7 sm:pt-6 sm:text-xs">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#dfc38b]" /> Showroom guidance</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#dfc38b]" /> Dharmapuri</span>
                <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5 text-[#dfc38b]" /> Easy enquiry</span>
              </div>
            </div>
            <div className="relative min-h-[230px] overflow-hidden lg:min-h-[460px]">
              <Image
                src="/homepage/hero/metro-luxury-hero-v2.webp"
                alt="Premium living room inspiration at Metro Furniture"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#201d18] via-[#201d18]/35 to-transparent lg:from-[#201d18]/85 lg:via-[#201d18]/15" />
              <div className="absolute bottom-4 left-4 right-4 rounded-[18px] border border-white/20 bg-[#171511]/55 p-4 backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
                <p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#e4c98f]">Considered choices, personal service</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <p className="max-w-xs font-heading text-xl leading-tight sm:text-2xl">Look closer. Find your favourite.</p>
                  <a href="#all-products" aria-label="Explore all products" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0c48c] text-[#242018] transition hover:scale-105"><ArrowDownRightIcon /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="all-products" className="scroll-mt-5 pt-9 sm:pt-12 lg:pt-16">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#9b793e] sm:text-[11px]">Browse the collection</p>
              <h2 className="mt-2 font-heading text-3xl font-medium tracking-[-.035em] text-[#2b251d] sm:text-4xl lg:text-[2.8rem]">Pieces worth a closer look</h2>
              <p className="mt-2 max-w-2xl text-xs leading-6 text-[#786f61] sm:text-sm">
                Open any piece for more photos, product details and a personalised enquiry. Listed prices are shown where available.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-[#e6d9c6] bg-white/75 px-4 py-2.5 text-xs text-[#726754] shadow-sm lg:self-auto">
              <Sparkles className="h-4 w-4 text-[#aa8348]" />
              <span><strong className="font-semibold text-[#382f22]">{saleProducts.length}</strong> priced offers</span>
            </div>
          </div>

          <div className="mt-6 rounded-[22px] border border-white/80 bg-white/70 p-3 shadow-[0_12px_30px_rgba(43,32,18,.04)] backdrop-blur-xl sm:mt-8 sm:rounded-[26px] sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative min-w-0 flex-1 lg:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#99886f]" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search sofas, lights, colours..."
                  aria-label="Search products"
                  className="h-12 w-full rounded-full border border-[#e8dece] bg-[#fbf9f5] pl-11 pr-4 text-sm text-[#30291f] outline-none transition placeholder:text-[#a39887] focus:border-[#bd9855] focus:bg-white focus:ring-4 focus:ring-[#bd9855]/10"
                />
              </div>
              <label className="flex min-w-0 items-center gap-2 rounded-full border border-[#e8dece] bg-[#fbf9f5] px-4 py-2.5 text-xs text-[#776b58] lg:w-[220px]">
                <SlidersHorizontal className="h-4 w-4 shrink-0 text-[#a1814a]" />
                <span className="shrink-0">Sort by</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)} className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-[#393125] outline-none">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="name">Name: A–Z</option>
                </select>
              </label>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar" aria-label="Filter by category">
              {categories.map((category) => {
                const active = activeCategory === category;
                const count = category === "All" ? saleProducts.length : saleProducts.filter((item) => item.category === category).length;
                return (
                  <button
                    type="button"
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={active}
                    className={"inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2.5 text-[10px] font-semibold transition sm:px-4 sm:text-xs " + (active ? "border-[#25211b] bg-[#25211b] text-[#f0d9a5] shadow-md" : "border-[#e5d9c7] bg-white/80 text-[#685d4a] hover:border-[#c4a269] hover:bg-[#fbf4e6]")}
                  >
                    {category}
                    <span className={"rounded-full px-1.5 py-0.5 text-[9px] " + (active ? "bg-white/10 text-[#f0d9a5]" : "bg-[#f2eadc] text-[#8a7758]")}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-4 mt-6 flex items-center justify-between gap-3 sm:mb-5 sm:mt-7">
            <p className="text-xs text-[#7f7462] sm:text-sm"><strong className="text-[#322b21]">{visibleProducts.length}</strong> {visibleProducts.length === 1 ? "result" : "results"}{activeCategory !== "All" ? " in " + activeCategory : ""}</p>
            {search || activeCategory !== "All" ? (
              <button type="button" onClick={() => { setSearch(""); setActiveCategory("All"); }} className="text-xs font-semibold text-[#876a37] underline decoration-[#d4bd91] underline-offset-4">Clear filters</button>
            ) : null}
          </div>

          {visibleProducts.length ? (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-5">
              {visibleProducts.map((item, index) => (
                <ProductCard key={item.id} product={item} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-[#e8dece] bg-white/70 px-6 py-16 text-center">
              <Search className="mx-auto h-7 w-7 text-[#b29460]" />
              <h3 className="mt-4 font-heading text-2xl text-[#30291f]">No matching pieces yet</h3>
              <p className="mt-2 text-sm text-[#817665]">Try another search or browse all categories.</p>
              <button type="button" onClick={() => { setSearch(""); setActiveCategory("All"); }} className="mt-5 rounded-full bg-[#29241d] px-5 py-3 text-xs font-semibold text-[#f0d9a5]">Show all products</button>
            </div>
          )}
        </section>

        <section className="mt-10 overflow-hidden rounded-[26px] bg-[#24211c] px-5 py-7 text-white shadow-[0_22px_54px_rgba(43,32,18,.13)] sm:mt-14 sm:rounded-[32px] sm:px-8 sm:py-9 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.19em] text-[#ddc187]">Need a little guidance?</p>
            <h2 className="mt-2 max-w-2xl font-heading text-2xl font-medium leading-tight sm:text-3xl">Tell us about your space. We’ll help you choose.</h2>
            <p className="mt-3 max-w-2xl text-xs leading-6 text-white/65 sm:text-sm">Ask about dimensions, finishes, current availability and delivery before making your decision.</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5 lg:mt-0 lg:shrink-0">
            <a href={business.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e2c58c] px-5 py-3 text-xs font-bold text-[#262015] transition hover:bg-[#f0d9a9] sm:text-sm"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-semibold text-white transition hover:bg-white/10 sm:text-sm"><MapPin className="h-4 w-4 text-[#e2c58c]" /> Visit showroom</Link>
          </div>
        </section>

        <footer className="mt-6 flex flex-col gap-2 border-t border-[#ded0ba] pt-4 text-center text-[10px] text-[#857a68] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <span>© {new Date().getFullYear()} {business.name} · Dharmapuri, Tamil Nadu</span>
          <span>Thoughtful choices for everyday living.</span>
        </footer>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e2d5bf] bg-[#f8f4ec]/95 p-3 backdrop-blur-xl sm:hidden">
        <div className="mx-auto flex max-w-lg gap-2">
          <a href="#all-products" className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[#d9cbb5] bg-white px-4 text-xs font-semibold text-[#423725]">Explore pieces <ChevronRight className="h-4 w-4" /></a>
          <button type="button" onClick={() => setEnquiryProduct(primaryProduct)} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#e9d4a5,#c49a54)] px-4 text-xs font-bold text-[#211c13]"><MessageCircle className="h-4 w-4" /> Get a quote</button>
        </div>
      </div>

      {quickViewProduct ? (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onGetQuote={(selected) => {
            setQuickViewProduct(null);
            setEnquiryProduct(selected);
          }}
        />
      ) : null}

      <ProductEnquiryModal
        product={enquiryProduct || primaryProduct}
        open={Boolean(enquiryProduct)}
        onClose={() => setEnquiryProduct(null)}
        source={"Facebook / Instagram Ads (" + campaign + ")"}
      />
    </div>
  );
}

function ArrowDownRightIcon() {
  return <ArrowUpRight className="h-5 w-5 rotate-45" />;
}
