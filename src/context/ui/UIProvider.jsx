import { useReducer } from 'react';
import { uiReducer } from './uiReducer';
import { UIContext } from './UIContext';

const initialState = {
    open: false,
    loading: true,
    screen_loading: false
}

export const UIProvider = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, initialState);

    const stopLoading = () => dispatch({ type: ' stop_loading ' });

    const startScreenLoading = () => dispatch({ type: ' start_screen_loading ' });
    const stopScreenLoading = () => dispatch({ type: ' stop_screen_loading ' });

    return (
        <UIContext.Provider value={{ ...state, stopLoading, startScreenLoading, startScreenLoading, stopScreenLoading }}>
            {children}
        </UIContext.Provider>
    )

}
