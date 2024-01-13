import { useContext, useReducer } from 'react';

import { getSubsecretaries, getSubsecretary } from '../../actions/subsecretariesActions';
import { SubsecretaryContext } from './SubsecretaryContext';
import { subsecretaryReducer } from './subsecretaryReducer';
import { UsersContext } from '../users/UsersContext';
import { DependencyContext } from '../dependency/';
import { InventoryContext } from '../inventory/InventoryContext';
import { UIContext } from '../ui/UIContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
    subsecretaries: [],
    subsecretary: {},
    totalPages: 0,
}

export const SubsecretaryProvider = ({ children }) => {

    const [state, dispatch] = useReducer(subsecretaryReducer, initialState);
    const { startLoading, stopLoading } = useContext(UIContext);
    const { dispatch: userDispatch } = useContext(UsersContext);
    const { dispatch: dispatchAdministrativeUnit } = useContext(DependencyContext);
    const { dispatch: dispatchInventory } = useContext(InventoryContext);

    const navigate = useNavigate();

    const startGetSubsecretaries = async (params = '') => {
        startLoading();
        const data = await getSubsecretaries(params);
        dispatch({ type: 'start_get_subsecretaries', payload: data });
        stopLoading();
    }

    const getCurrentSubsecretary = (id) => {
        dispatch({ type: 'get_current_subsecretary', payload: id })
    }

    const startGetSubsecretary = async (id) => {
        try {
            const { users, administrative_units, inventories, ...rest } = await getSubsecretary(id);
            dispatch({ type: 'start_get_subsecretary', payload: rest });
            userDispatch({ type: 'get_users', payload: { users, totalPages: 0 } })
            dispatchAdministrativeUnit({ type: 'start_get_administrative_units', payload: { administrative_units, totalPages: 0 } })
            dispatchInventory({ type: 'start_get_inventories', payload: { inventories, totalPages: 0 } })   
        } catch (error) {
            navigate('/auth/not-found');
        }
    }

    return (
        <SubsecretaryContext.Provider value={{ ...state, dispatch, startGetSubsecretaries, getCurrentSubsecretary, startGetSubsecretary }}>
            {children}
        </SubsecretaryContext.Provider>
    )

}

