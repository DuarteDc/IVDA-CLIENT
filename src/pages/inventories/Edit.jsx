import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, Divider, useDisclosure } from '@nextui-org/react';

import { FileIcon, HomeIcon, PlusIcon } from '../../components/icons';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { FilesInventoryTable, FormCreateFile } from '../../components/inventories';
import { FormEditInventory } from '../../components/inventories/FormEditInventory';
import { AlertModal } from '../../components/ui/AlertModal';
import { useDependency } from '../../hooks/useDependency';
import { LoadingScreen } from '../../components/ui/LoadingScreen';
import { NotFound } from '../404/Index';
import { useInventory } from '../../hooks/useInventory';


export const EditInventory = () => {

    const { id } = useParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { startGetInventory, inventory, files, clearInventoryCache, file, loading } = useContext(InventoryContext);
    const { startGetLocations, startGetTypeFiles, locations, typeFiles } = useDependency();
    const { clearCurrentFileCache } = useInventory();

    useEffect(() => {
        Promise.all([startGetInventory(id), startGetLocations(), startGetTypeFiles(),]);
        return () => {
            clearInventoryCache()
        }
    }, []);

    return (
        <section className="min-h-screen overflow-hidden">
            <h1 className="text-center text-4xl  md:text-5xl font-bold uppercase pb-5 md:pb-10">Actualizar Información de archivo</h1>
            <div className="flex flex-col flex-wrap gap-4 my-2 md:my-20">
                <Breadcrumbs radius="lg" variant="solid" color="foreground">
                    <BreadcrumbItem>
                        <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
                            <HomeIcon width={20} height={20} />
                            Inicio
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/auth/user/inventories" className="flex items-center [&>:first-child]:mr-2">
                            <FileIcon width={20} height={20} />
                            Inventarios
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Inventario general de archivo</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <Card className="mt-20 overflow-visible">
                {
                    !loading ?
                        <FormEditInventory inventory={inventory} locations={locations} typeFiles={typeFiles} /> :
                        <LoadingScreen />
                }
                <CardBody className="mt-5 w-full">
                    <Divider className="my-4" />
                    <div>
                        <Button color="secondary" onClick={() => { clearCurrentFileCache(); onOpen(); }} className="py-6 my-5 w-7/12 md:5/12 lg:w-3/12 xl:w-2/12 float-right">
                            <PlusIcon />
                            Generar nuevo archivo
                        </Button>
                    </div>
                    <FilesInventoryTable files={files} showControls openEditModal={onOpen} />
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
