import ContactEnquirySection from "@/components/contact/ContactEnquirySection";
import ContactHero from "@/components/contact/ContactHero";
import ContactMapSection from "@/components/contact/ContactMapSection";
import ContactWhyChoose from "@/components/contact/ContactWhyChoose";
import { business } from "@/data/business";
import { contactHero, contactWhyChoose } from "@/data/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Metro Furniture Dharmapuri",
  description: `Visit or call ${business.name}, No 1860 Salem Main Road, Senthil Nagar, Dharmapuri TN 636701. Phone +91 ${business.primaryPhone}, WhatsApp, email & map directions. Open ${business.hours}.`,
  path: "/contact",
  keywords: ["Contact", "WhatsApp", "Google Maps", "Dharmapuri", "furniture showroom address Dharmapuri"],
});

export default function ContactPage() {
  return (
    <div className="bg-[#f7f3f0]">
      <ContactHero content={contactHero} />
      <ContactEnquirySection />
      <ContactMapSection />
      <ContactWhyChoose section={contactWhyChoose} />
    </div>
  );
}
