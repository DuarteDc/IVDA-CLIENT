import { useEffect, useContext, useReducer } from 'react';
import { usersReducer } from './usersReducer';
import { UsersContext } from './UsersContext';

import { startGetUsers } from '../../actions/usersAction';

const initialState = {
    users: [],
    totalPages: 0,
    currentUser: {}
}

export const UsersProvider = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, initialState);

    const getUsers = async () => {
        const data = await startGetUsers();
        dispatch({ type: 'get_users', payload: data });
    }

    const setCurrentUser = (id) => {
        dispatch({ type: 'set_users', payload: id });
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <UsersContext.Provider value={{ ...state, dispatch, setCurrentUser }}>
            {children}
        </UsersContext.Provider>
    )

}
