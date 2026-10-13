import { marketingImages } from "@/data/marketing-images";

/** Full-width hero / banner photography */
export const siteHeroImage = marketingImages.homeHero;
export const business = {
  name: "Metro Furniture",
  nameTamil: "மெட்ரோ பர்னிச்சர்",
  shortName: "Metro Furniture",
  tagline: "Dharmapuri's Trusted Furniture Destination",
  taglineSecondary: "Stylish Sofas • Quality Furniture",
  phones: ["9367647555", "9443367555", "04342233000"],
  primaryPhone: "9367647555",
  whatsapp: "919367647555",
  whatsappUrl: "https://wa.me/919367647555",
  email: "metrodharmapuri@gmail.com",
  hours: "Mon – Sun: 9:30 AM – 9:00 PM",
  logo: "/metro-logo-transparent.png",
  navLogo: "/metro-logo-transparent.png",
  social: {
    instagram: "https://www.instagram.com/metrofurnituredpi/",
  },
  address: {
    line1: "No 1860, Salem Main Road",
    line2: "Senthil Nagar, Near Vincent Kalyana Mandapam",
    city: "Dharmapuri",
    state: "Tamil Nadu",
    pin: "636701",
  },
};

export const branches = [
  {
    id: "salem-main-road",
    name: "Metro Furniture Showroom",
    lines: [
      "No 1860, Salem Main Road,",
      "Senthil Nagar, Near Vincent Kalyana Mandapam,",
      "Dharmapuri, Tamil Nadu 636701",
    ],
    landmark: "Near Senthil Nagar Bus Stop",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Metro+Furniture+Senthil+Nagar+Salem+Main+Road+Dharmapuri",
    embedUrl:
      "https://maps.google.com/maps?q=Metro+Furniture+Senthil+Nagar+Salem+Main+Road+Dharmapuri&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/rooms", label: "Rooms" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Primary tabs — mobile & tablet bottom bar (desktop unchanged) */
export const mobileBottomNav = [
  { id: "home", href: "/", label: "Home", icon: "home" },
  { id: "shop", href: "/shop", label: "Shop", icon: "shop" },
  { id: "whatsapp", href: null, label: "WhatsApp", icon: "whatsapp", center: true },
  { id: "rooms", href: "/rooms", label: "Rooms", icon: "rooms" },
  { id: "more", href: null, label: "More", icon: "more" },
];

export const mobileMoreLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Use the deployed canonical domain. Override this when a custom domain is live.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://metrofurnitures.vercel.app").replace(/\/$/, "");

export const seoKeywords = [
  "Metro Furniture",
  "Metro Furniture Dharmapuri",
  "furniture showroom in Dharmapuri Tamil Nadu",
  "sofa set showroom Dharmapuri",
  "corner sofa showroom Dharmapuri",
  "dining table showroom Dharmapuri",
  "mattress shop Dharmapuri",
  "designer chandelier and wall lights Dharmapuri",
  "Alaska Corner Sofa MTC-101",
  "furniture shop Salem Main Road Senthil Nagar",
];
