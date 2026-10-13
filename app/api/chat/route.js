import { NextResponse } from "next/server";
import { retrieveKnowledge, buildRetrievalFallback, generateRagAnswer, getRelevantProducts } from "@/lib/rag/retriever";
import { QUICK_ACTIONS } from "@/lib/chatbot";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isLocalMode() {
  return String(process.env.CHATBOT_MODE || "local").trim().toLowerCase() !== "hybrid" || !process.env.OPENAI_API_KEY;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    status: "ready",
    mode: isLocalMode() ? "local-rag" : "hybrid-rag",
    requiresOpenAI: false,
    knowledgeSources: ["product_catalogue", "business_details", "local_faq"],
  }, { headers: { "Cache-Control": "no-store" } });
}

const rateLimitStore = new Map();
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 24;

function isRateLimited(request) {
  const forwarded = request.headers.get("x-forwarded-for") || "unknown";
  const key = forwarded.split(",")[0].trim().slice(0, 80) || "unknown";
  const now = Date.now();
  const current = rateLimitStore.get(key);
  if (!current || now - current.startedAt >= RATE_WINDOW_MS) {
    rateLimitStore.set(key, { startedAt: now, count: 1 });
  } else {
    current.count += 1;
    if (current.count > RATE_LIMIT) return true;
  }
  // Best-effort cleanup for a long-running instance; serverless deployments may recycle this map.
  if (rateLimitStore.size > 1000) {
    for (const [ip, entry] of rateLimitStore) {
      if (now - entry.startedAt >= RATE_WINDOW_MS) rateLimitStore.delete(ip);
    }
  }
  return false;
}

function cleanHistory(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => ["user", "assistant"].includes(item?.role) && typeof item?.content === "string")
    .slice(-6)
    .map((item) => ({ role: item.role, content: item.content.slice(0, 700) }));
}

export async function POST(request) {
  if (isRateLimited(request)) {
    return NextResponse.json({ error: "Please wait a moment before sending another question." }, { status: 429, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message.trim().slice(0, 800) : "";
    const productSlug = typeof body?.productSlug === "string" ? body.productSlug.slice(0, 120) : null;
    if (message.length < 2) {
      return NextResponse.json({ error: "Please enter a question." }, { status: 400, headers: { "Cache-Control": "no-store" } });
    }

    const retrieved = retrieveKnowledge(message, { productSlug, limit: 6 });
    const history = cleanHistory(body?.history);
    // Local mode never calls any external model API; retrieval + grounded answer
    // templates run inside this Next.js server route.
    const aiAnswer = isLocalMode()
      ? null
      : await generateRagAnswer({ query: message, history, retrieved });
    const answer = aiAnswer || buildRetrievalFallback(message, retrieved);
    const matchedProducts = getRelevantProducts(message, retrieved);
    const sources = retrieved.slice(0, 4).map((item) => ({ title: item.title, url: item.url, type: item.type }));

    return NextResponse.json({
      answer,
      products: matchedProducts,
      sources,
      actions: QUICK_ACTIONS,
      mode: aiAnswer ? "hybrid-rag" : "local-rag",
    }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json(
      { error: "I couldn't process that question. Please try again or contact the showroom." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
