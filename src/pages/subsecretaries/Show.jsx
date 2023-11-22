import { useContext, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs, Card, CardBody, Tab, Tabs, User, useDisclosure } from '@nextui-org/react';

import { BuildingComunity, FileIcon, HomeIcon, UsersIcon } from '../../components/icons';
import { SubsecretaryContext } from '../../context/subsecretary/SubsecretaryContext';
import { UsersContext } from '../../context/users/UsersContext';
import { TabsOptions } from '../../components/subsecretaries/TabsOptions';

export const Subsecretary = () => {

  const { id } = useParams();

  const { users } = useContext(UsersContext);
  const { startGetSubsecretary, subsecretary, enable_administrative_units, disable_administrative_units } = useContext(SubsecretaryContext);

  useEffect(() => {
    startGetSubsecretary(id)
  }, []);

  return (
    <section>
      <h1 className="text-center text-5xl font-bold uppercase pb-10">{subsecretary?.name}</h1>
      <div className="flex flex-col flex-wrap gap-4 mb-5">
        <Breadcrumbs radius="lg" variant="solid" color="foreground">
          <BreadcrumbItem>
            <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
              <HomeIcon width={20} height={20} />
              Inicio
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/auth/subsecretaries" className="flex items-center [&>:first-child]:mr-2">
              <BuildingComunity />
              Subsecretarias
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{subsecretary?.name}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-20">
        <Card shadow="sm" isPressable onPress={() => console.log("item pressed")} className="bg-blue-500/50">
          <CardBody className="overflow-visible p-5 lg:p-10 flex flex-row items-center justify-start lg:justify-between font-bold">
            <span className="text-4xl lg:text-5xl">
              <h3 className="text-xs font-semibold">Unidades Administrativas</h3>
              {enable_administrative_units.length}
            </span>
            <span className="p-5 bg-blue-500 rounded-lg hidden lg:block">
              <BuildingComunity width={60} height={60} />
            </span>
          </CardBody>
        </Card>

        <Card shadow="sm" isPressable onPress={() => console.log("item pressed")} className="bg-blue-500/50">
          <CardBody className="overflow-visible p-5 lg:p-10 flex flex-row items-center justify-start lg:justify-between font-bold">
            <span className="text-4xl lg:text-5xl">
              <h3 className="text-xs font-semibold">Inventarios</h3>
              {disable_administrative_units.length}
            </span>
            <span className="p-5 bg-blue-500 rounded-lg hidden lg:block">
              <FileIcon width={60} height={60} />
            </span>
          </CardBody>
        </Card>

        <Card shadow="sm" isPressable onPress={() => console.log("item pressed")} className="bg-blue-500/50">
          <CardBody className="overflow-visible p-5 lg:p-10 flex flex-row items-center justify-start lg:justify-between font-bold">
            <span className="text-4xl lg:text-5xl">
              <h3 className="text-xs font-semibold">Usuarios Totales</h3>
              {users.length}
            </span>
            <span className="p-5 bg-blue-500 rounded-lg hidden lg:block">
              <UsersIcon width={60} height={60} />
            </span>
          </CardBody>
        </Card>
      </div>

      <TabsOptions users={users} administrativeUnits={enable_administrative_units}/>

    </section>
  )
}
