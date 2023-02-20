import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  friends: {},
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
      // get all messages
      // check if message already exist in current message
      // if its, return null else insert the new message into array
      action.payload.map((message) => {
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
      // console.log('friends', state.friends);
      // console.log('payload', action.payload);
      // const found = action.payload.map((message) => state.messages.find((item) => item._id == message._id))
      // console.log(found)
      // action.payload.some(message => {

      //   state.messages.some(item => {
      //     if()
      //   })
      // })

      // if(action.payload)
      // state.messages.push(...action.payload)
    },
  },
});

export const { getFriends, insertMessages } = friendsReducer.actions;
export default friendsReducer.reducer;
