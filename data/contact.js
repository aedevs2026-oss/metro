import { marketingImages } from "@/data/marketing-images";

/** Contact page copy & assets */
export const contactHero = {
  eyebrow: "Contact Us",
  title: "Let's Create Your\nDream Space",
  description:
    "Whether you're planning a single room or an entire home, we're here to help you choose furniture that fits your lifestyle and budget.",
  image: marketingImages.contactHero,
  imageFallback: marketingImages.contactHeroLocal,
  scriptTagline: "Your Space Our Passion",
  features: [
    { id: "guide", label: "Expert Guidance", icon: "/icons/home/expert-assistance.svg" },
    { id: "custom", label: "Customisation Support", icon: "/icons/home/customization.svg" },
    { id: "visit", label: "Showroom Visit", icon: "/icons/home/showroom.svg" },
    { id: "quick", label: "Quick Response", icon: "/icons/home/after-sales.svg" },
  ],
};

export const contactQuickContact = {
  title: "Quick Contact",
  description: "Talk to our team directly for product details, pricing and showroom visits.",
};

export const contactWhyChoose = {
  eyebrow: "Why Choose Metro Furniture",
  title: "More Than Just a\nFurniture Store",
  items: [
    {
      id: "quality",
      title: "Premium Quality",
      description: "Durable & long-lasting furniture for every space.",
      icon: "/icons/home/premium-materials.svg",
    },
    {
      id: "custom",
      title: "Custom Solutions",
      description: "Tailored sizes, fabrics and finishes for your home.",
      icon: "/icons/home/customization.svg",
    },
    {
      id: "visit",
      title: "Visit & Experience",
      description: "Touch, compare and decide in our Dharmapuri showroom.",
      icon: "/icons/home/showroom.svg",
    },
    {
      id: "support",
      title: "Expert Support",
      description: "Guidance from selection through delivery and after-sales.",
      icon: "/icons/home/expert-assistance.svg",
    },
  ],
};

export const contactMap = {
  eyebrow: "Our Location",
  title: "Find Us on Google Maps",
  description:
    "We're on Salem Main Road in Senthil Nagar — easy to find near the bus stop and Vincent Kalyana Mandapam.",
};

export const showroomExteriorImage = "/homepage/showroom/dharmapuri-showroom-exterior.webp";
