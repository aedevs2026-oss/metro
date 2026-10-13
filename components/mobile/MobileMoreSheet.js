"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { business, mobileMoreLinks } from "@/data/business";
import { isNavLinkActive } from "@/lib/nav-utils";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { telHref, formatPhone } from "@/lib/format";

export default function MobileMoreSheet({ open, onClose }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  if (!open) return null;

  const whatsappHref = buildWhatsAppUrl(generalEnquiryMessage());

  return (
    <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true" aria-label="More menu">
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="mobile-more-sheet absolute inset-x-0 bottom-0 max-h-[min(88dvh,640px)] overflow-hidden rounded-t-2xl border-t border-[#e8ddd0] bg-[#faf7f2] shadow-[0_-16px_48px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between border-b border-[#ebe3d8] px-5 py-4">
          <p className="font-heading text-lg font-semibold text-foreground">Explore Metro</p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-body shadow-sm"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-3" aria-label="More navigation">
          {mobileMoreLinks.map((link) => {
            const active = isNavLinkActive(pathname, hash, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition ${
                  active
                    ? "bg-accent/15 text-accent-dark"
                    : "bg-white text-foreground active:bg-[#f3ebe0]"
                }`}
              >
                {link.label}
                <ArrowRight className="h-4 w-4 opacity-40" aria-hidden />
              </Link>
            );
          })}
        </nav>

        <div className="grid grid-cols-2 gap-2 border-t border-[#ebe3d8] p-4">
          <Link
            href={telHref(business.primaryPhone)}
            onClick={onClose}
            className="flex flex-col items-center justify-center rounded-xl border border-[#e5d9c8] bg-white py-4 text-center"
          >
            <span className="text-xs font-semibold text-foreground">Call Us</span>
            <span className="mt-1 text-[11px] text-body">{formatPhone(business.primaryPhone)}</span>
          </Link>
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex flex-col items-center justify-center gap-1 rounded-xl bg-[#25D366] py-4 text-center text-white"
          >
            <Image
              src="/icons/common/whatsapp-white.svg"
              alt=""
              width={22}
              height={22}
              className="h-5 w-5 object-contain"
            />
            <span className="text-xs font-semibold">WhatsApp</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
