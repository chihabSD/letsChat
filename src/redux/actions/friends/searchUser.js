import { messageApiHandler } from '../../../api/message'
import { setError } from '../../reducers/error';
import { getFriends, insertSearchUsers } from '../../reducers/friends';
import {getProfile} from '../../reducers/profile';
import { names } from '../names';

export const _searchUser= (details) => {
  return async dispatch => {
    // dispatch(setLoading());
    try {
        const {
            data: { users },
          }  = await messageApiHandler (names.SEARCH_USER, details);
    //   dispatch(getFriends(data.data.friends))

    dispatch(insertSearchUsers(users))
    //   dispatch(getProfile(data.data.user));
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }

  };
};