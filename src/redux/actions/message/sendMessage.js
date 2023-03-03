import { messageApiHandler } from '../../../api/message';
import { setError } from '../../reducers/error';
import {   clearNewMessageAdded, insertSentMessage, setNewMessageAdded } from '../../reducers/friends';
import { names } from '../names';

export const _sendMessage= (details) => {
  return async dispatch => {
    // dispatch(setLoading());
    try {
      const {data:{message}} = await messageApiHandler (names.SEND_MESSAGE, details);
      dispatch(setNewMessageAdded())
      dispatch(insertSentMessage(message))
      setTimeout(() => {
        dispatch(clearNewMessageAdded())
        
      }, 1000);
    
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }

  };
};