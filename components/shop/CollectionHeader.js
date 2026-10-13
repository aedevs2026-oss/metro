import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { collectionPromo } from "@/data/shop";
import { categories } from "@/data/categories";

const DEFAULT_INTRO =
  "Discover comfort and elegance with our curated range — premium materials, thoughtful design and showroom support on Salem Main Road.";

export default function CollectionHeader({ category, productCount }) {
  const title = category?.name ?? "All Collections";
  const description = category?.description ?? DEFAULT_INTRO;
  const promoImage = category?.image || categories[0]?.image;

  const breadcrumbs = category
    ? [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: category.name },
      ]
    : [{ label: "Home", href: "/" }, { label: "Shop" }];

  return (
    <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_minmax(260px,340px)] lg:items-start">
      <div>
        <Breadcrumb items={breadcrumbs} />
        <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body md:text-base">
          {description}
        </p>
        {productCount != null ? (
          <p className="mt-2 text-xs font-medium uppercase tracking-wider text-body/60">
            {productCount} products in this view
          </p>
        ) : null}
      </div>

      <aside className="overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-sm">
        <div className="relative aspect-[16/9] bg-muted">
          {promoImage ? (
            <Image
              src={promoImage}
              alt=""
              fill
              sizes="340px"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <p className="font-heading text-lg font-semibold leading-snug">
              {collectionPromo.title}
            </p>
            <Link
              href={collectionPromo.href}
              className="btn-pill-primary mt-3 inline-flex text-xs"
            >
              {collectionPromo.cta}
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
