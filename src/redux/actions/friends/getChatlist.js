import { friendsApiHandler } from "../../../api/friends";
import { setError } from "../../reducers/error";
import { getFriends, insertChats } from "../../reducers/friends";
import { getProfile } from "../../reducers/profile";
import { names } from "../names";

export const _getChatList = (details) => {
  return async (dispatch) => {
    // dispatch(setLoading());
    try {
      const {
        data: { chats },
      } = await friendsApiHandler(names.GET_CHATLIST, details);
      
      dispatch(insertChats(chats));
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};
