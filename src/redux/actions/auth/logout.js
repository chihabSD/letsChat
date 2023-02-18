// import { clearError } from "../../reducers/errors";
// import { clearLoading } from "../../reducers/loading";

import { TOKEN_NAME } from "../../../config/tokenName";
import {
  clearProfile,
  //   clearPasswordChanged,
  unauthenticate,
} from "../../reducers/profile";
import setAuthHeader from "../../../helpers/setAuthHeader";
import { clearError } from "../../reducers/error";

export const onLogout = () => {
  return (dispatch) => {
    setAuthHeader(null);
    dispatch(unauthenticate());
    dispatch(clearProfile());
    dispatch(clearError());
    // dispatch(clearPasswordChanged());
    // dispatch(clearLoading());
  };
};
export const _logout = () => (dispatch) => {
  localStorage.removeItem(TOKEN_NAME);
  dispatch(onLogout());
  console.log("Logout is clicked");
};
