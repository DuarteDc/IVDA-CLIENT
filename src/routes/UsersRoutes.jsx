import { Route, Routes } from 'react-router-dom';
import { UsersProvider } from '../context/users/UsersProvider';

import { CreateUser, Users } from '../pages/users';

export const UsersRoutes = () => {

    return (
        <UsersProvider>
            <Routes>
                <Route path="/*" element={
                    <Routes>
                        <Route path="/" element={<Users />} />
                        <Route path="/create" element={<CreateUser />} />
                    </Routes>
                }
                />
            </Routes>
        </UsersProvider>
    )
}
