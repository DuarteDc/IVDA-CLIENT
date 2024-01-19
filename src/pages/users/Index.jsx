import { useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs, Button } from '@nextui-org/react';

import { UsersContext } from '../../context/users/UsersContext'
import { UsersTable } from '../../components/users/UsersTable';

import { HomeIcon, PlusIcon } from '../../components/icons';

export const Users = () => {

    const [searchParams, setSearchParams] = useSearchParams(1);
    const { users, totalPages, getUsers } = useContext(UsersContext);

    useEffect(() => {
        getUsers(searchParams);
    }, [searchParams])

    return (
        <section className="min-h-screen pt-20 overflow-hidden">
            <h1 className="text-center text-5xl font-bold pb-10 uppercase">Usuarios</h1>
            <div className="flex justify-end py-10">
                <Button color="primary" startContent={<PlusIcon />} as={Link} to="create">
                    Crear Usuario
                </Button>
            </div>
            <div className="flex flex-col flex-wrap gap-4 mb-5">
                <Breadcrumbs radius="lg" variant="solid" color="foreground">
                    <HomeIcon />
                    <BreadcrumbItem>
                        <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
                            <HomeIcon width={20} height={20} />
                            Inicio
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Usuarios</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <UsersTable users={users} totalPages={totalPages} setSearchParams={setSearchParams} currentPage={Number(searchParams.get('page')) || 1} />
        </section>
    )
}



