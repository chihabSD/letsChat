import { messageApiHandler } from '../../../api/message';
import { setError } from '../../reducers/error';
import { getFriends, insertMessages } from '../../reducers/friends';
import {getProfile} from '../../reducers/profile';
import { names } from '../names';

export const _getMessage= (details) => {
  return async dispatch => {
    // dispatch(setLoading());
    try {
      const {data:{messages}} = await messageApiHandler (names.GET_MESSAGE, details);
      
      dispatch(insertMessages([...messages]))
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }

  };
};