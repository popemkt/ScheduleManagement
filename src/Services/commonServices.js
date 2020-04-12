import { BASE_URL } from "../Constants/appConfigs";
import axios from "axios";

async function login(username, password) {
  let response = axios.post(`${BASE_URL}Home/Login`, {
    Username: username,
    Password: password,
  });
  return response;
}

function firebaseLogin(firebaseToken, response, error, final) {
  axios
    .post(`${BASE_URL}Home/Login`, {
      token: firebaseToken,
    })
    .then(response)
    .catch(error)
    .finally(final);
}

export { login, firebaseLogin };
