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
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  total: number;
  currentPage: number;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  total: 0,
  currentPage: 1,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log(action.payload.products);
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addProduct, removeProduct, setProducts, setCurrentPage } =
  productsSlice.actions;
export const productsReducer = productsSlice.reducer;
