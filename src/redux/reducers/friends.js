import { createSlice, current } from "@reduxjs/toolkit";
import { groupMessages } from "../../helpers/groupMessages";
var moment = require("moment"); // require
const initialState = {
  friends: {},
  conversations: [],
  messages: [],
  messageReactions: [],
  currentMessage: null,
  latestReaction: null,

  msgs: null,

  imagePreview: [],
  selectedConversation: null,
};

export const friendsReducer = createSlice({
  name: "friends",
  initialState,
  reducers: {
    getFriends: (state, action) => {
      state.friends = action.payload;
    },

    setCurrentMessage: (state, action) => {
      state.currentMessage = action.payload;
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
      if(action.payload.length === 0 || action.payload == []){
        state.messages = []
      }else {

         state.messages = groupMessages(action.payload);
        //  state.messageReactions.push({_id:action.payload._id, reactions:action.payload.reactions})
      }
    },
    inserReaction : (state, action) => {
      state.messageReactions.push({_id:action.payload._id, reactions:action.payload.reactions})
    }, 
    insertLatestReaction: (state, action) => {
      // const {
      let currentReactions = [...current(state.messageReactions)]

      let { _id, reactions:{reactions}}= action.payload;

      const index = currentReactions.findIndex(i => i._id === _id)
      
      // state.messageReactions = newObj;
  //  state.messageReactions =  currentReactions 
   
  let newObj = currentReactions.map((item, index) => {
    if (item._id === _id) {
      return { ...item, _id ,  reactions };
    }
    return {
     ...item 
    };
  });


  state.messageReactions = [...newObj]
    },
    initiateReactions: (state, action) => {
      const tempArray = [];
      action.payload.map((msg) => {
        const {
          _id,
          reactions: { reactions },
        } = msg;

        tempArray.push({ _id, reactions });
        // state.messageReactions.push({ _id, reactions });
      });
      state.messageReactions = [...tempArray];
    },
    reactToMessage: (state, action) => {
      console.log(state.messageReactions);
    },

    insertConversation: (state, action) => {
      state.selectedConversation = action.payload[0];
      state.conversations = [...action.payload];
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
  initiateReactions,
  reactToMessage,
  insertLatestReaction,
  setCurrentMessage,
   inserReaction
   
} = friendsReducer.actions;
export default friendsReducer.reducer;

// Group
