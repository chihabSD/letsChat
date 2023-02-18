import { authApiHandler } from "../../../api/auth";
import setAuthHeader from "../../../helpers/setAuthHeader";
import { setError } from "../../reducers/error";
import { clearLoading, setLoading } from "../../reducers/loading";
import { success } from "./success";
// const TOKEN_NAME = 'expense_app_token';
import { names } from "../names";
import { getUserProfile } from "../profile";
export const _login = (details) => {
  return async (dispatch) => {
    try {
      //   dispatch(setLoading());
      const {data:{token }}  = await authApiHandler(names.LOGIN, details);
      setAuthHeader(token);
      dispatch(success(token));
      dispatch(getUserProfile())
      //   dispatch(setRegistered());
      //   dispatch(clearLoading());
    } catch (error) {
      dispatch(setError(error.response.data.message));
      setTimeout(() => {
        dispatch(clearLoading());
      }, 1000);
    }
  };
};
