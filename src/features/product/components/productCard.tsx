import type React from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { Product } from "@/features/product/types/product";
import {
  addBookmark,
  removeBookmark,
  selectIsBookmarked,
} from "@/features/bookmark/bookmarkSlice";
import { selectIsAuthenticated } from "@/features/auth/authSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isBookmarked = useAppSelector(selectIsBookmarked(product.id));
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }

    if (isBookmarked) {
      dispatch(removeBookmark(product.id));
    } else {
      dispatch(addBookmark(product));
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-card group block border border-border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 animate-in fade-in zoom-in duration-500 relative"
    >
      {/* Image container with fixed aspect ratio to prevent CLS */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={`${product.name} — Mechanical Keyboard Component`}
          width="400"
          height="400"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-all duration-700 absolute inset-0"
        />
        <Button
          variant="ghost"
          size="sm"
          aria-label={isBookmarked ? `Remove ${product.name} from bookmarks` : `Bookmark ${product.name}`}
          className={`absolute top-4 right-4 hover:bg-background/80 !rounded-none cursor-pointer z-20 ${isBookmarked ? "text-red-500" : "text-foreground"
            }`}
          onClick={handleHeartClick}
        >
          <Heart className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} aria-hidden="true" />
        </Button>
      </div>

      <div className="p-4">
        <h3 className="text-foreground font-medium mb-1 line-clamp-1 [text-overflow:clip] group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2 text-yellow-500" aria-label="Rating: 4 out of 5 stars">
          <Star className="w-3 h-3 fill-current" aria-hidden="true" />
          <Star className="w-3 h-3 fill-current" aria-hidden="true" />
          <Star className="w-3 h-3 fill-current" aria-hidden="true" />
          <Star className="w-3 h-3 fill-current" aria-hidden="true" />
          <Star className="w-3 h-3 fill-current text-gray-500/30" aria-hidden="true" />
          <span className="text-xs text-muted-foreground ml-1">(4.0)</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-foreground font-semibold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.price)}
          </p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
            <Button
              size="icon"
              variant="secondary"
              aria-label={`Add ${product.name} to cart`}
              className="h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
