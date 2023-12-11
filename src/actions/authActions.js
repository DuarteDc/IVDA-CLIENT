import { isAxiosError } from 'axios';

import apiInstance from '../config/api';

import { errorNotification, successNotification } from '../components/ui/Alerts';

export const startLogin = async (body) => {
    try {
        const { data } = await apiInstance.post('/signin', body);
        return data;
    } catch (error) {
        if (isAxiosError(error))
            return errorNotification(error?.response?.data?.message);

        errorNotification('Parece que hubo un error - Intenta más tarde');
    }
}

export const startRevalidateToken = async () => {
    try {
        const res = await apiInstance.get('/me');
        return res.data;
    } catch (error) {
        if(isAxiosError(error))  localStorage.removeItem('session');
    }
}

export const recoverPassword = async (body) => {
    try {
        const { data } = await apiInstance.post('/recover-password', body);
        successNotification(data?.message);
        return true;
    } catch (error) {
        if (isAxiosError(error)) return errorNotification(error.response.data?.message);
        errorNotification();
    }
}

export const getPasswordToken = async (params) => {
    try {
        const res = await apiInstance.get(`/get-password-token?${params}`);
        return {
            status: res.status,
            message: ''
        }
    } catch (error) {
        if (isAxiosError(error)) return {
            status: error.response.status,
            message: error.response.data?.message,
        }
    }
}

export const changePassword = async (body) => {
    try {
        const { data } = await apiInstance.post(`/change-password`, body);
        successNotification(data?.message);
        return true;
    } catch (error) {
        if (isAxiosError(error)) return errorNotification(error.response?.data?.message);
        errorNotification();
    }
}