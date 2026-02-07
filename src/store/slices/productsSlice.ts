import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "../thunks/productsThunks";

export interface Product {
  id: number | string;
  title: string;
  category: string;
  brand?: string;
  rating: number;
  price: number;
  stock: number;
  sku: string;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  total: number;
  currentPage: number;
  sortOrder: "asc" | "desc" | null;
  search: string;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  total: 0,
  currentPage: 1,
  sortOrder: null,
  search: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },

    setSortOrder(state, action: PayloadAction<"asc" | "desc" | null>) {
      state.sortOrder = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setProducts, setCurrentPage, setSortOrder, setSearch } =
  productsSlice.actions;
export const productsReducer = productsSlice.reducer;
