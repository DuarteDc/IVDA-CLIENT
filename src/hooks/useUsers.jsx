import { useContext } from 'react'
import { UsersContext } from '../context/users/UsersContext'
import { activeUser, createUser, deleteUser, startGetUsers } from '../actions/usersAction';
import { useNavigate } from 'react-router-dom';
import { UIContext } from '../context/ui';


export const useUsers = (onOpen) => {


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

  const handleUsersPaginate = async (page = 1) => {
    const data = await startGetUsers(page);
    dispatch({ type: 'get_users', payload: data });
  }


  const handleChangeStatus = async () => {
    if(createUser.status) {
      if( await deleteUser(currentUser.id))
        return dispatch({ type: 'delete_user', payload: currentUser})
    }

    if( await activeUser(currentUser.id))
    return dispatch({ type: 'active_user', payload: currentUser})


  }

  return {
    saveUser,
    handleUsersPaginate,
    handleChangeStatus
  }
}
