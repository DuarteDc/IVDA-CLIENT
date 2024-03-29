import { useContext, useEffect } from 'react';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { InventoriesTable } from '../../components/inventories/InventoriesTable';
import { HomeIcon, PlusIcon } from '../../components/icons';
import { BreadcrumbItem, Breadcrumbs, Button } from '@nextui-org/react';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';

export const Inventories = () => {

  const [searchParams, setSearchParams] = useSearchParams(1);
  const { startGetInventories, inventories, totalPages } = useContext(InventoryContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    startGetInventories(searchParams);
  }, [searchParams]);

  return (
    <section>
      <h1 className="text-center text-4xl md:text-5xl font-bold pb-10 uppercase">Inventarios</h1>
      <div className="flex justify-end py-10">
        {
          user?.role === "1" && (
            <Button startContent={<PlusIcon />} as={Link} to="create" className="bg-emerald-600 text-white">
              Crear Inventario
            </Button>
          )
        }
      </div>
      <div className="flex flex-col flex-wrap gap-4 mb-5">
        <Breadcrumbs radius="lg" variant="solid" color="foreground">
          <BreadcrumbItem>
            <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
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
