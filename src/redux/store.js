import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./reducers/loading";
import errorReducer from "./reducers/error";
export default configureStore({
  reducer: {
    loadingReducer,
    errorReducer,
  },
});
