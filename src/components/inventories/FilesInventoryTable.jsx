import { useContext } from 'react';
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@nextui-org/react';
import { AlertCircleIcon, EditIcon, TrashIcon } from '../icons';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { AlertModal } from '../ui/AlertModal';
import { useInventory } from '../../hooks/useInventory';
import { UIContext } from '../../context/ui/UIContext';

export const FilesInventoryTable = ({ files, showControls = true }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { getCurrentFile, file } = useContext(InventoryContext);
    const { loading } = useContext(UIContext);
    const { handleDeleteFile } = useInventory();

    return (
        <>
            <Table aria-label="Archivos">
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
                    loadingContent={<div className="w-full h-full z-50 bg-slate-200/60  dark:bg-black/80 flex items-center justify-center"><Spinner label="Espere..." /></div>}
                >
                    {
                        files?.map(({ no, secction, serie, no_ex, formule, name, total_legajos, total_files, files_date, observations }) => (
                            <TableRow key={no}>
                                <TableCell>{no}</TableCell>
                                <TableCell>{secction}</TableCell>
                                <TableCell>{serie}</TableCell>
                                <TableCell>{no_ex}</TableCell>
                                <TableCell>{formule}</TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell>{total_legajos}</TableCell>
                                <TableCell>{total_files}</TableCell>
                                <TableCell>{files_date[0]}</TableCell>
                                <TableCell>{observations}</TableCell>
                                {showControls && (
                                    <TableCell>
                                        <span className="flex">
                                            {/* <Tooltip content="Editar">
                                                <span className="text-lg cursor-pointer active:opacity-50" onClick={() => getCurrentFile(no)}>
                                                    <EditIcon />
                                                </span>
                                            </Tooltip> */}
                                            <Tooltip color="danger" content="Eliminar">
                                                <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { getCurrentFile(no); onOpen(); }}>
                                                    <TrashIcon />
                                                </span>
                                            </Tooltip>
                                        </span>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
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
