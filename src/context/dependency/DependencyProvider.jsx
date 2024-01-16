import { useContext, useReducer } from 'react';
import { dependencyReducer } from './dependencyReducer';
import { DependencyContext } from './DependencyContext';
import { getDependencies } from '../../actions/dependencyActions';
import { UIContext } from '../ui/UIContext';

const initialState = {
    dependencies: [],
    totalPages: 0,
    dependency: {}
}

export const DependencyProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dependencyReducer, initialState);
    const { startLoading, stopLoading } = useContext(UIContext);


    const startGetDependencies = async (params = '') => {
        startLoading();
        const dependencies = await getDependencies(params);
        dispatch({ type: 'start_get_dependencies', payload: dependencies });
        stopLoading();
    }

    const getCurrentDependency = (id) => {
        dispatch({ type: 'get_current_dependency', payload: id })
    }

    return (
        <DependencyContext.Provider value={{ ...state, dispatch, startGetDependencies, getCurrentDependency }}>
            {children}
        </DependencyContext.Provider>
    )
}
