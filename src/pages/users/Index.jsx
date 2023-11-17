import { useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs, Button, useDisclosure } from '@nextui-org/react';

import { UsersContext } from '../../context/users/UsersContext'
import { UsersTable } from '../../components/users/UsersTable';

import { AlertCircleIcon, PlusIcon } from '../../components/icons';
import { AlertModal } from '../../components/ui/AlertModal';
import { useUsers } from '../../hooks/useUsers';
import { UIContext } from '../../context/ui/UIContext';

export const Users = () => {

    const screenLoading = useContext(UIContext);
    const [searchParams, setSearchParams] = useSearchParams(1);

    const { users, totalPages, setCurrentUser, currentUser, getUsers } = useContext(UsersContext);
    const { handleChangeStatus } = useUsers();

    console.log(screenLoading);

    useEffect(() => {
        getUsers(searchParams);
    }, [searchParams])


    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <section className="min-h-screen pt-20 overflow-hidden">
            <h1 className="text-center text-5xl font-bold pb-10 uppercase">Lista de usuarios</h1>
            <div className="flex justify-end py-10">
                <Button color="primary" startContent={<PlusIcon />}>
                    <Link to="/auth/users/create">
                        Crear Usuario
                    </Link>
                </Button>
            </div>
            <div className="flex flex-col flex-wrap gap-4 mb-5">
                <Breadcrumbs radius="lg" variant="bordered" color="primary">
                    <BreadcrumbItem>
                        <Link to="/">
                            Inicio
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Usuarios</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <UsersTable users={users} totalPages={totalPages} openAlert={onOpen} setCurrentUser={setCurrentUser} setSearchParams={setSearchParams} />
            {
                isOpen && (
                    <AlertModal
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onOpenChange={onOpenChange}
                        title="Alerta"
                        callback={handleChangeStatus}
                    >
                        <div className="flex flex-col items-center font-bold">
                            {
                                currentUser.status ? (
                                    <span className="text-red-600">
                                        <AlertCircleIcon width={50} height={50} />
                                    </span>
                                ) : (
                                    <span className="text-blue-600">
                                        <AlertCircleIcon width={50} height={50} />
                                    </span>
                                )
                            }
                            <p>Antest de continuar.</p>
                            {
                                currentUser.status ? <p>¿Esta seguro que sea eliminar el usuario?</p> : <p>¿Esta seguro que sea activar el usuario?</p>
                            }
                        </div>
                    </AlertModal>
                )
            }
        </section>
    )
}



