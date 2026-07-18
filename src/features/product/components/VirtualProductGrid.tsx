import React, { useMemo, useRef, useEffect, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import ProductCard from "./productCard";
import { ProductCardSkeleton } from "./productCardSkeleton";
import type { Product } from "../types/product";

interface VirtualProductGridProps {
  products: Product[];
  loading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
}

const getColumnsForWidth = (width: number) => {
  if (width >= 1280) return 4;
  if (width >= 768) return 3;
  if (width >= 480) return 2;
  return 1;
};

const VirtualProductGrid: React.FC<VirtualProductGridProps> = ({
  products,
  loading,
  hasNextPage,
  onLoadMore,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);
  const [scrollMargin, setScrollMargin] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Responsive column count + scroll margin (measured after layout)
  useEffect(() => {
    const updateMetrics = () => {
      if (!parentRef.current) return;
      setColumns(getColumnsForWidth(parentRef.current.offsetWidth));
      setScrollMargin(parentRef.current.offsetTop);
    };

    const resizeObserver = new ResizeObserver(updateMetrics);
    if (parentRef.current) resizeObserver.observe(parentRef.current);
    updateMetrics();

    return () => resizeObserver.disconnect();
  }, []);

  // Group products into rows
  const rows = useMemo(() => {
    const r = [];
    for (let i = 0; i < products.length; i += columns) {
      r.push(products.slice(i, i + columns));
    }
    return r;
  }, [products, columns]);

  const rowVirtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => 450, // Estimate height of a row (card height + gap)
    overscan: 5,
    scrollMargin,
  });

  // Infinite Scroll Observer
  useEffect(() => {
    if (!loaderRef.current || !hasNextPage || loading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "600px" }
    );

    observerRef.current.observe(loaderRef.current);
    return () => observerRef.current?.disconnect();
  }, [hasNextPage, loading, onLoadMore]);

  const columnClassMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div ref={parentRef} className="w-full relative">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start - scrollMargin}px)`,
            }}
          >
            <div className={`grid min-w-0 gap-4 sm:gap-6 ${columnClassMap[columns] || 'grid-cols-1'}`}>
              {rows[virtualRow.index]?.map((product) => (
                <div key={product.id} className="min-w-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Loading & Empty States */}
      <div ref={loaderRef} className="w-full mt-8 p-4 min-h-20 flex flex-col items-center">
        {loading && (
          <div className={`grid min-w-0 gap-4 sm:gap-6 w-full ${columnClassMap[columns] || 'grid-cols-1'}`}>
            {Array.from({ length: Math.max(columns, 2) }).map((_, i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        )}
        
        {!loading && !hasNextPage && products.length > 0 && (
          <p className="text-on-surface-variant">All products have been displayed.</p>
        )}
        
        {!loading && products.length === 0 && (
          <p className="text-on-surface-variant text-lg">No products found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default VirtualProductGrid;
