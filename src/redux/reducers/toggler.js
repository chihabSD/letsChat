import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    rightSideToggled :false, 
    emojiBoxyToggled: false, 
    messageMessagePreview: false, 
    reactionListModal : false, 
    newGroup : false, 
    newConversation : false
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
    _toggleNewConversation: (state, action) => {
      state.newConversation = !state.newConversation;
    },
  },
});
export const {_toggleMessageImagePrview, _toggleNewConversation,  _toggleNewGroup  ,_toggleReactionListModal,  _toggleRightSide, _toggleEmojiBox , _closeEmojiBox} = toggleSlicer.actions;
export default toggleSlicer.reducer;
