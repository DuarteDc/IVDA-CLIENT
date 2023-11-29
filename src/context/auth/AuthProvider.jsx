import { useEffect, useContext, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { UIContext } from '../ui/UIContext';
import { useAuth } from '../../hooks/useAuth';

const initialState = {
    user: {},
    logged: false,
}

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialState);
    const { startScreenLoading, stopScreenLoading } = useContext(UIContext);
    const { revalidateToken } = useAuth();

    useEffect(() => {
        setTimeout(() => {
            revalidateToken()
                .then((user) => dispatch({ type: 'login', payload: user }))
                .catch(() => localStorage.removeItem('session'))
                .finally(() => stopScreenLoading());
        }, 500)
    }, []);


    const handleLogout = () => {
        startScreenLoading();
        setTimeout(() => {
            localStorage.removeItem('session');
            dispatch({ type: 'logout' });
            stopScreenLoading();
        }, 300)
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )

}
