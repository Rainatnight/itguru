import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "..";
import type { Product } from "../slices/productsSlice";

const LIMIT = 5;

export const fetchProducts = createAsyncThunk<
  { products: Product[]; total: number },
  void,
  { state: RootState }
>("products/fetchProducts", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const { currentPage, sortOrder, search } = state.products;

  const skip = (currentPage - 1) * LIMIT;

  const baseUrl = search
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}`
    : `https://dummyjson.com/products`;

  const params = [`limit=${LIMIT}`, `skip=${skip}`];
  if (sortOrder) params.push(`sortBy=price`, `order=${sortOrder}`);

  const url = baseUrl.includes("?")
    ? `${baseUrl}&${params.join("&")}`
    : `${baseUrl}?${params.join("&")}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Ошибка загрузки товаров");

  const data = await res.json();

  if (sortOrder) {
    data.products.sort((a: Product, b: Product) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price,
    );
  }

  return data;
});
