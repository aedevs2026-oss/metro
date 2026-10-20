import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ProductDetailsTabs from "@/components/product/ProductDetailsTabs";
import ProductFeatureRibbon from "@/components/product/ProductFeatureRibbon";
import ProductPageClient from "@/components/product/ProductPageClient";
import ProductLocalServiceCard from "@/components/product/ProductLocalServiceCard";
import LocalFurnitureContent from "@/components/seo/LocalFurnitureContent";
import RelatedProductsCarousel from "@/components/product/RelatedProductsCarousel";
import { getCategoryById } from "@/data/categories";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/data/products";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteImage } from "@/data/seo-local";
import { buildMetadata } from "@/lib/seo";
import { getProductSeoTargets } from "@/data/seo-targets";
import {
  buildBreadcrumbList,
  buildPageGraph,
  buildProduct,
} from "@/lib/structured-data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return buildMetadata({
      title: "Product Not Found",
      description: "The requested product could not be found.",
      path: "/shop",
    });
  }

  const category = getCategoryById(product.category);
  const localDesc = product.seoDescription || `${product.name} at Metro Furniture Dharmapuri — ${product.description} View in showroom on Salem Main Road or enquire on WhatsApp.`;

  return buildMetadata({
    title: product.seoTitle || `${product.name} in Dharmapuri | Metro Furniture`,
    description: localDesc.slice(0, 160),
    path: `/product/${product.slug}`,
    keywords: [...new Set([...(product.seoKeywords || []), ...getProductSeoTargets(product)])].slice(0, 20),
    ogImage: absoluteImage(product.image),
    ogImageAlt: product.imageAlt || `${product.name} at Metro Furniture, Dharmapuri`,
  });
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product);
  const gallery = product.images?.length ? product.images : [product.image];
  const category = getCategoryById(product.category);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    ...(category
      ? [{ label: category.name, href: `/shop/${category.slug}` }]
      : []),
    { label: product.name },
  ];

  const schemaCrumbs = crumbs.map((c) => ({
    label: c.label,
    href: c.href,
  }));

  return (
    <div className="product-showcase-page">
      <JsonLd
        data={buildPageGraph([
          buildProduct(product, {
            categoryName: category?.name,
            path: `/product/${product.slug}`,
          }),
          buildBreadcrumbList(schemaCrumbs),
        ])}
      />
      <section className="container pb-8 pt-5 md:pb-12 md:pt-7" aria-labelledby="product-heading">
        <Breadcrumb items={crumbs} className="mb-5 md:mb-8 [&_ol]:text-xs [&_ol]:text-body/75" />
        <ProductPageClient product={product} gallery={gallery} />
      </section>

      <ProductFeatureRibbon product={product} />

      <ProductDetailsTabs product={product} />

      <ProductLocalServiceCard product={product} />

      <LocalFurnitureContent product={product} />

      {related.length ? (
        <section className="border-t border-[#e8ddd0] bg-[#f9f1e7] py-12 md:py-16">
          <div className="container">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-foreground md:text-[1.75rem]">
                  You may also like
                </h2>
                <p className="mt-1 text-sm text-body">More from the same category</p>
              </div>
              {category ? (
                <Link
                  href={`/shop/${category.slug}`}
                  className="text-sm font-semibold text-accent hover:text-accent-dark"
                >
                  View all {category.name}
                </Link>
              ) : null}
            </div>
            <RelatedProductsCarousel products={related} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
