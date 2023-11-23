import { isAxiosError } from 'axios';

import apiInstance from '../config/api';

import { errorNotification, successNotification } from '../components/ui/Alerts';

export const getInventories = async (params) => {
    try {
        const { data } = await apiInstance.get(`/auth/inventories?${params}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const getInventory = async (id) => {
    try {
        const { data } = await apiInstance.get(`/auth/inventories/${id}`);
        return data.inventory;
    } catch (error) {
        console.log(error);
    }
}


export const createInventory = async (body) => {
    try {
        const { data } = await apiInstance.post('/auth/inventories', body)
        successNotification(data?.message);
        return true;
    } catch (error) {
        if (isAxiosError(error)) {
            errorNotification(error.response.data?.message);
            return false;
        }
        errorNotification();
        return false;
    }
}