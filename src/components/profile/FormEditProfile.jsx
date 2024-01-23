import { useContext } from 'react';
import { UIContext } from '../../context/ui/UIContext';
import * as Yup from 'yup';
import { Button, Card, CardBody, Input, Spinner } from '@nextui-org/react';
import { useUsers } from '../../hooks/useUsers';
import { useFormik } from 'formik';
import { updateProfileValidations } from '../../validations/authValidations';
import { useProfile } from '../../hooks/useProfile';


export const FormEditProfile = ({ user }) => {

  const { loading } = useContext(UIContext);
  const { handleUpdateProfile } = useProfile();

  const initialValues = {
    name: user.name,
    last_name: user?.last_name,
    email: user?.email,
    password: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(updateProfileValidations()),
    onSubmit: (data) => handleUpdateProfile(user.id, data)
  });

  return (
    <Card className="col-span-2 [&>div>form>*]:my-5 [&>div>form]:md:px-5 [&>div>div]:py-10 md:px-5">
      <CardBody>
        <h2 className="text-center text-4xl py-8 font-bold">Editar Perfil</h2>
        <form onSubmit={formik.handleSubmit} className="w-full">
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
          <Button type="submit" className="bg-emerald-600 text-white w-full font-bold py-8" isLoading={loading} spinner={<Spinner color="default" />}>
            Guardar
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
