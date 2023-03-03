import { messageApiHandler } from "../../../api/message";
import { setError } from "../../reducers/error";
import { clearNewMessageAdded, insertSentMessage, setNewMessageAdded } from "../../reducers/friends";

import { names } from "../names";

export const _replyToMessage = (details) => {
  return async (dispatch) => {
    try {
      const {
        data: { message },
      } = await messageApiHandler(names.REPLY_TO_MESSAGE, details);
      //   dispatch(insertSentMessage(message))
      dispatch(insertSentMessage(message))
      dispatch(setNewMessageAdded())
      setTimeout(() => {
        dispatch(clearNewMessageAdded())
        
      }, 1000);
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};
