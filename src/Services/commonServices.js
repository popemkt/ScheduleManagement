import { Alert } from 'react-native';
import { BASE_URL } from '../Constants/configs';
import axios from 'axios';
import db from './index'

export async function login(username, password) {
  return db.accounts.filter(a => a.Username == username && a.Password == password)
  // let response = axios.get(
  //   `${BASE_URL}Home/?username=${username}&password=${password}`,
  // );
  // return response;
}
