"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

export default function Testimonials({ items, variant = "default" }) {
  const cardClass =
    variant === "home"
      ? "flex h-full flex-col rounded-2xl border border-border/40 bg-white p-6 shadow-sm luxury-shadow-hover"
      : "flex h-full flex-col rounded-3xl glass-card p-6 luxury-shadow-hover";

  return (
    <ul className={`grid gap-3 md:gap-5 md:grid-cols-3 ${variant === "home" ? "home-testimonials-grid grid-cols-2" : ""}`}>
      {items.map((item, i) => (
        <AnimateIn key={item.id} delay={i * 0.1}>
          <motion.li whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className={cardClass}>
            <div className="mb-4 flex gap-1 text-accent" aria-label={`${item.rating} out of 5 stars`}>
              {Array.from({ length: item.rating }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" aria-hidden />
              ))}
            </div>
            <blockquote className="flex-1 text-sm italic leading-relaxed text-body">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div className="mt-5 border-t border-border pt-4">
              <p className="font-semibold text-foreground">{item.name}</p>
              <p className="text-xs text-body">{item.location}</p>
            </div>
          </motion.li>
        </AnimateIn>
      ))}
    </ul>
  );
}
