import { useContext } from 'react';
import * as Yup from 'yup';

import { Button, Card, CardBody, Input, Spinner } from '@nextui-org/react';
import { useFormik } from 'formik';
import { createSubsecretaryValidations } from '../../validations/subsecretaryValidations';
import { UIContext } from '../../context/ui/UIContext';
import { useSubsecretaries } from '../../hooks/useSubsecretaries';

const initialValues = {
    name: ''
}

export const FormCreateSubsecretary = () => {

    const { handleCreateSubsecretary } = useSubsecretaries();

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(createSubsecretaryValidations()),
        onSubmit: (data) => handleCreateSubsecretary(data),
    })

    return (
        <Card>
            <CardBody>
                <h2 className="text-center text-4xl py-4 font-bold">Nueva Subsecretaria</h2>
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
                    <Button color="primary" type="submit" className="w-full font-bold py-8">
                        Crear Subsecretaria
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}
