import { createSlice, current } from "@reduxjs/toolkit";
import { groupMessages } from "../../helpers/groupMessages";
var moment = require("moment"); // require
const initialState = {
  friends: {},
  conversations: [],
  messages: [],
  timeLines: [],
  imagePreview: [],
  selectedConversation: null,
  currentMessageReactions: null,
  newMessageAdd:false
};

export const friendsReducer = createSlice({
  name: "friends",
  initialState,
  reducers: {
    // insert conversation
    setSelectedReaction: (state, action) => {
      state.currentMessageReactions = action.payload;
    },
    // get friens
    getFriends: (state, action) => {
      state.friends = action.payload;
    },

    // insert conversation
    insertConversation: (state, action) => {
      state.selectedConversation = action.payload[0];
      state.conversations = [...action.payload];
    },

    // insert messages and create times
    insertMessages: (state, action) => {
      if (action.payload.length === 0 || action.payload == []) {
        state.timeLines = [];
        // state.messages = [];
      } else {
        // state.messages = groupMessages(action.payload);
        state.timeLines = groupMessages(action.payload);
        const tempArray = [];
        action.payload.map((msg) => {
          // const {
          //   _id,
          //   reactions: { reactions },
          // } = msg;

          tempArray.push(msg);
        });
        state.messages = [...action.payload];
        
      }
    },

    // the message sent
    insertSentMessage: (state, action) => {
      let formatedDate = moment(action.payload.createdAt).format("YYYY-MM-DD");

      // let currentMessages = current(state.messages);
      let currentMessages = current(state.timeLines);
      currentMessages.findIndex((msg) => msg.timeLine === formatedDate);
      let newObj = currentMessages.map((item, index) => {
        if (item.timeLine === formatedDate) {
          return { ...item, messages: [...item.messages, action.payload] };
        }
        return {
          ...item,
        };
      });
      state.messages.push(action.payload);
      state.timeLines = newObj;
  
    
    },

   
    // update current reaction
    insertLatestReaction: (state, action) => {
      let currentReactions = [...current(state.messages)];
      let newObj = currentReactions.map((item, index) => {
        if (item._id === action.payload._id) {
          return { ...item, ...action.payload };
        }
        return {
          ...item,
        };
      });

      state.messages = [...newObj];
    },

    insertImagePreview: (state, action) => {
      state.imagePreview = action.payload;
    },
    resetImagePreview: (state, action) => {
      state.imagePreview = [];
    },
    setNewMessageAdded : (state, action) => {
      state.newMessageAdd = true
    },
    clearNewMessageAdded: (state, action) => {
      state.newMessageAdd = false
    }
  },
});

export const {
  getFriends,
  insertSentMessage,
  insertMessages,
  insertConversation,
  resetImagePreview,
  insertImagePreview,
  setSelectedReaction,
  insertLatestReaction,
  setNewMessageAdded, clearNewMessageAdded

} = friendsReducer.actions;
export default friendsReducer.reducer;
