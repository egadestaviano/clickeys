import { Link } from "react-router-dom";
import { MaterialIcon } from "@/components/materialIcon";
import type { Product } from "@/features/product/types/product";
import { HomeProductCard } from "@/features/product/components/HomeProductCard";

type ProductShowcaseProps = {
  products: Product[];
};

export function ProductShowcase({ products }: ProductShowcaseProps) {
  if (!products.length) return null;

  const [featured, ...rest] = products;
  const grid = rest.slice(0, 5);
  const popularIndex = grid.length - 1;

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-10 md:px-12 md:py-14">
      {/* Hero banner card — full width */}
      <div className="relative mb-8 flex flex-col overflow-hidden rounded-md bg-surface-container lg:flex-row">
        <div className="flex w-full flex-col justify-center p-6 md:w-[45%] md:p-10">
          <p className="font-geist text-xs uppercase tracking-[0.3em] text-brand">
            Featured
          </p>
          <h2 className="mt-3 font-geist text-2xl font-bold uppercase leading-tight tracking-tight text-on-surface md:text-3xl">
            {featured.name.split(" ")[0]}
            <br />
            {featured.name.split(" ").slice(1).join(" ")}
          </h2>
          <p className="mt-4 font-geist text-sm leading-relaxed text-on-surface-variant">
            {featured.description || "Premium mechanical keyboard engineered for enthusiasts who demand the best typing experience."}
          </p>
          <Link
            to={`/product/${featured.id}`}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 font-geist text-sm font-bold text-on-brand transition-colors hover:bg-brand-strong"
          >
            Shop Now
            <MaterialIcon className="text-[18px]" name="arrow_forward" />
          </Link>
        </div>
        <div className="relative h-64 w-full md:h-auto md:w-[55%]">
          <img
            alt={featured.name}
            className="h-full w-full object-cover"
            src={featured.image_url || "/placeholder.svg"}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* Uniform product grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((product, index) => (
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
          className="rounded-full bg-brand px-8 py-3 font-geist text-sm font-bold text-on-brand transition-colors hover:bg-brand-strong"
        >
          LOAD MORE
        </Link>
      </div>
    </div>
  );
}

export default ProductShowcase;
