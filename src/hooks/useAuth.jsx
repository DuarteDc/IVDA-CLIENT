import { useContext } from 'react';
import { startLogin } from '../actions/authActions';
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
        stopLoading();
    }
    return {
        login
    }

}

