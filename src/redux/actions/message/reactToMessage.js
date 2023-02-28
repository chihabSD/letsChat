import { messageApiHandler } from "../../../api/message";
import { setError } from "../../reducers/error";
import {
  getFriends,
  insertLatestReaction,
  insertMessages,
  insertSentMessage,
  reactToMessage,
  setCurrentMessage,
} from "../../reducers/friends";
import { getProfile } from "../../reducers/profile";
import { names } from "../names";

export const _reactToMessage = (details) => {
  return async (dispatch) => {
    // dispatch(setLoading());
    try {
      const {
        data: { message },
      } = await messageApiHandler(names.REACT_TO_MESSAGE, details);
      // dispatch(reactToMessage([...messages]))
      // dispatch(setCurrentMessage(message))
        dispatch(insertLatestReaction(message))
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};

