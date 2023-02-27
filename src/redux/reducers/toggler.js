import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    rightSideToggled :false, 
    emojiBoxyToggled: false, 
    messageMessagePreview: false
};
export const toggleSlicer = createSlice({
  name: "error",
  initialState,
  reducers: {
    _toggleMessageImagePrview: (state, action) => {
      state.messageMessagePreview = !state.messageMessagePreview;
    },
    _toggleEmojiBox: (state, action) => {
      state.emojiBoxyToggled = !state.emojiBoxyToggled;
    },
    _closeEmojiBox: (state, action) => {

      state.emojiBoxyToggled = false
    }, 
    _toggleRightSide: (state, action) => {
      state.rightSideToggled = !state.rightSideToggled;
      
    },
  },
});
export const {_toggleMessageImagePrview , _toggleRightSide, _toggleEmojiBox , _closeEmojiBox} = toggleSlicer.actions;
export default toggleSlicer.reducer;
