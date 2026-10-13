import { Suspense } from "react";
import { notFound } from "next/navigation";
import CollectionHeader from "@/components/shop/CollectionHeader";
import EmptyCategoryLanding from "@/components/shop/EmptyCategoryLanding";
import ShopCategoryNav from "@/components/shop/ShopCategoryNav";
import ShopCollectionLayout from "@/components/shop/ShopCollectionLayout";
import ShopHero from "@/components/shop/ShopHero";
import ShopNewsletter from "@/components/shop/ShopNewsletter";
import ShopValueBar from "@/components/shop/ShopValueBar";
import ProductGridSkeleton from "@/components/ProductSkeleton";
import LocalFurnitureContent from "@/components/seo/LocalFurnitureContent";
import { categories, getCategoryBySlug } from "@/data/categories";
import { products, getProductsByCategory } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { getCategorySeoTargets } from "@/data/seo-targets";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return buildMetadata({
      title: "Category Not Found",
      description: "Furniture category not found.",
      path: "/shop",
    });
  }
  const hasListedProducts = getProductsByCategory(category.id).length > 0;
  return buildMetadata({
    title: `${category.name} in Dharmapuri | Metro Furniture`,
    description: hasListedProducts
      ? `Explore ${category.name.toLowerCase()} at Metro Furniture in Dharmapuri, Tamil Nadu. Compare product details and contact our Salem Main Road showroom for current availability, exact pricing and delivery.`
      : `Looking for ${category.name.toLowerCase()} in Dharmapuri? This collection is not currently listed online. Contact Metro Furniture on Salem Main Road to confirm showroom availability, photos, pricing and delivery.`,
    path: `/shop/${category.slug}`,
    keywords: getCategorySeoTargets(category),
  });
}

export default async function CategoryPage({ params }) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const items = getProductsByCategory(category.id);

  return (
    <>
      <ShopHero />
      <ShopCategoryNav />

      {items.length === 0 ? (
        <EmptyCategoryLanding
          category={category}
          suggestedCategories={categories.filter((item) => item.slug !== category.slug && getProductsByCategory(item.id).length > 0)}
        />
      ) : (
        <section className="container py-10 md:py-14">
          <CollectionHeader category={category} productCount={items.length} />
          <Suspense fallback={<ProductGridSkeleton />}>
            <ShopCollectionLayout
              products={items}
              allProducts={products}
              categoryId={category.id}
            />
          </Suspense>
        </section>
      )}

      <LocalFurnitureContent category={category} productCount={items.length} />

      <ShopValueBar />
      <ShopNewsletter />
    </>
  );
}
