import { useContext, useReducer } from 'react';
import { administrativeUnitReducer } from './administrativeUnitReducer';
import { AdministrativeUnitContext } from './AdministrativeUnitContext';
import { getAdministrativeUnits } from '../../actions/administrativeUnitsActions';
import { UIContext } from '../ui/UIContext';

const initialState = {
    administrativeUnits: [],
    totalPages: 0,
    currentAdministrativeUnit: {}
}

export const AdministrativeUnitProvider = ({ children }) => {
    const [state, dispatch] = useReducer(administrativeUnitReducer, initialState);
    const { startLoading, stopLoading } = useContext(UIContext);


    const startGetAdministrativeUnits = async (params = '') => {
        startLoading();
        const data = await getAdministrativeUnits(params);
        dispatch({ type: 'start_get_administrative_units', payload: data });
        stopLoading();
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
