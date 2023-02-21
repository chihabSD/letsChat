import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  friends: {},
  conversations:[], 
  messages: [],
};

export const friendsReducer = createSlice({
  name: "friends",
  initialState,
  reducers: {
    getFriends: (state, action) => {
      state.friends = action.payload;
    },
    insertMessages: (state, action) => {
      console.log('message', action.payload);
      // get all messages
      // check if message already exist in current message
      // if its, return null else insert the new message into array
      if(action.payload.length === 0) {

      state.messages = []
      }else {
        
        console.log('updatting new ');
        action.payload.map((message) => {
        console.log(message);
        const findMessage = state.messages.find((item) => {
          return item._id === message._id;
        });
        if(findMessage) return null 
         state.messages.push(message);

        // const filter = state.messages.filter( item => item._id !== message._id)
        // console.log(filter);
        // let filtered = state.messages.filter(item => {
        //   return item
        // })
      });
    }
    },
      insertConversation: (state, action) => {
        state.conversations = [...action.payload]
      }
  },
});

export const { getFriends, insertMessages, insertConversation } = friendsReducer.actions;
export default friendsReducer.reducer;
