import { useReducer } from 'react';
import { InventoryContext } from './InventoryContext';
import { inventoryReducer } from './inventoryReducer';
import { getInventories, getInventory } from '../../actions/inventoryActions';



const initialState = {
    inventories: [],
    totalPages: 0,
    inventory: {},
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

    return (
        <InventoryContext.Provider value={{ ...state, dispatch, startGetInventories, startGetInventory }}>
            {children}
        </InventoryContext.Provider>
    )
}
