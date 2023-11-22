import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { UsersContext } from '../context/users/UsersContext'
import { activeUser, createUser, deleteUser, getUser, startGetUsers, updateUser } from '../actions/usersAction';
import { UIContext } from '../context/ui/UIContext';


export const useUsers = () => {


  const { startScreenLoading, stopScreenLoading } = useContext(UIContext);
  const { dispatch, currentUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const saveUser = async data => {
    startScreenLoading();
    const response = await createUser(data);

    if (!response) return stopScreenLoading();
    stopScreenLoading();
    navigate('/auth/users');
  }

  const showUser = async (id) => {
    const user = await getUser(id);
    if (!user) return navigate('/not-found');
    dispatch({ type: 'get_user', payload: user });
  }

  const handleUsersPaginate = async (page) => {
    const data = await startGetUsers(page);
    dispatch({ type: 'get_users', payload: data });
  }


  const handleChangeStatus = async () => {
    if (currentUser?.status) {
      if (await deleteUser(currentUser.id)) return dispatch({ type: 'delete_user', payload: currentUser })
    }

    if (await activeUser(currentUser.id))
      return dispatch({ type: 'active_user', payload: currentUser });
  }


  const handleUpdateUser = async (id, body) => await updateUser(id, body).then(() => navigate('/auth/users'));

  return {
    saveUser,
    handleUsersPaginate,
    handleChangeStatus,
    showUser,
    handleUpdateUser
  }
}
