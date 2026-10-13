import Image from "next/image";
import AnimateIn from "@/components/AnimateIn";

export default function ContactWhyChoose({ section }) {
  return (
    <section className="border-t border-[#e8e2da]/80 bg-[#f7f3f0] py-14 md:py-20 lg:py-24">
      <div className="container">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-accent-dark">{section.eyebrow}</p>
          <h2 className="home-h2 mt-3 whitespace-pre-line text-foreground">{section.title}</h2>
        </AnimateIn>

        <ul className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {section.items.map((item, i) => (
            <AnimateIn key={item.id} delay={i * 0.05}>
              <li className="flex h-full flex-col items-center rounded-2xl border border-[#e8e2da] bg-white px-5 py-7 text-center shadow-[0_4px_22px_rgba(17,24,39,0.05)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/28 bg-[#faf7f2]">
                  <Image src={item.icon} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{item.description}</p>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}