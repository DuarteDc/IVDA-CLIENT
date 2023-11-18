import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { usersReducer } from './usersReducer';
import { UsersContext } from './UsersContext';

import { startGetUsers, getUser } from '../../actions/usersAction';

const initialState = {
    users: [],
    totalPages: 0,
    currentUser: {},
    user: {}
}

export const UsersProvider = ({ children }) => {

    const [state, dispatch] = useReducer(usersReducer, initialState);

    const navigate = useNavigate();

    const getUsers = async (params = '') => {
        const data = await startGetUsers(params);
        dispatch({ type: 'get_users', payload: data });
    }

    const setCurrentUser = (id) => {
        dispatch({ type: 'set_user', payload: id });
    }

    const getUserById = async (id) => {
        const user = await getUser(id);
        if(user) return dispatch({ type: 'get_user', payload: user });
    }

    return (
        <UsersContext.Provider value={{ ...state, dispatch, setCurrentUser, getUserById, getUsers }}>
            {children}
        </UsersContext.Provider>
    )

}
