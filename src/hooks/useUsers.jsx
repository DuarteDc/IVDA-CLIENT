import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { UsersContext } from '../context/users/UsersContext'
import { activeUser, createUser, deleteUser, getUser, startGetUsers, updateUser } from '../actions/usersAction';
import { UIContext } from '../context/ui/UIContext';


export const useUsers = () => {


  const { startLoading, stopLoading } = useContext(UIContext);
  const { dispatch, currentUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const handleCreateUser = async data => {
    startLoading();
    if (await createUser(data)) return navigate('/auth/users');
    stopLoading();
  }

  const showUser = async (id) => {
    const user = await getUser(id);
    if (!user) return navigate('/auth/not-found');
    dispatch({ type: 'get_user', payload: user });
  }

  const handleUsersPaginate = async (page) => {
    const data = await startGetUsers(page);
    dispatch({ type: 'get_users', payload: data });
  }


  const handleChangeStatus = async () => {
    startLoading();
    if (currentUser?.status) {
      if (await deleteUser(currentUser.id)) dispatch({ type: 'delete_user', payload: currentUser });
      return stopLoading();
    }

    if (await activeUser(currentUser.id)) dispatch({ type: 'active_user', payload: currentUser });
    stopLoading();
  }


  const handleUpdateUser = async (id, body) => {
    startLoading();
    if (await updateUser(id, body)) navigate(-1);
    stopLoading();
  }

  return {
    handleCreateUser,
    handleUsersPaginate,
    handleChangeStatus,
    showUser,
    handleUpdateUser
  }
}
