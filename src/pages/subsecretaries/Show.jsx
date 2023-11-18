import { useContext, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs, Card, CardBody, Tab, Tabs, useDisclosure } from '@nextui-org/react';

import { BuildingComunity, HomeIcon, UsersIcon } from '../../components/icons';
import { SubsecretaryContext } from '../../context/subsecretary/SubsecretaryContext';
import { UsersList } from '../../components/subsecretaries/UsersList';
import { UsersTable } from '../../components/users/UsersTable';
import { UsersContext } from '../../context/users/UsersContext';

export const Subsecretary = () => {

  const { id } = useParams();

  const { startGetSubsecretary, subsecretary, enable_administrative_units, disable_administrative_units, users } = useContext(SubsecretaryContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchParams, setSearchParams] = useSearchParams(1);

  const { setCurrentUser } = useContext(UsersContext);

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
            <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
              <BuildingComunity />
              Subsecretarias
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>informatica</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="grid grid-cols-3 gap-20 mt-20">
        <Card shadow="sm" isPressable onPress={() => console.log("item pressed")} className="bg-blue-500/50">
          <CardBody className="overflow-visible p-10 flex flex-row items-center justify-between font-bold">
            <span className="text-5xl">
              <h3 className="text-xs font-semibold">Unidades Administrativas</h3>
              {enable_administrative_units.length}
            </span>
            <span className="p-5 bg-blue-500 rounded-lg">
              <BuildingComunity width={60} height={60} />
            </span>
          </CardBody>
        </Card>

        <Card shadow="sm" isPressable onPress={() => console.log("item pressed")} className="bg-blue-500/50">
          <CardBody className="overflow-visible p-10 flex flex-row items-center justify-between font-bold">
            <span className="text-5xl">
              <h3 className="text-xs font-semibold">Unidades Administrativas desactivadas</h3>
              {disable_administrative_units.length}
            </span>
            <span className="p-5 bg-blue-500 rounded-lg">
              <BuildingComunity width={60} height={60} />
            </span>
          </CardBody>
        </Card>

        <Card shadow="sm" isPressable onPress={() => console.log("item pressed")} className="bg-blue-500/50">
          <CardBody className="overflow-visible p-10 flex flex-row items-center justify-between font-bold">
            <span className="text-5xl">
              <h3 className="text-xs font-semibold">Usuarios Totales</h3>
              {users.length}
            </span>
            <span className="p-5 bg-blue-500 rounded-lg">
              <UsersIcon width={60} height={60} />
            </span>
          </CardBody>
        </Card>
      </div>
      <div className="mt-20">
        <Tabs aria-label="Options">
          <Tab key="users" title="Usuarios">
            <UsersTable users={users} totalPages={0} openAlert={onOpen} setCurrentUser={setCurrentUser} setSearchParams={setSearchParams} />
          </Tab>
          <Tab key="administrative_units" title="Unidades Administrativas">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="inventories" title="Inventarios">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>


    </section>
  )
}
