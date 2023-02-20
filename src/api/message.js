import axios from "axios";
import { names } from "../redux/actions/names";
import { ENDPOINT } from "./endpoint";
import { getHeader } from "./header";
const messanger = `${ENDPOINT}/messanger`;

const {SEND_MESSAGE, GET_MESSAGE, SEND_IMAGE} = names;

// handle auth
export const messageApiHandler = async (name, details) => {
    const header = await getHeader();
  switch (name) {
   
      case SEND_MESSAGE:
        return axios.post(`${messanger}/send-message`, details, header);
      case GET_MESSAGE:
        return axios.get(`${messanger}/get-message/${details}`, header);
        case SEND_IMAGE:
          return axios.post(`${messanger}/send-image`, details);
    default:
      break;
  }
};
