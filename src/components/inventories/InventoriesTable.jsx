import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@nextui-org/react';
import { useContext } from 'react';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { Link } from 'react-router-dom';
import { DoneIcon, EditIcon, EyeIcon, PDFIcon } from '../icons';


export const InventoriesTable = ({ inventories }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { setCurrentUser, currentUser } = useContext(InventoryContext);

    return (
        <Table aria-label="Inventarios">
            <TableHeader>
                <TableColumn> # </TableColumn>
                <TableColumn> Nombre </TableColumn>
                <TableColumn> Código </TableColumn>
                <TableColumn> Estatus </TableColumn>
                <TableColumn></TableColumn>
            </TableHeader>
            <TableBody>
                {
                    inventories?.map(({ id, name, code, status }) => (
                        <TableRow key={id}>
                            <TableCell>
                                {id}
                            </TableCell>
                            <TableCell>
                                {name}
                            </TableCell>
                            <TableCell>
                                {code}
                            </TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={`${status ? 'success' : 'warning'}`} size="sm" variant="flat">
                                    {
                                        status ? 'Terminado' : 'En proceso'
                                    }
                                </Chip>

                            </TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Detalles">
                                        <Link to={`/auth/inventories/${id}`}>
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EyeIcon />
                                            </span>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip content="Editar">
                                        <Link to={`/auth/inventories/edit/${id}`}>
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EditIcon />
                                            </span>
                                        </Link>
                                    </Tooltip>
                                    {
                                        status ? (
                                            <Tooltip color="danger" content="Generar reporte">
                                                <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { onOpen(); setCurrentUser(id); }}>
                                                    <PDFIcon />
                                                </span>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip color="primary" content="Finalizar">
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
    )
}
