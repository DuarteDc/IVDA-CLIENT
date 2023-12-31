import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Card, CardBody, Input, Select, SelectItem, Spinner } from '@nextui-org/react';
import { useAdministrativeUnits } from '../../hooks/useAdministrativeUnits';
import { createAdministrativeUnitValidation } from '../../validations/administrativeUnitsValidations';
import { UIContext } from '../../context/ui/UIContext';
import { useContext } from 'react';

export const FormEditAdministrativeUnit = ({ subsecretaries, administrativeUnit }) => {

    const initialValues = {
        name: administrativeUnit?.name,
        subsecretary_id: administrativeUnit?.subsecretary_id
    }

    const { loading } = useContext(UIContext);
    const { handleUpdateAdministrativeUnit } = useAdministrativeUnits();

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(createAdministrativeUnitValidation()),
        onSubmit: (data) => handleUpdateAdministrativeUnit(administrativeUnit.id, data),
    })

    return (
        <Card>
            <CardBody>
                <h2 className="text-center text-4xl py-4 font-bold">Editar Unidad Administrativa</h2>
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
                        selectedKeys={[formik.values.subsecretary_id]}
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
                    <Button color="primary" type="submit" className="w-full font-bold py-8" isLoading={loading} spinner={<Spinner color="default" />}>
                        Actualizar Subsecretaria
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}
