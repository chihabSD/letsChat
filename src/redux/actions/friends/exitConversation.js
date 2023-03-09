import { friendsApiHandler } from "../../../api/friends";
import { setError } from "../../reducers/error";
import { updatingExistingConversation} from "../../reducers/friends";
import { names } from "../names";
export const _existConversation = (details) => {
  return async (dispatch) => {

   
    try {
      const {
        data: { conversation },
      } = await friendsApiHandler(names.EXIST_CONVERSATION, details);
      dispatch(updatingExistingConversation(conversation))
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};
