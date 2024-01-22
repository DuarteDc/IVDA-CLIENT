import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Chip, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User, useDisclosure } from '@nextui-org/react';

import { AlertCircleIcon, BuildingComunity, DoneIcon, EditIcon, TrashIcon } from '../icons';
import { DependencyContext } from '../../context/dependency';
import { AlertModal } from '../ui/AlertModal';
import { useDependency } from '../../hooks/useDependency';
import { UIContext } from '../../context/ui/UIContext';

const AdministrativeUnitsTable = ({ dependencies = [], totalPages = 0, setSearchParams, currentPage = 1  }) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { handleChangeStatus } = useDependency();
  const { getCurrentDependency, dependency } = useContext(DependencyContext);
  const { loading } = useContext(UIContext);

  return (
    <>
      <Table aria-label="Unidades Administrativas">
        <TableHeader>
          <TableColumn> Nombre </TableColumn>
          <TableColumn> Código estructural </TableColumn>
          <TableColumn> Estatus </TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<div className="overflow-hidden z-50 fixed w-full h-full top-0 bg-slate-200/60  dark:bg-black/80 flex items-center justify-center"><Spinner label="Espere..." /></div>}
        >
          {
            dependencies?.map(({ id, name, code, status }) => (
              <TableRow key={id}>
                <TableCell className="min-w-[30px]">
                  <User
                    avatarProps={{
                      icon: <BuildingComunity />
                    }}
                    name={name}
                    description="Unidad administrativa"
                    className="truncate"
                  >
                    {name}
                  </User>
                </TableCell>
                <TableCell>
                  <Chip color="secondary" variant="dot">
                    {code}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip className="capitalize" color={`${status ? 'success' : 'warning'}`} size="sm" variant="flat">
                    {
                      status ? 'Activa' : 'Inactiva'
                    }
                  </Chip>

                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Editar">
                      <Link to={`edit/${id}`}>
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Link>
                    </Tooltip>
                    {
                      status ? (
                        <Tooltip color="danger" content="Eliminar">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { getCurrentDependency(id); onOpen(); }}>
                            <TrashIcon />
                          </span>
                        </Tooltip>
                      ) : (
                        <Tooltip color="primary" content="Activar">
                          <span className="text-lg text-primary cursor-pointer active:opacity-50" onClick={() => { getCurrentDependency(id); onOpen(); }}>
                            <DoneIcon />
                          </span>
                        </Tooltip>
                      )
                    }
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      {
        totalPages > 0 && (
          <div className="flex justify-end py-5 lg:pt-10">
            <Pagination showControls total={totalPages} initialPage={currentPage} onChange={(page) => { setSearchParams(`?page=${page}`) }} />
          </div>
        )
      }

      {
        isOpen && (
          <AlertModal
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            callback={handleChangeStatus}
          >
            <div className="flex flex-col items-center font-bold text-center">
              {
                dependency?.status ? (
                  <span className="text-red-600">
                    <AlertCircleIcon width={50} height={50} />
                  </span>
                ) : (
                  <span className="text-blue-600">
                    <AlertCircleIcon width={50} height={50} />
                  </span>
                )
              }
              <p>Antest de continuar.</p>
              {
                dependency?.status ? <p>¿Esta seguro que sea eliminar la unidad administrativa <b>{dependency?.name}</b>?</p> : <p>¿Esta seguro que sea activar la unidad administrativa <b>{dependency?.name}</b>?</p>
              }
            </div>
          </AlertModal>
        )
      }

    </>
  )
}

export default AdministrativeUnitsTable
