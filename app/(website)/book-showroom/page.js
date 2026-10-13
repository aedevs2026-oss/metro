import ShowroomAppointmentForm from "@/components/tools/ShowroomAppointmentForm";
import { products } from "@/data/products";
import { business } from "@/data/business";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book a Furniture Showroom Visit in Dharmapuri",
  description: `Request a showroom appointment at ${business.name}, Salem Main Road, Dharmapuri. Choose a preferred date and time to view sofas, furniture finishes and available collections.`,
  path: "/book-showroom",
  keywords: ["book furniture showroom visit Dharmapuri", "sofa showroom appointment Dharmapuri", "Metro Furniture hours", "furniture store Salem Main Road"],
});

export default async function BookShowroomPage({ searchParams }) {
  const params = await searchParams;
  const initialProductSlug = typeof params?.product === "string" ? params.product : "";
  return <ShowroomAppointmentForm products={products} initialProductSlug={initialProductSlug} />;
}
