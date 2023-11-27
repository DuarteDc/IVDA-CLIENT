import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

export const UserRoutes = ({ children }) => {

    const { user } = useContext(AuthContext);

    return user && user.role === "0" ?  children : (<Navigate to="/auth/" replace />)

}
