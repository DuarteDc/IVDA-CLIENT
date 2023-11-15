import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';

import { FormCreateUser } from '../../components/users/FormCreateUser';
import { useSubsecretaries } from '../../hooks/useSubsecretaries';
import { UIContext } from '../../context/ui';

export const CreateUser = () => {
  const { getAllActiveSubsecretaries } = useSubsecretaries();
  const [subsecretaries, setSubsecretaries] = useState([]);

  useEffect(() => {
    getAllActiveSubsecretaries().then(setSubsecretaries);
  }, []);


  return (
    <section className="min-h-screen mt-20 lg:px-10">
      <h1 className="text-center text-5xl font-bold mb-10">Crear usuario</h1>
      <div className="flex justify-end px-5 lg:px-20 my-10">
      </div>
      <div className="px-5 flex flex-col flex-wrap gap-4 mb-5">
        <Breadcrumbs radius="lg" variant="bordered" color="primary">
          <BreadcrumbItem>
            <Link to="/">
              Inicio
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/auth/users">
              Usuarios
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Crear</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-11/12 lg:w-6/12 [&>form>*]:mb-5">
          <FormCreateUser subsecretaries={subsecretaries} />
        </div>
      </div>
    </section>
  )
}
