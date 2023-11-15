import { useContext } from 'react';
import { startLogin, startRevalidateToken } from '../actions/authActions';
import { AuthContext } from '../context/auth/AuthContext';

export const useAuth = () => {

    const { dispatch } = useContext(AuthContext);

    const login = async data => {
        const { user, session } = await startLogin(data);
        localStorage.setItem('session', JSON.stringify(session));
        dispatch({ type: 'login', payload: user });
    }

    const revalidateToken = async () => {
        const { user, session } = await startRevalidateToken();
        localStorage.setItem('session', JSON.stringify(session));
        return user;
    }

    return {
        login,
        revalidateToken
    }

}
