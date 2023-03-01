import { createSlice, current } from "@reduxjs/toolkit";
import { groupMessages } from "../../helpers/groupMessages";
var moment = require("moment"); // require
const initialState = {
  friends: {},
  conversations: [],
  messages: [],
  messageReactions: [],

  imagePreview: [],
  selectedConversation: null,
};

export const friendsReducer = createSlice({
  name: "friends",
  initialState,
  reducers: {
    // get friens
    getFriends: (state, action) => {
      state.friends = action.payload;
    },

    // insert conversation
    insertConversation: (state, action) => {
      state.selectedConversation = action.payload[0];
      state.conversations = [...action.payload];
    },

    // insert messages and create reaction for each
    insertMessages: (state, action) => {
      if (action.payload.length === 0 || action.payload == []) {
        state.messages = [];
      } else {
        state.messages = groupMessages(action.payload);
        const tempArray = [];
        action.payload.map((msg) => {
          const {
            _id,
            reactions: { reactions },
          } = msg;

          tempArray.push({ _id, reactions });
        });
        state.messageReactions = [...tempArray];
      }
    },

    // the message sent
    insertSentMessage: (state, action) => {
      let formatedDate = moment(action.payload.createdAt).format("YYYY-MM-DD");

      let currentMessages = current(state.messages);
      currentMessages.findIndex((msg) => msg.timeLine === formatedDate);
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

    // insert new reaction
    insertReaction: (state, action) => {
      const {
        _id,
        reactions: { reactions },
      } = action.payload;
      state.messageReactions.push({ _id, reactions });
    },
    // update current reaction
    insertLatestReaction: (state, action) => {
      let currentReactions = [...current(state.messageReactions)];

      let {
        _id,
        reactions: { reactions },
      } = action.payload;

      let newObj = currentReactions.map((item, index) => {
        if (item._id === _id) {
          return { ...item, _id, reactions };
        }
        return {
          ...item,
        };
      });

      state.messageReactions = [...newObj];
    },

    insertImagePreview: (state, action) => {
      state.imagePreview = action.payload;
    },
    resetImagePreview: (state, action) => {
      state.imagePreview = [];
    },
  },
});

export const {
  getFriends,
  insertSentMessage,
  insertMessages,
  insertConversation,
  resetImagePreview,
  insertImagePreview,
  insertLatestReaction,
  insertReaction,
} = friendsReducer.actions;
export default friendsReducer.reducer;
