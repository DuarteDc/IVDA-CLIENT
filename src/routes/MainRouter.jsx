import { Route, Routes } from 'react-router-dom';
import { PublicRoutes, PrivateRoutes, InventoriestRoutes, AdministrativeUnitsRoutes } from './';

import LoginPage from '../pages/auth/LoginPage';
import { Layout } from '../components/ui/Layout';
import { UsersRoutes } from './';
import { SubsecretariesRoutes } from './SubsecretariesRoutes';
import { UsersProvider } from '../context/users/UsersProvider';
import { SubsecretaryProvider } from '../context/subsecretary/SubsecretaryProvider';
import { AdministrativeUnitProvider } from '../context/administrative-unit/AdministrativeUnitProvider';


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
                        <UsersProvider>
                            <SubsecretaryProvider>
                                <AdministrativeUnitProvider>
                                    <Routes>
                                        <Route path="/" element={<h1>Hola mundo</h1>} />
                                        <Route path="/users/*" element={<UsersRoutes />} />
                                        <Route path="/subsecretaries/*" element={<SubsecretariesRoutes />} />
                                        <Route path="/inventories/*" element={<InventoriestRoutes />} />
                                        <Route path="/administrative-units/*" element={<AdministrativeUnitsRoutes />} />
                                        <Route path="/*" element={<h1>esta no existe master xD</h1>} />
                                    </Routes>
                                </AdministrativeUnitProvider>
                            </SubsecretaryProvider>
                        </UsersProvider>
                    </Layout>
                </PrivateRoutes>
            }
            />
        </Routes>
    )
}
