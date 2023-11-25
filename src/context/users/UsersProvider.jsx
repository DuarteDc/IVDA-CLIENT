import { useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { usersReducer } from './usersReducer';
import { UsersContext } from './UsersContext';

import { startGetUsers, getUser } from '../../actions/usersAction';
import { UIContext } from '../ui/UIContext';

const initialState = {
    users: [],
    totalPages: 0,
    currentUser: {},
    user: {}
}

export const UsersProvider = ({ children }) => {

    const [state, dispatch] = useReducer(usersReducer, initialState);
    const { startLoading, stopLoading } = useContext(UIContext);

    const getUsers = async (params = '') => {
        startLoading();
        const data = await startGetUsers(params);
        dispatch({ type: 'get_users', payload: data });
        stopLoading();
    }

    const setCurrentUser = (id) => {
        dispatch({ type: 'set_user', payload: id });
    }

    const getUserById = async (id) => {
        const user = await getUser(id);
        if (user) return dispatch({ type: 'get_user', payload: user });
    }

    return (
        <UsersContext.Provider value={{ ...state, dispatch, setCurrentUser, getUserById, getUsers }}>
            {children}
        </UsersContext.Provider>
    )

}
