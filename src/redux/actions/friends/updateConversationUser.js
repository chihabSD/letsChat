import { friendsApiHandler } from '../../../api/friends';
import { setError } from '../../reducers/error';
import { getFriends, insertNewConversation, updatingExistingConversation } from '../../reducers/friends';
import {getProfile} from '../../reducers/profile';
import { names } from '../names';

export const _updateConversationUser = (details) => {

  return async dispatch => {
    // dispatch(setLoading());
    try {
      const {
        data: { conversation },
      } = await friendsApiHandler (names.UPDATE_USER_IN_CONVERSATION, details);

    
      dispatch(updatingExistingConversation(conversation))
   
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }

  };
};