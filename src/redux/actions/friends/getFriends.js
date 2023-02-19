import { friendsApiHandler } from '../../../api/friends';
import { setError } from '../../reducers/error';
import { getFriends } from '../../reducers/friends';
import {getProfile} from '../../reducers/profile';
import { names } from '../names';

export const _getFriends= () => {
  return async dispatch => {
    // dispatch(setLoading());
    try {
      const data = await friendsApiHandler (names.GET_FRIENDS, null);
      dispatch(getFriends(data.data.friends))
    console.log(data);
    //   dispatch(getProfile(data.data.user));
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }

  };
};