import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { Button, Card, CardBody } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { BuildingComunity, LinkIcon, PlusIcon } from '../../components/icons';
import { InventoriesTable } from '../../components/inventories/InventoriesTable';

export const User = () => {

    const { user } = useContext(AuthContext);
    const { startGetInventoryByUser, inventories } = useContext(InventoryContext);

    useEffect(() => {
        startGetInventoryByUser();
    }, []);

    return (
        <section className="min-h-screen">
            <div className="w-full rounded-md bg-blue-600/60 p-10 md:p-10 lg:p-20 grid grid-cols-1 md:grid-cols-2 shadow-2xl">
                <div className="text-left">
                    <h1 className="text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl mb-5 font-bold dark:text-blue-400 text-blue-600">Bienvenido</h1>
                    <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold">{user?.name} {user?.last_name}</h2>
                </div>
                <div className="hidden relative w-full md:block">
                    <img
                        src="/assets/home.svg"
                        width={500}
                        height={400}
                        alt="Build"
                        className="absolute right-0 lg:-top-44 drop-shadow-2xl lg:w-[20rem] lg:h-[30rem] md:-top-12 w-[15rem] h-[12rem] xl:w-[30rem] xl:h-[30rem] xl:-top-36"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 mt-20 gap-20">
                <Card shadow="sm" className="bg-purple-500/50">
                    <CardBody className="overflow-visible p-5 lg:p-10 flex flex-row items-center font-bold">
                        <span className="p-1 lg:p-5 bg-purple-500 rounded-lg">
                            <BuildingComunity width={60} height={60} />
                        </span>
                        <p className="text-xl ml-5">{user?.dependency_id?.name}</p>
                    </CardBody>
                </Card>
                <div>
                    <h3 className="font-bold text-5xl">¿Qué haremos hoy?</h3>
                    <div className="flex flex-wrap items-center mt-8 gap-5">
                    <Button color="primary" as={Link} to="inventories/create" startContent={<PlusIcon />} size="lg">
                        Crear nuevo inventario
                    </Button>
                    <Button color="secondary" as={Link} to="inventories" startContent={<LinkIcon />} size="lg">
                        Ver todos mis inventarios
                    </Button>
                    </div>
                </div>
            </div>

            <Card className="my-20 md:my-40">
                <CardBody>
                    <div className="my-2">
                        <h3 className="text-4xl font-bold text-center my-10">Inventarios</h3>
                        <InventoriesTable inventories={inventories} />
                    </div>
                </CardBody>
            </Card>
        </section>
    )
}
