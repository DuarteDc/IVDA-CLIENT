import { useReducer } from 'react';
import { administrativeUnitReducer } from './administrativeUnitReducer';
import { AdministrativeUnitContext } from './AdministrativeUnitContext';
import { getAdministrativeUnits } from '../../actions/administrativeUnitsActions';

const initialState = {
    administrativeUnits: [],
    totalPages: 0,
    currentAdministrativeUnit: {}
}

export const AdministrativeUnitProvider = ({ children }) => {
    const [state, dispatch] = useReducer(administrativeUnitReducer, initialState);

    const startGetAdministrativeUnits = async (params = '') => {
        const data = await getAdministrativeUnits(params);
        dispatch({ type: 'start_get_administrative_units', payload: data });
    }

    const getCurrentAdministrativeUnit = (id) => {
        dispatch({ type: 'get_current_administrative_unit', payload: id })
    }

    return (
        <AdministrativeUnitContext.Provider value={{ ...state, dispatch, startGetAdministrativeUnits, getCurrentAdministrativeUnit }}>
            {children}
        </AdministrativeUnitContext.Provider>
    )
}
