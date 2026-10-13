import { getHomepageSignatureProducts } from "@/data/products";
import { business } from "@/data/business";
import { marketingImages } from "@/data/marketing-images";

/** Homepage content & assets — all under /public/homepage (see scripts/rebuild-homepage-images.py) */
const hp = {
  hero: marketingImages.homeHero,
  heroFallback: marketingImages.homeHeroAlt,
  heroLocalFallback: marketingImages.homeHeroLocal,
  brand: "/homepage/brand/more-than-furniture-better-tomorrow.webp",
  visitShowroomBg: "/homepage/showroom/visit-showroom-background.webp",
  cta: "/homepage/cta/luxury-dining-living-cta.webp",
  products: {
    sofa: "/homepage/products/luxury-fabric-sofa.webp",
    dining: "/homepage/products/elegant-dining-set.webp",
    bed: "/homepage/products/premium-king-size-bed.webp",
  },
  rooms: {
    living: "/homepage/rooms/living-room.webp",
    bedroom: "/homepage/rooms/luxury-bedroom.webp",
    dining: "/homepage/rooms/luxury-dining-room.webp",
    decor: "/homepage/rooms/home-decor.webp",
    office: "/homepage/rooms/modern-home-office.webp",
  },
  collections: {
    modern: "/homepage/collections/modern-blue-sofa.webp",
    leather: "/homepage/collections/premium-brown-leather-sofa.webp",
    dining: "/homepage/collections/luxury-dining-collection.webp",
    beds: "/homepage/collections/luxury-bed-mattress.webp",
  },
  showroom: {
    interior: "/homepage/showroom/luxury-showroom-interior.webp",
    exterior: "/homepage/showroom/dharmapuri-showroom-exterior.webp",
  },
  signatureBg: marketingImages.signatureSectionBg,
};

/** Curated Collections (Trending Now) — public/collection/ */
const curatedCollectionImages = {
  modern: "/collection/modern-blue-sofa.webp",
  leather: "/collection/premium-brown-leather-sofa.webp",
  dining: "/collection/luxury-dining-collection.webp",
  beds: "/collection/luxury-bed-mattress.webp",
};

/** Discover by Space card photos — public/Rooms/rooms/ */
const discoverRoomImages = {
  living: "/Rooms/rooms/living-room.webp",
  bedroom: "/Rooms/rooms/bedroom.webp",
  dining: "/Rooms/rooms/dining-room.webp",
  decor: "/Rooms/rooms/complete-room-sets.webp",
  office: "/Rooms/rooms/home-office.webp",
};

export const heroContent = {
  eyebrow: "PREMIUM FURNITURE FOR A BETTER TOMORROW",
  title: "Crafting Beautiful Homes\nin Dharmapuri",
  description:
    "Discover curated sofas, mattresses and designer lighting, with thoughtful design, comfort and showroom guidance for homes in Dharmapuri.",
  primaryCta: { label: "Explore Collections", href: "/collections" },
  secondaryCta: { label: "Book a Showroom Visit", href: "/book-showroom" },
  image: hp.hero,
  imageFallback: hp.heroFallback,
  imageLocalFallback: hp.heroLocalFallback,
  stats: [
    { id: "homes", label: "5000+", sub: "Happy Homes" },
    { id: "quality", label: "Premium", sub: "Quality" },
    { id: "design", label: "Modern", sub: "Designs" },
    { id: "guide", label: "Expert", sub: "Guidance" },
  ],
  slides: ["01", "02", "03", "04"],
  activeSlide: 0,
  showroomCard: {
    label: "Our New Showroom",
    location: "Dharmapuri",
    subtitle: "Wide Range | Expert Guidance | Premium Quality",
    image: hp.showroom.exterior,
    href: "/contact",
  },
};

const signatureHomeImages = [hp.products.sofa, hp.products.dining, hp.products.bed];

export const signatureCollectionSection = {
  eyebrow: "Our Premium Range",
  title: "Signature Collection",
  description: "Handpicked pieces that blend style, comfort and quality.",
  cta: { label: "View All Products", href: "/shop" },
  backgroundImage: hp.signatureBg,
};

/** Signature carousel — catalogue names, prices & links; homepage product photography for cards. */
export function getHomeSignatureProducts(limit = 3) {
  return getHomepageSignatureProducts(limit).map((product, index) => ({
    ...product,
    image: signatureHomeImages[index] ?? product.image,
    showcaseFeatured: index === 0,
  }));
}

export const serviceHighlights = [
  { id: "range", title: "Wide Range of Collections", icon: "/icons/home/wide-range.svg" },
  { id: "custom", title: "Customization Options", icon: "/icons/home/customization.svg" },
  { id: "expert", title: "Expert Assistance", icon: "/icons/home/expert-assistance.svg" },
  { id: "materials", title: "Premium Quality Materials", icon: "/icons/home/premium-materials.svg" },
  { id: "showroom", title: "Visit Our Showroom", icon: "/icons/home/showroom.svg" },
  { id: "support", title: "After Sales Support", icon: "/icons/home/after-sales.svg" },
];

export const discoverSpaces = {
  eyebrow: "Discover by Space",
  eyebrowHref: "/rooms",
  title: "Furniture for Every\nCorner of\nYour Home",
  description:
    "From cosy living rooms to elegant bedrooms, find the perfect pieces that match your style and lifestyle.",
  cta: { label: "Explore All Rooms", href: "/rooms" },
  rooms: [
    {
      id: "living",
      name: "Living Room",
      items: "Sofas, Centre Tables, TV Units",
      image: discoverRoomImages.living,
      imagePosition: "50% 45%",
      href: "/shop/sofas",
      featured: true,
    },
    {
      id: "bedroom",
      name: "Bedroom",
      items: "Beds, Wardrobes & More",
      image: discoverRoomImages.bedroom,
      imagePosition: "50% 40%",
      href: "/shop/mattresses",
    },
    {
      id: "dining",
      name: "Dining Room",
      items: "Dining Tables & Chairs",
      image: discoverRoomImages.dining,
      imagePosition: "50% 45%",
      href: "/shop/dining",
    },
    {
      id: "decor",
      name: "Home Decor",
      items: "Lighting, Wall Decor & More",
      image: discoverRoomImages.decor,
      imagePosition: "50% 50%",
      href: "/shop/chandeliers",
    },
    {
      id: "office",
      name: "Office Furniture",
      items: "Workspaces & Solutions",
      image: discoverRoomImages.office,
      imagePosition: "50% 42%",
      href: "/shop/chairs",
    },
  ],
};

export const brandStory = {
  eyebrow: "Crafting Beautiful Spaces",
  title: "More Than Furniture\nA Better Tomorrow",
  description:
    "Timeless designs. Modern materials. Thoughtful craftsmanship. We bring furniture that fits your lifestyle and elevates your everyday moments.",
  image: hp.brand,
  cta: { label: "Explore Our Story", href: "/about" },
  slides: ["01", "02", "03"],
  activeSlide: 0,
};

export const trendingSection = {
  eyebrow: "Curated Collections",
  title: "Trending Now",
  viewAllHref: "/shop",
};

export const trendingCollections = [
  { id: "modern-sofas", name: "Modern Sofas", image: curatedCollectionImages.modern, href: "/shop/sofas" },
  { id: "leather-sofas", name: "Leather Sofas", image: curatedCollectionImages.leather, href: "/shop/sofas" },
  { id: "dining", name: "Dining Sets", image: curatedCollectionImages.dining, href: "/shop/dining" },
  { id: "beds", name: "Beds & Mattresses", image: curatedCollectionImages.beds, href: "/shop/mattresses" },
];

export const testimonialsSection = {
  backgroundImage: marketingImages.homeTestimonialsBg,
};

export const showroomPromo = {
  eyebrow: "Experience in Person",
  title: "Visit Our Dharmapuri Showroom",
  description:
    "Experience our wide range of furniture collections in person. Get expert guidance and find the perfect furniture for your home.",
  backgroundImage: marketingImages.homeShowroomBg,
  perks: [
    { id: "p1", label: "Wide Range", icon: "/icons/home/wide-range.svg" },
    { id: "p2", label: "Expert Guidance", icon: "/icons/home/expert-assistance.svg" },
    { id: "p3", label: "Quality Assurance", icon: "/icons/home/premium-materials.svg" },
    { id: "p4", label: "Easy Customization", icon: "/icons/home/customization.svg" },
  ],
  exteriorImage: hp.showroom.exterior,
  interiorImages: [hp.showroom.interior, hp.rooms.living, hp.showroom.exterior],
};

export const ctaBannerImage = marketingImages.homeCtaBg;

export const whyMetro = [
  { id: "w1", title: "Premium Quality", sub: "Trusted materials", icon: "/icons/home/premium-materials.svg" },
  { id: "w2", title: "Wide Range", sub: "Of collections", icon: "/icons/home/wide-range.svg" },
  { id: "w3", title: "Expert Guidance", sub: "In our showroom", icon: "/icons/home/expert-assistance.svg" },
  { id: "w4", title: "Custom Solutions", sub: "For your space", icon: "/icons/home/customization.svg" },
];

export const ctaTrustStats = [
  { id: "homes", label: "5000+", sub: "Happy Homes" },
  { id: "years", label: "10+ Years", sub: "of Trust" },
  { id: "quality", label: "Premium", sub: "Quality" },
  { id: "support", label: "Expert", sub: "Support" },
];
