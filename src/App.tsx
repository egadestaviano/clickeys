import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "@/app/store";
import { router } from "./routes/route";
import { Suspense, useEffect, useRef } from "react";
import { fetchCurrentUserThunk } from "@/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { lookupCart } from "./features/cart/cartThunks";
import { loadBookmarksFromStorage } from "./features/bookmark/bookmarkSlice";
import {
  clearSession,
  markAuthResolved,
  selectAuthResolved,
  selectHasToken,
  selectIsAuthenticated,
} from "./features/auth/authSlice";
import { HelmetProvider } from "react-helmet-async";

function AppContent() {
  const dispatch = useAppDispatch();
  const { hasToken, isAuthenticated, authResolved } = useAppSelector(
    (state) => ({
      hasToken: selectHasToken(state),
      isAuthenticated: selectIsAuthenticated(state),
      authResolved: selectAuthResolved(state),
    }),
  );
  const cartLoadedRef = useRef(false);

  useEffect(() => {
    dispatch(loadBookmarksFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (authResolved) return;

    if (!hasToken) {
      dispatch(markAuthResolved());
    } else {
      dispatch(fetchCurrentUserThunk());
    }
  }, [authResolved, hasToken]);

  useEffect(() => {
    if (!isAuthenticated || cartLoadedRef.current) return;

    cartLoadedRef.current = true;
    dispatch(lookupCart({}));
  }, [isAuthenticated]);

  useEffect(() => {
    const handler = () => dispatch(clearSession());

    window.addEventListener("auth:unauthorized", handler);
    return () => window.removeEventListener("auth:unauthorized", handler);
  }, []);
  
  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <div className="font-sans antialiased">
          <AppContent />
        </div>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
