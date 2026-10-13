import keywordMap from "@/data/seo-keyword-map.json";

const BRAND = "Metro Furniture";

function unique(values, limit = 16) {
  return [...new Set(values.map((value) => String(value || "").replace(/\s+/g, " ").trim()).filter(Boolean))].slice(0, limit);
}

/**
 * Curated terms from the 5,000-keyword research library are mapped to real
 * product/category routes. The visible page content carries the useful context;
 * this is not a strategy for keyword stuffing.
 */
export function getProductSeoTargets(product) {
  if (!product) return [];
  const mapped = keywordMap.products?.[product.slug] || [];
  const supplemental = [
    `${product.name} in Dharmapuri`,
    `${product.name} price in Dharmapuri`,
    `${BRAND} ${product.name}`,
    `${product.category} showroom Dharmapuri`,
    `${product.name} model ${product.model || ""}`.trim(),
    ...(product.tags || []),
  ];
  return unique([...mapped, ...supplemental], 16);
}

export function getCategorySeoTargets(category) {
  if (!category) return [];
  const mapped = keywordMap.categories?.[category.slug] || [];
  const supplemental = [
    `${category.name} in Dharmapuri`,
    `${category.name} showroom Dharmapuri`,
    `${BRAND} ${category.name}`,
    ...(category.materials || []).map((material) => `${material} ${category.name} Dharmapuri`),
  ];
  return unique([...mapped, ...supplemental], 16);
}

export function getShopSeoTargets() {
  return unique(keywordMap.shop || [], 12);
}
