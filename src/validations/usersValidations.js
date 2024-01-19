import * as Yup from 'yup';

export const newUserValidations = () => ({
    name: Yup.string().min(3, 'El nombre debe contener al menos 3 caracteres').required("El nombre es requerido"),
    last_name: Yup.string().min(3, 'El apellido debe contener al menos 3 caracteres').required("El apellido es requerido"),
    email: Yup.string().email("La dirección de correo no es valida").required("El correo es requerido"),
    password: Yup.string().min(8, 'La contraseña debe contener al menos 8 caracteres').required("La contraseña es requerida"),
    dependency_id: Yup.string().required("Para crear un usuario es necesario asignarle una dependencia"),
})

export const editUserValidations = () => ({
    name: Yup.string().min(3, 'El nombre debe contener al menos 3 caracteres').required("El nombre es requerido"),
    last_name: Yup.string().min(3, 'El apellido debe contener al menos 3 caracteres').required("El apellido es requerido"),
    email: Yup.string().email("La dirección de correo no es valida").required("El correo es requerido"),
    dependency_id: Yup.string().required("Para crear un usuario es necesario asignarle una dependencia"),
})
