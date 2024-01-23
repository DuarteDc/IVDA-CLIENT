import { isAxiosError } from 'axios';

import apiInstance from '../config/api';

import { errorNotification, successNotification } from '../components/ui/Alerts';

export const updateProfile = async (userId, body) => {
    try {
        const { data } = await apiInstance.patch(`/auth/profile/update`, body);
        successNotification(data?.message);
        return data.user;
    } catch (error) {
        if (isAxiosError(error))
            return errorNotification(error?.response?.data?.message);

        errorNotification();
    }
}