import { messageApiHandler } from '../../../api/message';
import { setError } from '../../reducers/error';
import { getFriends, insertMessages, setNewMessageAdded } from '../../reducers/friends';
import { clearLoading, setLoading } from "../../reducers/loading";
import {getProfile} from '../../reducers/profile';
import { names } from '../names';

export const _getMessage= (details) => {
  console.log('Get MSG');
  return async dispatch => {
    // dispatch(setLoading());
    try {
      const {data:{messages, replies}} = await messageApiHandler (names.GET_MESSAGE, details);
      
      dispatch(setNewMessageAdded())
      let newMessages = [...new Set([...messages ,...replies])]
      dispatch(insertMessages([...newMessages]));

      // dispatch(insertMessages([...messages]))
      // setTimeout(() => {
      // dispatch(clearLoading())
      // }, 1000);
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }

  };
};