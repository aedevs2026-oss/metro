import { branches, business, siteUrl } from "./business.js";

/** Dharmapuri showroom — Senthil Nagar (for geo / LocalBusiness schema) */
export const localGeo = {
  latitude: 12.1275,
  longitude: 78.1602,
  region: "IN-TN",
  placename: "Dharmapuri, Tamil Nadu, India",
  icbm: "12.1275, 78.1602",
};

/** Nearby towns — GEO / generative search context */
export const areaServed = [
  "Dharmapuri",
  "Palacode",
  "Pennagaram",
  "Harur",
  "Pappireddipatti",
  "Nallampalli",
  "Karimangalam",
  "Morappur",
  "Krishnagiri",
  "Salem",
];

export const localSeoKeywords = [
  "furniture showroom in Dharmapuri Tamil Nadu",
  "sofa and corner sofa showroom Dharmapuri",
  "furniture store Salem Main Road Senthil Nagar",
  "Metro Furniture showroom Dharmapuri",
  "beds and mattresses shop Dharmapuri",
  "dining table set showroom Dharmapuri",
  "designer lighting shop Dharmapuri",
  "home furniture in Dharmapuri Tamil Nadu",
  "furniture near Senthil Nagar bus stop",
  "furniture showroom near Vincent Kalyana Mandapam",
  "furniture delivery Dharmapuri and nearby towns",
];

/** AEO / FAQ — concise answers for voice & AI overviews */
export const localFaq = [
  {
    question: "Where is Metro Furniture located in Dharmapuri?",
    answer:
      "Metro Furniture is at No 1860, Salem Main Road, Senthil Nagar, near Vincent Kalyana Mandapam and Senthil Nagar bus stop, Dharmapuri, Tamil Nadu.",
  },
  {
    question: "What are Metro Furniture Dharmapuri opening hours?",
    answer: "The showroom is open Monday to Sunday, 9:30 AM to 9:00 PM.",
  },
  {
    question: "How do I contact Metro Furniture Dharmapuri?",
    answer:
      "Call +91 93676 47555 or WhatsApp the same number. Email metrodharmapuri@gmail.com for product and delivery enquiries.",
  },
  {
    question: "Does Metro Furniture deliver outside Dharmapuri?",
    answer:
      "Yes. Delivery is arranged across Dharmapuri town and nearby areas such as Palacode, Harur, and Krishnagiri. Confirm charges and timelines on WhatsApp before ordering.",
  },
  {
    question: "What furniture does Metro Furniture sell?",
    answer:
      "The current online catalogue lists corner sofas, sofa sets, chairs, mattresses, chandeliers, wall lights and bathroom fittings. For dining sets, bed frames, wardrobes, TV units, office furniture or other products not currently listed online, contact Metro Furniture to confirm current showroom options and availability.",
  },
  {
    question: "Can I get a custom sofa size or fabric at Metro Furniture?",
    answer:
      "Yes. Many sofa and seating models support custom sizes, fabrics, and colours. Visit the showroom or message on WhatsApp with your room dimensions for guidance.",
  },
];

const branch = branches[0];

export function formatPostalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: `${business.address.line1}, ${business.address.line2}`,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.pin,
    addressCountry: "IN",
  };
}

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = siteUrl.replace(/\/$/, "");
  if (normalized === "/") return `${base}/`;
  return `${base}${normalized}`;
}

export function absoluteImage(path) {
  if (!path) return absoluteUrl(business.logo);
  if (path.startsWith("http")) return path;
  return absoluteUrl(path);
}

export const defaultOgImage = absoluteUrl("/homepage/hero/luxury-living-room-hero.webp");

export const showroomMapUrl = branch?.mapUrl || absoluteUrl("/contact");
