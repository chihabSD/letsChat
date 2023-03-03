import { messageApiHandler } from '../../../api/message';
import { setError } from '../../reducers/error';
import { insertUpdatedMessage } from '../../reducers/friends';
import { names } from '../names';

export const _deleteMessage = (details) => {
  return async dispatch => {
    // dispatch(setLoading());
    try {
      const {data:{message}} = await messageApiHandler (names.DELETE_MESSAGE, details);
     
      // handle restore pic
      dispatch(insertUpdatedMessage(message))
    
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }

  };
};