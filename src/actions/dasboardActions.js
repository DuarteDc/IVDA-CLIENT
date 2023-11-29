import apiInstance from '../config/api';

export const getDataDashboard = async () => {
    try {
        const { data } = await apiInstance.get('/auth/dashboard');
        return data;
    } catch (error) {
        console.log(error);
    }
}