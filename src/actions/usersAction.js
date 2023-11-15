import { isAxiosError } from 'axios';
import { errorNotification, successNotification } from '../components/ui/Alerts';
import apiInstance from '../config/api';

export const startGetUsers = async (page = 1) => {
    try {
        const res = await apiInstance.get(`/auth/users?page=${page}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export const createUser = async (data) => {
    try {
        const res = await apiInstance.post('/auth/users/save', data);
        successNotification(res.data?.message);
    } catch (error) {
        if (isAxiosError(error)) return errorNotification(error.response.data?.message);
        errorNotification('Parece que hubo un error - Intenta más tarde');
    }
}


export const deleteUser = async (id) => {
    try {
        const res = await apiInstance.delete(`/auth/users/${id}`,);
        successNotification(res.data?.message);
        return true;
    } catch (error) {
        if (isAxiosError(error)) return errorNotification(error.response.data?.message);
        errorNotification('Parece que hubo un error - Intenta más tarde');
    }
}

export const activeUser = async (id) => {
    try {
        const res = await apiInstance.post(`/auth/users/active/${id}`,);
        successNotification(res.data?.message);
        return true;
    } catch (error) {
        if (isAxiosError(error)) return errorNotification(error.response.data?.message);
        errorNotification('Parece que hubo un error - Intenta más tarde');
    }
}
