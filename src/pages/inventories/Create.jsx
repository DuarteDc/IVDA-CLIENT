import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs, Card, CardBody } from '@nextui-org/react';

import { HomeIcon, UsersIcon } from '../../components/icons';
import { FormCreateInventory } from '../../components/inventories/FormCreateInventory';
import { useDependency } from '../../hooks/useDependency';

export const CreateInventory = () => {
  const { dependencyUser, getDependencyByUser } = useDependency();

  useEffect(() => {
    getDependencyByUser();
  }, []);

  return (
    <section className="min-h-screen lg:px-10">
      <h1 className="text-center text-5xl font-bold uppercase pb-10">Crear Inventario</h1>
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
              <UsersIcon width={20} height={20} />
              Inventarios
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Crear</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full h-full mt-10 lg:mt-40">
        <div className="col-span-2 mt-10 [&>div>div>form>*]:my-2 [&>div>div>form]:md:px-5 [&>div>div]:py-10 md:px-5">
          <FormCreateInventory dependency={dependencyUser} />
        </div>
        <div className="hidden lg:flex justify-center items-center w-full">
          <img
            src="/assets/inventories.svg"
            width={700}
            height={600}
            alt="Build"
          />
        </div>
      </div>

    </section>
  )
}
