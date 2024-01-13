import { useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs, Button } from '@nextui-org/react';

import { HomeIcon, PlusIcon } from '../../components/icons';
import { DependencyContext } from '../../context/dependency';
import AdministrativeUnitsTable from '../../components/administrative-units/AdministrativeUnitsTable';

export const Dependencies = () => {

    const [searchParams, setSearchParams] = useSearchParams(1);
    const { dependencies, totalPages, startGetDependencies } = useContext(DependencyContext);

    useEffect(() => {
        startGetAdministrativeUnits(searchParams);
    }, [searchParams])


    return (
        <section className="min-h-screen pt-20 overflow-hidden">
            <h1 className="text-center text-5xl font-bold pb-10 uppercase">Dependencias</h1>
            <div className="flex justify-end py-10">
                <Button color="primary" startContent={<PlusIcon />}>
                    <Link to="/auth/administrative-units/create">
                        Crear unidad Administrativa
                    </Link>
                </Button>
            </div>
            <div className="flex flex-col flex-wrap gap-4 mb-5">
                <Breadcrumbs radius="lg" variant="solid" color="foreground">
                    <HomeIcon />
                    <BreadcrumbItem>
                        <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
                            <HomeIcon width={20} height={20} />
                            Inicio
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Unidades Administrativas</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <AdministrativeUnitsTable
                dependencies={dependencies}
                totalPages={totalPages}
                setSearchParams={setSearchParams}
                currentPage={searchParams.get('page') || 1}
            />
        </section>
    )
}
