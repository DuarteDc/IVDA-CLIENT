import { useState } from 'react';
import { getBySubsecretary } from '../actions/administrativeUnitsActions'


export const useAdministrativeUnits = () => {
    const [administrativeUnits, setAdministrativeUnits] = useState([]);

    const getAdministrativeUnitsBySubsecretary = (id) => getBySubsecretary(id).then(setAdministrativeUnits)


    return {
        getAdministrativeUnitsBySubsecretary,
        administrativeUnits,
    }
}
