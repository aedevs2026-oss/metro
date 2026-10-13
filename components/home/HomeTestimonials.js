import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Testimonials from "@/components/Testimonials";
import AnimateIn from "@/components/AnimateIn";
import { HOME_PHOTO_QUALITY } from "@/lib/home-images";

export default function HomeTestimonials({ items, section }) {
  const backgroundImage = section?.backgroundImage;

  return (
    <section className="home-testimonials-section relative overflow-hidden luxury-divider-top py-16 md:py-20 lg:py-24">
      {backgroundImage ? (
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={backgroundImage}
            alt=""
            fill
            quality={HOME_PHOTO_QUALITY}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#f7f3f0]/90" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(247,243,240,0.95) 0%, rgba(247,243,240,0.88) 42%, rgba(247,243,240,0.82) 100%)",
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[#faf8f5]" aria-hidden />
      )}

      <div className="container relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start lg:gap-12 xl:gap-14">
          <AnimateIn>
            <h2 className="home-h2 whitespace-pre-line text-foreground">Real Homes{"\n"}Real Stories</h2>
            <p className="home-body mt-4 text-body">
              Trusted by families across Dharmapuri — real feedback from customers who furnished their homes with
              Metro.
            </p>
            <Link
              href="/contact"
              className="btn-pill-primary mt-8 inline-flex text-sm"
            >
              View All Reviews
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </AnimateIn>

          <Testimonials items={items} variant="home" />
        </div>
      </div>
    </section>
  );
}
