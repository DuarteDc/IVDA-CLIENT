import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Pagination } from "@nextui-org/react";
import { EditIcon, EyeIcon, TrashIcon } from "../icons";

export const UsersTable = ({ users = [], totalPages }) => {

    return (
        <>
            <Table aria-label="Example table with custom cells">
                <TableHeader>
                    <TableColumn> Nombre </TableColumn>
                    <TableColumn> Apellido </TableColumn>
                    <TableColumn> Correo </TableColumn>
                    <TableColumn> Estatus </TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody>
                    {
                        users?.map(({ id, name, last_name, email, status }) => (
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
                                    <Chip className="capitalize" color={`${status ? 'success' : 'warning'}`} size="sm" variant="flat">
                                        {
                                            status ? 'Activo' : 'Inactivo'
                                        }
                                    </Chip>

                                </TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip content="Detalles">
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EyeIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip content="Editar">
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EditIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Eliminar">
                                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <TrashIcon />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <div className="flex justify-end py-10 pr-10">
                <Pagination showControls total={totalPages} initialPage={1} />
            </div>
        </>
    )
}
