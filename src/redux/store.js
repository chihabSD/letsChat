import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./reducers/loading";
import errorReducer from "./reducers/error";
import registerReducer from "./reducers/register";
import profileReducer from "./reducers/profile";
export default configureStore({
  reducer: {
    profileReducer, 
    loadingReducer,
    errorReducer,
    registerReducer,
  },
});
