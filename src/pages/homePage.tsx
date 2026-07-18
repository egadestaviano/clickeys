import { memo, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { HeroBanner } from "@/components/heroBanner";
import { PromoCards } from "@/components/landing/PromoCards";
import { FilterBar } from "@/components/landing/FilterBar";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
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

  const [searchParams] = useSearchParams();
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

      <HeroBanner />
      <PromoCards />

      <FilterBar />

      <section id="popular" className="scroll-mt-24">
        {loading && products.length === 0 ? (
          <div className="mx-auto max-w-[1440px] px-4 py-20 text-center font-geist text-on-surface-variant md:px-12">
            Loading products...
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="mx-auto max-w-[1440px] px-4 py-20 text-center md:px-12">
            <p className="font-geist text-lg font-semibold text-on-surface">
              No products found
            </p>
            <p className="mt-2 font-geist text-sm text-on-surface-variant">
              Try a different category filter.
            </p>
          </div>
        ) : (
          <ProductShowcaseMemo products={visibleProducts} />
        )}
      </section>

      <FaqSection />
      <NewsletterBar />
    </main>
  );
}
