import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { HeroBanner } from "@/components/heroBanner";
import { CategoryNav } from "@/components/categoryNav";
import ProductCard from "@/features/product/components/productCard";
import ProductContainer from "@/features/product/components/productContainer";
import { fetchProducts } from "@/features/product/productThunks";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const {
    items: products,
    loading,
    error,
    pagination,
  } = useAppSelector((state) => state.product);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const requestLockRef = useRef(false);

  useEffect(() => {
    document.title = categoryFilter
      ? `Clickeys ${categoryFilter} Collection`
      : "Clickeys | Mechanical Keyboards, Switches, Keycaps, and Accessories";
  }, [categoryFilter]);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, per_page: 12, search: categoryFilter }));
  }, [dispatch, categoryFilter]);

  useEffect(() => {
    if (!loading) {
      requestLockRef.current = false;
    }
  }, [loading]);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node || !pagination?.has_next) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (loading || requestLockRef.current) return;

        requestLockRef.current = true;
        void dispatch(
          fetchProducts({
            page: (pagination?.page ?? 1) + 1,
            per_page: 12,
            search: categoryFilter,
          }),
        );
      },
      {
        rootMargin: "200px 0px",
        threshold: 0,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [
    dispatch,
    loading,
    pagination?.has_next,
    pagination?.page,
    categoryFilter,
  ]);

  return (
    <>
      <HeroBanner />
      <CategoryNav />

      <section
        id="popular"
        aria-labelledby="popular-heading"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2
            id="popular-heading"
            className="text-center text-3xl font-bold text-foreground capitalize sm:text-left"
          >
            {categoryFilter
              ? `${categoryFilter} Collection`
              : "Popular Products"}
          </h2>

          {categoryFilter ? (
            <button
              type="button"
              onClick={() => setSearchParams({}, { replace: true })}
              className="text-sm font-medium text-red-500 transition-colors hover:text-red-400"
            >
              Clear Filter
            </button>
          ) : (
            <p className="text-sm font-medium text-muted-foreground">
              {products.length} curated picks on display
            </p>
          )}
        </div>

        {error && (
          <p className="text-red-500" role="alert">
            Failed to load products: {error}
          </p>
        )}

        <ProductContainer loading={loading && products.length === 0}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductContainer>
      </section>

      <div
        ref={loaderRef}
        className="flex justify-center p-4"
        aria-live="polite"
      >
        {loading && <p className="text-gray-500">Loading more products...</p>}
        {!loading && !pagination?.has_next && (
          <p className="text-gray-400">All products have been displayed.</p>
        )}
      </div>
    </>
  );
}
