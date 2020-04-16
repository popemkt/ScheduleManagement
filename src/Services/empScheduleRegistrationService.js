import { BASE_URL } from '../Constants/appConfigs';
import axios from 'axios';
import { getAuthHeadersConfig } from '../Common/config';

export async function getEmpScheduleRegistration(empId, startDate, endDate) {
  let response = axios.get(
    `${BASE_URL}empsr?empID=${empId}&start=${startDate}&end=${endDate}`,
    getAuthHeadersConfig(),
  );
  return response;
}

export async function updateEmpScheduleRegistration(oldData, newEntries) {
  let response = axios.put(
    `${BASE_URL}empsr`,
    {
      ...oldData,
      Details: newEntries,
    },
    getAuthHeadersConfig(),
  );
  return response;
}
