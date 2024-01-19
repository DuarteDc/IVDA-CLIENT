import { useContext, useEffect, useState } from 'react';
import { InventoryContext } from '../context/inventory/InventoryContext';
import { getDataDashboard } from '../actions/dasboardActions';


export const useDashboard = () => {

    const { dispatch, inventories } = useContext(InventoryContext);
    const [dataCount, setDataCount] = useState({
        inventories: 0,
        dependencies: 0,
        subsecretaries: 0,
        users: 0
    });

    useEffect(() => {
        startGetDataDashboard();
    }, [])


    const startGetDataDashboard = async () => {
        const data = await getDataDashboard();
        dispatch({ type: 'start_get_inventories', payload: data?.inventories || [] });
        setDataCount({
            inventories: data?.inventories_count || 0,
            dependencies: data?.dependencies || 0,
            subsecretaries: data?.subsecretaries_count || 0,
            users: data?.users_count || 0,
        })
    }

    return {
        dataCount,
        inventories
    }
}
