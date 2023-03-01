import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    rightSideToggled :false, 
    emojiBoxyToggled: false, 
    messageMessagePreview: false, 
    reactionListModal : false
};
export const toggleSlicer = createSlice({
  name: "toggler",
  initialState,
  reducers: {
    _toggleReactionListModal: (state, action) => {
      state.reactionListModal = !state.reactionListModal;
      
    },
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
export const {_toggleMessageImagePrview ,_toggleReactionListModal,  _toggleRightSide, _toggleEmojiBox , _closeEmojiBox} = toggleSlicer.actions;
export default toggleSlicer.reducer;
