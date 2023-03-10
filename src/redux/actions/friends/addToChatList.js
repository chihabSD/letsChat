import { friendsApiHandler } from "../../../api/friends";
import { setError } from "../../reducers/error";
import { getFriends, insertNewConversation } from "../../reducers/friends";
import { getProfile } from "../../reducers/profile";
import { names } from "../names";

export const _addToChatList = (details) => {
  console.log('addToChatList.js is called');
  return async (dispatch) => {
    // dispatch(setLoading());
    try {
      const {
        data: { chat },
      } = await friendsApiHandler(names.ADD_TO_CHATLIST, details);
      dispatch(insertNewConversation(chat));
      //   dispatch(getFriends(data.data.friends))
      //   dispatch(getProfile(data.data.user));
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};
