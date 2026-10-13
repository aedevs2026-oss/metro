import { marketingImages } from "@/data/marketing-images";

/** About page copy & assets */
export const aboutHero = {
  eyebrow: "About Us",
  title: "More Than Furniture",
  subtitle: "Creating Beautiful Spaces for Better Lives",
  description:
    "At Metro Furniture, we believe furniture is more than just functional pieces — it's about creating spaces where memories are made, comfort is found, and life is celebrated.",
  primaryCta: { label: "Explore Our Collections", href: "/shop" },
  secondaryCta: { label: "Visit Showroom", href: "/contact" },
  accentScript: "Stylish Homes\nHappier Lives",
  image: marketingImages.aboutHero,
  imageFallback: marketingImages.aboutHeroAlt,
  imageLocalFallback: marketingImages.aboutHeroLocal,
};

export const aboutJourney = {
  eyebrow: "Our Story",
  title: "The Metro Furniture Journey",
  paragraphs: [
    "Metro Furniture began with a simple vision — to bring premium, stylish furniture to homes across Dharmapuri and nearby towns. From our showroom on Salem Main Road, we've grown into a trusted name for sofas, beds, dining sets, wardrobes and more.",
    "Every piece we offer is chosen for quality, comfort and design. Our team walks with you from selection to delivery, with honest pricing and custom options that fit your space and budget.",
  ],
  exteriorImage: "/homepage/showroom/metro-luxury-showroom-v2.webp",
  galleryThumbs: [
    "/Gallery/IMG-20260815-WA0019.jpg",
    "/Gallery/IMG-20260815-WA0023.jpg",
    "/Gallery/IMG-20260815-WA0030.jpg",
  ],
  pillars: [
    {
      id: "quality",
      title: "Premium Quality",
      description: "Trusted materials & craftsmanship",
      icon: "/icons/home/premium-materials.svg",
    },
    {
      id: "range",
      title: "Wide Collections",
      description: "Sofas, beds, dining & more",
      icon: "/icons/home/wide-range.svg",
    },
    {
      id: "expert",
      title: "Expert Guidance",
      description: "Help choosing the right pieces",
      icon: "/icons/home/expert-assistance.svg",
    },
    {
      id: "trust",
      title: "Local Trust",
      description: "Serving Dharmapuri with care",
      icon: "/icons/home/showroom.svg",
    },
  ],
};

export const aboutWhyChoose = {
  title: "Why Choose Metro Furniture?",
  description:
    "From curated collections to honest pricing and showroom support, we make furnishing your home simple, stylish and stress-free.",
  items: [
    {
      id: "curated",
      title: "Curated Collections",
      description: "Handpicked sofas, beds, dining and storage from trusted manufacturers.",
      icon: "/icons/home/wide-range.svg",
    },
    {
      id: "pricing",
      title: "Transparent Pricing",
      description: "Clear starting rates — final price by size, material and finish.",
      icon: "/icons/home/premium-materials.svg",
    },
    {
      id: "custom",
      title: "Customisation Options",
      description: "Fabric, size and finish choices tailored to your home.",
      icon: "/icons/home/customization.svg",
    },
    {
      id: "support",
      title: "Dedicated Support",
      description: "Guidance from showroom visit through delivery and after-sales.",
      icon: "/icons/home/after-sales.svg",
    },
  ],
  image: "/homepage/showroom/metro-luxury-showroom-v2.webp",
  bannerText: "Your Home\nOur Passion",
};

export const aboutStats = [
  { id: "customers", value: "5000+", label: "Happy Customers", icon: "/icons/home/showroom.svg" },
  { id: "years", value: "10+", label: "Years of Experience", icon: "/icons/home/expert-assistance.svg" },
  { id: "designs", value: "1000+", label: "Furniture Designs", icon: "/icons/home/wide-range.svg" },
  { id: "rating", value: "4.8/5", label: "Customer Satisfaction", icon: "/icons/home/premium-materials.svg" },
];

export const aboutVisit = {
  eyebrow: "Visit Our Showroom",
  title: "Experience Our Furniture In Person",
  description:
    "Step into our Dharmapuri showroom and explore a wide range of premium furniture collections. Our team is ready to help you find pieces that match your style and budget.",
  image: "/homepage/showroom/metro-luxury-showroom-v2.webp",
};

export const aboutMissionVision = {
  image: marketingImages.aboutMissionBg,
  mission: {
    title: "Our Mission",
    text:
      "To provide stylish, high-quality furniture that transforms houses into homes — with honest guidance, fair pricing and a showroom experience our customers love.",
  },
  vision: {
    title: "Our Vision",
    text:
      "To be Dharmapuri's most trusted furniture destination — known for premium collections, local service and spaces that inspire happier everyday living.",
  },
};
