import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, useDisclosure } from '@nextui-org/react';
import { FileIcon, HomeIcon, PlusIcon, UsersIcon } from '../../components/icons';
import { FilesInventoryTable, FormCreateFile } from '../../components/inventories';
import { AlertModal } from '../../components/ui/AlertModal';
import { LoadingScreen } from '../../components/ui/LoadingScreen';
import { AuthContext } from '../../context/auth/AuthContext';

export const Inventory = () => {

    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { startGetInventory, inventory, files, loading, file } = useContext(InventoryContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        startGetInventory(id);
    }, [])

    return (
        <section className="min-h-screen lg:px-10">
            <h1 className="text-center text-5xl font-bold uppercase pb-10">Inventario general de archivo</h1>
            {
                loading && <LoadingScreen />
            }
            <div className="lg:px-5 flex flex-col flex-wrap gap-4 lg:mb-5">
                <Breadcrumbs radius="lg" variant="solid" color="foreground">
                    <BreadcrumbItem>
                        <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
                            <HomeIcon width={20} height={20} />
                            Inicio
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={`${user?.role === "0" ? '/auth/inventories' : '/auth/user/inventories'}`} className="flex items-center [&>:first-child]:mr-2">
                            <FileIcon width={20} height={20} />
                            Inventarios
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Inventario general de archivo</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <Card className="mt-10 lg:mt-20">
                <CardBody className="p-5 md:p-10 lg:p-20">
                    <span><b className="text-sm lg:text-xl mr-1">Dependencia:</b>Instituto de Información e Investigación Geográfica, Estadística y Catastral del Estado de México</span>
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col lg:text-lg [&>*]:my-2">
                            <span><b className="text-sm lg:text-xl mr-1">Codificación estructural:</b> {inventory?.dependency_id?.code}</span>
                            <span><b className="text-sm lg:text-xl mr-1">Uniad Administrativa:</b> {inventory?.dependency_id?.name}</span>
                            <span><b className="text-sm lg:text-xl mr-1">Tipo de archivo:</b> {inventory?.type_file_id?.name}</span>
                            <span><b className="text-sm lg:text-xl mr-1">Ubicación física:</b> {inventory?.location_id?.name}</span>
                        </div>
                        <div className="flex items-end flex-col justify-end lg:text-lg [&>*]:my-2">
                            <span><b className="text-sm lg:text-xl mr-1">Fecha de elaboración:</b> {inventory?.inventory_id?.start_date.split("-").reverse().join("-")}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-6 mt-5 [&>*]:lg:px-4 mb-5 [&>span]:text-xs [&>span]:lg:text-base">
                        <span className="flex items-center md:col-span-2 bg-blue-500/80 w-full px-2 rounded-xl py-6">Fondo documental:</span>
                        <Card className="w-full md:col-span-4"><CardBody className="w-full py-6 text-xs lg:text-base">Instituto de Información e Investigación Geográfica, Estadística y Catastral del Estado de México</CardBody></Card>
                        {/* <span className="bg-blue-500/80 w-full text-white rounded-xl py-6">Subfondo:</span>
                        <Card className="w-full"><CardBody className="w-full py-6 text-xs lg:text-base">{inventory?.administrative_unit_id?.name}</CardBody></Card> */}
                    </div>

                    <FilesInventoryTable files={files} status={inventory?.inventory_id?.status} openEditModal={onOpen} />
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
                        <FormCreateFile inventoryId={id} onOpen={onOpenChange} currentFile={file} />
                    </AlertModal>
                )
            }
        </section>
    )
}
