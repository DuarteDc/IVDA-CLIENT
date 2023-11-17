import * as Yup from 'yup';

import { useFormik } from 'formik';

import { Avatar, Button, Input, Select, SelectItem, Skeleton } from '@nextui-org/react';
import { newUserValidations } from '../../validations/usersValidations';
import { useUsers } from '../../hooks/useUsers';
import { useAdministrativeUnits } from '../../hooks/useAdministrativeUnits';

const initialValues = {
    name: '',
    last_name: '',
    email: '',
    password: '',
    role: '',
    administrative_unit_id: '',
    subsecretary_id: ''
}

export const FormCreateUser = ({ subsecretaries = [] }) => {

    const { saveUser, screen_loading } = useUsers();
    const { getAdministrativeUnitsBySubsecretary, administrativeUnits = [] } = useAdministrativeUnits();    

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(newUserValidations()),
        onSubmit: async (data) => await saveUser(data),
    });

    return (
        <>
            <div className="mb-5">
                {
                    formik.values.name && formik.values.last_name ? (
                        <Avatar src={`https://ui-avatars.com/api/?background=random&name=${formik.values?.name} ${formik.values?.last_name}`} className="w-48 h-48 text-large" />
                    ) : (
                        <Skeleton className="flex rounded-full w-48 h-48" />
                    )
                }
            </div>
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
                <div className="flex flex-col md:flex-row md:[&>*]:mr-4 [&>*]:mb-4 ">
                    <Select
                        label="Rol"
                        className="w-full md:max-w-xs"
                        isInvalid={formik.touched.role && formik.errors.role ? true : false}
                        errorMessage={formik.touched.role && formik.errors.role && formik.errors.role}
                        required={true}
                        selectedKeys={formik.values.role}
                        onChange={formik.handleChange}
                        name="role"
                    >
                        <SelectItem value="0" key="0">
                            Usuario
                        </SelectItem>
                        <SelectItem value="1" key="1">
                            Administrador
                        </SelectItem>
                    </Select>
                    {
                        formik.values.role === '0' && (
                            <>
                                <Select
                                    label="Subsecretaria"
                                    className="w-full md:max-w-xs"
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
                                    formik.values.subsecretary_id && (
                                        <Select
                                            label="Unidad Administrativa"
                                            className="w-full md:max-w-xs"
                                            isInvalid={formik.touched.administrative_unit_id && formik.errors.administrative_unit_id ? true : false}
                                            errorMessage={formik.touched.administrative_unit_id && formik.errors.administrative_unit_id && formik.errors.administrative_unit_id}
                                            required={true}
                                            selectedKeys={formik.values.administrative_unit_id}
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
                                    )
                                }
                            </>
                        )
                    }
                </div>
                <Button color="primary" type="submit" className="w-full font-bold py-8" isLoading={screen_loading} spinner={<svg
                    className="animate-spin h-5 w-5 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                    />
                </svg>}>
                    Crear Usuario
                </Button>

            </form>
        </>
    )
}
