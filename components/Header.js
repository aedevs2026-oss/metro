"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, GitCompareArrows } from "lucide-react";
import { business, navLinks } from "@/data/business";
import HeaderSearch from "@/components/HeaderSearch";
import { isNavLinkActive } from "@/lib/nav-utils";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header sticky top-0 z-50 w-full border-b border-white/10 bg-black shadow-nav transition-all duration-300">
      <div
        className={`container relative flex items-center gap-2 transition-all duration-300 sm:gap-3 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-6 xl:gap-8 ${
          scrolled ? "py-2" : "max-lg:py-2 py-2.5 md:py-3"
        }`}
      >
        <Link
          href="/"
          className="header-logo-panel group relative flex min-w-0 shrink-0 items-center pr-2 sm:pr-4 lg:justify-self-start lg:pr-6"
        >
          <span className="relative z-[1] flex h-9 items-center sm:h-11 md:h-12">
            <Image
              src={business.navLogo}
              alt={business.name}
              width={398}
              height={136}
              sizes="(max-width: 640px) 124px, (max-width: 1023px) 142px, 178px"
              className="h-full w-auto max-h-9 object-contain object-left sm:max-h-11 md:max-h-12 [background:transparent] drop-shadow-[0_1px_7px_rgba(0,0,0,0.08)]"
              priority
            />
          </span>
        </Link>

        <nav
          className="hidden items-center justify-center gap-0.5 lg:flex lg:justify-self-center xl:gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const active = isNavLinkActive(pathname, hash, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-2.5 py-2.5 text-sm font-medium transition duration-200 xl:px-3.5 ${
                  active ? "text-white" : "text-white/78 hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                {active ? (
                  <span
                    className="absolute bottom-0 left-2.5 right-2.5 h-[2px] rounded-full bg-accent xl:left-3 xl:right-3"
                    aria-hidden
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-2.5 lg:col-start-3 lg:ml-0 lg:flex-initial lg:justify-self-end xl:gap-3">
          <HeaderSearch
            className="hidden max-w-[260px] lg:flex xl:max-w-[300px]"
            variant="dark"
          />

          <HeaderSearch
            className="flex min-w-0 flex-1 max-lg:max-w-none lg:hidden"
            variant="dark"
            placeholder="Search..."
          />

          <Link href="/wishlist" className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:border-accent hover:text-accent lg:inline-flex" aria-label="Saved favourites" title="Saved favourites"><Heart className="h-4 w-4" /></Link>
          <Link href="/compare" className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:border-accent hover:text-accent lg:inline-flex" aria-label="Compare products" title="Compare products"><GitCompareArrows className="h-4 w-4" /></Link>

          <Link
            href={business.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#25D366] text-white shadow-[0_5px_16px_rgba(37,211,102,.22)] transition hover:brightness-110 sm:h-10 sm:w-10 lg:inline-flex"
            aria-label="Chat on WhatsApp"
          >
            <Image
              src="/icons/common/whatsapp-white.svg"
              alt=""
              width={22}
              height={22}
              className="h-[1.35rem] w-[1.35rem] object-contain"
            />
          </Link>

          <Link
            href="/contact"
            className="hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-primary-dark shadow-sm transition hover:brightness-105 lg:inline-flex xl:px-5"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </header>
  );
}
