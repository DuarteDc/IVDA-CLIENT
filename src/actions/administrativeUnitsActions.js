import { isAxiosError } from 'axios';
import { errorNotification, successNotification } from '../components/ui/Alerts';
import apiInstance from '../config/api';

export const getAllAdministrativeUnits = async () => {
    try {
        const res = await apiInstance.get('/auth/administrative-units/all');
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export const getBySubsecretary = async (id) => {
    try {
        const res = await apiInstance.get(`/auth/administrative-units/subsecretary/${id}`);
        return res.data.administrative_units;
    } catch (error) {
        console.log(error);
    }
}

export const getOneAdministrativeUnit = async (id) => {
    try {
        const { data } = await apiInstance.get(`/auth/administrative-units/${id}`);
        return data.administrative_unit;
    } catch (error) {
        console.log(error);
    }
}



export const getAdministrativeUnits = async (params = '') => {
    try {
        const { data } = await apiInstance.get(`/auth/administrative-units?${params}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const createAdministrativeUnit = async (body) => {
    try {
        const { data } = await apiInstance.post(`/auth/administrative-units`, body);
        successNotification(data?.message);
        return true;
    } catch (error) {
        if (isAxiosError(error)) return errorNotification(error.response.data?.message);
        errorNotification('Parece que hubo un error - Intenta más tarde');
    }
}

export const deleteAdministrativeUnit = async (id) => {
    try {
        const { data } = await apiInstance.delete(`/auth/administrative-units/${id}`,);
        successNotification(data?.message);
        return true;
    } catch (error) {
        if (isAxiosError(error)) {
            errorNotification(error.response.data?.message);
            return false;
        }
        errorNotification('Parece que hubo un error - Intenta más tarde');
        return false;
    }
}

export const activeAdministrativeUnit = async (id) => {
    try {
        const { data } = await apiInstance.post(`/auth/administrative-units/enable/${id}`,);
        successNotification(data?.message);
        return true;
    } catch (error) {
        if (isAxiosError(error)) {
            errorNotification(error.response.data?.message);
            return false;
        }
        errorNotification('Parece que hubo un error - Intenta más tarde');
        return false;
    }
}

