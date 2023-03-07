import { createSlice, current } from "@reduxjs/toolkit";
import { groupMessages } from "../../helpers/groupMessages";
var moment = require("moment"); // require
const initialState = {
  friends: {},
  searchUsers:[], 
  conversations: [],
  messages: [],
  timeLines: [],
  imagePreview: [],
  updatedMessages: [],
  updatingMessage: false,
  selectedConversation: null,
  currentMessageReactions: null,
  newMessageAdd: false,
};

export const friendsReducer = createSlice({
  name: "friends",
  initialState,
  reducers: {

    insertSearchUsers: (state, action) => {
      state.searchUsers = [...action.payload]},
    // insert conversation
    setSelectedReaction: (state, action) => {
      state.currentMessageReactions = action.payload;
    },
    // get friens
    getFriends: (state, action) => {
      state.friends = action.payload;
    },

    deleteConversation :(state, action) => {
      
      const filtered = current(state.conversations).filter(conversation => conversation._id != action.payload)
      state.conversations = [...filtered]


      // console.log(filtered.length);
      state.selectedConversation = filtered[0]
    }, 
    insertNewConversation : (state, action) => {
      
      state.conversations.unshift(action.payload)
      
    }, 
    // insert conversation
    insertConversation: (state, action) => {
      state.selectedConversation = action.payload[0];
      state.conversations = [...action.payload];
    },

    // insert messages and create times
    insertMessages: (state, action) => {

      // if there are no messages
      if (action.payload.length === 0 || action.payload == []) {
        state.timeLines = [];
        // state.messages = [];
      } else {

        state.timeLines = groupMessages(action.payload);
        const tempArray = [];
        action.payload.map((msg) => {
          tempArray.push(msg);
        });
        state.messages = [...action.payload];
      }
    },

    insertUpdatedMessage: (state, action) => {
      let newArr = [];
      current(state.timeLines).map((item) => {
        item.messages.map((r) => {
          newArr.push(r);
        });
      });

      // get the index of the item you want to remove
      let getIndex = newArr.findIndex((msg) => msg._id === action.payload._id);

      // filter the old item
      let filteredItem = newArr.filter(
        (item) => item._id != action.payload._id
      );

      filteredItem.splice(getIndex, 0, action.payload);
      state.timeLines = groupMessages([...filteredItem]);
    },


    // the message sent
    insertSentMessage: (state, action) => {
      console.log(action.payload);
      let formatedDate = moment(action.payload.createdAt).format("YYYY-MM-DD");
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

    

      // Latest conversation
      let newConversation = current(state.conversations).map((item, index) => {
        if (item._id === action.payload.conversationId) {
          return { ...item, latestMessage: action.payload };
        }
        return {
          ...item,
        };
      });

      state.conversations = [...newConversation];
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
    setNewMessageAdded: (state, action) => {
      state.newMessageAdd = true;
    },
    clearNewMessageAdded: (state, action) => {
      state.newMessageAdd = false;
    },
  },
});

export const {
  getFriends,
  insertSentMessage,
  insertMessages,
  insertConversation,
  insertUpdatedMessage,
  resetImagePreview,
  insertImagePreview,
  setSelectedReaction,
  insertLatestReaction,
  setNewMessageAdded,
  clearNewMessageAdded,
  insertSearchUsers, insertNewConversation,  deleteConversation
} = friendsReducer.actions;
export default friendsReducer.reducer;
