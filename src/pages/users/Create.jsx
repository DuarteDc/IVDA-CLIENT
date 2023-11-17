import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs, Card, CardBody } from '@nextui-org/react';

import { FormCreateUser } from '../../components/users/FormCreateUser';
import { useSubsecretaries } from '../../hooks/useSubsecretaries';

export const CreateUser = () => {
  const { getAllActiveSubsecretaries } = useSubsecretaries();
  const [subsecretaries, setSubsecretaries] = useState([]);

  useEffect(() => {
    getAllActiveSubsecretaries().then(setSubsecretaries);
  }, []);


  return (
    <section className="min-h-screen lg:px-10">
      <h1 className="text-center text-5xl font-bold uppercase pb-10">Crear usuario</h1>
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
        <div className="w-11/12 lg:w-8/12 xl:w-6/12 [&>div>div>form>*]:mb-5">
          <Card>
            <CardBody>
              <FormCreateUser subsecretaries={subsecretaries} />
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}
