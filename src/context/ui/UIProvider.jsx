import { useReducer } from 'react';
import { UIContext, uiReducer } from './';

const initialState = {
    open: false,
    loading: true,
}

export const UIProvider = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, initialState);

    const startLoading = () => dispatch({ type: ' start_loading ' });
    const stopLoading = () => dispatch({ type: ' stop_loading ' });

    return (
        <UIContext.Provider value={{ ...state, dispatch, startLoading, stopLoading }}>
            {children}
        </UIContext.Provider>
    )

}
