import * as Yup from 'yup';

export const createInventoryValidations = () => ({
    subsecretary_id: Yup.string().required('La subsecretaría es requerida'),
    code: Yup.string().required('El código estructural es requerido'),
    administrative_unit_id: Yup.string().required('La unidad administrativa es requerida'),
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