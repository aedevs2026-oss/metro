export function getProductRibbonItems(product) {
  const hay = [
    product.description,
    product.tagline,
    product.configuration,
    product.material,
    product.upholstery,
    ...(product.features || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const hasStorage = /storage|drawer|console/i.test(hay);
  return [
    {
      id: "custom",
      title: "Customisable",
      sub: "Size, fabric, colour",
    },
    {
      id: "storage",
      title: hasStorage ? "Built-in Storage" : "Smart Layout",
      sub: hasStorage ? "Smart space solution" : "Space-saving design",
    },
    {
      id: "comfort",
      title: "Premium Comfort",
      sub: "High-density cushioning",
    },
    {
      id: "frame",
      title: "Durable Frame",
      sub: "Engineered hardwood",
    },
    {
      id: "care",
      title: "Easy Maintenance",
      sub: "Stain-resistant fabrics",
    },
  ];
}

export const defaultColorOptions = [
  { name: "Teal", hex: "#0f766e" },
  { name: "Grey", hex: "#6b7280" },
  { name: "Beige", hex: "#d6cfc4" },
  { name: "Brown", hex: "#78350f" },
  { name: "Tan", hex: "#c4a574" },
  { name: "Dark Green", hex: "#14532d" },
];

export function getColorOptions(product) {
  const base = [...defaultColorOptions];
  if (product.color) {
    const exists = base.some(
      (c) => c.name.toLowerCase() === product.color.toLowerCase()
    );
    if (!exists) {
      base.unshift({ name: product.color, hex: "#c8a96a" });
    }
  }
  return base.slice(0, 6);
}
