import { useEffect, useContext, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { UIContext } from '../ui';
import { useAuth } from '../../hooks/useAuth';

const initialState = {
    user: {},
    logged: true,
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const { stopLoading } = useContext(UIContext);
    const { revalidateToken } = useAuth();

    useEffect(() => {
        setTimeout(async () => {
            try {
                const user = await revalidateToken();
                dispatch({ type: 'login', payload: user });
            } catch (error) {
                stopLoading();
            }finally {
                stopLoading();
            }
        }, 500)
    }, []);


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}
