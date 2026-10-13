/**
 * Image helpers for local catalog assets and fallbacks.
 */
export const unsplash = {
  hero: ["/hero.png", "/hero-1.png"],
  category: {
    "Corner Sofas": "/Metro_Product_Images/MTC-101_Alaska_Corner.jpg",
    Sofas: "/Metro_Product_Images/MTC-104_Cairo_Sofa.jpg",
    Dining: "/Gallery/IMG-20260815-WA0023.jpg",
    Chairs: "/chair-furniture (1).jpg",
    Mattresses: "/homepage/collections/luxury-bed-mattress.webp",
    Chandeliers: "/Lights_Products/LL-D5463.jpg",
    "Wall Lights": "/Lights_Products/LL-D6054.jpg",
    "Bathroom Fittings": "/bathroom-fitting.png",
  },
  showroom: [
    "/Gallery/IMG-20260815-WA0018.jpg",
    "/Gallery/IMG-20260815-WA0019.jpg",
    "/Gallery/IMG-20260815-WA0030.jpg",
    "/Gallery/IMG-20260815-WA0038.jpg",
  ],
};

export function categoryFallback(category) {
  return unsplash.category[category] || unsplash.category.Sofas;
}

export function resolveImage(category, current) {
  if (current) return current;
  return categoryFallback(category);
}

export function resolveCategoryImage(categoryId, productsInCategory = []) {
  const fromProduct = productsInCategory[0]?.image;
  if (fromProduct) return fromProduct;
  return categoryFallback(categoryId);
}
