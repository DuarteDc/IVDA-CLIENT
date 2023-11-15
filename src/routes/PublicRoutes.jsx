import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

export const PublicRoutes = ({ children }) => {

    const { logged } = useContext(AuthContext);
    
    return !logged ? children : <Navigate to="/auth" replace />

}
