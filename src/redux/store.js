import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./reducers/loading";
import errorReducer from "./reducers/error";
import registerReducer from "./reducers/register";
export default configureStore({
  reducer: {
    loadingReducer,
    errorReducer,
    registerReducer,
  },
});
