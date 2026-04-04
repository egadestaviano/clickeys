import { createBrowserRouter } from "react-router-dom";

import { productDetailLoader } from "@/routes/productLoader";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";
import MainLayout from "@/components/MainLayout";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        lazy: async () => {
          const module = await import("@/pages/homePage");
          return { Component: module.default };
        },
      },

      {
        path: "/product/:id",
        loader: productDetailLoader,
        lazy: async () => {
          const module = await import("@/pages/productDetailPage");
          return { Component: module.default };
        },
      },

      {
        element: <PublicRoute />,
        children: [
          {
            path: "/auth/login",
            lazy: async () => {
              const module = await import("@/pages/loginPage");
              return { Component: module.default };
            },
          },
          {
            path: "/auth/register",
            lazy: async () => {
              const module = await import("@/pages/RegisterPage");
              return { Component: module.default };
            },
          },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/cart",
            lazy: async () => {
              const module = await import("@/pages/cartPage");
              return { Component: module.default };
            },
          },
          {
            path: "/checkout",
            lazy: async () => {
              const module = await import("@/pages/checkoutPage");
              return { Component: module.default };
            },
          },
          {
            path: "/bookmarks",
            lazy: async () => {
              const module = await import("@/pages/bookmarkPage");
              return { Component: module.default };
            },
          },
          {
            path: "/admin/product/create",
            lazy: async () => {
              const module = await import("@/pages/CreateProductPage");
              return { Component: module.default };
            },
          },
        ],
      },

      {
        path: "*",
        lazy: async () => {
          const module = await import("@/pages/NotFoundPage");
          return { Component: module.default };
        },
      },
    ],
  },
]);