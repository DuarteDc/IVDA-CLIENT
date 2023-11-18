import { useReducer } from 'react';
import { uiReducer } from './uiReducer';
import { UIContext } from './UIContext';

const initialState = {
    open: false,
    loading: false,
    screenLoading: true
}

export const UIProvider = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, initialState);

    const startLoading = () => dispatch({ type: 'start_loading' });
    const stopLoading = () => dispatch({ type: 'stop_loading' });

    const startScreenLoading = () => dispatch({ type: 'start_screen_loading' });
    const stopScreenLoading = () => dispatch({ type: 'stop_screen_loading' });

    return (
        <UIContext.Provider value={{ ...state, startLoading, stopLoading, startScreenLoading, stopScreenLoading }}>
            {children}
        </UIContext.Provider>
    )

}
