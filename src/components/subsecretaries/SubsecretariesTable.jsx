import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Pagination, Avatar } from '@nextui-org/react';
import { DoneIcon, EditIcon, EyeIcon, TrashIcon } from '../icons';
import { Link } from 'react-router-dom';
import { BuildingComunity } from '../icons/';

export const SubsecretariesTable = ({ subsecretaries = {}}) => {
  return (
    <>
      <Table aria-label="Ususarios">
        <TableHeader>
          <TableColumn> Nombre </TableColumn>
          <TableColumn> Estatus </TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody>
          {
            subsecretaries?.map(({ id, name, status }) => (
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
                  <Chip className="capitalize" color={`${status ? 'success' : 'warning'}`} size="sm" variant="flat">
                    {
                      status ? 'Activo' : 'Inactivo'
                    }
                  </Chip>

                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Editar">
                      <Link to={`/auth/users/edit/${id}`}>
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Link>
                    </Tooltip>
                    {
                      status ? (
                        <Tooltip color="danger" content="Eliminar">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { openAlert(); setCurrentUser(id) }}>
                            <TrashIcon />
                          </span>
                        </Tooltip>
                      ) : (
                        <Tooltip color="primary" content="Activar">
                          <span className="text-lg text-primary cursor-pointer active:opacity-50" onClick={() => { openAlert(); setCurrentUser(id) }}>
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
      <div className="flex justify-end py-5 lg:pt-10">
        {/* <Pagination showControls total={totalPages} initialPage={1} onChange={(page) => { setSearchParams(`?page=${page}`) }} /> */}
      </div>
    </>
  )
}
