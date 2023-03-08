import axios from "axios";
// import {ENDPOINT} from '../config/serverUrl';
import { names } from "../redux/actions/names";
import { ENDPOINT } from "./endpoint";
import { getHeader } from "./header";
const messanger = `${ENDPOINT}/messanger`;

const { GET_FRIENDS, DELETE_CONVERSATION,  SEND_IMAGE, UPDATE_USER_IN_CONVERSATION,  GET_CHATLIST , ADD_TO_CHATLIST} = names;

// handle auth
export const friendsApiHandler = async (name, details) => {

    const header = await getHeader();
  switch (name) {
   
      case GET_FRIENDS:
        return axios.get(`${messanger}/get-friends`);

        case ADD_TO_CHATLIST:
          return axios.post(`${messanger}/add-to-chatlist`, details, header);

        case GET_CHATLIST:
          return axios.get(`${messanger}/get-chatlist`, header);
  
        case DELETE_CONVERSATION:
          return axios.delete(`${messanger}/delete-conversation/${details}`, header);
  
        case UPDATE_USER_IN_CONVERSATION:
          return axios.put(`${messanger}/conversation/update-user/${details.conversationId}`, details,  header);
  
    default:
      break;
  }
};


