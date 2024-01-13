import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { Card, CardBody } from '@nextui-org/react';
import { BuildingComunity, FileIcon, HomeCog, UsersIcon } from '../../components/icons';
import { InventoriesTable } from '../../components/inventories/InventoriesTable';
import { useDashboard } from '../../hooks/useDashboard';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {

    const { user } = useContext(AuthContext);
    const { dataCount, inventories } = useDashboard();

    const navigate = useNavigate();

    return (
        <section className="min-h-screen">
            <div className="w-full rounded-md bg-blue-600/60 p-10 md:p-10 lg:p-20 grid grid-cols-1 md:grid-cols-2 shadow-2xl">
                <div>
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
            <Card className="my-20 md:my-40">
                <CardBody>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        <Card shadow="sm" isPressable onPress={() => navigate('/auth/inventories')} className="bg-purple-500/50">
                            <CardBody className="overflow-visible p-5 lg:p-10 flex flex-row items-center justify-start lg:justify-between font-bold">
                                <span className="text-4xl lg:text-5xl">
                                    <h3 className="text-xs font-semibold">Inventarios</h3>
                                    {dataCount?.inventories}
                                </span>
                                <span className="p-5 bg-purple-500 rounded-lg hidden lg:block">
                                    <FileIcon width={60} height={60} />
                                </span>
                            </CardBody>
                        </Card>
                        <Card shadow="sm" isPressable onPress={() => navigate('/auth/users')} className="bg-emerald-500/50">
                            <CardBody className="overflow-visible p-5 lg:p-10 flex flex-row items-center justify-start lg:justify-between font-bold">
                                <span className="text-4xl lg:text-5xl">
                                    <h3 className="text-xs font-semibold">Usuarios</h3>
                                    {dataCount?.users}
                                </span>
                                <span className="p-5 bg-emerald-500 rounded-lg hidden lg:block">
                                    <UsersIcon width={60} height={60} />
                                </span>
                            </CardBody>
                        </Card>
                        <Card shadow="sm" isPressable onPress={() => navigate('/auth/subsecretaries')} className="bg-rose-500/50">
                            <CardBody className="overflow-visible p-5 lg:p-10 flex flex-row items-center justify-start lg:justify-between font-bold">
                                <span className="text-4xl lg:text-5xl">
                                    <h3 className="text-xs font-semibold">Subsecretarias</h3>
                                    {dataCount?.subsecretaries}
                                </span>
                                <span className="p-5 bg-rose-500 rounded-lg hidden lg:block">
                                    <BuildingComunity width={60} height={60} />
                                </span>
                            </CardBody>
                        </Card>
                        <Card shadow="sm" isPressable onPress={() => navigate('/auth/administrative-units')} className="bg-amber-500/50">
                            <CardBody className="overflow-visible p-5 lg:p-10 flex flex-row items-center justify-start lg:justify-between font-bold">
                                <span className="text-4xl lg:text-5xl">
                                    <h3 className="text-xs font-semibold">Unidades Administrativas</h3>
                                    {dataCount?.administartiveUnits}
                                </span>
                                <span className="p-5 bg-amber-500 rounded-lg hidden lg:block">
                                    <HomeCog width={60} height={60} />
                                </span>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="my-10">
                        <h3 className="text-4xl font-bold text-center my-10">Inventarios</h3>
                        <InventoriesTable inventories={inventories} />
                    </div>
                </CardBody>
            </Card>
        </section>
    )
}
