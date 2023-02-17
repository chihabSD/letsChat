
import axios from 'axios';
import {ENDPOINT} from '../config/serverUrl';
import { names } from '../redux/actions/names';
// import {names} from '../redux/actions/names';
import {getHeader} from './header';
const auth = `${ENDPOINT}:1000/user/account`;

const { REGISTER } = names;

// handle auth
export const authApiHandler = async (name, details) => {
  const header = await getHeader();
  switch (name) {
    // case LOGIN:
    //   return axios.post(`${auth}/login`, details, header);
    case REGISTER:
      return axios.post(`${auth}/register`, details, header);

  
    default:
      break;
  }
};