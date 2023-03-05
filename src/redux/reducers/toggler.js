import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    rightSideToggled :false, 
    emojiBoxyToggled: false, 
    messageMessagePreview: false, 
    reactionListModal : false, 
    newGroup : false
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
    _toggleNewGroup: (state, action) => {
      state.newGroup = !state.newGroup;
      
    },
  },
});
export const {_toggleMessageImagePrview, _toggleNewGroup  ,_toggleReactionListModal,  _toggleRightSide, _toggleEmojiBox , _closeEmojiBox} = toggleSlicer.actions;
export default toggleSlicer.reducer;
