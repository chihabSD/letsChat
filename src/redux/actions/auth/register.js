import { authApiHandler } from "../../../api/auth";
import { setError } from "../../reducers/error";
import { names } from "../names";
export const _register = (details) => {
  return async (dispatch) => {
    try {
    //   const { data } = await axios.post(`${auth}/register`, details);
    const {data}= await authApiHandler(names.REGISTER, details)

      // dispatch(setLoading())
      // await slowCode(1000)
      // const { data } = await axios.post("http://localhost:5000/auth/register", {details});
      console.log("Returned data", data);
    } catch (error) {
      dispatch(setError(error.response.data.message))
      console.log(error.response.data.message);
    }
  };
};
