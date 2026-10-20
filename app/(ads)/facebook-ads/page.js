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
  const params = await searchParams;
  const requested = params?.product || params?.slug;
  const product = requested ? await resolveProduct(params) : null;

  if (!product) {
    const title = "Explore Furniture & Lighting | " + business.name + ", Dharmapuri";
    const description = "Browse Metro Furniture's sofa, lighting, chair, mattress and home furniture catalogue. Open any product for photos, details and a personalised showroom enquiry in Dharmapuri.";
    const image = absoluteImage("/homepage/hero/metro-luxury-hero-v2.webp");
    return {
      title,
      description,
      alternates: { canonical: siteUrl + "/facebook-ads" },
      openGraph: {
        title,
        description,
        url: siteUrl + "/facebook-ads",
        siteName: business.name,
        locale: "en_IN",
        type: "website",
        images: [{ url: image, width: 1200, height: 630, alt: "Metro Furniture premium furniture collection" }],
      },
      twitter: { card: "summary_large_image", title, description, images: [image] },
      robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
    };
  }

  const canonical = siteUrl + "/product/" + product.slug;
  const priceText = product.priceLabel || (product.price != null
    ? "₹" + Number(product.price).toLocaleString("en-IN")
    : "contact showroom for pricing");
  const title = product.seoTitle || product.name + " — " + priceText + " | " + business.name;
  const description = (product.seoDescription
    || product.name + " at " + business.name + ", Dharmapuri. Listed price: " + priceText + ". View product photos and enquire about options and availability.").slice(0, 160);
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
      images: [{ url: image, width: 1200, height: 900, alt: product.imageAlt || product.name + " at " + business.name + ", Dharmapuri" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

export default async function FacebookAdsPage({ searchParams }) {
  const params = await searchParams;
  const product = await resolveProduct(searchParams);
  const campaign = typeof params?.utm_campaign === "string" ? params.utm_campaign.slice(0, 80) : "facebook-instagram";
  return <FacebookAdsLanding products={products} product={product} campaign={campaign} />;
}
