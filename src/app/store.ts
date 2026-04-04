import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/authSlice";
import bookmarkReducer from "@/features/bookmark/bookmarkSlice";
import cartReducer from "@/features/cart/cartSlice";
import searchReducer from "@/features/search/searchSlice";
import productReducer from "@/features/product/productSlice";
import orderReducer from "@/features/order/orderSlice";

const rootReducer = {
  auth: authReducer,
  bookmark: bookmarkReducer,
  cart: cartReducer,
  search: searchReducer,
  product: productReducer,
  order: orderReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;