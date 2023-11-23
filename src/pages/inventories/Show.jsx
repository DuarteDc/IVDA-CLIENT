import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { BreadcrumbItem, Breadcrumbs, Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { HomeIcon, UsersIcon } from '../../components/icons';

export const Inventory = () => {

    const { id } = useParams();
    const { startGetInventory, inventory } = useContext(InventoryContext);

    useEffect(() => {
        startGetInventory(id);
    }, [])

    return (
        <section className="min-h-screen lg:px-10">
            <h1 className="text-center text-5xl font-bold uppercase pb-10">{inventory?.inventory_id?.name}</h1>
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
                            Inventarios
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>{inventory?.inventory_id?.name}</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <Card className="mt-20">
                <CardBody className="p-5 md:p-10 lg:p-20">
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col lg:text-lg [&>*]:my-2">
                            <span><b className="text-sm lg:text-xl mr-1">Dependencia:</b> {inventory?.subsecretary_id?.name}</span>
                            <span><b className="text-sm lg:text-xl mr-1">Codificación estructural:</b> {inventory?.inventory_id?.code}</span>
                            <span><b className="text-sm lg:text-xl mr-1">Unidad administrativa:</b> {inventory?.administrative_unit_id?.name}</span>
                        </div>
                        <div className="flex justify-end lg:text-lg [&>*]:my-2">
                            <span><b className="text-sm lg:text-xl mr-1">Fecha de elaboración:</b> {inventory?.created_at}</span>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row w-full justify-between mt-5 [&>*]:px-4 items-center mb-5 [&>span]:text-xs [&>span]:lg:text-base">
                        <span className="bg-teal-500/80 w-full text-white rounded-xl py-5">Fondo documental:</span>
                        <Card className="w-full"><CardBody className="w-full py-6 text-xs lg:text-base">{inventory?.subsecretary_id?.name}</CardBody></Card>
                        <span className="bg-teal-500/80 w-full text-white rounded-xl py-5">Subfondo:</span>
                        <Card className="w-full"><CardBody className="w-full py-6 text-xs lg:text-base">{inventory?.administrative_unit_id?.name}</CardBody></Card>
                    </div>

                    <Table aria-label="Ususarios">
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
                            <TableColumn></TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                inventory?.body?.map(({ no, secction, serie, no_ex, formule, name, total_legajos, total_files, files_date, observations }) => (
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
                                        <TableCell>op</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </section>
    )
}
