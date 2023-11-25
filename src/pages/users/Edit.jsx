import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs, Card, CardBody } from '@nextui-org/react';
import { FormEditUser } from '../../components/users/FormEditUser';
import { useSubsecretaries } from '../../hooks/useSubsecretaries';
import { UsersContext } from '../../context/users/UsersContext';
import { HomeIcon, UsersIcon } from '../../components/icons';

export const Edit = () => {
    const { id } = useParams();
    const { getUserById, user } = useContext(UsersContext);
    const { getAllActiveSubsecretaries } = useSubsecretaries();

    const [subsecretaries, setSubsecretaries] = useState([]);

    useEffect(() => {
        getUserById(id);
        getAllActiveSubsecretaries().then(setSubsecretaries);
    }, []);

    return (
        <section className="min-h-screen lg:px-10">
            <h1 className="text-center text-5xl font-bold uppercase pb-10">Editar usuario</h1>
            <div className="px-5 flex flex-col flex-wrap gap-4 mb-5">
                <Breadcrumbs radius="lg" variant="solid" color="foreground">
                    <BreadcrumbItem>
                        <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
                            <HomeIcon width={20} height={20} />
                            Inicio
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/auth/users" className="flex items-center [&>:first-child]:mr-2">
                            <UsersIcon width={20} height={20} />
                            Usuarios
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Editar</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full mt-10 lg:mt-20">
                <div className="mt-10 [&>div>div>form>*]:my-2 [&>div>div>form]:md:px-5 [&>div>div]:py-10 md:px-5">
                    {
                        (Object.keys(user).length > 0 && user.id === id) && (
                            <FormEditUser
                                subsecretaries={subsecretaries}
                                user={user}
                            />
                        )
                    }
                </div>
                <div className="hidden lg:flex justify-center items-center w-full">
                    <img
                        src="/assets/add-user.svg"
                        width={700}
                        height={600}
                        alt="Build"
                    />
                </div>
            </div>
        </section>
    )
}
