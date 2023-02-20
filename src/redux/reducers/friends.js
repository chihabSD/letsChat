import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  friends: {},
  messages:{}
};

export const friendsReducer = createSlice({
  name: "friends",
  initialState,
  reducers: {
    getFriends: (state, action) => {
      state.friends = action.payload;
    },
    insertMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { getFriends, insertMessages } = friendsReducer.actions;
export default friendsReducer.reducer;
