import { createSlice, current } from "@reduxjs/toolkit";
import { groupMessages } from "../../helpers/groupMessages";
var moment = require("moment"); // require
const initialState = {
  friends: {},
  conversations: [],
  messages: [],
  msgs: null,
  selectedConversation: null,
};

export const friendsReducer = createSlice({
  name: "friends",
  initialState,
  reducers: {
    getFriends: (state, action) => {
      state.friends = action.payload;
    },

    insertSentMessage: (state, action) => {
      let messageFromPayload = action.payload;

      let formatedDate = moment(action.payload.createdAt).format("YYYY-MM-DD");

      let currentMessages = current(state.messages);
      const index = currentMessages.findIndex(
        (msg) => msg.timeLine === formatedDate
      );
      let newObj = currentMessages.map((item, index) => {
        if (item.timeLine === formatedDate) {
          return { ...item, messages: [...item.messages, action.payload] };
        }
        return {
          ...item,
        };
      });
      state.messages = newObj;
    },

    insertMessages: (state, action) => {
      // call group Messages
      action.payload.length === 0 || action.payload === []
        ? (state.messages = [])
        : (state.messages = groupMessages(action.payload));
    },

    insertConversation: (state, action) => {
      state.selectedConversation = action.payload[0];
      state.conversations = [...action.payload];
    },
  },
});

export const {
  getFriends,
  insertSentMessage,
  insertMessages,
  insertConversation,
} = friendsReducer.actions;
export default friendsReducer.reducer;

// Group
