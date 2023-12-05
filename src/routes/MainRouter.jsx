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
import { Dashboard } from '../pages/dashboard/Index';
import { NotFound } from '../pages/404/Index';
import { Profile } from '../pages/profile';

export const MainRouter = () => {

    return (
        <Routes>
            <Route path="*" element={
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
                                        <Routes>
                                            <Route path="/*" element={
                                                <AdminRoutes>
                                                    <Routes>
                                                        <Route path="/" element={<Dashboard />} />
                                                        <Route path="/users/*" element={<UsersRoutes />} />
                                                        <Route path="/subsecretaries/*" element={<SubsecretariesRoutes />} />
                                                        <Route path="/inventories/*" element={<InventoriestRoutes />} />
                                                        <Route path="/administrative-units/*" element={<AdministrativeUnitsRoutes />} />
                                                        {/* <Route path="/profile/*" element={<Profile />} /> */}
                                                        <Route path="*" element={<NotFound />} />
                                                    </Routes>
                                                </AdminRoutes>
                                            } />
                                            <Route path="/user/*" element={
                                                <UserRoutes>
                                                    <Routes>
                                                        <Route path="/" element={<User />} />
                                                        <Route path="/inventory" element={<CompleteInventory />} />
                                                    </Routes>
                                                </UserRoutes>
                                            } />
                                        </Routes>
                                    </SubsecretaryProvider>
                                </InventoryProvider>
                            </AdministrativeUnitProvider>
                        </UsersProvider>
                    </Layout>
                </PrivateRoutes>
            }
            />
            <Route path="*" element={<NotFound />} />
        </Routes >
    )
}
