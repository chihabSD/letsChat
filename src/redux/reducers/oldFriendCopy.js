import { createSlice, current } from "@reduxjs/toolkit";
import { groupMessages } from "../../helpers/groupMessages";
var moment = require("moment"); // require
const initialState = {
  friends: {},
  searchUsers: [],
  conversations: [],
  messages: [],
  timeLines: [],
  imagePreview: [],
  updatedMessages: [],
  updatingMessage: false,
  selectedConversation: null,
  currentMessageReactions: null,
  newMessageAdd: false,
  loadingConversation: false,
};

export const friendsReducer = createSlice({
  name: "friends",
  initialState,
  reducers: {
    insertSearchUsers: (state, action) => {
      state.searchUsers = [...action.payload];
    },
    // insert conversation
    setSelectedReaction: (state, action) => {
      state.currentMessageReactions = action.payload;
    },
    

    /************************** CONVERSATION ********************************** */
    // when a new conversation is added done
    insertNewConversation: (state, action) => {
      console.log('new conversation is added');
      state.conversations.unshift(action.payload);
    },
    // insert conversation done
    getInitialConversations: (state, action) => {
      console.log('get initial conversations');
      state.conversations = [...action.payload];
    },
    // insert conversation
    handleCurrentConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },

    // load converstion
    setLoadingConversation: (state, action) => {
      state.loadingConversation = true;
    },

    // clear conversation load 
    clearLoadingConversation: (state, action) => {
      state.loadingConversation = false;
    },

     // delete conversation/group
     deleteConversation: (state, action) => {
      const filtered = current(state.conversations).filter(
        (conversation) => conversation._id != action.payload
      );
      state.conversations = [...filtered];

      state.selectedConversation = filtered[0];
    },


     // update current conversation
     updatingExistingConversation: (state, action) => {
      // get the index of the item you want to remove
      let currentConversation = current(state.conversations);
      let getIndex = currentConversation.findIndex(
        (conversation) => conversation._id === action.payload._id
      );

      // filter the old item
      let filteredItem = currentConversation.filter(
        (item) => item._id != action.payload._id
      );

      filteredItem.splice(getIndex, 0, action.payload);
      state.conversations = [...filteredItem];
      state.selectedConversation = action.payload;
    },
   
     /************************** END OF CONVERSATION REDUCERS  ********************************** */
    // insert messages and create times
    insertMessages: (state, action) => {

      console.log('insert messages @ getMessage action is called ', action.payload);
      // state.timeLines = groupMessages(action.payload);
      // const tempArray = [];
      // action.payload.map((msg) => {
      //   tempArray.push(msg);
      // });
      state.messages = [...action.payload];
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
  

   
      // state.timeLines = groupMessages(action.payload);

      // let formatedDate = moment(action.payload.createdAt).format("YYYY-MM-DD");
      // let currentMessages = current(state.timeLines);
      // currentMessages.findIndex((msg) => msg.timeLine === formatedDate);
      // let newObj = currentMessages.map((item, index) => {
      //   if (item.timeLine === formatedDate) {
      //     return { ...item, messages: [...item.messages, action.payload] };
      //   }
      //   return {
      //     ...item,
      //   };
      // });

      // // Latest conversation
      // let newConversation = current(state.conversations).map((item, index) => {
      //   if (item._id === action.payload.conversationId) {
      //     return { ...item, latestMessage: action.payload };
      //   }
      //   return {
      //     ...item,
      //   };
      // });

      // state.conversations = [...newConversation];
      state.messages.push(action.payload);
      // state.timeLines = newObj;
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
  insertSentMessage,
  insertMessages,
  getInitialConversations, 
  insertUpdatedMessage,
  resetImagePreview,
  insertImagePreview,
  setSelectedReaction,
  insertLatestReaction,
  setNewMessageAdded,
  clearNewMessageAdded,
  handleCurrentConversation,
  insertSearchUsers,
  insertNewConversation,
  deleteConversation,
  updatingExistingConversation,
  clearLoadingConversation,
  setLoadingConversation,
} = friendsReducer.actions;
export default friendsReducer.reducer;
