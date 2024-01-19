import { useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { AlertModal } from '../../components/ui/AlertModal';
import { FilesInventoryTable, FormCreateFile } from '../../components/inventories';
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, useDisclosure } from '@nextui-org/react';
import { HomeIcon, PlusIcon } from '../../components/icons';
import { InventoriesTable } from '../../components/inventories/InventoriesTable';

export const CompleteInventory = () => {

  const [searchParams, setSearchParams] = useSearchParams(1);
  const { startGetInventoryByUser, inventories, totalPages } = useContext(InventoryContext);

  useEffect(() => {
    startGetInventoryByUser(searchParams);
  }, [searchParams]);

  return (
    <section>
      <h1 className="text-center text-4xl md:text-5xl font-bold pb-10 uppercase">Inventarios</h1>
      <div className="flex justify-end py-10">
        <Button color="primary" startContent={<PlusIcon />} as={Link} to="create">
          Crear Inventario
        </Button>
      </div>
      <div className="flex flex-col flex-wrap gap-4 mb-5">
        <Breadcrumbs radius="lg" variant="solid" color="foreground">
          <BreadcrumbItem
          >
            <Link to="/auth/user" className="flex items-center [&>:first-child]:mr-2">
              <HomeIcon width={20} height={20} />
              Inicio
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Inventarios</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <InventoriesTable
        inventories={inventories}
        totalPages={totalPages}
        setSearchParams={setSearchParams}
      />
    </section>
  )
}
