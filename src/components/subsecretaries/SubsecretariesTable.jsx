import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Pagination, Spinner } from '@nextui-org/react';

import { DoneIcon, EditIcon, EyeIcon, TrashIcon } from '../icons';
import { BuildingComunity } from '../icons/';
import { UIContext } from '../../context/ui/UIContext';
import { SubsecretaryContext } from '../../context/subsecretary/SubsecretaryContext';

export const SubsecretariesTable = ({ subsecretaries = [], totalPages = 0, openAlert, getCurrentSubsecretary, setSearchParams }) => {

  const { loading } = useContext(UIContext);

  return (
    <>
      <Table aria-label="Ususarios">
        <TableHeader>
          <TableColumn> Nombre </TableColumn>
          <TableColumn> Estatus </TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<span className="bg-slate-200/60 dark:bg-black/80 sticky inset-0 flex items-center justify-center w-full h-full"><Spinner label="Espere..." /></span>}
        >
          {
            subsecretaries?.map(({ id, name, status }) => (
              <TableRow key={id}>
                <TableCell className="min-w-[30px]">
                  <User
                    avatarProps={{
                      icon: <BuildingComunity />
                    }}
                    name={name}
                    description="Subsecretaria"
                    className="truncate"
                  >
                    {name}
                  </User>
                </TableCell>
                <TableCell>
                  <Chip className="capitalize" color={`${status ? 'success' : 'warning'}`} size="sm" variant="flat">
                    {
                      status ? 'Activa' : 'Inactiva'
                    }
                  </Chip>

                </TableCell>
                {

                }
                <TableCell>
                  <div className="relative flex items-center justify-center gap-2">
                    <Tooltip content="Detalles">
                      <Link to={`/auth/subsecretaries/${id}`}>
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EyeIcon />
                        </span>
                      </Link>
                    </Tooltip>
                    <Tooltip content="Editar">
                      <Link to={`/auth/subsecretaries/edit/${id}`}>
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Link>
                    </Tooltip>
                    {
                      status ? (
                        <Tooltip color="danger" content="Eliminar">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { openAlert(); getCurrentSubsecretary(id); }}>
                            <TrashIcon />
                          </span>
                        </Tooltip>
                      ) : (
                        <Tooltip color="primary" content="Activar">
                          <span className="text-lg text-primary cursor-pointer active:opacity-50" onClick={() => { openAlert(); getCurrentSubsecretary(id); }}>
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
        <Pagination showControls total={totalPages} initialPage={1} onChange={(page) => { setSearchParams(`?page=${page}`) }} />
      </div>
    </>
  )
}
