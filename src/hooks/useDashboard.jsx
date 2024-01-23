import { useContext, useEffect, useState } from 'react';
import { InventoryContext } from '../context/inventory/InventoryContext';
import { getDataDashboard } from '../actions/dasboardActions';
import { UIContext } from '../context/ui/UIContext';


export const useDashboard = () => {

    const { startLoading, stopLoading } = useContext(UIContext);
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
        startLoading()
        const data = await getDataDashboard();
        dispatch({ type: 'start_get_inventories', payload: { inventories: data?.inventories, totalPages: 0 } || [] });
        setDataCount({
            inventories: data?.inventories_count || 0,
            dependencies: data?.dependencies || 0,
            subsecretaries: data?.subsecretaries_count || 0,
            users: data?.users_count || 0,
        })
        stopLoading()
    }

    return {
        dataCount,
        inventories
    }
}
