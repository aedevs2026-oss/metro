import { business } from "@/data/business";
import { localFaq, areaServed } from "@/data/seo-local";
import { products } from "@/data/products";

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "can", "could", "do", "does",
  "for", "from", "get", "give", "hello", "hey", "hi", "i", "in", "is", "it", "me",
  "my", "of", "on", "or", "our", "please", "show", "tell", "that", "the", "there",
  "this", "to", "want", "what", "where", "which", "with", "you", "your", "we", "would",
]);

const SYNONYMS = {
  couch: ["sofa", "sofas"],
  couches: ["sofa", "sofas"],
  sectional: ["corner", "l-shape", "sofa"],
  recliner: ["reclining", "sofa"],
  bed: ["beds", "mattress", "mattresses", "bedroom"],
  mattress: ["bed", "mattresses", "foam"],
  cot: ["bed", "beds"],
  cupboard: ["wardrobe", "storage"],
  cabinet: ["storage", "tv unit"],
  light: ["lighting", "wall light", "chandelier"],
  lamp: ["lighting", "wall light"],
  diningtable: ["dining", "table"],
  dining: ["dining", "table", "chairs"],
  location: ["address", "showroom", "directions"],
  timing: ["hours", "open", "close"],
  delivery: ["deliver", "transport", "installation"],
  customization: ["custom", "colour", "color", "size", "fabric"],
  colour: ["color", "finish"],
  cost: ["price", "rate", "quote"],
  rate: ["price", "quote"],
};

function normalise(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9₹.+-]+/g, " ").replace(/\s+/g, " ").trim();
}

function formatIndianPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 10) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  return value;
}

function tokens(value = "") {
  return normalise(value).split(" ").filter((token) => token && token.length > 1 && !STOP_WORDS.has(token));
}

function singularVariant(token) {
  if (token.length > 5 && token.endsWith("ies")) return `${token.slice(0, -3)}y`;
  if (token.length > 5 && token.endsWith("es") && !token.endsWith("ses") && !token.endsWith("xes")) return token.slice(0, -2);
  if (token.length > 4 && token.endsWith("ses")) return token.slice(0, -2);
  if (token.length > 3 && token.endsWith("s") && !token.endsWith("ss")) return token.slice(0, -1);
  return token;
}

function expandedTokens(query) {
  const values = new Set(tokens(query));
  for (const token of [...values]) {
    const variant = singularVariant(token);
    if (variant !== token) values.add(variant);
  }
  for (const token of [...values]) {
    for (const synonym of SYNONYMS[token] || []) values.add(synonym);
  }
  if (/\bsofa\b|\bsofas\b|\bcouch\b/i.test(query)) {
    values.add("corner");
    values.add("recliner");
  }
  return [...values];
}

function buildProductDocument(product) {
  const details = [
    product.name,
    product.model,
    product.category,
    product.tagline,
    product.description,
    product.material,
    product.color,
    product.configuration,
    product.upholstery,
    product.priceLabel,
    product.price != null ? `price ${product.price} rupees INR` : "",
    product.onRequest ? "price by enquiry quote" : "",
    ...(product.tags || []),
    ...(product.features || []),
    ...(product.specs || []).flatMap((spec) => [spec.label, spec.value]),
    "available at Metro Furniture showroom Dharmapuri Tamil Nadu",
  ].filter(Boolean).join(". ");

  return {
    id: `product-${product.slug}`,
    type: "product",
    title: product.name,
    url: `/product/${product.slug}`,
    content: details,
    product,
  };
}

const businessDocuments = [
  {
    id: "business-address",
    type: "business",
    title: "Showroom address and directions",
    url: "/contact",
    content: `${business.name} showroom address: ${business.address.line1}, ${business.address.line2}, ${business.address.city}, ${business.address.state} ${business.address.pin}. Landmark: Near Senthil Nagar Bus Stop and Vincent Kalyana Mandapam. Main road: Salem Main Road, Dharmapuri, Tamil Nadu. Directions: ${business.address.city} showroom on Salem Main Road.`,
  },
  {
    id: "business-hours",
    type: "business",
    title: "Showroom opening hours",
    url: "/contact",
    content: `${business.name} showroom timings: ${business.hours}. The showroom is open Monday to Sunday from 9:30 AM to 9:00 PM.`,
  },
  {
    id: "business-contact",
    type: "business",
    title: "Phone, WhatsApp and email contact",
    url: "/contact",
    content: `Contact ${business.name}. Call +91 ${formatIndianPhone(business.primaryPhone)}. WhatsApp +${business.whatsapp}. Email ${business.email}. Visit the showroom at ${business.address.line1}, ${business.address.line2}, ${business.address.city}, ${business.address.state} ${business.address.pin}.`,
  },
  {
    id: "business-service-area",
    type: "business",
    title: "Delivery and nearby service areas",
    url: "/branches",
    content: `${business.name} is based in Dharmapuri, Tamil Nadu and can discuss furniture delivery to nearby locations, subject to product and delivery availability. Service area enquiries include ${areaServed.join(", ")}. Confirm delivery charges, access requirements and timelines with the showroom before ordering.`,
  },
  {
    id: "business-customisation",
    type: "business",
    title: "Furniture customisation and product enquiry",
    url: "/custom-design",
    content: `Metro Furniture can guide customers on available furniture sizes, fabrics, colours, finishes and configurations where supported by the selected model. Share room measurements and preferences on WhatsApp or visit the Salem Main Road showroom in Dharmapuri. The final price and availability should be confirmed by the showroom team.`,
  },
  {
    id: "business-catalogue",
    type: "business",
    title: "Furniture catalogue and product categories",
    url: "/shop",
    content: `The current Metro Furniture online catalogue lists these categories: ${[...new Set(products.map((product) => product.category).filter(Boolean))].join(", ")}. Customers can browse listed products, open individual product pages for specifications and request availability or an exact quote through WhatsApp. Some collection pages may not have online listings yet. For dining sets, bed frames, wardrobes, TV units, office furniture or other items not currently shown, ask the Dharmapuri showroom to confirm current options; do not claim that an unlisted item is in stock.`,
  },
  ...localFaq.map((faq, index) => ({
    id: `faq-${index + 1}`,
    type: "faq",
    title: faq.question,
    url: "/contact",
    content: `${faq.question} ${faq.answer}`,
  })),
];

const CORPUS = [...products.map(buildProductDocument), ...businessDocuments];
const DOC_TOKENS = CORPUS.map((doc) => new Set(tokens(`${doc.title} ${doc.content}`)));
const DOCUMENT_FREQUENCY = new Map();
for (const termSet of DOC_TOKENS) {
  for (const term of termSet) DOCUMENT_FREQUENCY.set(term, (DOCUMENT_FREQUENCY.get(term) || 0) + 1);
}

function scoreDocument(query, queryTokens, doc, index, productSlug) {
  const queryNormal = normalise(query);
  const titleNormal = normalise(doc.title);
  const contentNormal = normalise(doc.content);
  const titleTokens = tokens(doc.title);
  const contentTokens = DOC_TOKENS[index];
  let score = 0;

  if (queryNormal && titleNormal.includes(queryNormal)) score += 12;
  if (queryNormal.length > 3 && contentNormal.includes(queryNormal)) score += 4;
  if (doc.type === "product" && productSlug && doc.product?.slug === productSlug) score += 18;

  for (const term of queryTokens) {
    const frequency = DOCUMENT_FREQUENCY.get(term) || 1;
    const idf = Math.log(1 + CORPUS.length / frequency);
    if (titleTokens.includes(term)) score += 4.2 * idf;
    if (contentTokens.has(term)) score += 1.25 * idf;
  }

  const matchedCount = queryTokens.filter((term) => contentTokens.has(term)).length;
  if (queryTokens.length > 1 && matchedCount === queryTokens.length) score += 5;
  if (queryTokens.length >= 3 && matchedCount / queryTokens.length < 0.2) score *= 0.45;
  return score;
}

export function retrieveKnowledge(query, { productSlug = null, limit = 6 } = {}) {
  const queryTokens = expandedTokens(query);
  if (!queryTokens.length && !productSlug) return [];

  return CORPUS.map((doc, index) => ({
    ...doc,
    score: scoreDocument(query, queryTokens, doc, index, productSlug),
  }))
    .filter((doc) => doc.score > 0.8)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(1, Math.min(limit, 8)));
}

function formatProductLine(product, { includeDescription = false } = {}) {
  const price = product.onRequest || product.price == null
    ? "Price on request — ask the showroom for an exact quote"
    : `${product.priceLabel || `₹${Number(product.price).toLocaleString("en-IN")}`}${product.priceUnit === "set" ? " / set" : ""}`;
  const description = includeDescription && (product.tagline || product.description)
    ? ` — ${product.tagline || product.description}`
    : "";
  return `**${product.name}**${product.model ? ` (${product.model})` : ""} — ${price}${description}\n[View product](/product/${product.slug})`;
}

export function getRelevantProducts(query, retrieved) {
  const q = normalise(query);
  const productItems = retrieved.filter((item) => item.type === "product" && item.product);
  const exact = productItems.find(({ product }) =>
    (product.name && q.includes(normalise(product.name))) ||
    (product.model && q.includes(normalise(product.model)))
  );
  if (exact) return [exact.product];

  const categoryTerms = ["corner sofas", "sofas", "dining", "chairs", "mattresses", "chandeliers", "wall lights", "bathroom fittings"];
  const requestedCategory = categoryTerms.find((category) => q.includes(category));
  let candidates = productItems;
  if (requestedCategory) {
    candidates = candidates.filter(({ product }) => {
      const productCategory = normalise(product.category || "");
      if (requestedCategory === "sofas") return /sofa|corner/.test(productCategory);
      return productCategory.includes(requestedCategory) ||
        (requestedCategory === "mattresses" && productCategory.includes("mattress"));
    });
  } else if (productItems.length) {
    const maxScore = Math.max(...productItems.map((item) => item.score || 0));
    const threshold = Math.max(5.5, maxScore * 0.35);
    candidates = productItems.filter((item) => (item.score || 0) >= threshold);
  }

  return candidates
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product)
    .filter((product, index, list) => list.findIndex((other) => other.slug === product.slug) === index)
    .slice(0, 4);
}

export function buildRetrievalFallback(query, retrieved) {
  const q = normalise(query);
  const matchedProducts = getRelevantProducts(query, retrieved);
  // Keep "showroom" alone from swallowing hours/contact questions into the address branch.
  const isAddress = /\b(where|address|location|direction|directions|map|landmark|located|reach)\b/.test(q);
  const isHours = /\b(hour|hours|timing|open|opening|close|closing)\b|when.*visit/.test(q);
  const isContact = /\b(phone|call|contact|email|whatsapp|number)\b/.test(q);
  const isDelivery = /deliver|delivery|shipping|install|service area|nearby|town|district/.test(q);
  const isPrice = /price|cost|rate|how much|mrp|quote|₹|rupee/.test(q);
  const isSpecificProduct = matchedProducts.length > 0 && (
    matchedProducts[0].name.toLowerCase().split(" ").some((part) => part.length > 3 && q.includes(part)) ||
    (matchedProducts[0].model && q.includes(matchedProducts[0].model.toLowerCase()))
  );

  if (isAddress) {
    return `Our showroom is at **${business.address.line1}, ${business.address.line2}, ${business.address.city}, ${business.address.state} ${business.address.pin}**. We are near Senthil Nagar Bus Stop and Vincent Kalyana Mandapam on Salem Main Road.\n\n[Contact and directions](/contact)`;
  }
  if (isHours) {
    return `Our Dharmapuri showroom is open **${business.hours}**. You can visit to compare products and discuss sizes, colours and finishes.\n\n[Plan your visit](/contact)`;
  }
  if (isContact) {
    return `You can call **+91 ${formatIndianPhone(business.primaryPhone)}**, WhatsApp the showroom or email **${business.email}**.\n\n[Contact Metro Furniture](/contact)`;
  }
  if (isDelivery) {
    return `Delivery can be discussed for Dharmapuri and nearby areas including ${areaServed.slice(1, 7).join(", ")}. Charges and delivery timelines vary by product and destination, so please confirm with the showroom before placing an order.\n\n[Ask about delivery](/contact)`;
  }

  if (matchedProducts.length) {
    if (isSpecificProduct || isPrice) {
      return `Here is the catalogue information I found:\n\n${matchedProducts.slice(0, 3).map((p) => formatProductLine(p, { includeDescription: true })).join("\n\n")}\n\nFinal availability and any customisation price should be confirmed with the showroom.`;
    }
    return `These catalogue items look relevant to your question:\n\n${matchedProducts.slice(0, 4).map((p) => formatProductLine(p, { includeDescription: true })).join("\n\n")}\n\nOpen a product to see its details, or tell me your room size, preferred style or budget to narrow the options.`;
  }

  const usefulDoc = retrieved.find((item) => item.type !== "product");
  if (usefulDoc) {
    return `${usefulDoc.content}\n\nFor model-specific details, please open the catalogue or ask our showroom team to confirm.`;
  }

  const listedCategories = [...new Set(products.map((product) => product.category).filter(Boolean))].join(", ");
  return `I couldn't find a verified match in the current Metro Furniture catalogue for that question. The online catalogue currently lists: ${listedCategories}. For other furniture types, contact our Dharmapuri showroom to confirm what is available.\n\n[Browse the catalogue](/shop) · [Contact the showroom](/contact)`;
}

export async function generateRagAnswer({ query, history = [], retrieved = [] }) {
  // The default chatbot is fully local and retrieval-based. Only opt into an
  // external chat-completions provider when CHATBOT_MODE=hybrid is explicit.
  const mode = String(process.env.CHATBOT_MODE || "local").trim().toLowerCase();
  if (mode !== "hybrid") return null;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const base = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const context = retrieved.slice(0, 6).map((doc, index) => {
    const product = doc.product;
    const summary = product
      ? `${doc.content}\nVerified product URL: /product/${product.slug}`
      : doc.content;
    return `[Source ${index + 1}: ${doc.title}]\n${summary}`;
  }).join("\n\n");

  const safeHistory = history
    .filter((item) => ["user", "assistant"].includes(item?.role) && typeof item?.content === "string")
    .slice(-6)
    .map((item) => ({ role: item.role, content: item.content.slice(0, 700) }));

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: `You are the Metro Furniture product and showroom assistant for Dharmapuri, Tamil Nadu. Use the supplied retrieved context as the source of truth. Never invent prices, discounts, product availability, delivery charges, warranties, policies or stock. If the context does not answer something, say the showroom team must confirm it. Keep the reply friendly, useful and concise (1-5 short paragraphs). Use Indian English and Markdown. Do not include raw HTML or pretend an enquiry was submitted.\n\nRETRIEVED CONTEXT:\n${context || "No matching verified context was retrieved."}`,
          },
          ...safeHistory,
          { role: "user", content: query.slice(0, 800) },
        ],
      }),
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();
    return answer || null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
