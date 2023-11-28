import { isAxiosError } from 'axios';

import apiInstance from '../config/api';

import { errorNotification, successNotification } from '../components/ui/Alerts';

export const generateReport = async(id) => {
 try {
    const res = await apiInstance.get(`/auth/report/generate/${id}`)
    console.log(res);
 } catch (error) {
    console.log(error);
 }   
}