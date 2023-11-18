import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSubsecretaries, deleteSubsecretary, activeSubsecretary, createSubsecretary } from '../actions/subsecretariesActions'

import { SubsecretaryContext } from '../context/subsecretary/SubsecretaryContext';
import { UIContext } from '../context/ui/UIContext';

export const useSubsecretaries = () => {

    const navigate = useNavigate();
    const { subsecretary, dispatch } = useContext(SubsecretaryContext);
    const { startLoading, stopLoading } = useContext(UIContext);

    const getAllActiveSubsecretaries = async () => await getAllSubsecretaries();

    const handleChangeStatus = async () => {
        startLoading();
        if (subsecretary.status) {
            if (!await deleteSubsecretary(subsecretary.id)) return stopLoading();
            stopLoading();
            return dispatch({ type: 'disable_subsecretary', payload: subsecretary.id });
        }

        if (await activeSubsecretary(subsecretary.id)) dispatch({ type: 'enable_subsecretary', payload: subsecretary.id });
        stopLoading();
    }

    const handleCreateSubsecretary = async (data) => {
        startLoading();
        if (await createSubsecretary(data)) {
            navigate('/auth/subsecretaries');
            return stopLoading();
        }
        stopLoading();
    }


    return {
        getAllActiveSubsecretaries,
        handleChangeStatus,
        handleCreateSubsecretary
    }
}
