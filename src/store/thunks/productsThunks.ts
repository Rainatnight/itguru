import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../slices/productsSlice";

export const fetchProducts = createAsyncThunk<
  { products: Product[]; total: number },
  { page: number; search?: string; limit?: number }
>("products/fetchProducts", async ({ page, search = "", limit = 10 }) => {
  const skip = (page - 1) * limit;
  const searchParam = search ? `&q=${encodeURIComponent(search)}` : "";

  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}${searchParam}`,
  );

  if (!res.ok) throw new Error("Ошибка загрузки товаров");
  return res.json(); // { products: Product[], total: number }
});
