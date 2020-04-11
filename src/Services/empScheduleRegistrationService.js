import { BASE_URL } from '../Constants/appConfigs';
import axios from 'axios';
import db from './index'

export async function getEmpScheduleRegistration(id) {
    let response = db.schedule;
    return response;
}
