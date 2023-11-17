import { useReducer } from 'react';

import { getSubsecretaries } from '../../actions/subsecretariesActions';
import { SubsecretaryContext } from './SubsecretaryContext';
import { subsecretaryReducer } from './subsecretaryReducer';

const initialState = {
    subsecretaries: [],
    totalPages: 0,
}

export const SubsecretaryProvider = ({ children }) => {

    const [state, dispatch] = useReducer(subsecretaryReducer, initialState);

    const startGetSubsecretaries = async () => {
        const data = await getSubsecretaries();
        dispatch({ type: 'start_get_subsecretaries', payload: data });
    }

    return (
        <SubsecretaryContext.Provider value={{ ...state, dispatch, startGetSubsecretaries }}>
            {children}
        </SubsecretaryContext.Provider>
    )

}
