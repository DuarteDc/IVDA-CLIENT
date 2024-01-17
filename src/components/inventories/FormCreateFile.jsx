import { useContext, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Card, CardBody, Input, Spinner, Textarea } from "@nextui-org/react"
import { UIContext } from '../../context/ui/UIContext';
import Datepicker from "react-tailwindcss-datepicker";
import { addFileValidations } from '../../validations/inventoryValidation';
import { useInventory } from '../../hooks/useInventory';


export const FormCreateFile = ({ inventoryId, onOpen }) => {

    const { handleCreateFile } = useInventory();

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    })

    const [error, setError] = useState(false);

    const handleValueChange = (newValue) => {
        setValue(newValue);
        setError(false)
    }

    const initialValues = {
        section: '',
        serie: '',
        no_ex: '',
        formule: '',
        name: '',
        total_legajos: '',
        total_files: '',
        observations: '',
    }


    const { loading } = useContext(UIContext)

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(addFileValidations()),
        onSubmit: (data) => {
            if (!value['startDate']) return setError(true);
            const newData = ({ ...data, files_date: [value.startDate, value.endDate] });
            handleCreateFile(inventoryId, newData).then(() => onOpen())
        }
    })

    return (
        <>
            <h2 className="text-center text-4xl py-4 font-bold uppercase">Agregar Archivo</h2>
            <form onSubmit={formik.handleSubmit} className="md:p-10" >
                <div className="grid gap-4">
                    <Input
                        name="section"
                        type="text"
                        label="Sección"
                        variant="bordered"
                        value={formik.values.section}
                        isInvalid={formik.touched.section && formik.errors.section ? true : false}
                        errorMessage={formik.touched.section && formik.errors.section && formik.errors.section}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <Input
                        name="serie"
                        type="text"
                        label="Serie y/o subserie"
                        variant="bordered"
                        value={formik.values.serie}
                        isInvalid={formik.touched.serie && formik.errors.serie ? true : false}
                        errorMessage={formik.touched.serie && formik.errors.serie && formik.errors.serie}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <Input
                        name="no_ex"
                        type="text"
                        label="Número de expediente"
                        variant="bordered"
                        value={formik.values.no_ex}
                        isInvalid={formik.touched.no_ex && formik.errors.no_ex ? true : false}
                        errorMessage={formik.touched.no_ex && formik.errors.no_ex && formik.errors.no_ex}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <Input
                        name="formule"
                        type="text"
                        label="Fórmula clasificadora"
                        variant="bordered"
                        value={formik.values.formule}
                        isInvalid={formik.touched.formule && formik.errors.formule ? true : false}
                        errorMessage={formik.touched.formule && formik.errors.formule && formik.errors.formule}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <Input
                        name="name"
                        type="text"
                        label="Nombre del expediente"
                        variant="bordered"
                        value={formik.values.name}
                        isInvalid={formik.touched.name && formik.errors.name ? true : false}
                        errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <Input
                        name="total_legajos"
                        type="text"
                        label="Total de Legajos"
                        variant="bordered"
                        value={formik.values.total_legajos}
                        isInvalid={formik.touched.total_legajos && formik.errors.total_legajos ? true : false}
                        errorMessage={formik.touched.total_legajos && formik.errors.total_legajos && formik.errors.total_legajos}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <Input
                        name="total_files"
                        type="text"
                        label="Total de documentos"
                        variant="bordered"
                        value={formik.values.total_files}
                        isInvalid={formik.touched.total_files && formik.errors.total_files ? true : false}
                        errorMessage={formik.touched.total_files && formik.errors.total_files && formik.errors.total_files}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <div>
                        <Datepicker
                            inputName="files_date"
                            value={value}
                            popoverDirection="up"
                            inputClassName="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 border-medium border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground min-h-unit-12 rounded-large flex-col items-start justify-center transition-background !duration-150 transition-colors motion-reduce:transition-none h-16 py-[2.5] gap-0 dark:text-white"
                            placeholder="Fecha de los documentos"
                            onChange={handleValueChange}
                            i18n="es"
                            displayFormat={"DD/MM/YYYY"}
                            separator="-"
                        />
                        {
                            error && (
                                <p className="text-tiny text-danger">La fecha de los documentos es querida</p>
                            )
                        }
                    </div>
                    <Textarea
                        variant="bordered"
                        label="Observaciones"
                        value={formik.values.observations}
                        isInvalid={formik.touched.observations && formik.errors.observations ? true : false}
                        errorMessage={formik.touched.observations && formik.errors.observations && formik.errors.observations}
                        required={true}
                        name="observations"
                        onChange={formik.handleChange}
                        className="w-full col-span-2 mb-5"
                    />
                </div>
                <Button color="primary" type="submit" className="w-full font-bold py-8" isLoading={loading} spinner={<Spinner color="default" />}>
                    Agregar Archivo
                </Button>
            </form>
        </>
    )
}
