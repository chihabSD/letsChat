import { friendsApiHandler } from "../../../api/friends";
import { setError } from "../../reducers/error";
import { getFriends,  insertConversation, insertMessages } from "../../reducers/friends";
import { clearLoading, setLoading } from "../../reducers/loading";
import { getProfile } from "../../reducers/profile";
import { names } from "../names";
export const _getChatList = (details) => {
  
  return async (dispatch) => {
    console.log('get chat list is called');
    dispatch(setLoading());
    try {
      const {
        data: { chats, messages },
      } = await friendsApiHandler(names.GET_CHATLIST, details);
      
    //  let message = messages.map()
    dispatch(insertMessages([...messages]))
    //  dispatch(insertMessages(messages[0].messages))
    // messages.map(message => console.log([...message.messages]))
      dispatch(insertConversation(chats));
    setTimeout(() => {
      
    dispatch(clearLoading())
    }, 2000);
    } catch (e) {
      dispatch(setError(e.response.data.error));
    }
  };
};
