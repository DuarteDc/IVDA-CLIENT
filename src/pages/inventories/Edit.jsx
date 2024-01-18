import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, Spinner, useDisclosure } from '@nextui-org/react';

import { FileIcon, HomeIcon, PlusIcon } from '../../components/icons';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { FilesInventoryTable, FormCreateFile } from '../../components/inventories';
import { FormEditInventory } from '../../components/inventories/FormEditInventory';
import { AlertModal } from '../../components/ui/AlertModal';
import { useDependency } from '../../hooks/useDependency';
import { LoadingScreen } from '../../components/ui/LoadingScreen';


export const EditInventory = () => {

    const { id } = useParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { startGetInventory, inventory, files, loading, clearInventoryCache } = useContext(InventoryContext);
    const { startGetLocations, startGetTypeFiles, locations, typeFiles } = useDependency();

    useEffect(() => {
        Promise.all([startGetInventory(id), startGetLocations(), startGetTypeFiles(),]);
        return () => {
            clearInventoryCache()
        }
    }, []);

    return (
        <section className="min-h-screen overflow-hidden">
            <h1 className="text-center text-4xl  md:text-5xl font-bold uppercase pb-5 md:pb-10">Editar Inventario</h1>
            <div className="flex flex-col flex-wrap gap-4 my-2 md:my-20">
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
            <Card className="mt-20 overflow-visible">
                {
                    !Object.keys(inventory).length && inventory?.inventory_id?.id !== id ?
                        <LoadingScreen /> :
                        <FormEditInventory inventory={inventory} locations={locations} typeFiles={typeFiles} />
                }
                <CardBody>
                    <Button color="primary" onClick={onOpen} className="py-4 my-5">
                        <PlusIcon />
                        Agregar Archivo
                    </Button>
                    <FilesInventoryTable files={files} showControls />
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
