import { Link } from "react-router-dom";
import type { Product } from "@/features/product/types/product";
import HomeProductCard from "@/features/product/components/HomeProductCard";

type ProductShowcaseProps = {
  products: Product[];
};

export function ProductShowcase({ products }: ProductShowcaseProps) {
  if (!products.length) return null;

  const popularIndex = products.length - 1;

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-12 pt-4 md:px-12">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {products.map((product, index) => (
          <HomeProductCard
            key={product.id}
            product={product}
            badge={
              index === 0
                ? "NEW"
                : index === popularIndex
                  ? "BEST SELLER"
                  : undefined
            }
          />
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center">
        <p className="mb-6 font-geist text-sm text-on-surface-variant">
          Showing {products.length} products
        </p>
        <Link
          to="/products"
          className="bg-brand px-8 py-3 font-geist text-sm font-bold text-on-brand transition-colors hover:bg-brand-strong"
        >
          LOAD MORE
        </Link>
      </div>
    </div>
  );
}

export default ProductShowcase;
