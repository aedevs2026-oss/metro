import { materials } from "@/data/brands";

export const shopHero = {
  eyebrow: "Our collections",
  title: "Shop Furniture That Defines You",
  description:
    "Explore listed sofas, mattresses, chairs and designer lighting — and contact our Dharmapuri showroom for availability across other home collections.",
  accentScript: "Premium Furniture for a Better Tomorrow",
};

export const shopNavItems = [
  { slug: "corner-sofas", label: "Sofas & Recliners" },
  { slug: "dining", label: "Dining Sets" },
  { slug: "mattresses", label: "Beds & Mattresses" },
  { slug: "chandeliers", label: "Home Decor" },
  { slug: "wall-lights", label: "Lighting Solutions" },
  { slug: "chairs", label: "Office Furniture" },
  { slug: "sofas", label: "Sofa Sets" },
  { slug: "bathroom-fittings", label: "Bathroom Fittings" },
];

export const filterMaterials = materials;

export const seatingOptions = [
  { value: "all", label: "Any capacity" },
  { value: "2", label: "2 Seater" },
  { value: "3", label: "3 Seater" },
  { value: "4", label: "4 Seater" },
  { value: "5plus", label: "5+ Seater" },
];

export const styleOptions = [
  { value: "all", label: "Any style" },
  { value: "modern", label: "Modern" },
  { value: "classic", label: "Classic" },
  { value: "minimal", label: "Minimalist" },
];

export const featureOptions = [
  { value: "all", label: "Any feature" },
  { value: "reclining", label: "Reclining" },
  { value: "storage", label: "Storage" },
  { value: "modular", label: "Modular" },
  { value: "corner", label: "Corner / L-Shape" },
];

export const priceRange = { min: 0, max: 500000, step: 5000 };

export const colorHex = {
  Teal: "#0f766e",
  "Caramel Brown": "#a16207",
  "Wine Red": "#9f1239",
  "Taupe Brown": "#78716c",
  "Dusty Rose": "#be8a8a",
  "Camel Tan": "#d4a574",
  Gold: "#c8a96a",
  White: "#f5f5f4",
  Black: "#1a1c20",
  Grey: "#6b7280",
  Gray: "#6b7280",
  Brown: "#78350f",
  Blue: "#1d4ed8",
  Green: "#15803d",
  Beige: "#d6cfc4",
};

export function colorToHex(name) {
  if (!name) return "#c8a96a";
  if (colorHex[name]) return colorHex[name];
  const key = Object.keys(colorHex).find((k) =>
    name.toLowerCase().includes(k.toLowerCase())
  );
  return key ? colorHex[key] : "#c8a96a";
}

export const shopValueItems = [
  {
    id: "quality",
    title: "Premium Quality",
    description: "Durable & long lasting furniture",
  },
  {
    id: "custom",
    title: "Customisation Options",
    description: "Tailored to your lifestyle",
  },
  {
    id: "expert",
    title: "Expert Guidance",
    description: "From our experienced team",
  },
  {
    id: "showroom",
    title: "Visit Our Showroom",
    description: "Experience in person",
  },
];

export const collectionPromo = {
  title: "Find the Perfect Sofa for Your Space",
  cta: "Explore Guide",
  href: "/contact",
};
