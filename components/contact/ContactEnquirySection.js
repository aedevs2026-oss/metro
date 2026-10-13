import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { branches, business } from "@/data/business";
import { contactQuickContact, showroomExteriorImage } from "@/data/contact";
import { formatPhone, telHref } from "@/lib/format";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

const quickContacts = [
  {
    id: "phone",
    label: "Primary Number",
    value: `+91 ${formatPhone(business.phones[0])}`,
    href: telHref(business.phones[0]),
    Icon: Phone,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: `+91 ${formatPhone(business.phones[1] || business.primaryPhone)}`,
    href: business.whatsappUrl,
    external: true,
    Icon: MessageCircle,
  },
  {
    id: "email",
    label: "Email Us",
    value: business.email,
    href: `mailto:${business.email}`,
    Icon: Mail,
  },
  {
    id: "hours",
    label: "Working Hours",
    value: business.hours,
    href: null,
    Icon: Clock,
  },
];

function ShowroomCard({ branch }) {
  if (!branch) return null;

  return (
    <article className="overflow-hidden rounded-2xl border border-[#e8e2da] bg-[#faf7f2] shadow-[0_10px_36px_rgba(17,24,39,0.06)]">
      <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(132px,168px)]">
        <div className="flex flex-col justify-center p-5 md:p-6">
          <p className="section-eyebrow text-accent-dark">Visit Our Showroom</p>
          <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">{branch.name}</h3>
          <address className="mt-3 flex gap-2 not-italic text-xs leading-relaxed text-body sm:text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
            <span>
              {branch.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </address>
          <Link
            href={branch.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-primary mt-4 inline-flex w-fit text-xs sm:text-sm"
          >
            Get Directions
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="relative min-h-[168px] sm:min-h-full">
          <Image
            src={showroomExteriorImage}
            alt={`${branch.name} exterior`}
            fill
            quality={HOME_PHOTO_QUALITY}
            sizes="168px"
            className="object-cover"
          />
        </div>
      </div>
    </article>
  );
}

function QuickContactCard() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 text-white shadow-[0_22px_60px_rgba(0,0,0,0.28)] md:p-7"
      style={{
        backgroundImage:
          "linear-gradient(160deg, rgba(255,255,255,0.04), transparent 40%), radial-gradient(ellipse 80% 55% at 100% 0%, rgba(200,169,106,0.14), transparent 58%)",
      }}
    >
      <h2 className="font-heading text-xl font-semibold md:text-[1.65rem]">{contactQuickContact.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/55">{contactQuickContact.description}</p>

      <ul className="mt-6 space-y-2.5">
        {quickContacts.map((item) => {
          const Icon = item.Icon;
          const row = (
            <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-black/25 px-3.5 py-3 transition hover:border-accent/35 hover:bg-white/[0.05]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-gradient-to-br from-[#e8d5a8] to-[#c8a96a] text-[#1a1c20]">
                <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white/95">{item.value}</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/45">{item.label}</p>
              </div>
            </div>
          );

          return (
            <li key={item.id}>
              {item.href ? (
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  {row}
                </Link>
              ) : (
                row
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function ContactEnquirySection() {
  const branch = branches[0];

  return (
    <section className="bg-[#f7f3f0] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.68fr)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:gap-10">
          <ContactForm variant="premium" />
          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <QuickContactCard />
            <ShowroomCard branch={branch} />
          </div>
        </div>
      </div>
    </section>
  );
}