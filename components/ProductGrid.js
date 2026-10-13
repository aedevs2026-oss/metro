import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

export default function ProductGrid({ products, emptyTitle, className = "" }) {
  if (!products?.length) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <div
      className={`grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 ${className}`}
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
