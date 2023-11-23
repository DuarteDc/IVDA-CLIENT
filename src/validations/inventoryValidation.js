import * as Yup from 'yup';

export const createInventoryValidations = () => ({
    subsecretary_id: Yup.string().required('La subsecretaría es requerida'),
    code: Yup.string().required('El código estructural es requerido'),
    administrative_unit_id: Yup.string().required('La unidad administrativa es requerida'),
});