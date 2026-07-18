import { memo, useCallback } from "react";
import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MaterialIcon } from "@/components/materialIcon";
import type { Product } from "@/features/product/types/product";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  addBookmark,
  removeBookmark,
  selectIsBookmarked,
} from "@/features/bookmark/bookmarkSlice";
import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { selectCart, selectCartItems } from "@/features/cart/cartSlice";
import { addCartItem, createCart, lookupCart } from "@/features/cart/cartThunks";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

type HomeProductCardProps = {
  product: Product;
  badge?: string;
};

const HomeProductCard = memo(function HomeProductCard({
  product,
  badge,
}: HomeProductCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isBookmarked = useAppSelector(selectIsBookmarked(product.id));
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const cart = useAppSelector(selectCart);
  const cartItems = useAppSelector(selectCartItems);

  const productInCart = cartItems.find((item) => item.product_id === product.id);
  const productCartItemCount = productInCart ? productInCart.quantity : 0;

  const handleHeartClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isAuthenticated) {
        navigate("/auth/login");
        return;
      }
      if (isBookmarked) dispatch(removeBookmark(product.id));
      else dispatch(addBookmark(product));
    },
    [dispatch, isAuthenticated, isBookmarked, navigate, product],
  );

  const handleCartClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isAuthenticated) {
        navigate("/auth/login");
        return;
      }
      if (productCartItemCount > 0) {
        navigate("/cart");
        return;
      }
      let cartId = cart?.id;
      if (!cartId) {
        try {
          const newCart = await dispatch(createCart()).unwrap();
          cartId = newCart.id;
        } catch {
          try {
            const lookedUpCart = await dispatch(lookupCart({})).unwrap();
            cartId = lookedUpCart.id;
          } catch {
            return;
          }
        }
      }
      try {
        await dispatch(
          addCartItem({ cart_id: cartId as string, product_id: product.id, quantity: 1 }),
        );
      } catch {
        /* ignore */
      }
    },
    [isAuthenticated, productCartItemCount, cart?.id, navigate, dispatch, product.id],
  );

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col bg-surface-container-low transition-all duration-200 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden border border-outline-variant bg-surface-container">
        <img
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={product.image_url || "/placeholder.svg"}
          loading="lazy"
          decoding="async"
        />
        {badge && (
          <span className="absolute left-3 top-3 z-20 bg-surface px-3 py-1 text-[10px] font-bold text-on-surface">
            {badge}
          </span>
        )}
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={handleHeartClick}
          className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center border border-outline-variant bg-surface-container/80 text-on-surface-variant backdrop-blur-md transition-colors hover:text-on-surface"
        >
          <MaterialIcon
            name="favorite"
            fill={isBookmarked}
            className={`text-[18px] ${isBookmarked ? "text-red-500" : ""}`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 line-clamp-1 font-geist text-lg font-bold text-on-surface transition-colors group-hover:text-brand">
          {product.name}
        </h3>
        <p className="font-geist text-sm text-on-surface-variant">
          {product.description
            ? product.description.slice(0, 60) + (product.description.length > 60 ? "…" : "")
            : (product.category || "Mechanical Keyboard")}
        </p>

        <div className="mb-2 mt-2 flex items-center gap-1 text-yellow-500">
          <MaterialIcon name="star" fill className="text-[12px]" />
          <MaterialIcon name="star" fill className="text-[12px]" />
          <MaterialIcon name="star" fill className="text-[12px]" />
          <MaterialIcon name="star" fill className="text-[12px]" />
          <MaterialIcon name="star" className="text-[12px] text-yellow-500/30" />
          <span className="text-xs text-on-surface-variant ml-1">(4.0)</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-geist font-semibold text-on-surface">
            {priceFormatter.format(product.price)}
          </span>
          <div className="translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={handleCartClick}
              aria-label="Add to cart"
              className="relative flex h-8 w-8 items-center justify-center bg-brand text-on-brand transition-colors hover:bg-brand-strong"
            >
              <MaterialIcon name="shopping_cart" className="text-[16px]" />
              {productCartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-on-surface text-[10px] text-surface-container">
                  {productCartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default HomeProductCard;
