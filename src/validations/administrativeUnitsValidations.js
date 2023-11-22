import * as Yup from 'yup';
export const createAdministrativeUnitValidation = () => ({
    name: Yup.string().min(4, 'El nombre debe contener al menos 4 caracteres').required('El nombre es requerido'),
    subsecretary_id: Yup.string().required('La subsecretariía es requerida'),
})