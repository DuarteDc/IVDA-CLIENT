import { useContext } from 'react';
import { startLogin, startRevalidateToken } from '../actions/authActions';
import { AuthContext } from '../context/auth/AuthContext';

export const useAuth = () => {

    const { dispatch } = useContext(AuthContext);

    const login = async body => {
        const data = await startLogin(body);
        if (!data?.user) return;
        localStorage.setItem('session', JSON.stringify(data?.session));
        dispatch({ type: 'login', payload: data?.user });
    }

    const revalidateToken = async () => {
        const data = await startRevalidateToken();
        if (!data?.user) return localStorage.removeItem('session')
        localStorage.setItem('session', JSON.stringify(data?.session));
        return data?.user;
    }

    return {
        login,
        revalidateToken
    }

}
