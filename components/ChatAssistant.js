"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Bot, MapPin, MessageCircle, Send, ShoppingBag, X } from "lucide-react";
import { QUICK_ACTIONS, getChatResponse, processOrderStep } from "@/lib/chatbot";
import { getProductBySlug } from "@/data/products";
import { PriceOnly } from "@/components/PriceTag";
import { business } from "@/data/business";

function renderText(text) {
  const source = String(text || "");
  const parts = source.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^\)]+\))/g);
  return parts.map((part, index) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={index}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/")) {
        return <Link key={index} href={href} className="font-semibold text-accent-dark underline decoration-accent/50 underline-offset-2">{label}</Link>;
      }
      if (/^https:\/\//i.test(href)) {
        return <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-dark underline decoration-accent/50 underline-offset-2">{label}</a>;
      }
      return <span key={index}>{label}</span>;
    }
    return <span key={index}>{part}</span>;
  });
}

function ChatProductCard({ product, onSelect }) {
  return (
    <div className="mt-2 overflow-hidden rounded-2xl border border-[rgba(200,169,106,.22)] bg-white/85 shadow-[0_8px_24px_rgba(28,25,20,.05)] backdrop-blur-xl">
      <Link href={`/product/${product.slug}`} className="group flex gap-3 p-2.5 transition hover:bg-[#fbf6ec]">
        <div className="relative h-[68px] w-[76px] shrink-0 overflow-hidden rounded-xl bg-[#f1e8db]">
          <Image src={product.image} alt={product.name} fill sizes="76px" className="object-contain p-1" />
        </div>
        <div className="min-w-0 flex-1 py-0.5">
          <p className="line-clamp-2 text-xs font-semibold text-foreground">{product.name}</p>
          <p className="mt-0.5 text-[10px] text-body">{product.category}{product.model ? ` · ${product.model}` : ""}</p>
          <div className="mt-1"><PriceOnly product={product} size="sm" /></div>
        </div>
        <ArrowRight className="mt-4 h-4 w-4 shrink-0 text-accent-dark transition group-hover:translate-x-0.5" />
      </Link>
      {onSelect ? (
        <button type="button" onClick={() => onSelect(product)} className="w-full border-t border-[#eee3d4] bg-white/70 py-2 text-[11px] font-semibold text-accent-dark transition hover:bg-[#f8f0e2]">
          Enquire about this item
        </button>
      ) : null}
    </div>
  );
}

const CHATBOT_ENABLED = process.env.NEXT_PUBLIC_CHATBOT_ENABLED !== "false";

export default function ChatAssistant() {
  const pathname = usePathname();
  const productContext = pathname?.startsWith("/product/")
    ? getProductBySlug(pathname.split("/product/")[1])
    : null;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [orderFlow, setOrderFlow] = useState(null);
  const [whatsappUrl, setWhatsappUrl] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const pushBot = useCallback((text, extra = {}) => {
    setMessages((prev) => [...prev, { role: "bot", text, ...extra }]);
    if (extra.whatsappUrl) setWhatsappUrl(extra.whatsappUrl);
    if (extra.orderFlow !== undefined) setOrderFlow(extra.orderFlow);
  }, []);

  const pushUser = useCallback((text) => {
    setMessages((prev) => [...prev, { role: "user", text }]);
  }, []);

  const greet = useCallback(() => {
    if (productContext) {
      pushBot(`I can help you with **${productContext.name}**. Ask about the features, price shown in the catalogue, available customisation or how to visit our Dharmapuri showroom.`, {
        productCards: [productContext],
        actions: QUICK_ACTIONS,
      });
      return;
    }
    pushBot(`Welcome to **${business.shortName}**. I can help you find furniture, check verified catalogue details, understand showroom timings and contact our team. What are you looking for today?`, {
      actions: QUICK_ACTIONS,
    });
  }, [productContext, pushBot]);

  useEffect(() => {
    if (open && messages.length === 0) greet();
  }, [open, messages.length, greet]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, whatsappUrl, isTyping]);

  useEffect(() => {
    if (open) {
      const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(focusTimer);
    }
    return undefined;
  }, [open]);

  const handleSend = async (rawText) => {
    const msg = String(rawText ?? input).trim();
    if (!msg || isTyping) return;
    setInput("");
    pushUser(msg);

    if (orderFlow) {
      const productHint = productContext && orderFlow.step === "product" ? productContext : null;
      const result = processOrderStep(orderFlow.step, msg, orderFlow.data, productHint);
      pushBot(result.text, {
        orderFlow: result.orderFlow,
        whatsappUrl: result.whatsappUrl,
        productCards: result.productCards,
        actions: result.actions || QUICK_ACTIONS,
      });
      return;
    }

    if (/^(hi|hello|hey|namaste|vanakkam|start)[!.\s]*$/i.test(msg)) {
      const result = getChatResponse(msg, { orderFlow: null });
      pushBot(result.text, { actions: result.actions || QUICK_ACTIONS });
      return;
    }

    // Keep the structured order collection flow local and predictable.
    if (/\b(order|buy|purchase|place an order|book this)\b/i.test(msg)) {
      const result = getChatResponse(msg, { orderFlow: null });
      if (result.orderFlow) {
        pushBot(result.text, { orderFlow: result.orderFlow, actions: result.actions || QUICK_ACTIONS });
        return;
      }
    }

    const history = messages
      .filter((message) => message.role === "user" || message.role === "bot")
      .slice(-6)
      .map((message) => ({
        role: message.role === "bot" ? "assistant" : "user",
        content: String(message.text || "").slice(0, 700),
      }));

    setIsTyping(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          history,
          productSlug: productContext?.slug || null,
        }),
      });
      if (!response.ok) throw new Error("RAG request failed");
      const data = await response.json();
      if (!data?.answer) throw new Error("No answer returned");
      pushBot(data.answer, {
        productCards: data.products || [],
        sources: data.sources || [],
        actions: data.actions || QUICK_ACTIONS,
      });
    } catch {
      // Reliable catalogue/FAQ fallback if the RAG route is unavailable.
      const result = getChatResponse(msg, { orderFlow: null });
      pushBot(result.text, {
        actions: result.actions || QUICK_ACTIONS,
        productCards: result.productCards || [],
      });
    } finally {
      setIsTyping(false);
    }
  };

  const startOrder = (product) => {
    pushUser(`Enquire about ${product.name}`);
    const result = processOrderStep("product", product.name, {}, product);
    pushBot(result.text, { orderFlow: result.orderFlow, productCards: result.productCards });
  };

  const handleQuickAction = (action) => {
    if (action.id === "order") {
      if (productContext) startOrder(productContext);
      else handleSend("I want to place an order");
      return;
    }
    const prompts = {
      sofas: "Show me sofa sets",
      corners: "Show corner sofas",
      dining: "Show dining sets",
      lights: "Show lighting collection",
      location: "Where is the showroom?",
      hours: "What are your timings?",
    };
    handleSend(prompts[action.id] || action.label);
  };

  if (!CHATBOT_ENABLED) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close Metro Assistant" : "Open Metro Assistant"}
        aria-expanded={open}
        className="fixed bottom-[5.4rem] left-4 z-[65] flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-[linear-gradient(145deg,#d7bd82,#a8843a)] text-[#161616] shadow-[0_12px_36px_rgba(35,28,16,.25)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(35,28,16,.32)] md:bottom-6 md:left-6"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        {!open && <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" aria-hidden="true" />}
      </button>

      {open ? (
        <section aria-label="Metro Furniture chat assistant" className="fixed inset-x-2 bottom-2 z-[64] flex h-[min(690px,calc(100dvh-1rem))] max-h-[calc(100dvh-1rem)] flex-col overflow-hidden rounded-[26px] border border-[rgba(200,169,106,.35)] bg-[rgba(250,248,244,.94)] shadow-[0_28px_100px_rgba(15,15,15,.32)] backdrop-blur-2xl max-lg:bottom-[calc(4.8rem+env(safe-area-inset-bottom))] max-lg:h-[min(680px,calc(100dvh-6rem))] lg:inset-x-auto lg:bottom-24 lg:left-6 lg:w-[min(410px,calc(100vw-3rem))]">
          <div className="relative flex items-center gap-3 border-b border-[rgba(200,169,106,.25)] bg-[linear-gradient(115deg,rgba(255,255,255,.96),rgba(246,238,225,.92))] px-4 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#1a1c20] text-[#dfc58e] shadow-md">
              <Bot className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold tracking-tight text-foreground">Metro Assistant</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-body"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Catalogue-aware help · Dharmapuri showroom</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-black/5 bg-white/70 p-2 text-body transition hover:bg-white hover:text-foreground" aria-label="Close chat"><X className="h-4 w-4" /></button>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[radial-gradient(ellipse_at_top,rgba(200,169,106,.09),transparent_48%)] px-3 py-4 sm:px-4" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[93%] rounded-[18px] px-3.5 py-3 text-[12px] leading-[1.65] shadow-sm sm:text-[13px] ${message.role === "user" ? "rounded-br-md bg-[#242323] text-white" : "rounded-bl-md border border-white/80 bg-white/80 text-foreground backdrop-blur-xl"}`}>
                  <div className="whitespace-pre-wrap">{renderText(message.text)}</div>
                  {message.productCards?.length ? (
                    <div className="mt-2 space-y-2">
                      {message.productCards.map((product) => <ChatProductCard key={product.id || product.slug} product={product} onSelect={message.role === "bot" ? startOrder : undefined} />)}
                    </div>
                  ) : null}
                  {message.sources?.length ? (
                    <div className="mt-3 border-t border-[#e8ddca] pt-2">
                      <p className="mb-1 text-[9px] font-semibold uppercase tracking-[.14em] text-body/65">Related pages</p>
                      <div className="flex flex-wrap gap-1.5">
                        {message.sources.slice(0, 3).map((source) => (
                          <Link key={`${source.url}-${source.title}`} href={source.url || "/shop"} className="rounded-full border border-[#e8ddca] bg-[#fffdfa] px-2.5 py-1 text-[10px] font-medium text-accent-dark hover:border-accent">{source.title}</Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {message.actions?.length && message.role === "bot" ? (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {message.actions.slice(0, 5).map((action) => (
                        <button key={action.id} type="button" onClick={() => handleQuickAction(action)} className="rounded-full border border-[rgba(200,169,106,.32)] bg-white/85 px-2.5 py-1.5 text-[10px] font-semibold text-foreground transition hover:border-accent hover:bg-[#f8f0e2]">
                          {action.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            {isTyping ? (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-white/80 bg-white/85 px-4 py-3 text-xs text-body shadow-sm">
                  <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-dark" /><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-dark [animation-delay:150ms]" /><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-dark [animation-delay:300ms]" /> Checking our catalogue…</span>
                </div>
              </div>
            ) : null}

            {whatsappUrl ? (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1ebe5d]">
                <ShoppingBag className="h-4 w-4" /> Continue on WhatsApp
              </a>
            ) : null}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-[rgba(200,169,106,.24)] bg-white/70 p-3 backdrop-blur-xl sm:p-4">
            <div className="mb-2 flex items-center justify-between px-1 text-[10px] text-body/65"><span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />Dharmapuri, Tamil Nadu</span><span>Answers based on catalogue information</span></div>
            <form onSubmit={(event) => { event.preventDefault(); handleSend(); }} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                disabled={isTyping}
                placeholder={orderFlow?.step === "mobile" ? "10-digit mobile number…" : orderFlow?.step === "address" ? "Delivery address…" : orderFlow?.step === "product" ? "Product name or model…" : "Ask about furniture or showroom…"}
                className="min-w-0 flex-1 rounded-2xl border border-[#e8ddca] bg-white/90 px-3.5 py-3 text-sm outline-none placeholder:text-body/55 focus:border-accent focus:ring-4 focus:ring-accent/10 disabled:opacity-60"
                aria-label="Message Metro Assistant"
              />
              <button type="submit" disabled={!input.trim() || isTyping} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1a1c20] text-[#e5cb92] shadow-sm transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40" aria-label="Send message"><Send className="h-4 w-4" /></button>
            </form>
          </div>
        </section>
      ) : null}
    </>
  );
}
