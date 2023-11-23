import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createInventoryValidations } from '../../validations/inventoryValidation';
import { useInventory } from '../../hooks/useInventory';
import { Button, Card, CardBody, Input, Select, SelectItem, Spinner } from '@nextui-org/react';
import { useAdministrativeUnits } from '../../hooks/useAdministrativeUnits';
import { useContext } from 'react';
import { UIContext } from '../../context/ui/UIContext';

const initialValues = {
    subsecretary_id: '',
    code: '',
    administrative_unit_id: '',
}

export const FormCreateInventory = ({ subsecretaries }) => {

    const { handleCreateInventory } = useInventory();
    const { getAdministrativeUnitsBySubsecretary, administrativeUnits = [] } = useAdministrativeUnits();

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
                    <Select
                        label="Subsecretarias"
                        className="w-full"
                        size="lg"
                        isInvalid={formik.touched.subsecretary_id && formik.errors.subsecretary_id ? true : false}
                        errorMessage={formik.touched.subsecretary_id && formik.errors.subsecretary_id && formik.errors.subsecretary_id}
                        required={true}
                        onChange={(event) => { formik.handleChange(event); getAdministrativeUnitsBySubsecretary(event.target.value) }}
                        name="subsecretary_id"
                    >
                        {
                            subsecretaries?.map(({ id, name }) => (
                                <SelectItem value={id} key={id}>
                                    {name}
                                </SelectItem>
                            ))
                        }
                    </Select>

                    {
                        formik.values.subsecretary_id ? (
                            <Select
                                label="Unidad Administrativa"
                                className="w-full"
                                size="lg"
                                isInvalid={formik.touched.administrative_unit_id && formik.errors.administrative_unit_id ? true : false}
                                errorMessage={formik.touched.administrative_unit_id && formik.errors.administrative_unit_id && formik.errors.administrative_unit_id}
                                required={true}
                                onChange={formik.handleChange}
                                name="administrative_unit_id"
                            >
                                {
                                    administrativeUnits?.map(({ id, name }) => (
                                        <SelectItem value={id} key={id}>
                                            {name}
                                        </SelectItem>
                                    ))
                                }
                            </Select>
                        ) : (<span></span>)
                    }
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
