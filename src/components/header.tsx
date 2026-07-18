import { memo, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/materialIcon";
import { NavigationSidebar } from "@/components/navigationSidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchModal } from "@/components/searchModal";
import { selectIsAuthenticated, selectUser } from "@/features/auth/authSlice";
import { logoutThunk } from "@/features/auth/authThunks";
import { selectBookmarkCount } from "@/features/bookmark/bookmarkSlice";
import { selectCartItemCount } from "@/features/cart/cartSlice";
import { selectSearchQuery } from "@/features/search/searchSlice";

const SCROLL_THRESHOLD = 240;

const SearchButtonLabel = memo(function SearchButtonLabel() {
  const searchQuery = useAppSelector(selectSearchQuery);

  if (!searchQuery.trim()) {
    return <span className="hidden font-geist text-sm sm:inline">Cari</span>;
  }

  return (
    <span className="hidden font-geist text-sm sm:inline">
      {searchQuery.length > 20 ? `${searchQuery.slice(0, 20)}...` : searchQuery}
    </span>
  );
});

function getInitials(name?: string) {
  if (!name) return "U";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const bookmarkCount = useAppSelector(selectBookmarkCount);
  const cartItemCount = useAppSelector(selectCartItemCount);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > SCROLL_THRESHOLD,
  );

  const dashboardPath =
    user?.role === "admin" ? "/admin/dashboard" : "/my/dashboard";

  const profilePath = user?.role === "admin" ? "/admin/profile" : "/my/profile";

  useEffect(() => {
    const root = document.documentElement;

    root.classList.add("dark");

    try {
      localStorage.setItem("theme", "dark");
    } catch {
      // Keep the app in dark mode even if storage is unavailable.
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateHeaderState = () => {
      animationFrameId = null;

      const nextIsScrolled = window.scrollY > SCROLL_THRESHOLD;

      setIsScrolled((currentValue) =>
        currentValue === nextIsScrolled ? currentValue : nextIsScrolled,
      );
    };

    const handleScroll = () => {
      if (animationFrameId !== null) return;

      animationFrameId = window.requestAnimationFrame(updateHeaderState);
    };

    updateHeaderState();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    void dispatch(logoutThunk());
    navigate("/auth/login");
  }, [dispatch, navigate]);

  const handleDashboard = useCallback(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }

    navigate(dashboardPath);
  }, [dashboardPath, isAuthenticated, navigate]);

  const handleProfile = useCallback(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }

    navigate(profilePath);
  }, [isAuthenticated, navigate, profilePath]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
          isScrolled
            ? "border-b border-outline-variant bg-surface-container-lowest/90 backdrop-blur-xl"
            : "border-b border-outline-variant bg-surface-container-lowest"
        }`}
      >
        <a
          href="#main-content"
          className="sr-only rounded-md bg-brand px-4 py-2 font-geist text-sm font-medium text-on-brand focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60]"
        >
          Skip to content
        </a>

        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-3 px-4 md:px-12">
          <div className="flex flex-1 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={openMenu}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="navigation-sidebar"
              className="relative flex h-10 cursor-pointer items-center gap-2 rounded-full px-2.5 text-on-surface hover:bg-surface-container-highest sm:px-3"
            >
              <MaterialIcon className="text-[22px]" name="menu" />

              {bookmarkCount > 0 && (
                <span
                  className="absolute right-1 top-1 flex size-3 items-center justify-center rounded-full bg-brand text-[8px] font-semibold leading-none text-on-brand"
                  aria-label={`${bookmarkCount} bookmarks`}
                >
                  {bookmarkCount > 99 ? "99+" : bookmarkCount}
                </span>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={openSearch}
              aria-label="Open search"
              className="flex h-10 cursor-pointer items-center gap-2 rounded-full px-2.5 text-on-surface hover:bg-surface-container-highest sm:px-3"
            >
              <MaterialIcon className="text-[22px]" name="search" />

              <SearchButtonLabel />
            </Button>
          </div>

          <div className="shrink-0">
            <Link
              to="/"
              aria-label="Clickeys Home"
              className="cursor-pointer transition-opacity duration-200 hover:opacity-75"
            >
              <span className="font-geist text-2xl font-bold tracking-[0.18em] text-on-surface">
                CLICKEYS
              </span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end gap-0.5 sm:gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative size-9 cursor-pointer rounded-full text-on-surface hover:bg-surface-container-highest"
              asChild
            >
              <Link
                to="/cart"
                aria-label={`Shopping cart, ${cartItemCount} items`}
                title="Shopping cart"
              >
                <MaterialIcon className="text-[22px]" name="shopping_cart" />

                {cartItemCount > 0 && (
                  <span
                    className="absolute right-1 top-1 flex size-3 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-on-brand"
                    aria-hidden="true"
                  >
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </Link>
            </Button>

            {isAuthenticated ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex h-10 items-center gap-2 rounded-full bg-transparent px-1.5 pr-3 text-left transition-colors hover:bg-surface-container-highest focus-visible:outline-none"
                    aria-label="Open account menu"
                    title={user?.name ?? "Account"}
                  >
                    <Avatar className="size-8 border-2 border-brand/50">
                      <AvatarFallback className="bg-brand/10 text-xs font-semibold text-brand">
                        {getInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  align="end"
                  sideOffset={10}
                  className="w-72 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low p-0 text-on-surface shadow-xl shadow-black/30"
                >
                  <div className="border-b border-outline-variant p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-11 border border-brand/25 bg-transparent">
                        <AvatarFallback className="bg-brand/10 text-sm font-semibold text-brand">
                          {getInitials(user?.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-geist text-sm font-medium text-on-surface">
                          {user?.name ?? "User"}
                        </p>

                        <p className="mt-1 truncate font-geist text-xs text-on-surface-variant">
                          {user?.email ?? "account@store.local"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 p-2">
                    <button
                      type="button"
                      onClick={handleProfile}
                      className="flex h-12 w-full items-center gap-3 rounded-lg px-3 text-left transition-colors hover:bg-surface-container-high focus-visible:bg-surface-container-high focus-visible:outline-none"
                    >
                      <span className="flex size-9 items-center justify-center rounded-lg bg-surface-container-highest text-on-surface-variant">
                        <MaterialIcon className="text-[18px]" name="person" />
                      </span>

                      <span className="font-geist text-sm font-medium text-on-surface">
                        Profil
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDashboard}
                      className="flex h-12 w-full items-center gap-3 rounded-lg px-3 text-left transition-colors hover:bg-surface-container-high focus-visible:bg-surface-container-high focus-visible:outline-none"
                    >
                      <span className="flex size-9 items-center justify-center rounded-lg bg-surface-container-highest text-on-surface-variant">
                        <MaterialIcon className="text-[18px]" name="dashboard" />
                      </span>

                      <span className="font-geist text-sm font-medium text-on-surface">
                        Dashboard
                      </span>
                    </button>

                    <div className="my-2 h-px bg-outline-variant" />

                    <Button
                      type="button"
                      variant="ghost"
                      className="flex h-12 w-full justify-start gap-3 rounded-lg px-3 text-left font-geist text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-400 focus-visible:bg-red-500/10 focus-visible:outline-none"
                      onClick={handleLogout}
                    >
                      <span className="flex size-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                        <MaterialIcon className="text-[18px]" name="logout" />
                      </span>

                      <span>Logout</span>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="cursor-pointer px-1 text-on-surface hover:bg-surface-container-highest sm:px-3"
                onClick={() => navigate("/auth/login")}
              >
                <MaterialIcon className="text-[22px]" name="person" />
              </Button>
            )}
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />

      <NavigationSidebar isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}

export default Header;
