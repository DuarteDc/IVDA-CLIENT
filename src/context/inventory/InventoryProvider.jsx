import { useContext, useReducer } from 'react';
import { InventoryContext } from './InventoryContext';
import { inventoryReducer } from './inventoryReducer';
import { getInventories, getInventory, getInventoryByUser } from '../../actions/inventoryActions';
import { UIContext } from '../ui/UIContext';



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

    const startGetInventories = async (params = '') => {
        startLoading()
        const data = await getInventories(params);
        dispatch({ type: 'start_get_inventories', payload: data });
        stopLoading()
    }

    const startGetInventory = async (id) => {
        const data = await getInventory(id);
        dispatch({ type: 'start_get_inventory', payload: data });
    }

    const getCurrentFile = (no) => {
        dispatch({ type: 'get_current_file', payload: no });
    }

    const getCurrentInventory = (id) => {
        dispatch({ type: 'get_current_inventory', payload: id });
    }

    const startGetInventoryByUser = async () => {
        const data = await getInventoryByUser();
        if (data) dispatch({ type: 'get_inventory_by_user', payload: data });
    }


    return (
        <InventoryContext.Provider value={{ ...state, dispatch, startGetInventories, startGetInventory, getCurrentFile, getCurrentInventory, startGetInventoryByUser }}>
            {children}
        </InventoryContext.Provider>
    )
}
