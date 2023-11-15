import { Route, Routes } from 'react-router-dom';
import { PublicRoutes, PrivateRoutes } from './';

import LoginPage from '../pages/auth/LoginPage';
import Users from '../pages/users/Index';
import { UsersProvider } from '../context/users/UsersProvider';
import { Layout } from '../components/ui/Layout';


export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={
                <PublicRoutes>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                    </Routes>
                </PublicRoutes>
            } />
            <Route path="/auth/*" element={
                <PrivateRoutes>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<h1>Hola mundo</h1>} />
                            <Route path="/users" element={<UsersProvider><Users /></UsersProvider>} />
                            <Route path="/*" element={<h1>esta no existe master xD</h1>} />
                        </Routes>
                    </Layout>
                </PrivateRoutes>
            }
            />
        </Routes>
    )
}
