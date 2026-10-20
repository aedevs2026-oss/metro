import { getProductBySlug, products } from "@/data/products";
import { business, siteUrl } from "@/data/business";
import { absoluteImage } from "@/data/seo-local";
import { getProductSeoTargets } from "@/data/seo-targets";
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
  if (!product) {
    return {
      title: `Furniture Enquiry | ${business.name}`,
      description: `Enquire about furniture at ${business.name}, Dharmapuri.`,
      robots: { index: false, follow: false },
    };
  }

  const canonical = `${siteUrl}/product/${product.slug}`;
  const priceText = product.priceLabel || (product.price != null
    ? `₹${Number(product.price).toLocaleString("en-IN")}`
    : "contact showroom for pricing");
  const title = product.seoTitle || `${product.name} — ${priceText} | ${business.name}`;
  const description = (product.seoDescription
    || `${product.name} at ${business.name}, Dharmapuri. Listed price: ${priceText}. View product photos and enquire about options and availability.`).slice(0, 160);
  const image = absoluteImage(product.image);
  const keywords = [...new Set([...(product.seoKeywords || []), ...getProductSeoTargets(product)])].slice(0, 16);

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: business.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: image, width: 1200, height: 900, alt: product.imageAlt || `${product.name} at ${business.name}, Dharmapuri` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    // Campaign URLs should pass link equity to the canonical product detail page.
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

export default async function FacebookAdsPage({ searchParams }) {
  const params = await searchParams;
  const product = await resolveProduct(searchParams);
  const campaign = typeof params?.utm_campaign === "string" ? params.utm_campaign.slice(0, 80) : "facebook-instagram";
  return <FacebookAdsLanding product={product} campaign={campaign} />;
}
