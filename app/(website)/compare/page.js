import SavedProductsPage from "@/components/customer-tools/SavedProductsPage";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "Compare Furniture in Dharmapuri", description: "Compare furniture options by category, starting price, material, colour and configuration before visiting Metro Furniture showroom in Dharmapuri.", path: "/compare", keywords: ["compare sofas Dharmapuri", "furniture comparison", "sofa materials"] });
export default function ComparePage() { return <SavedProductsPage mode="compare" />; }
