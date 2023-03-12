import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  connected: false,
  socket: {},
};
export const socketSlicer = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
      state.connected = true
    },
    setSocketConnected: (state, action) => {
        state.connected = true
      },
      setSocketDisConnected: (state, action) => {
        state.connected = false
      },
  },
});
export const { setSocket , setSocketConnected, setSocketDisConnected} = socketSlicer.actions;
export default socketSlicer.reducer;
