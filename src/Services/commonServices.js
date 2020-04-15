import { BASE_URL } from '../Constants/appConfigs';
import axios from 'axios';

async function login(username, password) {
  let response = axios.post(`${BASE_URL}auth/login`, {
    Username: username,
    Password: password,
  });
  return response;
}

function firebaseLogin(firebaseToken, response, error, final) {
  console.log(firebaseToken);
  axios
    .post(`${BASE_URL}auth/firebase`, {
      Token: firebaseToken,
    })
    .then(response)
    .catch(error)
    .finally(final);
}

export { login, firebaseLogin };
