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
    const { stopScreenLoading } = useContext(UIContext);
    const { revalidateToken } = useAuth();

    useEffect(() => {
        setTimeout(() => {
            revalidateToken().then((user) => dispatch({ type: 'login', payload: user })).finally(() => stopScreenLoading());
        }, 500)
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('session');
        dispatch({ type: 'logout' });
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )

}
