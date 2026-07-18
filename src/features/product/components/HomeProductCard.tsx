import { Link } from "react-router-dom";
import { MaterialIcon } from "@/components/materialIcon";
import type { Product } from "@/features/product/types/product";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

type HomeProductCardProps = {
  product: Product;
  badge?: string;
};

export function HomeProductCard({ product, badge }: HomeProductCardProps) {
  return (
    <div className="group relative flex flex-col rounded-md bg-surface-container-low p-6">
      <div className="relative z-10 mb-4 flex items-start justify-between">
        {badge ? (
          <span className="rounded bg-surface px-3 py-1 text-[10px] font-bold text-on-surface shadow-sm">
            {badge}
          </span>
        ) : (
          <span />
        )}
        <button
          className="text-on-surface-variant transition-colors hover:text-on-surface"
          type="button"
          aria-label="Add to wishlist"
        >
          <MaterialIcon className="text-[20px]" name="favorite_border" />
        </button>
      </div>

      <div className="relative mb-6 flex aspect-square items-center justify-center overflow-hidden bg-surface-container">
        <img
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={product.image_url || "/placeholder.svg"}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="mt-auto">
        <h3 className="mb-1 font-geist text-lg font-bold text-on-surface">
          {product.name}
        </h3>
        <p className="font-geist text-sm text-on-surface-variant">
          {product.category || "Mechanical Keyboard"}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-geist font-semibold text-on-surface">
            {priceFormatter.format(product.price)}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="rounded-md bg-surface px-3 py-1.5 font-geist text-xs font-semibold text-on-surface transition-colors hover:bg-surface-bright"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeProductCard;
