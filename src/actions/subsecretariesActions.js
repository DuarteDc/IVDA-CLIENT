import apiInstance from '../config/api';

export const getAllSubsecretaries = async () => {
    try {
        const res = await apiInstance.get('/auth/subsecretaries/all');
        return res.data?.subsecretaries;
    } catch (error) {
        console.log(error);
    }
}

