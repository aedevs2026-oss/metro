import { siteHeroImage } from "@/data/business";
import { images } from "@/data/content";
import { categories } from "@/data/categories";
import { galleryImages } from "@/data/gallery";

const cornerImg = categories.find((c) => c.slug === "corner-sofas")?.image;
const sofaImg = categories.find((c) => c.slug === "sofas")?.image;
const diningImg = categories.find((c) => c.slug === "dining")?.image;
const mattressImg = categories.find((c) => c.slug === "mattresses")?.image;
const chairImg = categories.find((c) => c.slug === "chairs")?.image;
const chandelierImg = categories.find((c) => c.slug === "chandeliers")?.image;
const wallImg = categories.find((c) => c.slug === "wall-lights")?.image;
export const roomsHero = {
  eyebrow: "Rooms",
  title: "Beautiful Spaces for Every Moment",
  description:
    "Explore complete room solutions with thoughtfully curated furniture, designed for modern homes.",
  accentScript: "More Than Furniture, A Better Tomorrow",
  cta: { label: "Explore All Rooms", href: "#explore-rooms" },
  image: siteHeroImage,
};

export const roomFilters = [
  { id: "all", label: "All Rooms" },
  { id: "living", label: "Living Room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining", label: "Dining Room" },
  { id: "office", label: "Home Office" },
  { id: "kids", label: "Kids Room" },
  { id: "study", label: "Study Room" },
  { id: "outdoor", label: "Outdoor" },
  { id: "pooja", label: "Pooja Room" },
];

export const roomCards = [
  {
    id: "living",
    filterId: "living",
    name: "Living Room",
    items: "Sofas, Recliners, Centre Tables, TV Units, Lighting",
    image: cornerImg || sofaImg,
    href: "/shop/corner-sofas",
    cta: "Explore Living Room",
  },
  {
    id: "bedroom",
    filterId: "bedroom",
    name: "Bedroom",
    items: "Beds, Wardrobes, Mattresses, Side Tables, Lighting",
    image: mattressImg,
    href: "/shop/mattresses",
    cta: "Explore Bedroom",
  },
  {
    id: "dining",
    filterId: "dining",
    name: "Dining Room",
    items: "Dining Sets, Chairs, Crockery Units, Pendant Lights",
    image: diningImg,
    href: "/shop/dining",
    cta: "Explore Dining Room",
  },
  {
    id: "office",
    filterId: "office",
    name: "Home Office",
    items: "Office Chairs, Desks, Storage, Task Lighting",
    image: chairImg,
    href: "/shop/chairs",
    cta: "Explore Home Office",
  },
  {
    id: "kids",
    filterId: "kids",
    name: "Kids Room",
    items: "Beds, Study Tables, Storage, Soft Furnishing",
    image: sofaImg,
    href: "/shop/sofas",
    cta: "Explore Kids Room",
  },
  {
    id: "study",
    filterId: "study",
    name: "Study Room",
    items: "Chairs, Bookshelves, Desks, Wall Lights",
    image: wallImg || chairImg,
    href: "/shop/chairs",
    cta: "Explore Study Room",
  },
  {
    id: "outdoor",
    filterId: "outdoor",
    name: "Outdoor",
    items: "Patio Sets, Garden Seating, Weather-Resistant Pieces",
    image: images.showroom[2] || diningImg,
    href: "/contact",
    cta: "Explore Outdoor",
  },
  {
    id: "pooja",
    filterId: "pooja",
    name: "Pooja Room",
    items: "Mandir Units, Lamps, Storage, Accent Lighting",
    image: chandelierImg,
    href: "/shop/chandeliers",
    cta: "Explore Pooja Room",
  },
  {
    id: "complete",
    filterId: "complete",
    name: "Complete Room Sets",
    items: "End-to-end packages for living, bedroom & dining",
    image: images.showroom[0] || cornerImg,
    href: "/contact",
    cta: "View Room Packages",
    featured: true,
  },
];

export const roomsConsultation = {
  eyebrow: "Complete room solutions",
  title: "Turn Houses into Homes",
  description:
    "Get expert guidance on layouts, fabrics and finishes — from a single sofa to a full home refresh at our Salem Main Road showroom.",
  cta: { label: "Book a Free Consultation", href: "/contact" },
  image: siteHeroImage,
  perks: [
    { id: "design", label: "Personalised Designs" },
    { id: "plan", label: "Complete Room Planning" },
    { id: "guide", label: "Expert Guidance" },
  ],
};

export const roomsInspiration = {
  title: "Real Homes, Real Inspiration",
  description: "See how families style Metro Furniture across Dharmapuri.",
  galleryHref: "/gallery",
  images: galleryImages.slice(0, 6).map((g) => g.src),
};
