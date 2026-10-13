import { Suspense } from "react";
import CollectionHeader from "@/components/shop/CollectionHeader";
import ShopCategoryNav from "@/components/shop/ShopCategoryNav";
import ShopCollectionLayout from "@/components/shop/ShopCollectionLayout";
import ShopHero from "@/components/shop/ShopHero";
import ShopNewsletter from "@/components/shop/ShopNewsletter";
import ShopValueBar from "@/components/shop/ShopValueBar";
import ProductGridSkeleton from "@/components/ProductSkeleton";
import LocalFurnitureContent from "@/components/seo/LocalFurnitureContent";
import { categories } from "@/data/categories";
import { business } from "@/data/business";
import { products, searchProducts } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { getShopSeoTargets } from "@/data/seo-targets";

export const metadata = buildMetadata({
  title: "Shop Furniture in Dharmapuri",
  description: `Browse sofas, corner sofas, dining sets, beds, lighting and home décor at ${business.name} on Salem Main Road, Senthil Nagar, Dharmapuri. Showroom prices — enquire on WhatsApp +91 ${business.primaryPhone}.`,
  path: "/shop",
  keywords: getShopSeoTargets(),
});

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";
  const category = params?.category || "all";

  let filtered = query ? searchProducts(query) : [...products];
  if (category && category !== "all") {
    const match = categories.find(
      (c) => c.slug === category || c.id === category
    );
    const id = match?.id || category;
    filtered = filtered.filter((product) => product.category === id);
  }

  return (
    <>
      <ShopHero />
      <ShopCategoryNav />

      <section className="container py-10 md:py-14">
        <CollectionHeader productCount={filtered.length} />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ShopCollectionLayout
            products={filtered}
            allProducts={products}
            query={query}
          />
        </Suspense>
      </section>

      <LocalFurnitureContent mode="shop" />

      <ShopValueBar />
      <ShopNewsletter />
    </>
  );
}
