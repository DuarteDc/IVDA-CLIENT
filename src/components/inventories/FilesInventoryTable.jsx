import { useContext } from 'react';
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@nextui-org/react';
import { AlertCircleIcon, EditIcon, TrashIcon } from '../icons';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { AlertModal } from '../ui/AlertModal';
import { useInventory } from '../../hooks/useInventory';
import { UIContext } from '../../context/ui/UIContext';
import { AuthContext } from '../../context/auth/AuthContext';

export const FilesInventoryTable = ({ files, showControls = true, status, openEditModal }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { user } = useContext(AuthContext);
    const { getCurrentFile, file, inventory } = useContext(InventoryContext);
    const { loading } = useContext(UIContext);
    const { handleDeleteFile } = useInventory();

    return (
        <>
            <Table aria-label="Archivos" className="max-h-[900px] [&>div>table>thead>tr>th]:h-16" isHeaderSticky>
                <TableHeader>
                    <TableColumn> Número progresivo </TableColumn>
                    <TableColumn> Seccion </TableColumn>
                    <TableColumn> Serie y/o subserie documental </TableColumn>
                    <TableColumn> Número de expediente </TableColumn>
                    <TableColumn> Fórmula clasificadora del expediente </TableColumn>
                    <TableColumn> Nombre del expediente </TableColumn>
                    <TableColumn> Total de legajos</TableColumn>
                    <TableColumn> Total de documentos</TableColumn>
                    <TableColumn> Fecha de los documentos</TableColumn>
                    <TableColumn> Observaciones</TableColumn>
                    {
                        showControls && (
                            <TableColumn></TableColumn>
                        )
                    }
                </TableHeader>
                <TableBody
                    isLoading={loading}
                    loadingContent={<div className="overflow-hidden z-50 fixed w-full h-full top-0 bg-slate-200/60  dark:bg-black/80 flex items-center justify-center"><Spinner label="Espere..." /></div>}
                >
                    {
                        files?.map(({ no, section, serie, no_ex, formule, name, total_legajos, total_files, files_date, observations, id }) => (
                            <TableRow key={no}>
                                <TableCell>{no}</TableCell>
                                <TableCell>{section}</TableCell>
                                <TableCell>{serie}</TableCell>
                                <TableCell>{no_ex}</TableCell>
                                <TableCell>{formule}</TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell>{total_legajos}</TableCell>
                                <TableCell>{total_files}</TableCell>
                                <TableCell>{`${files_date[0]?.split("-")?.reverse()?.join("-") || 'NA'} - ${files_date[1]?.split("-")?.reverse()?.join("-") || 'NA'}`}</TableCell>
                                <TableCell>{observations}</TableCell>
                                {showControls && (
                                    <TableCell>
                                        <span className="flex">
                                            {
                                                user?.id === inventory?.inventory_id?.user_id &&(
                                                    <Tooltip content="Editar">
                                                        <span className="text-lg cursor-pointer active:opacity-50" onClick={() => { getCurrentFile(id); openEditModal(); }}>
                                                            <EditIcon />
                                                        </span>
                                                    </Tooltip>
                                                )
                                            }
                                            {
                                                !inventory?.inventory_id?.status && (
                                                    < Tooltip color="danger" content="Eliminar">
                                                        <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { getCurrentFile(id); onOpen(); }}>
                                                            <TrashIcon />
                                                        </span>
                                                    </Tooltip>
                                                )
                                            }
                                        </span>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table >
            {
                isOpen && (
                    <AlertModal
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onOpenChange={onOpenChange}
                        callback={handleDeleteFile}
                    >
                        <div className="flex flex-col items-center font-bold text-center">
                            <span className="text-red-600">
                                <AlertCircleIcon width={50} height={50} />
                            </span>
                            <p>Antest de continuar.</p>
                            <p>¿Esta seguro que sea eliminar el archivo <b>No.{`${file.no} - ${file.name}`}</b>?</p>
                        </div>
                    </AlertModal>
                )
            }
        </>
    )
}
