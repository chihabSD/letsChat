import { friendsApiHandler } from "../../../api/friends";
import { setError } from "../../reducers/error";
import { deleteConversation } from "../../reducers/friends";
import { clearLoading, setLoading } from "../../reducers/loading";
import { names } from "../names";
export const _deleteConversation = (details) => {
  return async (dispatch) => {

    // dispatch(setLoading());
    try {
      const {
        data: { conversation },
      } = await friendsApiHandler(names.DELETE_CONVERSATION, details);
      dispatch(deleteConversation(details))
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};
