import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbarShow: false,
  snackbarType: "success",
  snackbarMessage: "",
  isLoading: false
};
export const appSlice = createSlice({
  name: "ui-components",
  initialState,
  reducers: {
    showSnackbar: (_, action) => {
      return action.payload;
    },
    isLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    }
  }
});

export const { showSnackbar, isLoading, stopLoading } = appSlice.actions;

export default appSlice.reducer;
