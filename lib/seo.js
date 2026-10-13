import { business, seoKeywords, siteUrl } from "@/data/business";
import {
  absoluteUrl,
  defaultOgImage,
  localGeo,
  localSeoKeywords,
} from "@/data/seo-local";

function normalizePath(path) {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function resolveTitle(title) {
  if (title.includes("|") || title.includes(business.name)) {
    return { absolute: title };
  }
  return title;
}

/** Dharmapuri-focused meta tags (SEO + legacy geo + AI-friendly descriptions) */
export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  noindex = false,
  ogImage = defaultOgImage,
  ogType = "website",
}) {
  const canonicalPath = normalizePath(path);
  const url = absoluteUrl(canonicalPath);
  const resolvedTitle = resolveTitle(title);
  const fullTitle =
    typeof resolvedTitle === "string"
      ? `${resolvedTitle} | ${business.shortName}`
      : resolvedTitle.absolute;

  const geoOther = {
    "geo.region": localGeo.region,
    "geo.placename": localGeo.placename,
    "geo.position": `${localGeo.latitude};${localGeo.longitude}`,
    ICBM: localGeo.icbm,
    "content-language": "en-IN",
    locality: business.address.city,
    region: business.address.state,
  };

  const commonKeywords = [...seoKeywords.slice(0, 8), ...localSeoKeywords.slice(0, 8)];
  const keywordSet = [
    ...new Set([...(keywords.length ? keywords : commonKeywords), ...keywords].filter(Boolean)),
  ].slice(0, 20);

  return {
    title: resolvedTitle,
    description,
    keywords: keywordSet,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: business.name,
      locale: "en_IN",
      type: ogType,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${siteUrl.replace(/\/$/, "")}${ogImage}`,
          width: 1200,
          height: 630,
          alt: `${business.name} — ${business.address.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${siteUrl.replace(/\/$/, "")}${ogImage}`],
    },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    other: geoOther,
  };
}

export { absoluteUrl };
