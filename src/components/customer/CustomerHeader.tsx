import { Link } from "react-router-dom";
import { useSidebar } from "@/context/SidebarContext";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectUser, selectUserRole } from "@/features/auth/authSlice";
import { logoutThunk } from "@/features/auth/authThunks";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MaterialIcon } from "@/components/materialIcon";

export default function CustomerHeader() {
  const { toggleSidebar, toggleMobileSidebar } = useSidebar();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const role = useAppSelector(selectUserRole) ?? "customer";

  const dashboardPath = role === "admin" ? "/admin/dashboard" : "/my/dashboard";
  const profilePath = role === "admin" ? "/admin/profile" : "/my/profile";
  const handleLogout = () => {
    void dispatch(logoutThunk());
  };

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggle}
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-accent"
            aria-label="Toggle customer sidebar"
          >
            <MaterialIcon name="menu" className="text-[20px]" />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <div className="flex items-center gap-1 rounded-md border border-border bg-card p-1 shadow-sm">
            <Button asChild variant="ghost" className="h-10 rounded-md px-4 text-foreground hover:bg-background hover:text-foreground">
              <Link to="/products">
                <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <MaterialIcon name="search" className="text-[16px]" />
                </span>
                <span className="hidden sm:inline">Products</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" className="h-10 rounded-md px-4 text-foreground hover:bg-background hover:text-foreground">
              <Link to="/cart">
                <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <MaterialIcon name="shopping_cart" className="text-[16px]" />
                </span>
                <span className="hidden sm:inline">Cart</span>
              </Link>
            </Button>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2 shadow-sm transition-colors hover:border-primary/20 hover:bg-primary/5"
                aria-label="Open profile menu"
              >
                <Avatar className="h-9 w-9 border border-border bg-muted">
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {user?.name ? user.name.slice(0, 1).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden min-w-0 lg:block">
                  <p className="truncate text-sm font-medium text-foreground">{user?.name ?? "User"}</p>
                </div>
                <MaterialIcon name="expand_more" className="text-[16px] text-muted-foreground" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={10}
              className="w-72 overflow-hidden rounded-md border border-border bg-card p-0 text-foreground shadow-lg shadow-black/10"
            >
              <div className="border-b border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-border bg-muted">
                    <AvatarFallback className="bg-primary/10 text-base font-bold text-primary">
                      {user?.name ? user.name.slice(0, 1).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{user?.name ?? "User"}</p>
                    <p className="truncate text-xs text-muted-foreground">{user?.email ?? "customer@store.local"}</p>
                    <span className="mt-2 inline-flex rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                      {role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <Link to={dashboardPath} className="flex w-full items-center gap-3 rounded-sm px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-muted text-muted-foreground">
                    <MaterialIcon name="dashboard" className="text-[16px]" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Dashboard</p>
                    <p className="text-xs text-muted-foreground">Open role dashboard</p>
                  </div>
                </Link>

                <Link to={profilePath} className="mt-1 flex w-full items-center gap-3 rounded-sm px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-muted text-muted-foreground">
                    <MaterialIcon name="person" className="text-[16px]" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Profile</p>
                    <p className="text-xs text-muted-foreground">Open account profile</p>
                  </div>
                </Link>

                <div className="my-2 h-px bg-border" />

                <button
                  type="button"
                  onClick={() => {
                    void handleLogout();
                  }}
                  className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 focus-visible:bg-red-500/10 focus-visible:outline-none"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-red-500/10 text-red-400">
                    <MaterialIcon name="logout" className="text-[16px]" />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-red-400">
                      Logout
                    </p>
                    <p className="text-xs text-red-500/70">
                      End current session
                    </p>
                  </div>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
