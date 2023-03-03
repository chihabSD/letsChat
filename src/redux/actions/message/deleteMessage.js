import { messageApiHandler } from '../../../api/message';
import { setError } from '../../reducers/error';
import {} from '../../reducers/friends';
import { names } from '../names';

export const _deleteMessage = (details) => {
  return async dispatch => {
    // dispatch(setLoading());
    try {
      const {data:{message}} = await messageApiHandler (names.DELETE_MESSAGE, details);
     
      // handle restore pic
      console.log(message);
    
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }

  };
};