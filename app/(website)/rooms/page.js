import RoomsConsultation from "@/components/rooms/RoomsConsultation";
import RoomsExplore from "@/components/rooms/RoomsExplore";
import RoomsHero from "@/components/rooms/RoomsHero";
import RoomsInspiration from "@/components/rooms/RoomsInspiration";
import { business } from "@/data/business";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Rooms | Complete Home Solutions",
  description: `Explore living, bedroom, dining and more — curated room ideas from ${business.name}, Dharmapuri.`,
  path: "/rooms",
  keywords: ["Rooms", "Living Room", "Bedroom", "Dining Room", "Home Office", "Dharmapuri"],
});

export default function RoomsPage() {
  return (
    <>
      <RoomsHero />
      <RoomsExplore />
      <RoomsConsultation />
      <RoomsInspiration />
    </>
  );
}
