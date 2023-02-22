import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    rightSideToggled :false, 
    emojiBoxyToggled: false
};
export const toggleSlicer = createSlice({
  name: "error",
  initialState,
  reducers: {
    _toggleEmojiBox: (state, action) => {
      state.emojiBoxyToggled = !state.emojiBoxyToggled;
    },
    _toggleRightSide: (state, action) => {
      state.rightSideToggled = !state.rightSideToggled;
    },
  },
});
export const { _toggleRightSide, _toggleEmojiBox } = toggleSlicer.actions;
export default toggleSlicer.reducer;
