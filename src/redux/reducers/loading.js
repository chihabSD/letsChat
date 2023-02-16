import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
};
export const loaderSlicer = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    clearLoading: (state, action) => {
      state.loading = false;
    },
  },
});
export const { setLoading, clearLoading } = loaderSlicer.actions;
export default loaderSlicer.reducer;
