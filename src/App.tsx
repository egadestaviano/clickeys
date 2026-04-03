import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "@/app/store";
import { router } from "./routes/route";
import { useEffect } from "react";
import { fetchCurrentUserThunk } from "@/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Cookies from "js-cookie";
import { lookupCart } from "./features/cart/cartThunks";
import { loadBookmarksFromStorage } from "./features/bookmark/bookmarkSlice";

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Only load bookmarks from localStorage (sync, no network)
    // Products are fetched by HomePage's own useEffect to avoid redundant calls
    dispatch(loadBookmarksFromStorage());
  }, [dispatch]);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  
  useEffect(() => {
    const initializeUser = async () => {
      const token = Cookies.get("access_token");
      if (token && isAuthenticated) {
        await dispatch(fetchCurrentUserThunk());
        dispatch(lookupCart({}));
      }
    };

    initializeUser();
  }, [dispatch, isAuthenticated]);

  return (
    <RouterProvider router={router} />
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="font-sans antialiased">
        <AppContent />
      </div>
    </Provider>
  );
}

export default App;
