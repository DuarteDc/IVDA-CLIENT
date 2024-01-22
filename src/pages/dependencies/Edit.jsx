import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';

import { HomeCog, HomeIcon } from '../../components/icons';
import { FormEditAdministrativeUnit } from '../../components/administrative-units/FormEditAdministrativeUnit';

import { DependencyContext } from '../../context/dependency';
import { useDependency } from '../../hooks/useDependency';

export const EditDependency = () => {

    const { id } = useParams();
    const { startGetDependency, cleanDependencyCache } = useDependency();
    const { dependency } = useContext(DependencyContext);

    useEffect(() => {
        startGetDependency(id);
        return () => {
            cleanDependencyCache();
        }
    }, []);

    return (
        <section className="min-h-screen overflow-hidden">
            <h1 className="text-center text-4xl  md:text-5xl font-bold uppercase pb-5 md:pb-10">Editar unidad administrativa</h1>
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
                            Unidades administrativas
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Editar</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full mt-10 lg:mt-40">
                <div className="mt-10 [&>div>div>form>*]:my-5 [&>div>div>form]:md:px-5 [&>div>div]:py-10 md:px-5">
                    {
                        Object.keys(dependency).length && (
                            <FormEditAdministrativeUnit dependency={dependency} />
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
