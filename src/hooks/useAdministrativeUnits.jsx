import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { activeAdministrativeUnit, createAdministrativeUnit, deleteAdministrativeUnit, getBySubsecretary, getOneAdministrativeUnit, updateAdministrativeUnit } from '../actions/administrativeUnitsActions'
import { UIContext } from '../context/ui/UIContext';
import { AdministrativeUnitContext } from '../context/administrative-unit/AdministrativeUnitContext';


export const useAdministrativeUnits = () => {

    const navigate = useNavigate();

    const { dispatch, currentAdministrativeUnit } = useContext(AdministrativeUnitContext);
    const { startLoading, stopLoading } = useContext(UIContext);

    const [administrativeUnits, setAdministrativeUnits] = useState([]);

    const getAdministrativeUnitsBySubsecretary = (id) => getBySubsecretary(id).then(setAdministrativeUnits);

    const handleCreateAdministrativeUnit = async (data) => {
        startLoading();
        if (await createAdministrativeUnit(data)) {
            navigate('..', { relative: "path" });
            return stopLoading();
        }
        stopLoading();
    }

    const handleUpdateAdministrativeUnit = async (id, data) => {
        startLoading();
        if (await updateAdministrativeUnit(id, data)) {
            navigate('../..', { relative: "path" });
            return stopLoading();
        }
        stopLoading();
    }

    const handleChangeStatus = async () => {
        startLoading();
        if (currentAdministrativeUnit?.status) {
            if (await deleteAdministrativeUnit(currentAdministrativeUnit.id)) dispatch({ type: 'change_status_administrative_unit', payload: currentAdministrativeUnit.id })
            return stopLoading();
        }

        if (await activeAdministrativeUnit(currentAdministrativeUnit.id)) dispatch({ type: 'change_status_administrative_unit', payload: currentAdministrativeUnit.id });

        stopLoading();
    }


    const startGetAdministrativeUnit = async (id) => {
        const administrativeUnit = await getOneAdministrativeUnit(id)
        if (!administrativeUnit) return navigate('/auth/not-found');
        dispatch({ type: 'get_one_administrative_unit', payload: administrativeUnit });
    }

    return {
        getAdministrativeUnitsBySubsecretary,
        administrativeUnits,
        handleCreateAdministrativeUnit,
        handleChangeStatus,
        startGetAdministrativeUnit,
        handleUpdateAdministrativeUnit
    }
}
