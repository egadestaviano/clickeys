import { store } from "@/app/store";
import { getDetailProduct } from "@/features/product/productThunks";
import type { LoaderFunctionArgs } from "react-router-dom";

export async function productDetailLoader({ params }: LoaderFunctionArgs) {
  const id = params.id;

  if (!id) {
    throw new Response("Product ID is required", { status: 400 });
  }

  const state = store.getState();
  const existingProduct = state.product.items?.find((item) => item.id === id);

  if (!existingProduct) {
    await store.dispatch(getDetailProduct(id)).unwrap();
  }

  return store.getState().product.items?.find((item) => item.id === id) ?? null;
}
