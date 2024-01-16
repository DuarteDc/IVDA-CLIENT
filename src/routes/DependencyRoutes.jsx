import { Route, Routes } from 'react-router-dom';
import { Dependencies, CreateDependency, EditDependency } from '../pages/dependencies';
import { NotFound } from '../pages/404/Index';

export const DependencyRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={
                <Routes>
                    <Route path="/" index element={<Dependencies />} />
                    <Route path="/create" element={<CreateDependency />} />
                    <Route path="/edit/:id" element={<EditDependency />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            }
                errorElement={<NotFound />}
            />
        </Routes>
    )
}
