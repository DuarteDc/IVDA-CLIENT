import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';

import { FormCreateUser } from '../../components/users/FormCreateUser';
import { useDependency } from '../../hooks/useDependency';
import { HomeIcon, UsersIcon } from '../../components/icons';

export const CreateUser = () => {
  const { startGetDependeciesWithoutUsers, dependencyUser: dependencies } = useDependency();

  useEffect(() => {
    startGetDependeciesWithoutUsers()
  }, []);

  return (
    <section className="min-h-screen lg:px-10">
      <h1 className="text-center text-5xl font-bold uppercase pb-10">Crear usuario</h1>
      <div className="px-5 flex flex-col flex-wrap gap-4 mb-5">
        <Breadcrumbs radius="lg" variant="solid" color="foreground">
          <BreadcrumbItem>
            <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
              <HomeIcon width={20} height={20} />
              Inicio
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/auth/users" className="flex items-center [&>:first-child]:mr-2">
              <UsersIcon width={20} height={20} />
              Usuarios
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Crear</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 w-full h-full mt-10 lg:mt-20 mb-20">
        <div className="mt-10 [&>div>div>form>*]:my-2 [&>div>div>form]:md:px-5 [&>div>div]:py-10 md:px-5 col-span-4">
          <FormCreateUser dependencies={dependencies} />
        </div>
        <div className="hidden lg:flex justify-center items-center w-full col-span-3">
          <img
            src="/assets/add-user.svg"
            width={700}
            height={600}
            alt="Build"
          />
        </div>
      </div>
    </section>
  )
}
