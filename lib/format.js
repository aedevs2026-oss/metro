export function formatPrice(amount) {
  if (amount == null) return "";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPhone(phone) {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 10) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

export function telHref(phone) {
  return `tel:${String(phone).replace(/\D/g, "")}`;
}

/**
 * Shared catalogue promotion used by cards, product pages and campaigns.
 * The catalogue price remains the reference price; the published promotion is
 * consistently rounded to the nearest ₹10 across all customer-facing pages.
 */
export function getProductPromotion(product) {
  if (
    !product ||
    product.upcoming ||
    product.onRequest ||
    !Number.isFinite(product.price) ||
    product.price <= 0
  ) {
    return null;
  }

  const numericId = Number(String(product.id || "").match(/\d+/)?.[0] || 0);
  const targetDiscount = 20 + (numericId % 11);
  const offerPrice = Math.round((product.price * (100 - targetDiscount) / 100) / 10) * 10;
  if (offerPrice <= 0 || offerPrice >= product.price) return null;

  return {
    originalPrice: product.price,
    offerPrice,
    discountPercent: Math.round(((product.price - offerPrice) / product.price) * 100),
    savings: product.price - offerPrice,
  };
}
