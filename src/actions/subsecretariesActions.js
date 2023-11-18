import { isAxiosError } from 'axios';
import { errorNotification, successNotification } from '../components/ui/Alerts';
import apiInstance from '../config/api';

export const getAllSubsecretaries = async () => {
    try {
        const { data } = await apiInstance.get('/auth/subsecretaries/all');
        return data?.subsecretaries;
    } catch (error) {
        console.log(error);
    }
}

export const getSubsecretaries = async () => {
    try {
        const { data } = await apiInstance.get('/auth/subsecretaries');
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getSubsecretary = async (id) => {
    try {
        const { data } = await apiInstance.get(`/auth/subsecretaries/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const deleteSubsecretary = async (id) => {
    try {
        const { data } = await apiInstance.delete(`/auth/subsecretaries/${id}`);
        successNotification(data.message);
        return true;
    } catch (error) {
        if (isAxiosError(error)) {
            errorNotification(error.response.data?.message);
            return false;
        }
        errorNotification('Parece que hubo un error - Intenta más tarde');
    }
}

export const activeSubsecretary = async (id) => {
    try {
        const { data } = await apiInstance.post(`/auth/subsecretaries/active/${id}`);
        successNotification(data.message);
        return true;
    } catch (error) {
        if (isAxiosError(error)) {
            errorNotification(error.response.data?.message);
            return false;
        }
        errorNotification('Parece que hubo un error - Intenta más tarde');
    }
}

export const createSubsecretary = async (body) => {
    try {
        const { data } = await apiInstance.post(`/auth/subsecretaries`, body);
        successNotification(data.message);
        return true;
    } catch (error) {
        if (isAxiosError(error)) {
            errorNotification(error.response.data?.message);
            return false;
        }
        errorNotification('Parece que hubo un error - Intenta más tarde');
    }
}