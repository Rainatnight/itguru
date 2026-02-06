import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  list: Toast[];
}

const initialState: ToastState = {
  list: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
      state.list.push({ ...action.payload, id: uuid() });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
