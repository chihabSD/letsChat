import { TOKEN_NAME } from "../../../config/tokenName";
import { authenticate } from "../../reducers/profile";
export const success = (token) => {
  return async (dispatch) => {
    localStorage.setItem(TOKEN_NAME, token);
    dispatch(authenticate());
    // return  token
  };
};
