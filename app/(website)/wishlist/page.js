import SavedProductsPage from "@/components/customer-tools/SavedProductsPage";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "Saved Furniture Favourites in Dharmapuri", description: "Save your favourite sofas, beds, dining furniture and home décor from Metro Furniture, Dharmapuri, and revisit your shortlist before a showroom visit.", path: "/wishlist", keywords: ["saved furniture", "furniture wishlist Dharmapuri", "sofas Dharmapuri"] });
export default function WishlistPage() { return <SavedProductsPage />; }
