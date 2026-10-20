import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

export default function ProductGrid({ products, emptyTitle, className = "" }) {
  if (!products?.length) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <div
      className={`grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3 md:gap-4 xl:grid-cols-4 xl:gap-5 ${className}`}
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-up"
          style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
