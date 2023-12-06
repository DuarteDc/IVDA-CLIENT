import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

export const AdminRoutes = ({ children }) => {

    const { user } = useContext(AuthContext);

    return  user && user?.role == "1" ?  children : (<Navigate to="/auth/user/" replace />)

}
