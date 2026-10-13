import AboutHero from "@/components/about/AboutHero";
import AboutJourney from "@/components/about/AboutJourney";
import AboutMissionVision from "@/components/about/AboutMissionVision";
import AboutStatsBar from "@/components/about/AboutStatsBar";
import AboutVisitShowroom from "@/components/about/AboutVisitShowroom";
import AboutWhyChoose from "@/components/about/AboutWhyChoose";
import AboutBrandPromise from "@/components/about/AboutBrandPromise";
import {
  aboutHero,
  aboutJourney,
  aboutMissionVision,
  aboutStats,
  aboutVisit,
  aboutWhyChoose,
} from "@/data/about";
import { business } from "@/data/business";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description: `Discover Metro Furniture in Dharmapuri, Tamil Nadu. Explore premium sofas, beds, dining furniture, mattresses and home interiors, with showroom guidance, customisation options and product enquiries.`,
  path: "/about",
  keywords: ["Metro Furniture Dharmapuri", "furniture showroom Dharmapuri", "premium furniture Salem Main Road", "sofa showroom Dharmapuri", "furniture store Tamil Nadu", "custom furniture Dharmapuri"],
});

export default function AboutPage() {
  return (
    <div className="metro-about-page">
      <AboutHero content={aboutHero} />
      <AboutJourney section={aboutJourney} />
      <AboutWhyChoose section={aboutWhyChoose} />
      <AboutBrandPromise />
      <AboutStatsBar stats={aboutStats} />
      <AboutVisitShowroom section={aboutVisit} />
      <AboutMissionVision section={aboutMissionVision} />
    </div>
  );
}
