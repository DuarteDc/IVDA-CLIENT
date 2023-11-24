import { useReducer } from 'react';
import { InventoryContext } from './InventoryContext';
import { inventoryReducer } from './inventoryReducer';
import { getInventories, getInventory } from '../../actions/inventoryActions';



const initialState = {
    inventories: [],
    totalPages: 0,
    inventory: {},
    files: [],
    file: {}
}

export const InventoryProvider = ({ children }) => {

    const [state, dispatch] = useReducer(inventoryReducer, initialState);

    const startGetInventories = async (params = '') => {
        const data = await getInventories(params);
        dispatch({ type: 'start_get_inventories', payload: data });
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


    return (
        <InventoryContext.Provider value={{ ...state, dispatch, startGetInventories, startGetInventory, getCurrentFile, getCurrentInventory }}>
            {children}
        </InventoryContext.Provider>
    )
}
