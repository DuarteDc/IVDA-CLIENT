import { isAxiosError } from 'axios';

import apiInstance from '../config/api';

import { errorNotification } from '../components/ui/Alerts';

export const startLogin = async (data) => {
    try {
        const res = await apiInstance.post('/signin', data);
        return res.data;
    } catch (error) {
        if (isAxiosError(error)) {
            return errorNotification(error.response.data?.message || 'xd');
        }
        errorNotification('Parece que hubo un error - Intenta más tarde');
    }
}

export const startRevalidateToken = async () => {
    try {
        const res = await apiInstance.get('/me');
        return res.data;
    } catch (error) {
        console.log(error);
    }
}