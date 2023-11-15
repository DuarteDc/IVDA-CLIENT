import * as Yup from 'yup';

export const loginValidations = () => ({
    email: Yup.string().email("La dirección de correo no es valida").required("El correo es requerido"),
    password: Yup.string().min(8, 'La contraseña debe contener al menos 8 caracteres').required("La contraseña es requerida"),
})