import { Chip, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@nextui-org/react';
import { useContext } from 'react';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { Link } from 'react-router-dom';
import { AlertCircleIcon, DoneIcon, EditIcon, EyeIcon, PDFIcon } from '../icons';
import { AlertModal } from '../ui/AlertModal';
import { useInventory } from '../../hooks/useInventory';
import { UIContext } from '../../context/ui/UIContext';


export const InventoriesTable = ({ inventories, totalPages, setSearchParams }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { getCurrentInventory } = useContext(InventoryContext);
    const { handleFinalizeInventory } = useInventory();
    const { loading } = useContext(UIContext)

    return (
        <>
            <Table aria-label="Inventarios">
                <TableHeader>
                    <TableColumn> # </TableColumn>
                    <TableColumn> Nombre </TableColumn>
                    <TableColumn> Código </TableColumn>
                    <TableColumn> Estatus </TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody
                    isLoading={loading}
                    loadingContent={<div className="w-full h-full z-50 bg-slate-200/60  dark:bg-black/80 flex items-center justify-center"><Spinner label="Espere..." /></div>}
                >
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
                                        {
                                            !status && (
                                                <Tooltip content="Editar">
                                                    <Link to={`/auth/inventories/edit/${id}`}>
                                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                            <EditIcon />
                                                        </span>
                                                    </Link>
                                                </Tooltip>
                                            )
                                        }
                                        {
                                            status ? (
                                                <Tooltip color="danger" content="Generar reporte">
                                                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { getCurrentInventory(id); }}>
                                                        <PDFIcon />
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip color="primary" content="Finalizar">
                                                    <span className="text-lg text-primary cursor-pointer active:opacity-50" onClick={() => { onOpen(); getCurrentInventory(id); }}>
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
                        callback={handleFinalizeInventory}
                    >
                        <div className="flex flex-col items-center font-bold text-center">
                            <span className="text-red-600">
                                <AlertCircleIcon width={50} height={50} />
                            </span>
                            <p className="my-5">Antest de continuar.</p>
                            <p>¿Esta seguro que desea finalizar el inventario?, Al finalizar el inventario no sera posible modificarlo</p>
                        </div>
                    </AlertModal>
                )
            }
        </>
    )
}
