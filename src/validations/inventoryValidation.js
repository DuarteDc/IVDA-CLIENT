import * as Yup from 'yup';

export const createInventoryValidations = () => ({
    type_file: Yup.string().required('El tipo de archivo es requerido'),
    type_file_name: Yup.string().when('type_file', {
        is: "0",
        then: (schema) => schema.required('Para poder crear un nuevo tipo de archivo es necesario ingresar un nombre')
            .min(8, 'El tipo de archivo debe contener al menos 8 caracteres')
            .max(100, 'El tipo de archivo debe contener como máximo 100 caracteres'),
    }),
    location: Yup.string().required('La ubicación física es requerida'),
    location_name: Yup.string().when('location', {
        is: "0",
        then: (schema) => schema.required('Para poder crear una nueva ubicación es necesario ingresar un nombre')
        .min(8, 'La ubicación debe contener al menos 8 caracteres')
        .max(100, 'La ubicación debe contener como máximo 100 caracteres'),
    }),
});


export const addFileValidations = () => ({
    section: Yup.string().required('La sección es requerida'),
    serie: Yup.string().required('La serie y/o subserie documental es requerido'),
    no_ex: Yup.string().required('El número de expediente'),

    formule: Yup.string().required('La fórmula clasificadora del expediente es requerida'),
    name: Yup.string().required('El nombre del expediente'),
    total_legajos: Yup.string().required('El total de legajos es requerido'),
    total_files: Yup.string().required('El total de documentos es requerido'),
    // files_date: Yup.string().required('Las fechas de los documentos son requeridas'),
    observations: Yup.string().required('Las observaciones son requeridas'),
});