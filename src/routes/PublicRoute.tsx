import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import {
  selectAuthResolved,
  selectHasToken,
  selectIsAuthenticated,
} from "@/features/auth/authSlice";

export default function PublicRoute() {
  const location = useLocation();

  const { authResolved, hasToken, isAuthenticated } = useAppSelector(
    (state) => ({
      authResolved: selectAuthResolved(state),
      hasToken: selectHasToken(state),
      isAuthenticated: selectIsAuthenticated(state),
    }),
  );

  if (!authResolved && hasToken) {
    return (
      <div
        className="flex min-h-[50vh] items-center justify-center"
        aria-live="polite"
      >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <span className="sr-only">Restoring your account session</span>
      </div>
    );
  }

  if (isAuthenticated) {
    const redirectTarget =
      (location.state as { from?: { pathname?: string } })?.from?.pathname ??
      "/";

    return <Navigate to={redirectTarget} replace />;
  }

  return <Outlet />;
}
