import { friendsApiHandler } from "../../../api/friends";
import { setError } from "../../reducers/error";
import { getFriends,  insertConversation } from "../../reducers/friends";
import { clearLoading, setLoading } from "../../reducers/loading";
import { getProfile } from "../../reducers/profile";
import { names } from "../names";
export const _getChatList = (details) => {
  
  return async (dispatch) => {
    console.log('get chat list is called');
    dispatch(setLoading());
    try {
      const {
        data: { chats },
      } = await friendsApiHandler(names.GET_CHATLIST, details);
      
      dispatch(insertConversation(chats));
    setTimeout(() => {
      
    dispatch(clearLoading())
    }, 1000);
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};
