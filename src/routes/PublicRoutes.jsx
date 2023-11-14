import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoutes = ({ children }) => {

    const { logged } = useSelector(state => state.auth);
    
    return !logged ? children : <Navigate to="/usuarios" replace />

}

export default PublicRoutes