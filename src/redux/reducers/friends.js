import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  friends: {},
  conversations: [],
  messages: [],

  selectedConversation: null,
};

export const friendsReducer = createSlice({
  name: "friends",
  initialState,
  reducers: {
    getFriends: (state, action) => {
      state.friends = action.payload;
    },
    // check if there are messages
    // if no message => set messages to empty else insert messages into it
    insertSentMessage: (state, action) => {
    state.messages.push(action.payload)
    },
    insertMessages: (state, action) => {
      action.payload.length === 0 || action.payload === []
        ? (state.messages = [])
        : (state.messages = [...action.payload]);
    },

    insertConversation: (state, action) => {
      state.selectedConversation = action.payload[0];
      state.conversations = [...action.payload];
    },
  },
});

export const { getFriends, insertSentMessage, insertMessages, insertConversation } =
  friendsReducer.actions;
export default friendsReducer.reducer;
