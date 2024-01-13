import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';

import { HomeCog, HomeIcon } from '../../components/icons';
import { FormEditAdministrativeUnit } from '../../components/administrative-units/FormEditAdministrativeUnit';

import { useSubsecretaries } from '../../hooks/useSubsecretaries';
import { DependencyContext } from '../../context/dependency';
import { useAdministrativeUnits } from '../../hooks/useDependency';

export const EditDependency = () => {

    const { id } = useParams();
    const { startGetAdministrativeUnit } = useAdministrativeUnits();
    const { currentAdministrativeUnit } = useContext(DependencyContext);

    const { getAllActiveSubsecretaries } = useSubsecretaries();

    const [subsecretaries, setSubsecretaries] = useState([])

    useEffect(() => {
        startGetAdministrativeUnit(id);
        getAllActiveSubsecretaries().then(setSubsecretaries);
    }, []);

    return (
        <section className="min-h-screen overflow-hidden">
            <h1 className="text-center text-4xl  md:text-5xl font-bold uppercase pb-5 md:pb-10">Editar Unidad Administrativa</h1>
            <div className="px-5 flex flex-col flex-wrap gap-4 my-2 md:my-20">
                <Breadcrumbs radius="lg" variant="solid" color="foreground">
                    <BreadcrumbItem>
                        <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
                            <HomeIcon width={20} height={20} />
                            Inicio
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/auth/administrative-units" className="flex items-center [&>:first-child]:mr-2">
                            <HomeCog width={20} height={20} />
                            Unidades Administrativas
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Editar</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full mt-10 lg:mt-40">
                <div className="mt-10 [&>div>div>form>*]:my-5 [&>div>div>form]:md:px-5 [&>div>div]:py-10 md:px-5">
                    {
                        (Object.keys(currentAdministrativeUnit).length > 0 && currentAdministrativeUnit?.id === id) && (
                            <FormEditAdministrativeUnit subsecretaries={subsecretaries} administrativeUnit={currentAdministrativeUnit} />
                        )
                    }

                </div>
                <div className="hidden lg:flex justify-center items-center w-full">
                    <img
                        src="/assets/administrative-unit.svg"
                        width={700}
                        height={600}
                        alt="Build"
                    />
                </div>
            </div>
        </section>
    )
}
