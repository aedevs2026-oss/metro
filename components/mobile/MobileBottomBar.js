"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, LayoutGrid, Menu, ShoppingBag } from "lucide-react";
import { business, mobileBottomNav } from "@/data/business";
import { isMobileMoreRoute, isNavLinkActive } from "@/lib/nav-utils";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import MobileMoreSheet from "@/components/mobile/MobileMoreSheet";

const ICONS = {
  home: Home,
  shop: ShoppingBag,
  rooms: LayoutGrid,
  more: Menu,
};

export default function MobileBottomBar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  const whatsappHref = buildWhatsAppUrl(generalEnquiryMessage());

  return (
    <>
      <nav
        className="mobile-bottom-bar fixed inset-x-0 bottom-0 z-[70] border-t border-black/10 bg-[#0a0a0a]/95 backdrop-blur-xl lg:hidden"
        aria-label="Mobile app navigation"
      >
        <ul className="mx-auto flex max-w-lg items-end justify-around px-1 pt-1.5">
          {mobileBottomNav.map((item) => {
            if (item.center) {
              return (
                <li key={item.id} className="flex flex-1 justify-center">
                  <Link
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-bottom-fab -mt-5 flex h-[3.35rem] w-[3.35rem] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] ring-4 ring-[#0a0a0a]"
                    aria-label="Chat on WhatsApp"
                  >
                    <Image
                      src="/icons/common/whatsapp-white.svg"
                      alt=""
                      width={26}
                      height={26}
                      className="h-6 w-6 object-contain"
                    />
                  </Link>
                </li>
              );
            }

            if (item.id === "more") {
              const active = isMobileMoreRoute(pathname);
              const Icon = ICONS.more;
              return (
                <li key={item.id} className="flex flex-1 justify-center">
                  <button
                    type="button"
                    onClick={() => setMoreOpen(true)}
                    className={`mobile-bottom-tab flex w-full max-w-[4.5rem] flex-col items-center gap-0.5 pb-2 pt-1 ${
                      active || moreOpen ? "text-accent" : "text-white/65"
                    }`}
                    aria-expanded={moreOpen}
                  >
                    <Icon className="h-[1.35rem] w-[1.35rem]" strokeWidth={active ? 2.25 : 1.75} />
                    <span className="text-[10px] font-semibold leading-none">{item.label}</span>
                  </button>
                </li>
              );
            }

            const active = isNavLinkActive(pathname, hash, item.href);
            const Icon = ICONS[item.icon] || Home;

            return (
              <li key={item.id} className="flex flex-1 justify-center">
                <Link
                  href={item.href}
                  className={`mobile-bottom-tab flex w-full max-w-[4.5rem] flex-col items-center gap-0.5 pb-2 pt-1 ${
                    active ? "text-accent" : "text-white/65"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-[1.35rem] w-[1.35rem]" strokeWidth={active ? 2.25 : 1.75} />
                  <span className="text-[10px] font-semibold leading-none">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <MobileMoreSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
    </>
  );
}
