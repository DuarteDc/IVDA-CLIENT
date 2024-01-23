import { Route, Routes } from 'react-router-dom';
import { PublicRoutes, PrivateRoutes, InventoriestRoutes, DependencyRoutes, AdminRoutes, UsersRoutes, UserRoutes } from './';

import { LoginPage, ForgotPassword, ResetPassword } from '../pages/auth/';
import { Layout } from '../components/ui/Layout';
import { SubsecretariesRoutes } from './SubsecretariesRoutes';
import { UsersProvider } from '../context/users/UsersProvider';
import { SubsecretaryProvider } from '../context/subsecretary/SubsecretaryProvider';
import { InventoryProvider } from '../context/inventory/InventoryProvider';
import { User, CompleteInventory } from '../pages/user/';
import { Dashboard } from '../pages/dashboard/Index';
import { NotFound } from '../pages/404/Index';
import { ResetPasswordMiddleware } from '../middlewares/ResetPasswordMiddleware';
import { DependencyProvider } from '../context/dependency';
import { CreateInventory, EditInventory, Inventory } from '../pages/inventories';
import { Profile } from '../pages/profile/Index';

export const MainRouter = () => {

    return (
        <Routes>
            <Route path="/*" element={
                <PublicRoutes>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={
                            <ResetPasswordMiddleware>
                                <ResetPassword />
                            </ResetPasswordMiddleware>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </PublicRoutes>
            } />
            <Route path="/auth/*" element={
                <PrivateRoutes>
                    <Layout>
                        <UsersProvider>
                            <DependencyProvider>
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
                                                        <Route path="/administrative-units/*" element={<DependencyRoutes />} />
                                                        <Route path="profile" element={<Profile />} />
                                                        <Route path="*" element={<NotFound />} />
                                                    </Routes>
                                                </AdminRoutes>
                                            } />
                                            <Route path="/user/*" element={
                                                <UserRoutes>
                                                    <Routes>
                                                        <Route path="/" element={<User />} />
                                                        <Route path="/inventories" element={<CompleteInventory />} />
                                                        <Route path="/inventories/:id" element={<Inventory />} />
                                                        <Route path="/inventories/edit/:id" element={<EditInventory />} />
                                                        <Route path="/inventories/create" element={<CreateInventory />} />
                                                        <Route path="/*" element={<NotFound />} />
                                                    </Routes>
                                                </UserRoutes>
                                            } />
                                        </Routes>
                                    </SubsecretaryProvider>
                                </InventoryProvider>
                            </DependencyProvider>
                        </UsersProvider>
                    </Layout>
                </PrivateRoutes>
            }
            errorElement={<NotFound />}
            />
            <Route path="*" element={<NotFound />} />
        </Routes >
    )
}
