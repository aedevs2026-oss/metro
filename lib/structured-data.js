import { business, branches } from "@/data/business";
import { getProductPromotion } from "@/lib/format";
import {
  absoluteImage,
  absoluteUrl,
  areaServed,
  formatPostalAddress,
  localFaq,
  localGeo,
  showroomMapUrl,
} from "@/data/seo-local";

const ORG_ID = `${absoluteUrl("/")}#organization`;
const STORE_ID = `${absoluteUrl("/")}#store`;
const WEBSITE_ID = `${absoluteUrl("/")}#website`;

function openingHoursSpecification() {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:30",
      closes: "21:00",
    },
  ];
}

export function buildLocalBusiness() {
  const branch = branches[0];
  return {
    "@type": "FurnitureStore",
    "@id": STORE_ID,
    name: business.name,
    alternateName: business.nameTamil,
    description: `${business.tagline}. Premium furniture showroom on Salem Main Road, ${business.address.city}, Tamil Nadu.`,
    url: absoluteUrl("/"),
    telephone: `+91-${business.primaryPhone}`,
    email: business.email,
    image: absoluteImage(business.logo),
    logo: absoluteImage(business.logo),
    address: formatPostalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: localGeo.latitude,
      longitude: localGeo.longitude,
    },
    hasMap: showroomMapUrl,
    openingHoursSpecification: openingHoursSpecification(),
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI",
    areaServed: areaServed.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "State", name: "Tamil Nadu" },
    })),
    sameAs: [business.social.instagram],
    parentOrganization: { "@id": ORG_ID },
    ...(branch?.landmark
      ? {
          publicAccess: true,
          amenityFeature: [
            {
              "@type": "LocationFeatureSpecification",
              name: "Landmark",
              value: branch.landmark,
            },
          ],
        }
      : {}),
  };
}

export function buildOrganization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: business.name,
    url: absoluteUrl("/"),
    logo: absoluteImage(business.logo),
    email: business.email,
    telephone: `+91-${business.primaryPhone}`,
    address: formatPostalAddress(),
    sameAs: [business.social.instagram],
  };
}

export function buildWebSite() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: business.name,
    url: absoluteUrl("/"),
    description: `${business.name} — furniture showroom in Dharmapuri, Tamil Nadu.`,
    inLanguage: ["en-IN", "ta-IN"],
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/shop")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildFaqPage(faqs = localFaq) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbList(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function buildProduct(product, { categoryName, path }) {
  const url = absoluteUrl(path);
  const images = (product.images?.length ? product.images : [product.image]).map(absoluteImage);

  const promotion = getProductPromotion(product);
  const offer =
    product.price != null && !product.onRequest
      ? {
          "@type": "Offer",
          url,
          priceCurrency: "INR",
          price: String(promotion?.offerPrice ?? product.price),
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": STORE_ID },
          ...(product.mrp
            ? {
                priceValidUntil: new Date(
                  new Date().setFullYear(new Date().getFullYear() + 1)
                )
                  .toISOString()
                  .split("T")[0],
              }
            : {}),
        }
      : {
          "@type": "Offer",
          url,
          priceCurrency: "INR",
          availability: "https://schema.org/PreOrder",
          description: "Contact showroom for best price",
          seller: { "@id": STORE_ID },
        };

  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.description || product.tagline,
    image: images,
    sku: product.model || product.id,
    category: categoryName || product.category,
    brand: {
      "@type": "Brand",
      name: business.name,
    },
    offers: offer,
    ...(product.material ? { material: product.material } : {}),
    ...(product.color ? { color: product.color } : {}),
  };
}

export function buildSiteGraph({ includeFaq = false } = {}) {
  const graph = [buildOrganization(), buildLocalBusiness(), buildWebSite()];
  if (includeFaq) graph.push(buildFaqPage());
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildPageGraph(nodes) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

/** Lightweight validation for CI / verify:seo script */
export function validateStructuredDataGraph(graph) {
  const errors = [];
  if (!graph || graph["@context"] !== "https://schema.org") {
    errors.push("Missing @context https://schema.org");
  }
  const items = graph["@graph"] || [graph];
  for (const node of items) {
    if (!node["@type"]) errors.push("Node missing @type");
    if (node["@type"] === "FurnitureStore" && !node.geo?.latitude) {
      errors.push("FurnitureStore missing geo coordinates");
    }
    if (node["@type"] === "FAQPage" && !node.mainEntity?.length) {
      errors.push("FAQPage missing mainEntity");
    }
  }
  return errors;
}
