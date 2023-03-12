import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./reducers/loading";
import errorReducer from "./reducers/error";
import registerReducer from "./reducers/register";
import profileReducer from "./reducers/profile";
import friendsReducer from "./reducers/friends";
import toggleReducer from "./reducers/toggler";
import socketReducer from "./reducers/socket";
export default configureStore({
  reducer: {
    profileReducer,
    friendsReducer,
    loadingReducer,
    socketReducer,
    errorReducer,
    toggleReducer,
    registerReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
