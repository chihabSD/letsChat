import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  friends: {},
};

export const friendsReducer = createSlice({
  name: "friends",
  initialState,
  reducers: {
    getFriends: (state, action) => {
      state.friends = action.payload;
    },
  },
});

export const { getFriends } = friendsReducer.actions;
export default friendsReducer.reducer;
