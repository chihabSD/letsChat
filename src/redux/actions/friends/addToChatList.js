import { friendsApiHandler } from '../../../api/friends';
import { setError } from '../../reducers/error';
import { getFriends } from '../../reducers/friends';
import {getProfile} from '../../reducers/profile';
import { names } from '../names';

export const _addToChatList= (details) => {
  return async dispatch => {
    // dispatch(setLoading());
    try {
      const data = await friendsApiHandler (names.ADD_TO_CHATLIST, details);
    console.log(data);
    //   dispatch(getFriends(data.data.friends))
    //   dispatch(getProfile(data.data.user));
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }

  };
};