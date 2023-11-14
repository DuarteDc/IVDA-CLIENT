import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {

    const { logged } = useSelector(state => state.auth);

    return logged ? <>{ children }</> : (<Navigate to="/" replace />)

}

export default PrivateRoutes