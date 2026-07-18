import { memo, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { HeroBanner } from "@/components/heroBanner";
import { UtilityBar } from "@/components/landing/UtilityBar";
import { PromoCards } from "@/components/landing/PromoCards";
import { FilterBar } from "@/components/landing/FilterBar";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { SwitchBanner } from "@/components/landing/SwitchBanner";
import { FaqSection } from "@/components/landing/FaqSection";
import { NewsletterBar } from "@/components/landing/NewsletterBar";
import SEO from "@/components/SEO";
import {
  selectHomeListLoading,
  selectHomeProducts,
} from "@/features/product/productSlice";
import { fetchProducts } from "@/features/product/productThunks";
import type { Product } from "@/features/product/types/product";

const ProductShowcaseMemo = memo(ProductShowcase);

export default function HomePage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectHomeProducts);
  const loading = useAppSelector(selectHomeListLoading);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, per_page: 8, search: categoryFilter }));
  }, [categoryFilter, dispatch]);

  const visibleProducts = useMemo<Product[]>(() => {
    const list = products.slice(0, 6);
    if (!categoryFilter) return list;

    const needle = categoryFilter.toLowerCase();
    const filtered = list.filter(
      (product) =>
        product.category?.toLowerCase() === needle ||
        product.name.toLowerCase().includes(needle),
    );

    return filtered.length ? filtered : list;
  }, [products, categoryFilter]);

  const seoTitle = categoryFilter ? `${categoryFilter} Collection` : undefined;
  const seoDesc = categoryFilter
    ? `Browse our premium ${categoryFilter} collection - mechanical keyboards, keycaps & accessories at Clickeys.`
    : undefined;

  return (
    <main className="bg-surface-container-lowest">
      <SEO
        url={categoryFilter ? `/?category=${categoryFilter}` : "/"}
        title={seoTitle}
        description={seoDesc}
        breadcrumbs={
          categoryFilter
            ? [{ name: categoryFilter, url: `/?category=${categoryFilter}` }]
            : undefined
        }
      />

      <UtilityBar />
      <HeroBanner />
      <PromoCards />

      <FilterBar />

      <section id="popular" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-[1440px] px-4 pb-4 pt-10 md:px-12">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-outline-variant pb-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-geist text-xs uppercase tracking-[0.3em] text-brand">
                Collection
              </p>
              <h2 className="mt-2 font-geist text-3xl font-bold text-on-surface sm:text-left">
                {categoryFilter ? `${categoryFilter} Collection` : "Popular Products"}
              </h2>
            </div>

            <div className="flex items-center gap-5">
              {categoryFilter ? (
                <button
                  onClick={() => setSearchParams({})}
                  className="font-geist text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  Clear filter
                </button>
              ) : null}

              <Link
                to={categoryFilter ? `/products?category=${categoryFilter}` : "/products"}
                className="font-geist text-sm font-medium text-on-surface transition-colors hover:text-brand"
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        {loading && products.length === 0 ? (
          <div className="mx-auto max-w-[1440px] px-4 py-20 text-center font-geist text-on-surface-variant md:px-12">
            Loading products...
          </div>
        ) : (
          <ProductShowcaseMemo products={visibleProducts} />
        )}
      </section>

      <SwitchBanner />
      <FaqSection />
      <NewsletterBar />
    </main>
  );
}
