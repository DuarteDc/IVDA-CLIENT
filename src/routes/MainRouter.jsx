import { Route, Routes } from 'react-router-dom';
import { PublicRoutes, PrivateRoutes, InventoriestRoutes, AdministrativeUnitsRoutes, AdminRoutes, UsersRoutes, UserRoutes } from './';

import LoginPage from '../pages/auth/LoginPage';
import { Layout } from '../components/ui/Layout';
import { SubsecretariesRoutes } from './SubsecretariesRoutes';
import { UsersProvider } from '../context/users/UsersProvider';
import { SubsecretaryProvider } from '../context/subsecretary/SubsecretaryProvider';
import { AdministrativeUnitProvider } from '../context/administrative-unit/AdministrativeUnitProvider';
import { InventoryProvider } from '../context/inventory/InventoryProvider';
import { User, CompleteInventory } from '../pages/user/';

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
                            <AdministrativeUnitProvider>
                                <InventoryProvider>
                                    <SubsecretaryProvider>
                                        <AdminRoutes>
                                            <Routes>
                                                <Route path="/" element={<h1>Hola mundo</h1>} />
                                                <Route path="/users/*" element={<UsersRoutes />} />
                                                <Route path="/subsecretaries/*" element={<SubsecretariesRoutes />} />
                                                <Route path="/inventories/*" element={<InventoriestRoutes />} />
                                                <Route path="/administrative-units/*" element={<AdministrativeUnitsRoutes />} />
                                            </Routes>
                                        </AdminRoutes>
                                    </SubsecretaryProvider>
                                </InventoryProvider>
                            </AdministrativeUnitProvider>
                        </UsersProvider>
                        <UserRoutes>
                            <InventoryProvider>
                                <Routes>
                                    <Route path="/user/*" element={
                                        <Routes>
                                            <Route path="/" element={<User />} />
                                            <Route path="/:id" element={<CompleteInventory />} />
                                        </Routes>
                                    } />
                                </Routes>
                            </InventoryProvider>
                        </UserRoutes>
                        <Routes>
                            <Route path="/auth/*" element={<h1>esta no existe master xD</h1>} />
                        </Routes>
                    </Layout>
                </PrivateRoutes>
            }
            />
        </Routes >
    )
}
