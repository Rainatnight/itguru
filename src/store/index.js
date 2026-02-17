import { configureStore } from "@reduxjs/toolkit";
import { toastReducer } from "./slices/toastSlice";
import { productsReducer } from "./slices/productsSlice";
export const store = configureStore({
    reducer: {
        toast: toastReducer,
        products: productsReducer,
    },
});
