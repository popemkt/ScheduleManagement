import { BASE_URL } from '../Constants/appConfigs';
import axios from 'axios';

export async function login(username, password) {
  let response = axios.post(
    `${BASE_URL}Home/Login`,
    {
      "Username": username,
      "Password": password
    }
  );
  return response;
}
