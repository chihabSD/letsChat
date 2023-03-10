import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  activeUsers: [],
  searchUsers: [],
  conversations: [],
  messages: [],
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

    /************************* MESSAGES ********************************* */

    // get messages for conversation
    getMessagesPerConversation: (state, action) => {
      state.messages = [...action.payload];
    },
    //  handle sent message
    insertSentMessage: (state, action) => {
      const msg = action.payload;
      let oldState = current(state.conversations);

      const newArray = oldState.map((i) =>
        i._id === msg.conversationId ? { ...i, latestMessage: msg } : i
      );

      state.conversations = [...newArray];
      state.messages.push(action.payload);

    },

    // update message
    insertUpdatedMessage: (state, action) => {
      // copy of old state
      let oldState = current(state.messages);

      // find index of the message
      let getIndex = oldState.findIndex(
        (msg) => msg._id === action.payload._id
      );

      // remove item it
      let filteredItem = oldState.filter(
        (item) => item._id != action.payload._id
      );

      // replace item
      filteredItem.splice(getIndex, 0, action.payload);

      // set new state value

      state.messages = [...filteredItem];
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

    setNewMessageAdded: (state, action) => {
      state.newMessageAdd = true;
    },
    clearNewMessageAdded: (state, action) => {
      state.newMessageAdd = false;
    },

    /************************** CONVERSATION ********************************** */
    // when a new conversation is added done
    insertNewConversation: (state, action) => {
      state.conversations.unshift(action.payload);
    },
    // insert conversation done
    getInitialConversations: (state, action) => {
      state.conversations = [...action.payload];
    },
    // insert conversation
    handleCurrentConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },

    // load converstion done
    setLoadingConversation: (state, action) => {
      state.loadingConversation = true;
    },

    // clear conversation load done
    clearLoadingConversation: (state, action) => {
      state.loadingConversation = false;
    },

    // delete conversation/group done
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

    handleImagePreview: (state, action) => {
      if (state.imagePreview.length > 0) {
        state.imagePreview = [];
        return;
      }
      state.imagePreview = action.payload;
    },
    setActiveUsers: (state, action) => {
    state.activeUsers = [...action.payload]
    },
  },
});

export const {
  insertSentMessage,
  getMessagesPerConversation,
  getInitialConversations,
  insertUpdatedMessage,
  handleImagePreview,
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
  setActiveUsers
} = friendsReducer.actions;
export default friendsReducer.reducer;
