import { useContext } from 'react';
import { startLogin, startRevalidateToken } from '../actions/authActions';
import { AuthContext } from '../context/auth/AuthContext';
import { UIContext } from '../context/ui/UIContext';

export const useAuth = () => {

    const { dispatch } = useContext(AuthContext);
    const { startLoading, stopLoading } = useContext(UIContext);

    const login = async body => {
        startLoading();
        const data = await startLogin(body);
        if (!data?.user) return stopLoading();
        localStorage.setItem('session', JSON.stringify(data?.session));
        dispatch({ type: 'login', payload: data?.user });
        startLoading();
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

