import { useNavigate } from 'react-router-dom';
import { createInventory } from '../actions/inventoryActions';
import { useContext } from 'react';
import { UIContext } from '../context/ui/UIContext';


export const useInventory = () => {

    const navigate = useNavigate()
    const { startLoading, stopLoading } = useContext(UIContext);


    const handleCreateInventory = async (data) => {
        startLoading();
        if(await createInventory(data)) navigate('/auth/inventories');
        stopLoading();
    }




    return {
        handleCreateInventory,
    }
}
