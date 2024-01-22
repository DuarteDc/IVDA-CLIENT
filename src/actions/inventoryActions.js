import axios, { isAxiosError } from 'axios';

import apiInstance, { apiDownload } from '../config/api';

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
        return {
            inventoryId: data.inventory_id,
        };
    } catch (error) {
        if (isAxiosError(error)) {
            errorNotification(error.response.data?.message);
            return false;
        }
        errorNotification();
        return false;
    }
}

export const updateInventory = async (id, body) => {
    try {
        const { data } = await apiInstance.patch(`/auth/inventories/${id}`, body)
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


export const addFile = async (inventoryId, body) => {
    try {
        const { data } = await apiInstance.post(`/auth/inventories/add-file/${inventoryId}`, body);
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


export const deleteFile = async (inventoryId, fileId) => {
    try {
        const { data } = await apiInstance.delete(`/auth/inventories/remove-file/${inventoryId}/${fileId}`);
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

export const finalizeInventory = async (id) => {
    try {
        const { data } = await apiInstance.post(`/auth/inventories/finalize/${id}`);
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

export const getInventoryByUser = async (params) => {
    try {
        const { data } = await apiInstance.get(`/auth/inventories/get/user?${params}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateInventoryFile = async (inventoryId, fileId, body) => {
    try {
        const { data } = await apiInstance.put(`auth/inventories/update-file/${inventoryId}/${fileId}`, body);
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

export const downloadReport = async (id) => {
    try {
        const res = await apiDownload.get(`/auth/report/generate/${id}`);
        const downloadUrl = window.URL.createObjectURL(res.data)
        window.open(downloadUrl, '__blank')
    } catch (error) {
        if (isAxiosError(error)) {
            errorNotification(error.response.data?.message);
            return false;
        }
        errorNotification();
        return false;
    }
}