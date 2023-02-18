import jwt_decode from "jwt-decode";
// import {_logUserOut} from './logout';
import { success } from "./success";
import { TOKEN_NAME } from "../../../config/tokenName";
import setAuthHeader from "../../../helpers/setAuthHeader";
import { getUserProfile } from "../profile";
export const _checkToken = () => {
  return (dispatch) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      if (!token) {
        return null;
      }
      let decodedToken = jwt_decode(token);
      let currentDate = new Date();

      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        //   dispatch(_logUserOut());
        console.log("user will be kicked out");
      } else {
        setAuthHeader(token);
        dispatch(getUserProfile());
        dispatch(success(token));
      }
    } catch (e) {
      console.error(e);
    }
  };
};
