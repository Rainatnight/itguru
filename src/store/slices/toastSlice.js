import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
const initialState = {
    list: [],
};
const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        addToast: (state, action) => {
            state.list.push({ ...action.payload, id: uuid() });
        },
        removeToast: (state, action) => {
            state.list = state.list.filter((t) => t.id !== action.payload);
        },
    },
});
export const { addToast, removeToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
