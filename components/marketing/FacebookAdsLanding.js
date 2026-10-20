"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronRight,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ProductEnquiryModal from "@/components/ProductEnquiryModal";
import { business } from "@/data/business";

function galleryFor(product) {
  const list = product?.images?.length ? product.images : product?.image ? [product.image] : [];
  return [...new Set(list)].slice(0, 4);
}

export default function FacebookAdsLanding({ product, campaign = "facebook-instagram" }) {
  const images = useMemo(() => galleryFor(product), [product]);
  const [active, setActive] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  if (!product) return null;
  const featureList = (product.features || []).slice(0, 4);
  const highlights = featureList.length ? featureList : [
    "Premium finish and thoughtful design",
    "Guidance on available colours and sizes",
    "Product details confirmed by our showroom team",
    "Personalised quote before you decide",
  ];
  const image = images[active] || product.image;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f5ef] text-[#20201f]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 top-28 h-96 w-96 rounded-full bg-[#e9d7b0]/40 blur-[100px]" />
        <div className="absolute -right-24 top-[35rem] h-96 w-96 rounded-full bg-[#d8c5ab]/40 blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.55),transparent_40%,rgba(210,189,148,.10))]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-24 pt-4 sm:px-6 sm:pt-6 lg:px-10 lg:pb-12">
        <header className="flex items-center justify-between gap-3 rounded-[22px] border border-white/75 bg-white/65 px-4 py-3 shadow-[0_12px_38px_rgba(37,30,19,.06)] backdrop-blur-2xl sm:px-6">
          <Link href="/" aria-label="Metro Furniture homepage" className="inline-flex items-center gap-3">
            <Image src={business.navLogo} alt={business.name} width={398} height={136} priority className="h-8 w-auto max-w-[155px] object-contain sm:h-10 sm:max-w-[190px]" />
            <span className="hidden h-7 w-px bg-[#c9b998] sm:block" />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[.18em] text-[#76684f] sm:block">Curated living</span>
          </Link>
          <button type="button" onClick={() => setEnquiryOpen(true)} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#c7a96d]/50 bg-[#201f1c] px-4 py-2.5 text-xs font-semibold text-[#f7e6bd] shadow-[0_8px_22px_rgba(32,31,28,.16)] transition hover:-translate-y-0.5 hover:bg-black sm:px-5 sm:text-sm">
            <MessageCircle className="h-4 w-4" /> Get exact price
          </button>
        </header>

        <div className="mt-5 flex flex-wrap items-center gap-2 px-1 text-[10px] font-semibold uppercase tracking-[.16em] text-[#817258] sm:mt-7 sm:text-[11px]">
          <span>Metro Furniture</span><ChevronRight className="h-3 w-3" /><span>{product.category}</span><ChevronRight className="h-3 w-3" /><span className="text-[#24221e]">{product.name}</span>
        </div>

        <section className="grid items-start gap-5 py-5 md:gap-7 lg:grid-cols-[1.05fr_.95fr] lg:py-7 xl:gap-10">
          <div className="space-y-3">
            <div className="group relative overflow-hidden rounded-[28px] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,.92),rgba(237,227,211,.9))] p-2 shadow-[0_22px_65px_rgba(46,35,20,.12)] backdrop-blur-xl sm:rounded-[34px] sm:p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#eee6da] sm:rounded-[27px]">
                {!imageFailed && image ? (
                  <Image src={image} alt={product.imageAlt || `${product.name} furniture at Metro Furniture Dharmapuri`} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-contain p-3 transition duration-700 group-hover:scale-[1.02] sm:p-7" onError={() => setImageFailed(true)} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-sm text-[#71644f]">Product photo available from our showroom team</div>
                )}
                <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.13em] text-[#5f4c2c] shadow-sm backdrop-blur-xl sm:left-5 sm:top-5">
                  <Sparkles className="h-3.5 w-3.5" /> Signature selection
                </div>
                {product.model ? <div className="absolute bottom-3 right-3 rounded-full border border-white/50 bg-[#1c1b18]/75 px-3 py-1.5 text-[10px] font-medium tracking-[.12em] text-white backdrop-blur-xl sm:bottom-5 sm:right-5">{product.model}</div> : null}
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-2 p-1 pt-3 sm:gap-3 sm:p-2 sm:pt-4">
                  {images.map((item, index) => (
                    <button key={`${item}-${index}`} type="button" onClick={() => { setActive(index); setImageFailed(false); }} aria-label={`View ${product.name} image ${index + 1}`} aria-pressed={active === index} className={`relative aspect-[4/3] overflow-hidden rounded-xl border bg-white/85 transition sm:rounded-2xl ${active === index ? "border-[#b89551] ring-2 ring-[#c8a96a]/35" : "border-[#e8dece] opacity-80 hover:opacity-100"}`}>
                      <Image src={item} alt={`${product.name} view ${index + 1}`} fill sizes="160px" className="object-contain p-1" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <TrustTile icon={ShieldCheck} title="Quality-focused" caption="Selected materials" />
              <TrustTile icon={Sparkles} title="Personalised" caption="Style guidance" />
              <TrustTile icon={MapPin} title="Visit in person" caption="Dharmapuri showroom" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,.91),rgba(255,252,246,.78))] p-5 shadow-[0_22px_65px_rgba(46,35,20,.10)] backdrop-blur-2xl sm:rounded-[34px] sm:p-7 lg:p-8 xl:p-10">
            <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full border border-[#c8a96a]/20" aria-hidden="true" />
            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#c8a96a]/30 bg-[#fbf4e6] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.17em] text-[#856b3d]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b89551]" /> Made for your space
              </p>
              <h1 className="mt-4 max-w-xl font-heading text-[2.15rem] font-medium leading-[1.1] tracking-[-.035em] text-[#25231f] sm:text-4xl xl:text-[3.2rem]">{product.name}<span className="mt-1 block text-[#9a7a42]">Designed to live beautifully.</span></h1>
              <p className="mt-4 text-sm leading-7 text-[#716a5e] sm:text-[15px]">{product.tagline || product.description || `Discover ${product.name} at Metro Furniture, Dharmapuri. Talk with our team about the details and options for your home.`}</p>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] text-[#716a5e]">
                <span className="rounded-full border border-[#e9dfcf] bg-white/80 px-3 py-1.5">{product.category}</span>
                {product.model ? <span className="rounded-full border border-[#e9dfcf] bg-white/80 px-3 py-1.5">Model {product.model}</span> : null}
                {product.color ? <span className="rounded-full border border-[#e9dfcf] bg-white/80 px-3 py-1.5">{product.color}</span> : null}
              </div>

              <div className="mt-6 rounded-[22px] border border-[#d9c9a9]/60 bg-white/60 p-4 backdrop-blur-xl sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#91784e]">Personalised product quote</p>
                    <p className="mt-1.5 font-heading text-2xl font-medium text-[#27241e]">Get the right price for your needs</p>
                    <p className="mt-1 text-xs leading-5 text-[#7b7366]">Ask about available sizes, finishes, colours and current availability.</p>
                  </div>
                  <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#211f1b] text-[#e5cb92] sm:flex"><ArrowDownRight className="h-5 w-5" /></span>
                </div>
                <button type="button" onClick={() => setEnquiryOpen(true)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#d9c28f,#b18e4c)] px-5 py-4 text-sm font-semibold text-[#211f1a] shadow-[0_10px_30px_rgba(169,131,62,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(169,131,62,.3)]">
                  Request my exact quote <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-[10px] leading-4 text-[#81796d]">No payment now · Quick form · Continue on WhatsApp</p>
              </div>

              <div className="mt-6">
                <h2 className="font-heading text-xl font-medium">Details worth knowing</h2>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {highlights.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5 rounded-2xl border border-white/80 bg-white/55 p-3 text-xs leading-5 text-[#625b50]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9b793d]" />{feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-[28px] border border-white/80 bg-white/55 p-5 shadow-[0_15px_44px_rgba(46,35,20,.06)] backdrop-blur-2xl sm:grid-cols-[.8fr_1.2fr] sm:items-center sm:p-7">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.17em] text-[#967742]">A simple next step</p>
            <h2 className="mt-2 font-heading text-2xl font-medium leading-tight sm:text-3xl">See it. Ask questions. Decide confidently.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <StepCard number="01" title="Share your details" description="Tell us your name, phone and city." />
            <StepCard number="02" title="Discuss your needs" description="Ask about finish, size and current availability." />
            <StepCard number="03" title="Get the quote" description="Our team continues the conversation on WhatsApp." />
          </div>
        </section>

        <section className="mt-5 flex flex-col gap-4 rounded-[26px] border border-[#d9c8a5]/45 bg-[#211f1b] p-5 text-white shadow-[0_16px_42px_rgba(26,24,20,.16)] sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#dfc58e]">Visit our showroom</p>
            <h2 className="mt-1 font-heading text-xl font-medium sm:text-2xl">Explore Metro Furniture in Dharmapuri</h2>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-white/65">No. 1860, Salem Main Road, Senthil Nagar, near Vincent Kalyana Mandapam · {business.hours}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="https://www.google.com/maps/search/?api=1&query=Metro+Furniture+Senthil+Nagar+Salem+Main+Road+Dharmapuri" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-xs font-semibold transition hover:bg-white/10"><MapPin className="h-4 w-4 text-[#dfc58e]" /> Get directions</a>
            <button type="button" onClick={() => setEnquiryOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d8bd80] px-4 py-3 text-xs font-semibold text-[#211f1b] transition hover:bg-[#e9d7ad]"><MessageCircle className="h-4 w-4" /> Enquire now</button>
          </div>
        </section>

        <footer className="mt-6 flex flex-col gap-2 border-t border-[#d8c9b1] pt-4 text-center text-[10px] text-[#82796b] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <span>© {new Date().getFullYear()} Metro Furniture · Dharmapuri, Tamil Nadu</span>
          <Link href={`/product/${product.slug}`} className="inline-flex items-center justify-center gap-1 font-semibold text-[#856b3d] hover:underline">View full product details <ArrowRight className="h-3 w-3" /></Link>
        </footer>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/30 bg-[#f8f5ef]/90 p-3 backdrop-blur-2xl sm:hidden">
        <button type="button" onClick={() => setEnquiryOpen(true)} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#d9c28f,#b18e4c)] px-5 py-3.5 text-sm font-semibold text-[#211f1a] shadow-md"><MessageCircle className="h-4 w-4" /> Get exact price</button>
      </div>

      <ProductEnquiryModal product={product} open={enquiryOpen} onClose={() => setEnquiryOpen(false)} source={`Facebook / Instagram Ads (${campaign})`} />
    </div>
  );
}

function TrustTile({ icon: Icon, title, caption }) {
  return <div className="rounded-2xl border border-white/80 bg-white/55 px-2 py-3 text-center shadow-sm backdrop-blur-xl sm:px-3 sm:py-4">
    <Icon className="mx-auto h-4 w-4 text-[#a48144] sm:h-5 sm:w-5" />
    <p className="mt-1.5 text-[10px] font-semibold text-[#38342c] sm:text-xs">{title}</p>
    <p className="mt-0.5 text-[9px] leading-4 text-[#877e70] sm:text-[10px]">{caption}</p>
  </div>;
}

function StepCard({ number, title, description }) {
  return <div className="rounded-2xl border border-[#e8dece] bg-white/65 p-4 backdrop-blur-lg">
    <span className="font-heading text-2xl text-[#ac8a4d]">{number}</span>
    <h3 className="mt-1 text-xs font-semibold text-[#292720]">{title}</h3>
    <p className="mt-1 text-[10px] leading-4 text-[#776f62]">{description}</p>
  </div>;
}
