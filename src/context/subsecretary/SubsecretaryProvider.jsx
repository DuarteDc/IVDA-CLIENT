import { useReducer } from 'react';

import { getSubsecretaries, getSubsecretary } from '../../actions/subsecretariesActions';
import { SubsecretaryContext } from './SubsecretaryContext';
import { subsecretaryReducer } from './subsecretaryReducer';

const initialState = {
    subsecretaries: [],
    subsecretary: {},
    totalPages: 0,
    enable_administrative_units: [],
    disable_administrative_units: [],
    users: [],
}

export const SubsecretaryProvider = ({ children }) => {

    const [state, dispatch] = useReducer(subsecretaryReducer, initialState);

    const startGetSubsecretaries = async () => {
        const data = await getSubsecretaries();
        dispatch({ type: 'start_get_subsecretaries', payload: data });
    }

    const getCurrentSubsecretary = (id) => {
        dispatch({ type: 'get_current_subsecretary', payload: id })
    }

    const startGetSubsecretary = async(id) => {
        const data = await getSubsecretary(id);
        dispatch({ type: 'start_get_subsecretary', payload: data });
    }

    return (
        <SubsecretaryContext.Provider value={{ ...state, dispatch, startGetSubsecretaries, getCurrentSubsecretary, startGetSubsecretary }}>
            {children}
        </SubsecretaryContext.Provider>
    )

}
