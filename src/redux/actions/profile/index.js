import { authApiHandler } from '../../../api/auth';
import { setError } from '../../reducers/error';
import {getProfile} from '../../reducers/profile';
import { names } from '../names';

export const getUserProfile = () => {
  return async dispatch => {
    // dispatch(setLoading());
    try {
      const data = await authApiHandler(names.GET_PROFILE, null);
      dispatch(getProfile(data.data.user));
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};