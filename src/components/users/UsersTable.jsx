import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Pagination, useDisclosure, Spinner } from '@nextui-org/react';
import { AlertCircleIcon, DoneIcon, EditIcon, EyeIcon, TrashIcon } from '../icons';
import { AlertModal } from '../ui/AlertModal';
import { UsersContext } from '../../context/users/UsersContext';
import { useUsers } from '../../hooks/useUsers';
import { UIContext } from '../../context/ui/UIContext';

export const UsersTable = ({ users = [], totalPages = 0, setSearchParams }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { setCurrentUser, currentUser } = useContext(UsersContext);
    const { loading } = useContext(UIContext);

    const { handleChangeStatus } = useUsers();

    return (
        <>
            <Table aria-label="Ususarios">
                <TableHeader>
                    <TableColumn> Nombre </TableColumn>
                    <TableColumn> Apellido </TableColumn>
                    <TableColumn> Correo </TableColumn>
                    <TableColumn> Rol </TableColumn>
                    <TableColumn> Estatus </TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody
                    isLoading={loading}
                    loadingContent={<div className="w-full h-full z-50 bg-slate-200/60  dark:bg-black/80 flex items-center justify-center"><Spinner label="Espere..." /></div>}
                >
                    {
                        users?.map(({ id, name, last_name, email, status, role }) => (
                            <TableRow key={id}>
                                <TableCell>
                                    <User
                                        avatarProps={{ radius: "lg", src: `https://ui-avatars.com/api/?background=random&name=${name} ${last_name}` }}
                                        description={email}
                                        name={name}
                                    >
                                        {email}
                                    </User>
                                </TableCell>
                                <TableCell>{last_name}</TableCell>
                                <TableCell>{email}</TableCell>
                                <TableCell>
                                    <Chip className="capitalize" color={`${role === '0' ? 'primary' : 'secondary'}`} size="sm" variant="flat">
                                        {
                                            role === '0' ? 'Usuario' : 'Administrador'
                                        }
                                    </Chip>

                                </TableCell>
                                <TableCell>
                                    <Chip className="capitalize" color={`${status ? 'success' : 'warning'}`} size="sm" variant="flat">
                                        {
                                            status ? 'Activo' : 'Inactivo'
                                        }
                                    </Chip>

                                </TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        {/* <Tooltip content="Detalles">
                                            <Link to={`/auth/users/${id}`}>
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EyeIcon />
                                                </span>
                                            </Link>
                                        </Tooltip> */}
                                        <Tooltip content="Editar">
                                            <Link to={`/auth/users/edit/${id}`}>
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EditIcon />
                                                </span>
                                            </Link>
                                        </Tooltip>
                                        {
                                            status ? (
                                                <Tooltip color="danger" content="Eliminar">
                                                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { onOpen(); setCurrentUser(id); }}>
                                                        <TrashIcon />
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip color="primary" content="Activar">
                                                    <span className="text-lg text-primary cursor-pointer active:opacity-50" onClick={() => { onOpen(); setCurrentUser(id); }}>
                                                        <DoneIcon />
                                                    </span>
                                                </Tooltip>
                                            )
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            {
                totalPages > 0 && (
                    <div className="flex justify-end py-5 lg:pt-10">
                        <Pagination showControls total={totalPages} initialPage={1} onChange={(page) => { setSearchParams(`?page=${page}`) }} />
                    </div>
                )
            }

            {
                isOpen && (
                    <AlertModal
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onOpenChange={onOpenChange}
                        callback={handleChangeStatus}
                    >
                        <div className="flex flex-col items-center font-bold text-center">
                            {
                                currentUser?.status ? (
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
                                currentUser?.status ? <p>¿Esta seguro que sea eliminar el usuario <b>{`${currentUser.name} ${currentUser.last_name}`}</b>?</p> : <p>¿Esta seguro que sea activar el usuario <b>{`${currentUser.name} ${currentUser.last_name}`}</b>?</p>
                            }
                        </div>
                    </AlertModal>
                )
            }
        </>
    )
}
