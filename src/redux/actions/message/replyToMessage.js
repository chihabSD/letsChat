import { messageApiHandler } from "../../../api/message";
import { setError } from "../../reducers/error";
import { insertSentMessage } from "../../reducers/friends";

import { names } from "../names";

export const _replyToMessage = (details) => {
  console.log('called');
  return async (dispatch) => {
    try {
      const {
        data: { message },
      } = await messageApiHandler(names.REPLY_TO_MESSAGE, details);
      //   dispatch(insertSentMessage(message))
      console.log(message);
      dispatch(insertSentMessage(message))
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};
