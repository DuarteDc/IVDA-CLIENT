import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createInventoryValidations } from '../../validations/inventoryValidation';
import { useInventory } from '../../hooks/useInventory';
import { Button, Card, CardBody, Chip, Input, Select, SelectItem, Spinner } from '@nextui-org/react';
import { UIContext } from '../../context/ui/UIContext';
import Datepicker from 'react-tailwindcss-datepicker';

const initialValues = {
    type_file: '',
    type_file_name: '',
    location: '',
    location_name: '',
    date: '',
}

export const FormCreateInventory = ({ dependency, typeFiles, locations }) => {

    const { handleCreateInventory } = useInventory();
    const { loading } = useContext(UIContext);

    const [value, setValue] = useState({
        startDate: null, 
        endDate: null,
    })
    const [error, setError] = useState(false);

    const handleValueChange = (newValue) => {
        setValue(newValue);
        setError(false)
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(createInventoryValidations()),
        onSubmit: (data) => {
            if (!value.startDate) return setError(true);
            const newData = {
                type_file:  data.type_file_name ? data.type_file_name : Number(data.type_file),
                location: data.location_name ? data.location_name: Number(data.location),
                date: value.startDate
            }

            handleCreateInventory(newData)
        }
    })
    const handleCancelFieldValue = (key) => {
        if (typeof key === 'string') {
            const isValidKey = Object.keys(formik.initialValues).includes(key);
            if (!isValidKey) throw new Error("Key is not valid inside form values");
            return formik.setFieldValue(key, '');
        }
        for (const item of key) {
            const isValidKey = Object.keys(formik.initialValues).includes(item);
            if (!isValidKey) throw new Error("Key is not valid inside form values");
            formik.setFieldValue(item, '');
        }

    }

    return (
        <Card className="overflow-visible">
            <CardBody className="overflow-visible">
                <h2 className="text-center text-4xl uppercase my-5">Inventario General de Archivo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 md:px-6 py-5 [&>div>div]:my-2">
                    <div>
                        <span className="font-bold mr-2">Unidad Administrativa:</span>
                        <span>{dependency.name}</span>
                    </div>
                    <div>
                        <span className="font-bold mr-2">Código Estructural:</span>
                        <span>{dependency.code}</span>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 mb-10 [&>div]:my-5">
                        {
                            formik.values.type_file === "0" ? (
                                <Input
                                    name="type_file_name"
                                    label="Nuevo tipo de archivo"
                                    variant="bordered"
                                    isInvalid={formik.touched.type_file_name && formik.errors.type_file_name ? true : false}
                                    errorMessage={formik.touched.type_file_name && formik.errors.type_file_name && formik.errors.type_file_name}
                                    validate={formik.values.type_file_name}
                                    required={true}
                                    onChange={formik.handleChange}
                                    size="lg"
                                    endContent={
                                        <Chip variant="bordered" color="danger" onClose={() => handleCancelFieldValue(['type_file_name', 'type_file'])}>
                                            Cancelar
                                        </Chip>}
                                />

                            ) : (
                                <Select
                                    label="Tipo de archivo"
                                    className="w-full"
                                    size="lg"
                                    isInvalid={formik.touched.type_file && formik.errors.type_file ? true : false}
                                    errorMessage={formik.touched.type_file && formik.errors.type_file && formik.errors.type_file}
                                    required={true}
                                    onChange={(event) => { formik.handleChange(event); }}
                                    name="type_file"
                                >
                                    {
                                        typeFiles?.map(({ id, name }) => (
                                            <SelectItem value={id} key={id}>
                                                {name}
                                            </SelectItem>
                                        ))
                                    }
                                    <SelectItem value="0" key="0">
                                        Otro
                                    </SelectItem>
                                </Select>
                            )
                        }
                        {
                            formik.values.location === "0" ? (
                                <Input
                                    name="location_name"
                                    label="Nueva ubicación"
                                    variant="bordered"
                                    isInvalid={formik.touched.location_name && formik.errors.location_name ? true : false}
                                    errorMessage={formik.touched.location_name && formik.errors.location_name && formik.errors.location_name}
                                    required={true}
                                    onChange={formik.handleChange}
                                    size="lg"
                                    endContent={
                                        <Chip variant="bordered" color="danger" onClose={() => handleCancelFieldValue(['location', 'location_name'])}>
                                            Cancelar
                                        </Chip>}
                                />

                            ) : (
                                <Select
                                    label="Ubicación fisíca"
                                    className="w-full"
                                    size="lg"
                                    isInvalid={formik.touched.location && formik.errors.location ? true : false}
                                    errorMessage={formik.touched.location && formik.errors.location && formik.errors.location}
                                    required={true}
                                    onChange={formik.handleChange}
                                    name="location"
                                >
                                    {
                                        locations?.map(({ id, name }) => (
                                            <SelectItem value={id} key={id}>
                                                {name}
                                            </SelectItem>
                                        ))
                                    }
                                    <SelectItem value="0" key="0">
                                        Otro
                                    </SelectItem>
                                </Select>
                            )
                        }
                        <div>
                            <Datepicker
                                inputName="files_date"
                                value={value}
                                popoverDirection="up"
                                asSingle={true}
                                useRange={false}
                                inputClassName="py-4 relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 border-medium border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground min-h-unit-12 rounded-large flex-col items-start justify-center transition-background !duration-150 transition-colors motion-reduce:transition-none h-16 py-[2.5] gap-0 dark:text-white absolute z-20"
                                placeholder="Fecha de elaboración"
                                displayFormat={"DD/MM/YYYY"}
                                onChange={handleValueChange}
                                i18n="es"
                            />
                            {
                                error && (
                                    <p className="text-tiny text-danger">La fecha de los documentos es querida</p>
                                )
                            }
                        </div>
                    </div>
                    <Button color="primary" type="submit" className="w-full font-bold py-8 mt-20" isLoading={loading} spinner={<Spinner color="default" />}>
                        Crear Inventario
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}
