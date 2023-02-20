import axios from "axios";
// import {ENDPOINT} from '../config/serverUrl';
import { names } from "../redux/actions/names";
import { ENDPOINT } from "./endpoint";
// import { getHeader } from "./header";
const messanger = `${ENDPOINT}/messanger`;

const { GET_FRIENDS, SEND_IMAGE } = names;

// handle auth
export const friendsApiHandler = async (name, details) => {
    // const header = await getHeader();
  switch (name) {
   
      case GET_FRIENDS:
        return axios.get(`${messanger}/get-friends`);

    default:
      break;
  }
};
