import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Card, CardBody, Input, Select, SelectItem, Spinner } from '@nextui-org/react';
import { useDependency } from '../../hooks/useDependency';
import { createAdministrativeUnitValidation } from '../../validations/administrativeUnitsValidations';
import { UIContext } from '../../context/ui/UIContext';
import { useContext } from 'react';

export const FormEditAdministrativeUnit = ({ dependency }) => {

    const initialValues = {
        name: dependency?.name,
        code: dependency?.code
    }

    const { loading } = useContext(UIContext);
    const { handleUpdateDependency } = useDependency();

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(createAdministrativeUnitValidation()),
        onSubmit: (data) => handleUpdateDependency(dependency.id, data),
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
                    <Input
                        name="code"
                        type="text"
                        label="Código estructural"
                        variant="bordered"
                        value={formik.values.code}
                        isInvalid={formik.touched.code && formik.errors.code ? true : false}
                        errorMessage={formik.touched.code && formik.errors.code && formik.errors.code}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <Button type="submit" className="w-full font-bold py-8 bg-emerald-600 text-white" isLoading={loading} spinner={<Spinner color="default" />}>
                        Guardar
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}
