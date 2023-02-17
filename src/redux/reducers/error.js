import { createSlice } from "@reduxjs/toolkit";
const initialState = {
error:""
};
export const errorSlicer = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error =  "";
    },
  },
});
export const { setError, clearError} = errorSlicer.actions;
export default errorSlicer.reducer;
