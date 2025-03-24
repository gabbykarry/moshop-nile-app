import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  message: string;
  type: "success" | "error" | "info" | "WIP 🚧"| null;
}

const initialState: ToastState = {
  message: "",
  type: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type?: "success" | "error" | "info" | "WIP 🚧";
      }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type || "info";
    },
    hideToast: (state) => {
      state.message = "";
      state.type = null;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
