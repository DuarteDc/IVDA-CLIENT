import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, useDisclosure } from '@nextui-org/react';
import { FileIcon, HomeIcon, PlusIcon, UsersIcon } from '../../components/icons';
import { FilesInventoryTable, FormCreateFile } from '../../components/inventories';
import { AlertModal } from '../../components/ui/AlertModal';

export const Inventory = () => {

    const { id } = useParams();
    const { startGetInventory, inventory, files } = useContext(InventoryContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        startGetInventory(id);
    }, [])

    return (
        <section className="min-h-screen lg:px-10">
            <h1 className="text-center text-5xl font-bold uppercase pb-10">Inventario general de archivo</h1>
            <div className="px-5 flex flex-col flex-wrap gap-4 mb-5">
                <Breadcrumbs radius="lg" variant="solid" color="foreground">
                    <BreadcrumbItem>
                        <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
                            <HomeIcon width={20} height={20} />
                            Inicio
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/auth/inventories" className="flex items-center [&>:first-child]:mr-2">
                            <FileIcon width={20} height={20} />
                            Inventarios
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Inventario general de archivo</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <Card className="mt-20">
                <CardBody className="p-5 md:p-10 lg:p-20">
                    <span><b className="text-sm lg:text-xl mr-1">Dependencia:</b>Instituto de Información e Investigación Geográfica, Estadística y Catastral del Estado de México</span>
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col lg:text-lg [&>*]:my-2">
                            <span><b className="text-sm lg:text-xl mr-1">Codificación estructural:</b> {inventory?.dependency_id?.code}</span>
                            <span><b className="text-sm lg:text-xl mr-1">Dependencia:</b> {inventory?.dependency_id?.name}</span>
                        </div>
                        <div className="flex items-end flex-col justify-end lg:text-lg [&>*]:my-2">
                            <span><b className="text-sm lg:text-xl mr-1">Fecha de elaboración:</b> {new Date(inventory?.inventory_id?.start_date).toLocaleDateString()}</span>
                            {
                                !inventory?.inventory_id?.status && (
                                    <Button color="primary" onClick={onOpen}>
                                        <PlusIcon />
                                        Agregar Archivo
                                    </Button>
                                )
                            }
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-6 mt-5 [&>*]:px-4 mb-5 [&>span]:text-xs [&>span]:lg:text-base">
                        <span className="md:col-span-2 bg-blue-500/80 w-full text-white rounded-xl py-6">Fondo documental:</span>
                        <Card className="w-full md:col-span-4"><CardBody className="w-full py-6 text-xs lg:text-base">Instituto de Información e Investigación Geográfica, Estadística y Catastral del Estado de México</CardBody></Card>
                        {/* <span className="bg-blue-500/80 w-full text-white rounded-xl py-6">Subfondo:</span>
                        <Card className="w-full"><CardBody className="w-full py-6 text-xs lg:text-base">{inventory?.administrative_unit_id?.name}</CardBody></Card> */}
                    </div>

                    <FilesInventoryTable files={files} status={inventory?.inventory_id?.status} />
                </CardBody>
            </Card>

            {
                isOpen && (
                    <AlertModal
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onOpenChange={onOpenChange}
                        callback={() => console.log(xd)}
                        size="4xl"
                        showControls={false}
                    >
                        <FormCreateFile inventoryId={id} onOpen={onOpenChange} />
                    </AlertModal>
                )
            }
        </section>
    )
}
