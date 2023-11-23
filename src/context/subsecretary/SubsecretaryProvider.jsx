import { useContext, useReducer } from 'react';

import { getSubsecretaries, getSubsecretary } from '../../actions/subsecretariesActions';
import { SubsecretaryContext } from './SubsecretaryContext';
import { subsecretaryReducer } from './subsecretaryReducer';
import { UsersContext } from '../users/UsersContext';

const initialState = {
    subsecretaries: [],
    subsecretary: {},
    totalPages: 0,
    enable_administrative_units: [],
    disable_administrative_units: [],
}

export const SubsecretaryProvider = ({ children }) => {

    const [state, dispatch] = useReducer(subsecretaryReducer, initialState);

    const { dispatch: userDispatch } = useContext(UsersContext);

    const startGetSubsecretaries = async (params = '') => {
        const data = await getSubsecretaries(params);
        dispatch({ type: 'start_get_subsecretaries', payload: data });
    }

    const getCurrentSubsecretary = (id) => {
        dispatch({ type: 'get_current_subsecretary', payload: id })
    }

    const startGetSubsecretary = async (id) => {
        const { users, ...rest } = await getSubsecretary(id);
        dispatch({ type: 'start_get_subsecretary', payload: rest });
        userDispatch({ type: 'get_users', payload: { users, totalPages: 0 } })
    }

    return (
        <SubsecretaryContext.Provider value={{ ...state, dispatch, startGetSubsecretaries, getCurrentSubsecretary, startGetSubsecretary }}>
            {children}
        </SubsecretaryContext.Provider>
    )

}
