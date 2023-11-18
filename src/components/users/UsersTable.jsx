import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Pagination } from '@nextui-org/react';
import { DoneIcon, EditIcon, EyeIcon, TrashIcon } from '../icons';
import { Link } from 'react-router-dom';

export const UsersTable = ({ users = [], totalPages = 0, openAlert, setCurrentUser, setSearchParams }) => {

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
                <TableBody>
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
                                    <Chip className="capitalize" color={`${role === '0' ? 'primary' : 'secondary'}`} size="sm" variant="shadow">
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
                                        <Tooltip content="Detalles">
                                            <Link to={`/auth/users/${id}`}>
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EyeIcon />
                                                </span>
                                            </Link>
                                        </Tooltip>
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
                                                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { openAlert(); setCurrentUser(id) }}>
                                                        <TrashIcon />
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip color="primary" content="Activar">
                                                    <span className="text-lg text-primary cursor-pointer active:opacity-50" onClick={() => { openAlert(); setCurrentUser(id) }}>
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
        </>
    )
}
