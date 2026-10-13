"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeaderSearch({
  placeholder = "Search sofas, beds, dining...",
  className = "",
  variant = "dark",
}) {
  const router = useRouter();
  const inputId = useId();
  const [query, setQuery] = useState("");
  const isDark = variant === "dark";

  function handleSubmit(event) {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`header-search-form group min-w-0 ${className}`}
      role="search"
      aria-label="Search furniture catalogue"
    >
      <label htmlFor={inputId} className="sr-only">
        Search furniture
      </label>
      <div
        className={`header-search-shell flex min-w-0 w-full items-center gap-1 rounded-full border p-1.5 pl-4 transition-all duration-300 ${
          isDark
            ? "border-white/20 bg-white/[0.07] text-white shadow-inner shadow-white/[0.025]"
            : "border-border bg-white text-foreground"
        }`}
      >
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className={`header-search-input w-full min-w-0 bg-transparent py-1 text-[13px] outline-none ${
            isDark
              ? "text-white placeholder:text-white/48"
              : "text-foreground placeholder:text-body/60"
          }`}
        />
        <button
          type="submit"
          className={`header-search-submit flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
            isDark
              ? "bg-[#d8bb7f]/12 text-[#f0d8a5] hover:bg-[#d8bb7f]/25 hover:text-white"
              : "bg-[#f4ead8] text-[#8c652d] hover:bg-[#ead7b3]"
          }`}
          aria-label="Search products"
          title="Search products"
        >
          <Search className="h-[17px] w-[17px]" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </form>
  );
}
