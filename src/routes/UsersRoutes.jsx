import { Route, Routes } from 'react-router-dom';

import { CreateUser, Users } from '../pages/users';
import { Show } from '../pages/users/Show';
import { Edit } from '../pages/users/Edit';
import { NotFound } from '../pages/404/Index';

export const UsersRoutes = () => {

    return (
        <Routes>
            <Route path="/*" element={
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    {/* <Route path=":id" element={<Show />} /> */}
                    <Route path="/create" element={<CreateUser />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            }
            />
        </Routes>
    )
}
