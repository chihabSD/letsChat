
import axios from 'axios';
import {ENDPOINT} from '../config/serverUrl';
import {names} from '../redux/actions/names';
import {getHeader} from './header';
const auth = `${ENDPOINT}:1000/user/account`;

const {LOGIN, SOCIAL_LOGIN_GOOGLE, LOGOUT, LEGACY_LOGIN, REGISTER} = names;

// handle auth
export const authApiHandler = async (name, details) => {
  const header = await getHeader();
  switch (name) {
    case LOGIN:
      return axios.post(`${auth}/login`, details, header);
    case REGISTER:
      return axios.post(`${auth}/register`, details, header);

    case LOGOUT:
      return axios.post(`${auth}/logout`, details, header);

    case LEGACY_LOGIN:
      return axios.post(`${auth}/login/legacy`, details, header);

    case SOCIAL_LOGIN_GOOGLE:
      return axios.post(`${auth}/login/google/auth`, details, header);

    default:
      break;
  }
};