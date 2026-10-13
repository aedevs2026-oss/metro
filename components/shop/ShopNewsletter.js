"use client";

import { useState } from "react";

export default function ShopNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <section className="bg-primary py-12 md:py-14">
      <div className="container text-center">
        <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
          Stay Inspired
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
          Get new arrivals, offers and styling ideas from Metro Furniture.
        </p>
        {done ? (
          <p className="mt-6 text-sm font-medium text-accent-light">
            Thank you — we&apos;ll be in touch soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="shop-newsletter-email" className="sr-only">Email</label>
            <input
              id="shop-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-accent"
            />
            <button type="submit" className="btn-pill-primary shrink-0 px-6">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
