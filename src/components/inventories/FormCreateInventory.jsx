import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createInventoryValidations } from '../../validations/inventoryValidation';
import { useInventory } from '../../hooks/useInventory';
import { Button, Card, CardBody, Input, Select, SelectItem, Spinner } from '@nextui-org/react';
import { useDependency } from '../../hooks/useDependency';
import { useContext } from 'react';
import { UIContext } from '../../context/ui/UIContext';
import Datepicker from 'react-tailwindcss-datepicker';

const initialValues = {
    subsecretary_id: '',
    code: '',
    administrative_unit_id: '',
}

export const FormCreateInventory = ({ dependency }) => {

    const { handleCreateInventory } = useInventory();
    const { administrativeUnits = [] } = useDependency();

    const { loading } = useContext(UIContext);

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(createInventoryValidations()),
        onSubmit: (data) => handleCreateInventory(data),
    })

    return (
        <Card>
            <CardBody>
                <h2 className="text-center text-4xl uppercase my-5">Inventario General de Archivo</h2>
                <div className="flex justify-end text-sm px-6 my-4">
                    <span>Fecha de elavoración:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <span className="font-bold mr-2">Dependencia:</span>
                        <span>Instituto de Información e Investigación Geográfica, Estadística y Catastral del Estado de México</span>
                    </div>
                    <div>
                        <span className="font-bold mr-2">Unidad Administrativa:</span>
                        <span>{dependency.name}</span>
                    </div>
                    <div>
                        <span className="font-bold mr-2">Código Estructural:</span>
                        <span>{dependency.code}</span>
                    </div>
                    <div>

                        <Datepicker
                            inputName="files_date"
                            // value={value}
                            popoverDirection="up"
                            inputClassName="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 border-medium border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground min-h-unit-12 rounded-large flex-col items-start justify-center transition-background !duration-150 transition-colors motion-reduce:transition-none h-16 py-[2.5] gap-0 dark:text-white absolute z-20"
                            placeholder="Fecha de elaboración"
                            // onChange={handleValueChange}
                            i18n="es"
                        />
                    </div>
                    {/* {
                        error && (
                            <p className="text-tiny text-danger">La fecha de los documentos es querida</p>
                        )
                    } */}
                    <Input
                        name="code"
                        type="text"
                        label="Código Estructural"
                        variant="bordered"
                        value={formik.values.code}
                        isInvalid={formik.touched.code && formik.errors.code ? true : false}
                        errorMessage={formik.touched.code && formik.errors.code && formik.errors.code}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <Button color="primary" type="submit" className="w-full font-bold py-8 mt-10" isLoading={loading} spinner={<Spinner color="default" />}>
                        Crear Inventario
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}
