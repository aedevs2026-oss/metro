import AnimateIn from "@/components/AnimateIn";
import { BadgeCheck, Headset, House, Sparkles } from "lucide-react";

const icons = [House, Headset, Sparkles, BadgeCheck];

export default function AboutStatsBar({ stats }) {
  return (
    <section className="metro-about-stats relative overflow-hidden bg-[#14120f] py-12 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(200,169,106,.15),transparent_58%)]" aria-hidden="true" />
      <div className="container relative">
        <ul className="grid grid-cols-2 gap-7 md:grid-cols-4 md:gap-4">
          {stats.map((stat, i) => {
            const Icon = icons[i % icons.length];
            return (
              <AnimateIn key={stat.id} delay={i * .05}>
                <li className={`flex flex-col items-center px-2 text-center ${i > 0 ? "md:border-l md:border-white/10" : ""}`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(228,201,145,.3)] bg-white/[.045] text-[#e8c98d] shadow-[inset_0_1px_0_rgba(255,255,255,.08)]"><Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" /></span>
                  <p className="mt-3 font-heading text-xl font-semibold text-[#e8c98d] md:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/65 sm:text-sm">{stat.label}</p>
                </li>
              </AnimateIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
