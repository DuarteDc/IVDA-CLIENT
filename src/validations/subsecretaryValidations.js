import * as Yup from 'yup';

export const createSubsecretaryValidations = () => ({
    name: Yup.string().min(4, 'El nombre debe contener al menos 4 caracteres').required('El nombre es requerido'),
})