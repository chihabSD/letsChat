import { TOKEN_NAME } from "../../../config/tokenName";
export const success = (token) => {
  return async (dispatch) => {
    localStorage.setItem(TOKEN_NAME, token);
    console.log("toke is set and name", TOKEN_NAME, token);
    // return  token
  };
};
