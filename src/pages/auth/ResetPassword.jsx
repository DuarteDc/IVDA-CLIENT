import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, Card, CardBody, Input, Spinner } from '@nextui-org/react';
import { EyeIcon, EyeOffIcon } from '../../components/icons';
import { changePassword } from '../../validations/authValidations';
import { useAuth } from '../../hooks/useAuth';
import { useSearchParams } from 'react-router-dom';
import { UIContext } from '../../context/ui/UIContext';

export const ResetPassword = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { loading } = useContext(UIContext);
  const { startChangePassword } = useAuth();


  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const initialValues = {
    password: '',
    confirm_password: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(changePassword()),
    onSubmit: (data) => {
      startChangePassword({ ...data, key: searchParams.get('key'), email: searchParams.get('email') })
    }
  });


  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-5 relative overflow-hidden">
      <span className="w-[200px] h-[100px] lg:w-[400px] lg:h-[200px] rounded-3xl -rotate-45 bg-blue-600/10 shadow-[0_10px_150px_20px_rgba(30,64,175,0.5)] absolute bottom-0 -left-20 lg:-left-24"></span>
      <span className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-md rotate-45 bg-blue-600/80  absolute lg:bottom-48 lg:left-40 bottom-20 left-16"></span>

      <span className="w-[200px] h-[200px] lg:w-[600px] lg:h-[600px] rounded-3xl rotate-45 border-blue-600/50 border-2 absolute top-10 -right-20 lg:-right-40"></span>
      <span className="w-[200px] h-[200px] lg:w-[600px] lg:h-[600px] rounded-3xl rotate-45 bg-blue-600/10 shadow-[0_10px_150px_20px_rgba(30,64,175,0.5)] absolute top-0 -right-20 lg:-right-40 z-10"></span>
      <span className="w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] rounded-md rotate-45 bg-blue-600/80  absolute lg:top-40 top-10 lg:right-80 right-16 z-20"></span>

      <Card className="w-full lg:w-5/12 p-5">
        <CardBody>
          <h1 className="text-center text-4xl lg:text-7xl font-bold my-10">Restablecer contraseña</h1>
          <form onSubmit={formik.handleSubmit}>
            <Input
              name="password"
              type={isVisible ? "text" : "password"}
              label="Contraseña"
              variant="bordered"
              className="my-4"
              value={formik.values.password}
              isInvalid={formik.touched.password && formik.errors.password ? true : false}
              errorMessage={formik.touched.password && formik.errors.password && formik.errors.password}
              required={true}
              onChange={formik.handleChange}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeOffIcon />
                  ) : (
                    <EyeIcon />
                  )}
                </button>
              }
              size="lg"
            />
            <Input
              name="confirm_password"
              type={isVisibleConfirm ? "text" : "password"}
              label="Confirmar contraseña"
              variant="bordered"
              className="my-4"
              value={formik.values.confirm_password}
              isInvalid={formik.touched.confirm_password && formik.errors.confirm_password ? true : false}
              errorMessage={formik.touched.confirm_password && formik.errors.confirm_password && formik.errors.confirm_password}
              required={true}
              onChange={formik.handleChange}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibilityConfirm}>
                  {isVisibleConfirm ? (
                    <EyeOffIcon />
                  ) : (
                    <EyeIcon />
                  )}
                </button>
              }
              size="lg"
            />
            <Button color="primary" type="submit" className="w-full font-bold py-8 mt-5" isLoading={loading} spinner={<Spinner color="default" />}>
              Cambiar contraseña
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  )
}
