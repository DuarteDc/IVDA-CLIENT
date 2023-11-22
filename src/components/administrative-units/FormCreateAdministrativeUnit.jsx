import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Card, CardBody, Input, Select, SelectItem } from '@nextui-org/react';
import { useAdministrativeUnits } from '../../hooks/useAdministrativeUnits';
import { createAdministrativeUnitValidation } from '../../validations/administrativeUnitsValidations';

const initialValues = {
    name: '',
    subsecretary_id: ''
}

export const FormCreateAdministrativeUnit = ({ subsecretaries }) => {

    const { handleCreateAdministrativeUnit } = useAdministrativeUnits();

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(createAdministrativeUnitValidation()),
        onSubmit: (data) => handleCreateAdministrativeUnit(data),
    })

    return (
        <Card>
            <CardBody>
                <h2 className="text-center text-4xl py-4 font-bold">Nueva Unidad Administrativa</h2>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        name="name"
                        type="text"
                        label="Nombre"
                        variant="bordered"
                        value={formik.values.name}
                        isInvalid={formik.touched.name && formik.errors.name ? true : false}
                        errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <Select
                        label="Subsecretarias"
                        className="w-full"
                        isInvalid={formik.touched.subsecretary_id && formik.errors.subsecretary_id ? true : false}
                        errorMessage={formik.touched.subsecretary_id && formik.errors.subsecretary_id && formik.errors.subsecretary_id}
                        required={true}
                        onChange={formik.handleChange}
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
                    <Button color="primary" type="submit" className="w-full font-bold py-8">
                        Crear Subsecretaria
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}
