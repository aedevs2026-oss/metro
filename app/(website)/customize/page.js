import FurnitureCustomizer from "@/components/tools/FurnitureCustomizer";
import { getProductBySlug, products } from "@/data/products";
import { business } from "@/data/business";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Customise Furniture & Request a Quote",
  description: `Personalise furniture fabric, colour, size and configuration, then request an exact quote from ${business.name} in Dharmapuri, Tamil Nadu.`,
  path: "/customize",
  keywords: ["custom furniture Dharmapuri", "sofa fabric colour customization", "custom sofa size", "furniture quote Dharmapuri"],
});

export default async function CustomizePage({ searchParams }) {
  const params = await searchParams;
  const slug = typeof params?.product === "string" ? params.product : "";
  const product = getProductBySlug(slug) || products.find((p) => !p.upcoming) || products[0];
  return <FurnitureCustomizer products={products.filter((p) => !p.upcoming)} initialProduct={product} />;
}
