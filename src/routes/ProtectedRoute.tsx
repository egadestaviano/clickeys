import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import {
  selectAuthResolved,
  selectHasToken,
  selectIsAuthenticated,
} from "@/features/auth/authSlice";

export default function ProtectedRoute() {
  const location = useLocation();

  const { authResolved, hasToken, isAuthenticated } = useAppSelector((state) => ({
    authResolved: selectAuthResolved(state),
    hasToken: selectHasToken(state),
    isAuthenticated: selectIsAuthenticated(state),
  }));

  if (!authResolved && hasToken) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center" aria-live="polite">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <span className="sr-only">Checking your session</span>
      </div>
    );
  }

  const redirectState = { from: location };

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={redirectState} />;
  }

  return <Outlet />;
}