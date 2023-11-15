import apiInstance from '../config/api';

export const startGetUsers = async () => {
    try {
        const res = await apiInstance.get('/auth/users');
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
