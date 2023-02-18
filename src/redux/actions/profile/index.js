import { authApiHandler } from '../../../api/auth';
// import {accountApiHandler} from '../../../api/profile';
// import {setError} from '../../reducers/errors';
// import {clearLoading, setLoading, toggleLoading} from '../../reducers/loading';
import {getProfile} from '../../reducers/profile';
import { names } from '../names';
// import {names} from '../names';

export const getUserProfile = () => {
  return async dispatch => {
    // dispatch(setLoading());
    try {
      const data = await authApiHandler(names.GET_PROFILE, null);
      dispatch(getProfile(data.data.user));
    console.log('Profile data', data.data);
    //   dispatch(clearLoading());
    } catch (e) {
      console.log(e);
      console.log(e.response);
    //   dispatch(setError(e.response.data.error));
    }
  };
};