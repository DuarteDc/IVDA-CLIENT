import { useContext } from 'react';
import { Button, Input } from '@nextui-org/react'
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { UIContext } from '../../context/ui/UIContext';
import { loginValidations } from '../../validations/authValidations';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {

    const { theme } = useContext(UIContext);
    const { login } = useAuth();

    const initialValues = {
        email: '',
        password: ''
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(loginValidations()),
        onSubmit: async (data) => await login(data),
    });
    
    return (
        <section className={`${theme}  text-foreground bg-background min-h-screen flex flex-col items-center w-full justify-center relative overflow-hidden px-5`}>
            <span className="w-[200px] h-[100px] lg:w-[400px] lg:h-[200px] rounded-3xl -rotate-45 bg-blue-600/10 shadow-[0_10px_150px_20px_rgba(30,64,175,0.5)] absolute bottom-0 -left-20 lg:-left-24"></span>
            <span className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-md rotate-45 bg-blue-600/80  absolute lg:bottom-48 lg:left-40 bottom-20 left-16"></span>

            <span className="w-[200px] h-[200px] lg:w-[600px] lg:h-[600px] rounded-3xl rotate-45 border-blue-600/50 border-2 absolute top-10 -right-20 lg:-right-40"></span>
            <span className="w-[200px] h-[200px] lg:w-[600px] lg:h-[600px] rounded-3xl rotate-45 bg-blue-600/10 shadow-[0_10px_150px_20px_rgba(30,64,175,0.5)] absolute top-0 -right-20 lg:-right-40 z-10"></span>
            <span className="w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] rounded-md rotate-45 bg-blue-600/80  absolute lg:top-40 top-10 lg:right-80 right-16 z-20"></span>

            <div className="w-full lg:w-5/12 py-40 rounded-md z-20 xl:px-20 px-0 max-w-[1200px] [&>form>div>span]:text-black [&>form>div>span]:font-bold [&>form>div>label]:text-red-600  [&>form>div>label]:text-sm [&>form>div>label]:font-bold  [&>form>div]:mb-4">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-center mb-20">Iniciar Sesión</h1>

                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <Input
                        name="email"
                        type="email"
                        label="Correo Electronico"
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
                    <Button color="primary" type="submit" className="w-full font-bold py-8 mt-5">
                        Iniciar Sesión
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default LoginPage