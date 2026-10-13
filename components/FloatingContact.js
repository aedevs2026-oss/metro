import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { business } from "@/data/business";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

export default function FloatingContact() {
  const whatsappHref = buildWhatsAppUrl(generalEnquiryMessage());

  return (
    <div className="fixed bottom-5 right-5 z-50 hidden flex-col gap-3 lg:flex">
      <Link
        href={`tel:${business.primaryPhone}`}
        aria-label={`Call ${business.primaryPhone}`}
        className="flex h-13 w-13 items-center justify-center rounded-full bg-primary text-white shadow-[0_12px_30px_rgba(17,24,39,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-primary-dark animate-float-soft"
      >
        <Phone size={22} strokeWidth={2.2} />
      </Link>

      <Link
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#1ebe5d] animate-wa-pulse"
      >
        <Image src="/icons/common/whatsapp-white.svg" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
      </Link>
    </div>
  );
}
