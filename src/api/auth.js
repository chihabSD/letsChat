import axios from "axios";
// import {ENDPOINT} from '../config/serverUrl';
import { names } from "../redux/actions/names";
import { ENDPOINT } from "./endpoint";
import { getHeader } from "./header";
const auth = `${ENDPOINT}/auth`;

const { REGISTER, LOGIN, GET_PROFILE } = names;

export const authApiHandler = async (name, details) => {
    const header = await getHeader();
  switch (name) {
    case REGISTER:
      return axios.post(`${auth}/register`, details);
    case LOGIN:
      return axios.post(`${auth}/login`, details);
      case GET_PROFILE:
        return axios.get(`${auth}/profile`,header );
    default:
      break;
  }
};
