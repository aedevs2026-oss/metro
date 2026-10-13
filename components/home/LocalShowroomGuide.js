import Link from "next/link";
import { ArrowRight, Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/business";
import { categories } from "@/data/categories";
import { areaServed, localFaq } from "@/data/seo-local";

export default function LocalShowroomGuide() {
  const priorityCategories = categories.filter((category) =>
    ["Corner Sofas", "Sofas", "Dining", "Mattresses", "Chandeliers", "Wall Lights"].includes(category.id),
  );

  return (
    <section className="relative overflow-hidden bg-[#f1e9dd] py-14 sm:py-16 lg:py-20" aria-labelledby="local-showroom-guide-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(200,169,106,.2),transparent_42%),radial-gradient(ellipse_at_95%_100%,rgba(42,37,28,.05),transparent_42%)]" aria-hidden="true" />
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow text-accent-dark">Local furniture advice</p>
          <h2 id="local-showroom-guide-heading" className="mt-3 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">Your furniture showroom in Dharmapuri</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-body sm:text-base">
            Visit Metro Furniture on Salem Main Road, Senthil Nagar, to explore sofas, corner sofas, dining furniture, mattresses and statement lighting in person. Compare the available designs, ask about finishes and customisation, and get product-specific guidance before you decide.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[.85fr_1.15fr] lg:gap-6">
          <div className="glass glass-reflection rounded-[26px] p-5 shadow-[0_18px_50px_rgba(30,25,17,.08)] sm:p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[.17em] text-accent-dark">Showroom details</p>
            <h3 className="mt-3 font-heading text-2xl font-medium">Plan a personal visit</h3>
            <div className="mt-5 space-y-4">
              <DetailRow icon={MapPin} title="Address" text={`${business.address.line1}, ${business.address.line2}, ${business.address.city}, ${business.address.state} ${business.address.pin}`} />
              <DetailRow icon={Clock3} title="Opening hours" text={business.hours} />
              <DetailRow icon={Phone} title="Call the team" text={`+91 ${business.primaryPhone}`} />
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <a href="https://www.google.com/maps/search/?api=1&query=Metro+Furniture+Senthil+Nagar+Salem+Main+Road+Dharmapuri" target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#211f1b] px-4 py-3 text-xs font-semibold text-white transition hover:bg-black"><MapPin className="h-4 w-4 text-[#dfc58e]" /> Get directions</a>
              <a href={business.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-accent/40 bg-white/80 px-4 py-3 text-xs font-semibold text-foreground transition hover:bg-white"><MessageCircle className="h-4 w-4 text-accent-dark" /> WhatsApp us</a>
            </div>
          </div>

          <div className="rounded-[26px] border border-white/70 bg-white/55 p-5 shadow-[0_18px_50px_rgba(30,25,17,.05)] backdrop-blur-2xl sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.17em] text-accent-dark">Shop by category</p>
                <h3 className="mt-2 font-heading text-2xl font-medium">Find the right fit for your home</h3>
              </div>
              <Link href="/shop" className="inline-flex items-center gap-1 text-xs font-semibold text-accent-dark hover:underline">All products <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {priorityCategories.map((category) => (
                <Link key={category.id} href={`/shop/${category.slug}`} className="group flex items-center justify-between gap-3 rounded-2xl border border-[#e6dac7]/75 bg-white/70 px-4 py-3 transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-white hover:shadow-md">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{category.name}</p>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-body">{category.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#ad8d54] transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[26px] border border-white/75 bg-white/55 p-5 shadow-[0_16px_45px_rgba(30,25,17,.04)] backdrop-blur-xl sm:p-7">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[.17em] text-accent-dark">Nearby areas</p>
            <h3 className="mt-2 font-heading text-2xl font-medium">Serving Dharmapuri and neighbouring towns</h3>
            <p className="mt-2 text-sm leading-6 text-body">Customers can contact our team about furniture selection and delivery to nearby locations. Delivery coverage, charges and timelines depend on the destination and item, so please confirm your address before ordering.</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {areaServed.map((place) => <span key={place} className="rounded-full border border-[#ded0b9] bg-white/75 px-3 py-1.5 text-[11px] font-medium text-[#665944]">{place}</span>)}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[.17em] text-accent-dark">Common questions</p>
            <h3 className="mt-2 font-heading text-2xl font-medium sm:text-3xl">Before you visit Metro Furniture</h3>
          </div>
          <div className="mt-5 space-y-2">
            {localFaq.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-white/80 bg-white/70 px-4 py-4 shadow-sm backdrop-blur-xl open:border-accent/35 open:bg-white sm:px-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-foreground marker:hidden">
                  <span>{item.question}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#e4d5bb] text-accent-dark transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pt-3 text-sm leading-6 text-body">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailRow({ icon: Icon, title, text }) {
  return <div className="flex items-start gap-3">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-white/80 text-accent-dark"><Icon className="h-4 w-4" /></span>
    <div><p className="text-xs font-semibold text-foreground">{title}</p><p className="mt-1 text-xs leading-5 text-body">{text}</p></div>
  </div>;
}
