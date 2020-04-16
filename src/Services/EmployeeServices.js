import Axios from "axios";
import { BASE_URL } from "../Constants/appConfigs";
import { getAuthHeadersConfig } from '../Common/config';

async function getEmployee(employeeId, response, err, final) {
  const request = `${BASE_URL}employees/${employeeId}`;
  console.log("REQUEST: " + request);
  Axios.get(`${BASE_URL}employees/${employeeId}`, getAuthHeadersConfig())
    .then(response)
    .catch(err)
    .finally(final);
}

export default {
  getEmployee,
};
