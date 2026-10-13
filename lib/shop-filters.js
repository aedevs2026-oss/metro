const SEATING_RE = /(\d+)[\s-]*[Ss]eater/i;

export function getSeatingCount(product) {
  const fromConfig = product.configuration?.match(SEATING_RE);
  if (fromConfig) return Number(fromConfig[1]);
  const fromFeatures = product.features?.join(" ").match(SEATING_RE);
  if (fromFeatures) return Number(fromFeatures[1]);
  return null;
}

export function productMatchesFeature(product, featureId) {
  const haystack = [
    product.configuration,
    product.description,
    product.tagline,
    ...(product.features || []),
    ...(product.tags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const map = {
    reclining: ["recliner", "reclining"],
    storage: ["storage", "drawer", "console"],
    modular: ["modular", "sectional"],
    corner: ["corner", "l-shape", "l shape"],
  };
  const terms = map[featureId] || [featureId];
  return terms.some((t) => haystack.includes(t));
}

export function productMatchesStyle(product, styleId) {
  const haystack = [
    product.tagline,
    product.description,
    ...(product.tags || []),
  ]
    .join(" ")
    .toLowerCase();

  if (styleId === "modern") return /modern|contemporary|minimal/.test(haystack);
  if (styleId === "classic") return /classic|traditional|ornate/.test(haystack);
  if (styleId === "minimal") return /minimal|clean|sleek/.test(haystack);
  return true;
}

export function productMatchesSubcategory(product, subId) {
  if (!subId || subId === "all") return true;
  if (subId === "fabric") {
    return /fabric|velvet|upholstery/i.test(
      [product.material, product.upholstery, product.description].join(" ")
    );
  }
  if (subId === "leather") {
    return /leather|leatherette/i.test(
      [product.material, product.upholstery, product.description].join(" ")
    );
  }
  if (subId === "sectional") {
    return productMatchesFeature(product, "corner") || productMatchesFeature(product, "modular");
  }
  if (subId === "recliner") {
    return productMatchesFeature(product, "reclining");
  }
  return true;
}

export function materialMatches(product, materialFilter) {
  if (!materialFilter || materialFilter === "all") return true;
  const m = materialFilter.toLowerCase();
  const hay = [product.material, product.upholstery].filter(Boolean).join(" ").toLowerCase();
  return hay.includes(m);
}

export function applyShopFilters(products, filters) {
  const {
    material,
    minPrice,
    maxPrice,
    color,
    seating,
    style,
    feature,
    sub,
  } = filters;

  return products.filter((product) => {
    if (!materialMatches(product, material)) return false;

    if (minPrice != null && product.price != null && product.price < minPrice) return false;
    if (maxPrice != null && product.price != null && product.price > maxPrice) return false;
    if (product.price == null && (minPrice != null || maxPrice != null)) {
      // on-request items still show unless price filter is strict
    }

    if (color && color !== "all") {
      if (!product.color?.toLowerCase().includes(color.toLowerCase())) return false;
    }

    if (seating && seating !== "all") {
      const count = getSeatingCount(product);
      if (seating === "5plus") {
        if (!count || count < 5) return false;
      } else {
        const want = Number(seating);
        if (!count || count !== want) return false;
      }
    }

    if (style && style !== "all" && !productMatchesStyle(product, style)) return false;
    if (feature && feature !== "all" && !productMatchesFeature(product, feature)) return false;
    if (sub && sub !== "all" && !productMatchesSubcategory(product, sub)) return false;

    return true;
  });
}

export function collectColors(products) {
  const set = new Set();
  products.forEach((p) => {
    if (p.color) set.add(p.color);
  });
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function countBySubcategory(products) {
  const subs = [
    { id: "all", label: "All Sofas" },
    { id: "fabric", label: "Fabric Sofas" },
    { id: "leather", label: "Leather Sofas" },
    { id: "sectional", label: "Sectional Sofas" },
    { id: "recliner", label: "Recliner Sofas" },
  ];
  return subs.map((s) => ({
    ...s,
    count: products.filter((p) => productMatchesSubcategory(p, s.id)).length,
  }));
}
