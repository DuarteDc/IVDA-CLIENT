import { useContext, useReducer, useState } from 'react';
import { InventoryContext } from './InventoryContext';
import { inventoryReducer } from './inventoryReducer';
import { getInventories, getInventory, getInventoryByUser } from '../../actions/inventoryActions';
import { UIContext } from '../ui/UIContext';
import { useNavigate } from 'react-router-dom';



const initialState = {
    inventories: [],
    totalPages: 0,
    inventory: {},
    files: [],
    file: {}
}

export const InventoryProvider = ({ children }) => {

    const [state, dispatch] = useReducer(inventoryReducer, initialState);
    const { startLoading, stopLoading } = useContext(UIContext);
    const [loading, setLoading] = useState(false);

    const toggleLoading = () => setLoading(prev => !prev);

    const navigate = useNavigate();

    const startGetInventories = async (params = '') => {
        startLoading()
        const inventories = await getInventories(params);
        dispatch({ type: 'start_get_inventories', payload: inventories });
        stopLoading()
    }

    const startGetInventory = async (id) => {
        try {
            toggleLoading();
            const data = await getInventory(id);
            if (!data) return navigate('not-found');
            dispatch({ type: 'start_get_inventory', payload: data });
        } catch (error) {
            navigate('not-found');
        } finally {
            toggleLoading();
        }
    }

    const getCurrentFile = (id) => {
        dispatch({ type: 'get_current_file', payload: id });
    }


    const clearInventoryCache = () => dispatch({ type: 'clear_inventory_cache' })

    const getCurrentInventory = (id) => {
        dispatch({ type: 'get_current_inventory', payload: id });
    }

    const startGetInventoryByUser = async (params = '') => {
        startLoading();
        const data = await getInventoryByUser(params);
        if (data) dispatch({ type: 'start_get_inventories', payload: data });
        stopLoading();
    }


    return (
        <InventoryContext.Provider value={{ ...state, dispatch, startGetInventories, startGetInventory, getCurrentFile, getCurrentInventory, startGetInventoryByUser, loading, clearInventoryCache }}>
            {children}
        </InventoryContext.Provider>
    )
}
