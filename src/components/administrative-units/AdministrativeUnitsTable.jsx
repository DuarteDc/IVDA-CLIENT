import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User, useDisclosure } from '@nextui-org/react';

import { AlertCircleIcon, BuildingComunity, DoneIcon, EditIcon, EyeIcon, TrashIcon } from '../icons';
import { AdministrativeUnitContext } from '../../context/administrative-unit/AdministrativeUnitContext';
import { AlertModal } from '../ui/AlertModal';
import { useAdministrativeUnits } from '../../hooks/useAdministrativeUnits';

const AdministrativeUnitsTable = ({ administrativeUnits = [], totalPages = 0, setSearchParams, currentPage = 1 }) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { handleChangeStatus } = useAdministrativeUnits();
  const { getCurrentAdministrativeUnit, currentAdministrativeUnit } = useContext(AdministrativeUnitContext);

  return (
    <>
      <Table aria-label="Unidades Administrativas">
        <TableHeader>
          <TableColumn> Nombre </TableColumn>
          <TableColumn> Subsecretaría </TableColumn>
          <TableColumn> Estatus </TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody>
          {
            administrativeUnits?.map(({ id, name, subsecretary_id, status }) => (
              <TableRow key={id}>
                <TableCell>
                  <User
                    avatarProps={{
                      icon: <BuildingComunity />
                    }}
                    name={name}
                    description="Subsecretaria"
                  >
                    {name}
                  </User>
                </TableCell>
                <TableCell>
                  <Chip color="secondary" variant="dot">
                    {subsecretary_id}
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
                    {/* <Tooltip content="Detalles">
                      <Link to={`/auth/subsecretaries/${id}`}>
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EyeIcon />
                        </span>
                      </Link>
                    </Tooltip> */}
                    <Tooltip content="Editar">
                      <Link to={`/auth/administrative-units/edit/${id}`}>
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Link>
                    </Tooltip>
                    {
                      status ? (
                        <Tooltip color="danger" content="Eliminar">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { onOpen(); getCurrentAdministrativeUnit(id); }}>
                            <TrashIcon />
                          </span>
                        </Tooltip>
                      ) : (
                        <Tooltip color="primary" content="Activar">
                          <span className="text-lg text-primary cursor-pointer active:opacity-50" onClick={() => { onOpen(); getCurrentAdministrativeUnit(id); }}>
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
                currentAdministrativeUnit?.status ? (
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
                currentAdministrativeUnit?.status ? <p>¿Esta seguro que sea eliminar la unidad administrativa <b>{currentAdministrativeUnit?.name}</b>?</p> : <p>¿Esta seguro que sea activar la unidad administrativa <b>{currentAdministrativeUnit?.name}</b>?</p>
              }
            </div>
          </AlertModal>
        )
      }

    </>
  )
}

export default AdministrativeUnitsTable