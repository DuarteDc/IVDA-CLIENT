import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';
import { UsersContext } from '../../context/users/UsersContext';
import { Avatar, Card, CardBody, Chip } from '@nextui-org/react';

export const Show = () => {

  const { showUser } = useUsers();
  let { id } = useParams();

  useEffect(() => {
    showUser(id);
  }, []);

  const { currentUser } = useContext(UsersContext);

  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-center text-6xl">Detalles de usuario</h1>
      <div className="grid grid-cols-3 w-[1000px] mt-20 [&>div>div>span]:flex [&>div>div>span]:items-center [&>div>div>span>b]:mr-2 [&>div>div>span>b]:text-xl">
        <Avatar src={`https://ui-avatars.com/api/?background=random&name=${currentUser?.name} ${currentUser?.last_name}`} className="w-48 h-48 text-large" />
        <div className="col-span-2">
          <Card>
            <CardBody>
              <span className="mt-5">
                <b>Nombre: </b>
                {currentUser?.name}
              </span>
              <span className="mt-5">
                <b>Apellido: </b>
                {currentUser?.last_name}
              </span>
              <span className="mt-5">
                <b>Correo: </b>
                {currentUser?.email}
              </span>
              <span className="mt-5">
                <b>Estatus: </b>
                <Chip className="capitalize" color={`${currentUser?.status ? 'success' : 'warning'}`} size="sm" variant="solid">
                  {
                    currentUser?.status ? 'Activo' : 'Inactivo'
                  }
                </Chip>
              </span>
              <span className="mt-5">
                <b>Rol: </b>
                <Chip className="capitalize" color={`${currentUser?.role === '0' ? 'primary' : 'success'}`} size="sm" variant="solid">
                  {
                    currentUser?.role === '0' ? 'Usuario' : 'Administrador'
                  }
                </Chip>
              </span>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}
