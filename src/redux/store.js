import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./reducers/loading";
export default configureStore({
  reducer: {
    loadingReducer: loadingSlice,
  },
});
