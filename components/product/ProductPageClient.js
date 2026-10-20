"use client";

import ProductBuyBox from "@/components/ProductBuyBox";
import ProductGallery from "@/components/ProductGallery";

export default function ProductPageClient({ product, gallery }) {
  function openRoomPreview() {
    document.getElementById("room-preview-open")?.click();
  }

  return (
    <div className="grid min-w-0 grid-cols-1 items-start gap-5 sm:gap-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-5 lg:gap-7 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] xl:gap-10">
      <ProductGallery
        images={gallery}
        name={product.name}
        imageAlt={product.imageAlt}
        offer={product.offer}
        onViewInRoom={openRoomPreview}
      />
      <ProductBuyBox product={product} />
    </div>
  );
}
