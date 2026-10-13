import RoomMeasurementAssistant from "@/components/tools/RoomMeasurementAssistant";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Room & Sofa Measurement Assistant in Dharmapuri",
  description: "Estimate sofa footprint, room clearance and doorway access before visiting Metro Furniture on Salem Main Road, Dharmapuri. Use our simple room measurement assistant and confirm final dimensions with the showroom team.",
  path: "/room-measurement",
  keywords: ["sofa measurement calculator", "will sofa fit in room", "sofa dimensions Dharmapuri", "furniture room planner", "Metro Furniture Dharmapuri"],
});

export default async function RoomMeasurementPage({ searchParams }) {
  const params = await searchParams;
  const initialProductSlug = typeof params?.product === "string" ? params.product : "";
  return <RoomMeasurementAssistant products={products.filter((p) => !p.upcoming)} initialProductSlug={initialProductSlug} />;
}
