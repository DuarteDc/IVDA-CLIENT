import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { activeAdministrativeUnit, createDependency, deleteAdministrativeUnit, getByUser, getDependency, getLocations, getTypeFiles, updateAdministrativeUnit, getDependenciesWithoutUsers, getDependenciesWithoutUsersAndMyDependency } from '../actions/dependencyActions'
import { UIContext } from '../context/ui/UIContext';
import { DependencyContext } from '../context/dependency';


export const useDependency = () => {

    const navigate = useNavigate();

    const { dispatch, dependency } = useContext(DependencyContext);
    const { startLoading, stopLoading } = useContext(UIContext);

    const [dependencyUser, setDependencyUser] = useState([]);
    const [locations, setLocations] = useState([]);
    const [typeFiles, setTypeFiles] = useState([]);

    const getDependencyByUser = () => getByUser().then(setDependencyUser);

    const handleCreateDependency = async (data) => {
        startLoading();
        if (await createDependency(data)) {
            navigate('..', { relative: "path" });
            return stopLoading();
        }
        stopLoading();
    }

    const handleUpdateDependency = async (id, data) => {
        startLoading();
        if (await updateAdministrativeUnit(id, data)) {
            navigate('../..', { relative: "path" });
            return stopLoading();
        }
        stopLoading();
    }

    const handleChangeStatus = async () => {
        startLoading();
        if (dependency?.status) {
            if (await deleteAdministrativeUnit(dependency.id)) dispatch({ type: 'change_status_dependency', payload: dependency.id })
            return stopLoading();
        }

        if (await activeAdministrativeUnit(dependency.id)) dispatch({ type: 'change_status_dependency', payload: dependency.id });

        stopLoading();
    }


    const startGetDependency = async (id) => {
        const dependency = await getDependency(id)
        dispatch({ type: 'get_dependency', payload: dependency });
    }

    const startGetDependeciesWithoutUsers = () => getDependenciesWithoutUsers().then(setDependencyUser);
    const startGetDependeciesWithoutUsersAndMyDependency = (id) => getDependenciesWithoutUsersAndMyDependency(id).then(setDependencyUser);

    const startGetLocations = () => getLocations().then(setLocations);
    const startGetTypeFiles = () => getTypeFiles().then(setTypeFiles);

    const cleanDependencyCache = () => dispatch({ type: 'clear_dependency_cache' })

    return {
        locations, 
        typeFiles,
        dependencyUser,
        getDependencyByUser,
        handleCreateDependency,
        handleChangeStatus,
        startGetDependency,
        handleUpdateDependency,
        cleanDependencyCache,
        startGetLocations,
        startGetTypeFiles,
        startGetDependeciesWithoutUsers,
        startGetDependeciesWithoutUsersAndMyDependency
    }
}
