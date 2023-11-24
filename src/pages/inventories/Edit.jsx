import { Suspense, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, Spinner, useDisclosure } from '@nextui-org/react';

import { BuildingComunity, HomeIcon, PlusIcon } from '../../components/icons';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { FilesInventoryTable, FormCreateFile } from '../../components/inventories';
import { FormEditInventory } from '../../components/inventories/FormEditInventory';
import { useSubsecretaries } from '../../hooks/useSubsecretaries';
import { AlertModal } from '../../components/ui/AlertModal';


export const EditInventory = () => {

    const navigate = useNavigate();
    const [subsecretaries, setSubsecretaries] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { id } = useParams();
    const { startGetInventory, inventory, files } = useContext(InventoryContext);
    const { getAllActiveSubsecretaries } = useSubsecretaries();

    useEffect(() => {
        startGetInventory(id);
        getAllActiveSubsecretaries().then(setSubsecretaries);
    }, []);

    useEffect(() => {
        if (inventory?.inventory_id?.status) navigate('/auth/inventories');
    }, [inventory])

    return (
        <section className="min-h-screen overflow-hidden">

            {
                !inventory?.inventory_id ? (
                    <div className="min-h-screen flex items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <h1 className="text-center text-4xl  md:text-5xl font-bold uppercase pb-5 md:pb-10">Editar Inventario</h1>
                        <div className="px-5 flex flex-col flex-wrap gap-4 my-2 md:my-20">
                            <Breadcrumbs radius="lg" variant="solid" color="foreground">
                                <BreadcrumbItem>
                                    <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
                                        <HomeIcon width={20} height={20} />
                                        Inicio
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <Link to="/auth/subsecretaries" className="flex items-center [&>:first-child]:mr-2">
                                        <BuildingComunity width={20} height={20} />
                                        Inventarios
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>{inventory?.inventory_id?.name}</BreadcrumbItem>
                            </Breadcrumbs>
                        </div>
                        <Card className="mt-20">
                            {
                                subsecretaries.length > 0 && (
                                    <FormEditInventory inventory={inventory} subsecretaries={subsecretaries} />
                                )
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
                    </>
                )
            }
        </section>
    )
}
