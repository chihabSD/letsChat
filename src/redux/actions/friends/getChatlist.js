import { friendsApiHandler } from "../../../api/friends";
import { setError } from "../../reducers/error";
import { clearNewMessageAdded, insertConversation, insertMessages, setLoadingConversation, clearLoadingConversation, setNewMessageAdded  } from "../../reducers/friends";
import { clearLoading, setLoading } from "../../reducers/loading";
import { names } from "../names";
export const _getChatList = (details) => {
  return async (dispatch) => {

   
    dispatch( setLoadingConversation())
    try {
      const {
        data: { chats, messages, replies },
      } = await friendsApiHandler(names.GET_CHATLIST, details);
      dispatch(setNewMessageAdded())
      let newMessages = [...new Set([...messages ,...replies])]
      dispatch(insertMessages([...newMessages]));
      dispatch(insertConversation(chats));
      setTimeout(() => {
        dispatch(clearLoadingConversation());
        dispatch(clearNewMessageAdded())
      }, 1000);
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};
