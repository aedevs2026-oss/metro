import AnimateIn from "@/components/AnimateIn";

export default function SectionHeading({
  title,
  description,
  eyebrow,
  align = "center",
  className = "",
}) {
  const alignClass = align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <AnimateIn className={`mb-9 flex flex-col gap-2.5 ${alignClass} ${className}`}>
      {eyebrow ? (
        <p className="section-eyebrow inline-flex items-center gap-2 text-[10px] font-bold text-[#8f642b] md:text-[11px]">
          <span className="h-px w-5 bg-gradient-to-r from-transparent to-[#b98e4b]" aria-hidden />
          {eyebrow}
          <span className="h-px w-5 bg-gradient-to-l from-transparent to-[#b98e4b]" aria-hidden />
        </p>
      ) : null}
      <h2 className="max-w-3xl font-heading text-2xl font-semibold leading-tight tracking-[-.03em] text-[#211e18] md:text-3xl lg:text-[2.45rem]">
        {title}
      </h2>
      <span className="h-[2px] w-12 rounded-full bg-gradient-to-r from-[#ead3a0] via-[#b98e4b] to-transparent" aria-hidden />
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-stone-600 md:text-base md:leading-8">
          {description}
        </p>
      ) : null}
    </AnimateIn>
  );
}
