import { useContext, useReducer } from 'react';
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

    const navigate = useNavigate();

    const startGetInventories = async (params = '') => {
        startLoading()
        const inventories = await getInventories(params);
        dispatch({ type: 'start_get_inventories', payload: inventories });
        stopLoading()
    }

    const startGetInventory = async (id) => {
        try {
            const data = await getInventory(id);
            if (!data) return navigate('/auth/not-found');
            dispatch({ type: 'start_get_inventory', payload: data });
        } catch (error) {
            navigate('/auth/not-found');
        }
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
