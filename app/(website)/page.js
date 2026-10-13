import CtaBanner from "@/components/CtaBanner";
import DiscoverBySpace from "@/components/home/DiscoverBySpace";
import HomeHero from "@/components/home/HomeHero";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import ShowroomSection from "@/components/home/ShowroomSection";
import SignatureCollection from "@/components/home/SignatureCollection";
import StorySection from "@/components/home/StorySection";
import TrendingNow from "@/components/home/TrendingNow";
import WhyMetro from "@/components/home/WhyMetro";
import LocalShowroomGuide from "@/components/home/LocalShowroomGuide";
import CustomerToolsSection from "@/components/home/CustomerToolsSection";
import { business } from "@/data/business";
import {
  brandStory,
  ctaBannerImage,
  ctaTrustStats,
  discoverSpaces,
  signatureCollectionSection,
  getHomeSignatureProducts,
  heroContent,
  serviceHighlights,
  showroomPromo,
  testimonialsSection,
  trendingCollections,
  trendingSection,
  whyMetro,
} from "@/data/home";
import { testimonials } from "@/data/products";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { buildFaqPage } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Spaces That Inspire — Dharmapuri Showroom",
  description:
    "Explore sofas, corner sofas, mattresses, chairs and designer lighting at Metro Furniture, a furniture showroom on Salem Main Road, Senthil Nagar, Dharmapuri, Tamil Nadu. Ask our team about dining furniture and other current showroom options, product details, customisation and delivery.",
  path: "/",
  keywords: ["furniture showroom Dharmapuri", "sofa shop Senthil Nagar", "furniture shop Salem Main Road", "dining furniture enquiry Dharmapuri", "mattress showroom Dharmapuri", "furniture near Senthil Nagar bus stop", "premium furniture Tamil Nadu"],
});

export default function HomePage() {
  const signatureProducts = getHomeSignatureProducts(3);

  return (
    <div className="overflow-x-hidden bg-[var(--home-cream)]">
      <JsonLd data={buildFaqPage()} />
      <HomeHero content={heroContent} />
      <ServiceHighlights items={serviceHighlights} />
      <DiscoverBySpace section={discoverSpaces} />
      <SignatureCollection section={signatureCollectionSection} products={signatureProducts} />
      <CustomerToolsSection />
      <StorySection story={brandStory} />
      <TrendingNow section={trendingSection} items={trendingCollections} />
      <ShowroomSection promo={showroomPromo} />
      <WhyMetro items={whyMetro} />
      <LocalShowroomGuide />
      <HomeTestimonials items={testimonials.slice(0, 3)} section={testimonialsSection} />
      <CtaBanner stats={ctaTrustStats} backgroundImage={ctaBannerImage} />
    </div>
  );
}
