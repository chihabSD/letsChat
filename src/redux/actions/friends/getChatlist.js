import { friendsApiHandler } from "../../../api/friends";
import { setError } from "../../reducers/error";
import { insertConversation, insertMessages, insertReaction } from "../../reducers/friends";
import { clearLoading, setLoading } from "../../reducers/loading";
import { names } from "../names";
export const _getChatList = (details) => {
  return async (dispatch) => {
    console.log("get chat list is called");
    dispatch(setLoading());
    try {
      const {
        data: { chats, messages },
      } = await friendsApiHandler(names.GET_CHATLIST, details);
      dispatch(insertMessages([...messages]));
      dispatch(insertConversation(chats));
      setTimeout(() => {
        dispatch(clearLoading());
      }, 1000);
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};
