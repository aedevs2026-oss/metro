import { getProductBySlug, products } from "@/data/products";
import { business } from "@/data/business";
import FacebookAdsLanding from "@/components/marketing/FacebookAdsLanding";

async function resolveProduct(searchParams) {
  const params = await searchParams;
  const requested = params?.product || params?.slug || "alaska-corner";
  return getProductBySlug(requested)
    || products.find((product) => product.id === requested)
    || products.find((product) => product.featured && !product.upcoming)
    || products[0];
}

export async function generateMetadata({ searchParams }) {
  const product = await resolveProduct(searchParams);
  return {
    title: `Get a Quote for ${product?.name || "Premium Furniture"} | ${business.name}`,
    description: `Ask about ${product?.name || "premium furniture"} at Metro Furniture, Salem Main Road, Dharmapuri. Submit a quick enquiry and continue with our showroom team on WhatsApp.`,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

export default async function FacebookAdsPage({ searchParams }) {
  const params = await searchParams;
  const product = await resolveProduct(searchParams);
  const campaign = typeof params?.utm_campaign === "string" ? params.utm_campaign.slice(0, 80) : "facebook-instagram";
  return <FacebookAdsLanding product={product} campaign={campaign} />;
}
