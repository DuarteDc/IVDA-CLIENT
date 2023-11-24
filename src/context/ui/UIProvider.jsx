import { useReducer, useEffect } from 'react';
import { uiReducer } from './uiReducer';
import { UIContext } from './UIContext';

const initialState = {
    open: false,
    loading: false,
    screenLoading: true,
    theme: 'light'
}

export const UIProvider = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, initialState);

    const startLoading = () => dispatch({ type: 'start_loading' });
    const stopLoading = () => dispatch({ type: 'stop_loading' });

    const startScreenLoading = () => dispatch({ type: 'start_screen_loading' });
    const stopScreenLoading = () => dispatch({ type: 'stop_screen_loading' });

    const handleSetTheme = () => {
        try {
            const theme = JSON.parse(localStorage.getItem('theme')) || '';
            if (theme !== 'dark' && theme !== 'light') return dispatch({ type: 'change_theme', payload: 'light' });
            dispatch({ type: 'change_theme', payload: theme });
        } catch (error) {
            handleChangeTheme('light');
        }
    }

    const handleChangeTheme = (theme) => {
        localStorage.setItem('theme', JSON.stringify(theme));
        dispatch({ type: 'change_theme', payload: theme });
    }


    useEffect(() => {
        handleSetTheme();
    }, []);

    return (
        <UIContext.Provider value={{ ...state, startLoading, stopLoading, startScreenLoading, stopScreenLoading, handleChangeTheme }}>
            {children}
        </UIContext.Provider>
    )

}
