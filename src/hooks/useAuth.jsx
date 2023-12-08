import { useContext } from 'react';
import { recoverPassword, startLogin, getPasswordToken, changePassword } from '../actions/authActions';
import { AuthContext } from '../context/auth/AuthContext';
import { UIContext } from '../context/ui/UIContext';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {

    const { dispatch } = useContext(AuthContext);
    const { startLoading, stopLoading } = useContext(UIContext);
    const navigate = useNavigate();

    const login = async body => {
        startLoading();
        const data = await startLogin(body);
        if (!data?.user) return stopLoading();
        localStorage.setItem('session', JSON.stringify(data?.session));
        dispatch({ type: 'login', payload: data?.user });
        stopLoading();
    }


    const startRecoverPassword = async body => {
        startLoading();
        const response = await recoverPassword(body);
        if (!response) return stopLoading();
        stopLoading()
        navigate('/');
    }

    const startVerifyTokenToResetPassword = async (key, email) => await getPasswordToken(`key=${key}&email=${email}`);    
    
    const startChangePassword = async (body) => {
        startLoading();
        if(await changePassword(body)) navigate('/');
        stopLoading();
    }

    return {
        login,
        startRecoverPassword,
        startVerifyTokenToResetPassword,
        startChangePassword
    }

}

