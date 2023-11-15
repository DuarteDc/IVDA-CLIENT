import apiInstance from '../config/api';

export const getAllAdministrativeUnits = async () => {
    try {
        const res = await apiInstance.get('/auth/administrative-unit/all');
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export const getBySubsecretary = async (id) => {
    try {
        const res = await apiInstance.get(`/auth/administrative-unit/subsecretary/${id}`);
        return res.data.administrative_units;
    } catch (error) {
        console.log(error);
    }
}

