import { authApiHandler } from "../../../api/auth";
import { setError } from "../../reducers/error";
import { clearLoading, setLoading } from "../../reducers/loading";
import { setRegistered } from "../../reducers/register";
import { names } from "../names";
export const _register = (details) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const { data } = await authApiHandler(names.REGISTER, details);
      dispatch(setRegistered());
      dispatch(clearLoading());
    } catch (error) {
      dispatch(setError(error.response.data.message));
      setTimeout(() => {

      dispatch(clearLoading());
      }, 1000)
    }
  };
};
