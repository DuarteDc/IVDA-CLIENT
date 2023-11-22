import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { activeAdministrativeUnit, createAdministrativeUnit, deleteAdministrativeUnit, getBySubsecretary, getOneAdministrativeUnit } from '../actions/administrativeUnitsActions'
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


    const handleChangeStatus = async () => {
        if (currentAdministrativeUnit?.status) {
            if (await deleteAdministrativeUnit(currentAdministrativeUnit.id)) return dispatch({ type: 'change_status_administrative_unit', payload: currentAdministrativeUnit.id })
            return;
        }

        if (await activeAdministrativeUnit(currentAdministrativeUnit.id))
            return dispatch({ type: 'change_status_administrative_unit', payload: currentAdministrativeUnit.id });
    }


    const startGetAdministrativeUnit = async (id) => {
        const administrativeUnit = await getOneAdministrativeUnit(id)
        if (!administrativeUnit) return;
        dispatch({ type: 'get_one_administrative_unit', payload: administrativeUnit });
    }

    return {
        getAdministrativeUnitsBySubsecretary,
        administrativeUnits,
        handleCreateAdministrativeUnit,
        handleChangeStatus,
        startGetAdministrativeUnit
    }
}
