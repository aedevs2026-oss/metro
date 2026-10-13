import { cn } from "@/lib/utils";

export default function LuxurySectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}) {
  const centered = align === "center";

  return (
    <header className={cn(centered ? "mx-auto max-w-2xl text-center" : "max-w-xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "section-eyebrow text-accent-dark luxury-eyebrow",
            centered && "justify-center",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2
          className={cn(
            "home-h2 text-foreground",
            eyebrow ? "mt-4" : "",
            typeof title === "string" && title.includes("\n") ? "whitespace-pre-line" : "",
          )}
        >
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className={cn("home-body mt-4 text-body", centered && "mx-auto max-w-lg")}>{description}</p>
      ) : null}
    </header>
  );
}
