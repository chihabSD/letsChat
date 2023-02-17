import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  registered: false,
};
export const  registerSlicer =  createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegistered: (state, action) => {
      state.registered = true;
    },
    clearRegistered: (state, action) => {
      state.registered = false;
    },
  },
});
export const { setRegistered, clearRegistered } = registerSlicer.actions;
export default registerSlicer.reducer;
