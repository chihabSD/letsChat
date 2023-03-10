import { messageApiHandler } from "../../../api/message";
import { setError } from "../../reducers/error";
import {
  getFriends,
  getMessagesPerConversation,
  setNewMessageAdded,
  clearNewMessageAdded,
} from "../../reducers/friends";
import { clearLoading, setLoading } from "../../reducers/loading";
import { getProfile } from "../../reducers/profile";
import { names } from "../names";

export const _getMessage = (details) => {
  return async (dispatch) => {
    try {
      const {
        data: { messages, replies },
      } = await messageApiHandler(names.GET_MESSAGE, details);

      let newMessages = [...new Set([...messages, ...replies])];

      dispatch(setNewMessageAdded());
      dispatch(getMessagesPerConversation([...newMessages]));
      setTimeout(() => {
        dispatch(clearNewMessageAdded());
      }, 1000);
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};
