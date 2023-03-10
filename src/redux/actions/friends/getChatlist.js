import { friendsApiHandler } from "../../../api/friends";
import { setError } from "../../reducers/error";
import {
  clearNewMessageAdded,
  getInitialConversations,
  insertMessages,
  setLoadingConversation,
  clearLoadingConversation,
  setNewMessageAdded,
} from "../../reducers/friends";
import { clearLoading, setLoading } from "../../reducers/loading";
import { names } from "../names";
export const _getChatList = (details) => {
  return async (dispatch) => {
    try {
      const {
        data: { chats },
      } = await friendsApiHandler(names.GET_CHATLIST, details);

      if (chats.length > 0) {
        dispatch(setLoadingConversation());
        dispatch(getInitialConversations(chats));
        setTimeout(() => {
          dispatch(clearLoadingConversation());
        }, 1000);

        return;
      }
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};
