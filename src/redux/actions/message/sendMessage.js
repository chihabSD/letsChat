import { messageApiHandler } from '../../../api/message';
import { setError } from '../../reducers/error';
import { getFriends } from '../../reducers/friends';
import {getProfile} from '../../reducers/profile';
import { names } from '../names';

export const _sendMessage= (details) => {
  return async dispatch => {
    // dispatch(setLoading());
    try {
      const data = await messageApiHandler (names.SEND_MESSAGE, details);
    //   dispatch(getFriends(data.data.friends))
    console.log(data);
    //   dispatch(getProfile(data.data.user));
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }

  };
};