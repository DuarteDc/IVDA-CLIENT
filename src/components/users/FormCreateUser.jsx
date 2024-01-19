import { useContext } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Avatar, Button, Card, CardBody, Input, Select, SelectItem, Skeleton, Spinner } from '@nextui-org/react';

import { newUserValidations } from '../../validations/usersValidations';
import { useUsers } from '../../hooks/useUsers';
import { UIContext } from '../../context/ui/UIContext';

const initialValues = {
    name: '',
    last_name: '',
    email: '',
    password: '',
    dependency_id: ''
}

export const FormCreateUser = ({ dependencies = [] }) => {

    const { handleCreateUser } = useUsers();
    const { loading } = useContext(UIContext);

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(newUserValidations()),
        onSubmit: async (data) => await handleCreateUser(data),
    });

    return (
        <Card>
            <CardBody>
                <div className="mb-5 flex items-center justify-center">
                    {
                        formik.values.name && formik.values.last_name ? (
                            <Avatar src={`https://ui-avatars.com/api/?background=random&name=${formik.values?.name} ${formik.values?.last_name}`} className="w-48 h-48 text-large" />
                        ) : (
                            <Skeleton className="flex rounded-full w-48 h-48" />
                        )
                    }
                </div>
                <form onSubmit={formik.handleSubmit} className="[&>div>div]:my-1">
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
                        name="last_name"
                        type="text"
                        label="Apellidos"
                        variant="bordered"
                        value={formik.values.last_name}
                        isInvalid={formik.touched.last_name && formik.errors.last_name ? true : false}
                        errorMessage={formik.touched.last_name && formik.errors.last_name && formik.errors.last_name}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <Input
                        name="email"
                        type="email"
                        label="Correo"
                        variant="bordered"
                        value={formik.values.email}
                        isInvalid={formik.touched.email && formik.errors.email ? true : false}
                        errorMessage={formik.touched.email && formik.errors.email && formik.errors.email}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <Input
                        name="password"
                        type="password"
                        label="Contraseña"
                        variant="bordered"
                        value={formik.values.password}
                        isInvalid={formik.touched.password && formik.errors.password ? true : false}
                        errorMessage={formik.touched.password && formik.errors.password && formik.errors.password}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <Select
                        label="Dependencias"
                        isInvalid={formik.touched.dependency_id && formik.errors.dependency_id ? true : false}
                        errorMessage={formik.touched.dependency_id && formik.errors.dependency_id && formik.errors.dependency_id}
                        onChange={formik.handleChange}
                        name="dependency_id"
                    >
                        {
                            dependencies?.map(({ id, name }) => (
                                <SelectItem value={id} key={id}>
                                    {name}
                                </SelectItem>
                            ))
                        }
                    </Select>
                    <Button color="primary" type="submit" className="w-full font-bold py-8" isLoading={loading} spinner={<Spinner color="default" />}>
                        Crear Usuario
                    </Button>

                </form>
            </CardBody>
        </Card>
    )
}
