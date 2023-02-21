import { messageApiHandler } from '../../../api/message';
import { setError } from '../../reducers/error';
import { getFriends, insertMessages } from '../../reducers/friends';
import {getProfile} from '../../reducers/profile';
import { names } from '../names';

export const _sendMessage= (details) => {
  return async dispatch => {
    // dispatch(setLoading());
    try {
      const data = await messageApiHandler (names.SEND_MESSAGE, details);
      console.log(data.data);
      // let messages = []
      // messages.push(data.data.message)
      // dispatch(insertMessages([...messages]))
      // console.log(data.data);

    //   dispatch(getProfile(data.data.user));
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }

  };
};