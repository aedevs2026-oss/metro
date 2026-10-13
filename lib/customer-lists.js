export const WISHLIST_KEY = "metro-furniture-wishlist-v1";
export const COMPARE_KEY = "metro-furniture-compare-v1";
export const CUSTOMER_LIST_EVENT = "metro-customer-lists-updated";

export function readCustomerList(key) {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}

export function writeCustomerList(key, list) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent(CUSTOMER_LIST_EVENT, { detail: { key, list } }));
}

export function toggleCustomerItem(key, product) {
  const current = readCustomerList(key);
  const exists = current.some((item) => item.slug === product.slug);
  const next = exists ? current.filter((item) => item.slug !== product.slug) : [...current, {
    id: product.id, slug: product.slug, name: product.name, category: product.category,
    model: product.model, image: product.image, priceLabel: product.priceLabel,
    price: product.price, material: product.material, color: product.color,
    configuration: product.configuration, description: product.description,
  }].slice(key === COMPARE_KEY ? -4 : -100);
  writeCustomerList(key, next);
  return { next, exists };
}
