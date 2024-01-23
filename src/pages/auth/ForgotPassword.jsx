import { useContext } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Button, Input, Spinner } from '@nextui-org/react';
import { forgotPasswordValidations } from '../../validations/authValidations';
import { useAuth } from '../../hooks/useAuth';
import { UIContext } from '../../context/ui/UIContext';

export const ForgotPassword = () => {

    const { loading } = useContext(UIContext);
    const { startRecoverPassword } = useAuth();

    const initialValues = { email: '' }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(forgotPasswordValidations()),
        onSubmit: (data) => startRecoverPassword(data),
    });

    return (
        <section className="min-h-screen flex items-center justify-center relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[2000px]">
                <div className="flex items-center justify-center mb-5">
                    <div className="bg-emerald-600 flex items-center justify-center rounded-full w-[20rem] h-[20rem] lg:w-[40rem] lg:h-[40rem]">
                        <img
                            src="/assets/forgot-password.svg"
                            width={700}
                            height={700}
                            alt="Build"
                            className="mt-10 w-[20rem] h-[20rem] lg:w-[30rem] lg:h-[30rem]"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center px-5">
                    <h1 className="text-5xl xl:text-9xl font-bold">¿Olvidaste tu contraseña?</h1>
                    <span className="md:text-lg mb-2 lg:mb-10 mt-5 text-gray-500">Ingresa el correo asociado con tu cuenta</span>
                    <form className="w-full" onSubmit={formik.handleSubmit}>
                        <Input
                            name="email"
                            type="email"
                            label="Correo"
                            variant="bordered"
                            className="my-5"
                            autoComplete="off"
                            value={formik.values.email}
                            isInvalid={formik.touched.email && formik.errors.email ? true : false}
                            errorMessage={formik.touched.email && formik.errors.email && formik.errors.email}
                            required={true}
                            onChange={formik.handleChange}
                            size="lg"
                        />
                        <Button type="submit" className="w-full font-bold py-8 mt-5 bg-emerald-600 text-white" isLoading={loading} spinner={<Spinner color="default" />}>
                            Continuar
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}
