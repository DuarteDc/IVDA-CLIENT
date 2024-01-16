import { isAxiosError } from 'axios';
import { errorNotification, successNotification } from '../components/ui/Alerts';
import apiInstance from '../config/api';

export const getAllDependencies = async () => {
    try {
        const res = await apiInstance.get('/auth/dependencies/all');
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export const getByUser = async (id) => {
    try {
        const { data } = await apiInstance.get(`/auth/dependencies/user`);
        return data.dependency;
    } catch (error) {
        console.log(error);
    }
}

export const getDependency = async (id) => {
    try {
        const { data } = await apiInstance.get(`/auth/dependencies/${id}`);
        return data.dependency;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Response(error?.response?.data?.message, { status: error?.status });
        }
    }
}



export const getDependencies = async (params = '') => {
    try {
        const { data } = await apiInstance.get(`/auth/dependencies?${params}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const createDependency = async (body) => {
    try {
        const { data } = await apiInstance.post(`/auth/dependencies`, body);
        successNotification(data?.message);
        return true;
    } catch (error) {
        if (isAxiosError(error)) return errorNotification(error.response.data?.message);
        errorNotification('Parece que hubo un error - Intenta más tarde');
    }
}

export const updateAdministrativeUnit = async (id, body) => {
    try {
        const { data } = await apiInstance.patch(`/auth/dependencies/${id}`, body);
        successNotification(data?.message);
        return true;
    } catch (error) {
        if (isAxiosError(error)) return errorNotification(error.response.data?.message);
        errorNotification('Parece que hubo un error - Intenta más tarde');
    }
}

export const deleteAdministrativeUnit = async (id) => {
    try {
        const { data } = await apiInstance.delete(`/auth/dependencies/${id}`,);
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
        const { data } = await apiInstance.post(`/auth/dependencies/enable/${id}`,);
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

