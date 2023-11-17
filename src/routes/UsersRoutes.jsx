import { Route, Routes } from 'react-router-dom';
import { UsersProvider } from '../context/users/UsersProvider';

import { CreateUser, Users } from '../pages/users';
import { Show } from '../pages/users/Show';
import { Edit } from '../pages/users/Edit';

export const UsersRoutes = () => {

    return (
        <UsersProvider>
            <Routes>
                <Route path="/*" element={
                    <Routes>
                        <Route path="/" element={<Users />} />
                        <Route path=":id" element={<Show />} />
                        <Route path="/edit/:id" element={<Edit />} />
                        <Route path="/create" element={<CreateUser />} />
                    </Routes>
                }
                />
            </Routes>
        </UsersProvider>
    )
}
