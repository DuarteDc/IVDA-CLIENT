import { Route, Routes } from 'react-router-dom';
import { AdministrativeUnits, CreateAdministrativeUnit, EditAdministrativeUnit } from '../pages/administrative-units/';
import { NotFound } from '../pages/404/Index';

export const AdministrativeUnitsRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={
                <Routes>
                    <Route path="/" element={<AdministrativeUnits />} />
                    <Route path="/create" element={<CreateAdministrativeUnit/>} />
                    <Route path="/edit/:id" element={<EditAdministrativeUnit/>} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            }
            />
        </Routes>
    )
}
