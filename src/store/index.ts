import { configureStore } from "@reduxjs/toolkit";
import { toastReducer } from "./slices/toastSlice";
import { productsReducer } from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
