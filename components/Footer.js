import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { branches, business, navLinks } from "@/data/business";
import { formatPhone, telHref } from "@/lib/format";

const footerProducts = [
  { label: "Sofas & Recliners", href: "/shop/sofas" },
  { label: "Dining Sets", href: "/shop/dining" },
  { label: "Beds & Mattresses", href: "/shop/mattresses" },
  { label: "Lighting", href: "/shop/chandeliers" },
  { label: "Home Decor", href: "/shop/chandeliers" },
  { label: "Office Furniture", href: "/shop/chairs" },
];

export default function Footer() {
  const branch = branches[0];

  return (
    <footer
      className="site-footer mt-auto border-t border-white/10 bg-[#0a0a0a] text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="space-y-4 lg:max-w-xs">
            <Image
              src={business.logo}
              alt={business.name}
              width={180}
              height={64}
              className="h-11 w-auto object-contain"
            />
            <p className="text-sm leading-relaxed text-white/75">
              {business.tagline}. Premium sofas, dining, beds and home furnishings on Salem Main Road,
              Dharmapuri.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-sm font-bold text-white/80 transition hover:border-accent hover:text-accent"
                aria-label="Facebook"
              >
                f
              </Link>
              <Link
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:border-accent hover:text-accent"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[10px] font-bold text-white/80 transition hover:border-accent hover:text-accent"
                aria-label="YouTube"
              >
                YT
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[10px] font-bold text-white/80 transition hover:border-accent hover:text-accent"
                aria-label="LinkedIn"
              >
                in
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-base font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-accent"
                  >
                    {link.href === "/about" ? "About Us" : link.label}
                  </Link>
                </li>
              ))}
              <li><Link href="/customize" className="text-sm text-white/70 transition hover:text-accent">Customise Furniture</Link></li>
              <li><Link href="/room-measurement" className="text-sm text-white/70 transition hover:text-accent">Room Measurement Assistant</Link></li>
              <li><Link href="/book-showroom" className="text-sm text-white/70 transition hover:text-accent">Book a Showroom Visit</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-base font-semibold text-white">Our Products</h3>
            <ul className="space-y-2.5">
              {footerProducts.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="text-sm text-white/70 transition hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-base font-semibold text-white">Contact Us</h3>
            {branch ? (
              <address className="mb-4 flex gap-2 not-italic text-sm leading-relaxed text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span>
                  {branch.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </address>
            ) : null}
            <ul className="space-y-2.5">
              {business.phones.slice(0, 1).map((phone) => (
                <li key={phone}>
                  <Link
                    href={telHref(phone)}
                    className="inline-flex items-center gap-2 text-sm text-white/85 transition hover:text-accent"
                  >
                    <Phone className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                    +91 {formatPhone(phone)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`mailto:${business.email}`}
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-accent"
                >
                  <Mail className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                  {business.email}
                </Link>
              </li>
              <li className="text-sm text-white/60">{business.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/contact" className="hover:text-accent">
              Privacy Policy
            </Link>
            <span aria-hidden>|</span>
            <Link href="/contact" className="hover:text-accent">
              Terms &amp; Conditions
            </Link>
            <span aria-hidden>|</span>
            <Link href="/sitemap.xml" className="hover:text-accent">
              Sitemap
            </Link>
          </div>
          <p className="text-center md:text-right">Designed with care for better homes</p>
        </div>
      </div>
    </footer>
  );
}
