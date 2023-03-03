import { messageApiHandler } from "../../../api/message";
import { setError } from "../../reducers/error";
import {
  insertLatestReaction,
} from "../../reducers/friends";
import { names } from "../names";

export const _reactToMessage = (details) => {
  return async (dispatch) => {
    try {
      const {
        data: { message },
      } = await messageApiHandler(names.REACT_TO_MESSAGE, details);

      dispatch(insertLatestReaction(message));
     
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};
