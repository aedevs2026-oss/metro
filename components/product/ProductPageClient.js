"use client";

import ProductBuyBox from "@/components/ProductBuyBox";
import ProductGallery from "@/components/ProductGallery";

export default function ProductPageClient({ product, gallery }) {
  function openRoomPreview() {
    document.getElementById("room-preview-open")?.click();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-14">
      <ProductGallery
        images={gallery}
        name={product.name}
        offer={product.offer}
        onViewInRoom={openRoomPreview}
      />
      <ProductBuyBox product={product} />
    </div>
  );
}
