import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';


export const Dashboard = () => {

    const { user } = useContext(AuthContext);

    return (
        <section className="flex md:items-center min-h-screen justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full  max-w-[2000px]">
                <div className="mt-10 [&>div>div>form>*]:my-5 [&>div>div>form]:md:px-5 [&>div>div]:py-10 md:px-5 text-center lg:text-left">
                    <h1 className="text-6xl lg:text-8xl xl:text-9xl mb-10 font-bold text-blue-600">Bienvenido</h1>
                    <h2 className="text-4xl lg:text-6xl xl:text-8xl font-bold">{user?.name} {user?.last_name}</h2>
                </div>
                <div className="hidden lg:flex justify-center items-center w-full">
                    <img
                        src="/assets/home.svg"
                        width={700}
                        height={600}
                        alt="Build"
                    />
                </div>
            </div>
        </section>
    )
}
