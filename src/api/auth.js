import axios from "axios";
// import {ENDPOINT} from '../config/serverUrl';
import { names } from "../redux/actions/names";
import { ENDPOINT } from "./endpoint";
import { getHeader } from "./header";
const auth = `${ENDPOINT}/auth`;

const { REGISTER, LOGIN } = names;

// handle auth
export const authApiHandler = async (name, details) => {
  console.log("sdfsdf", details);
  //   const header = await getHeader();
  switch (name) {
    case REGISTER:
      return axios.post(`${auth}/register`, details);
    case LOGIN:
      return axios.post(`${auth}/login`, details);
    default:
      break;
  }
};
