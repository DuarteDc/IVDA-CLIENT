import { Route, Routes } from 'react-router-dom';
import { PublicRoutes, PrivateRoutes } from './';

import LoginPage from '../pages/auth/LoginPage';
import { Layout } from '../components/ui/Layout';
import { UsersRoutes } from './';


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
                <Layout>
                    <PrivateRoutes>
                        <Routes>
                            <Route path="/" element={<h1>Hola mundo</h1>} />
                            <Route path="/users/*" element={<UsersRoutes />} />
                            <Route path="/*" element={<h1>esta no existe master xD</h1>} />
                        </Routes>
                    </PrivateRoutes>
                </Layout>
            }
            />
        </Routes>
    )
}
