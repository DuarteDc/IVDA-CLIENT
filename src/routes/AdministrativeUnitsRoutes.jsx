import { Route, Routes } from 'react-router-dom';
import { AdministrativeUnits, CreateAdministrativeUnit, EditAdministrativeUnit } from '../pages/administrative-units/';

export const AdministrativeUnitsRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={
                <Routes>
                    <Route path="/" element={<AdministrativeUnits />} />
                    <Route path="/create" element={<CreateAdministrativeUnit/>} />
                    <Route path="/edit/:id" element={<EditAdministrativeUnit/>} />
                </Routes>
            }
            />
        </Routes>
    )
}
