import { BASE_URL } from '../Constants/appConfigs';
import axios from 'axios';
import { getAuthHeadersConfig } from '../Common/config';

export async function getEmpScheduleRegistration(empId, startDate, endDate) {
  let response = axios.get(
    `${BASE_URL}empsr?empID=${empId}&start=${startDate}&end=${endDate}`,
    getAuthHeadersConfig(),
  );
  console.log(`REQUEST URL: ${BASE_URL}empsr?empID=${empId}&start=${startDate}&end=${endDate}`);
  console.log(`AUTH HEADER: ${getAuthHeadersConfig()}`);

  return response;
}
