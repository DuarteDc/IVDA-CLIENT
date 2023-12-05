import { useEffect, useContext, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { UIContext } from '../ui/UIContext';
import { startRevalidateToken } from '../../actions/authActions';

const initialState = {
    user: {},
    logged: false,
}

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialState);
    const { startScreenLoading, stopScreenLoading } = useContext(UIContext);

    useEffect(() => {
        setTimeout(() => {
            startRevalidateToken()
                .then(({ user, session }) => {
                    dispatch({ type: 'login', payload: user });
                    localStorage.setItem('session', JSON.stringify(session));
                })
                .catch(() => { localStorage.removeItem('session'); dispatch({ type: 'logout' }) })
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
