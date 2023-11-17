import { Route, Routes } from 'react-router-dom';
import { PublicRoutes, PrivateRoutes } from './';

import LoginPage from '../pages/auth/LoginPage';
import { Layout } from '../components/ui/Layout';
import { UsersRoutes } from './';
import { SubsecretariesRoutes } from './SubsecretariesRoutes';


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
                            <Route path="/users/*" element={<UsersRoutes />} />
                            <Route path="/subsecretaries/*" element={<SubsecretariesRoutes />} />
                            <Route path="/*" element={<h1>esta no existe master xD</h1>} />
                        </Routes>
                    </Layout>
                </PrivateRoutes>
            }
            />
        </Routes>
    )
}
