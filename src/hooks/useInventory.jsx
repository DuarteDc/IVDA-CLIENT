import { useNavigate } from 'react-router-dom';
import { addFile, createInventory, deleteFile, downloadReport, finalizeInventory, updateInventory, updateInventoryFile } from '../actions/inventoryActions';
import { useContext } from 'react';
import { UIContext } from '../context/ui/UIContext';
import { InventoryContext } from '../context/inventory/InventoryContext';


export const useInventory = () => {

    const navigate = useNavigate()
    const { startLoading, stopLoading } = useContext(UIContext);
    const { dispatch, inventory, file } = useContext(InventoryContext);

    const handleCreateInventory = async (data) => {
        startLoading();
        const inventory = await createInventory(data);
        if (inventory) navigate(`/auth/user/inventories/edit/${inventory?.inventoryId}`);
        stopLoading();
    }

    const handleUpdateInventory = async (id, data) => {
        startLoading();
        if (await updateInventory(id, data)) navigate(-1);
        stopLoading();
    }

    const handleCreateFile = async (inventoryId, data) => {
        startLoading();
        if (await addFile(inventoryId, data)) dispatch({ type: 'add_file', payload: data });
        stopLoading();
    }

    const handleUpdateFile = async (inventoryId, fileId, data) => {
        startLoading();
        if (await updateInventoryFile(inventoryId, fileId, data)) dispatch({ type: 'update_file', payload: { data, fileId } });
        stopLoading();
    }

    const handleDeleteFile = async () => {
        startLoading();
        if (await deleteFile(inventory?.inventory_id?.id, file?.id)) dispatch({ type: 'remove_file', payload: file?.id });
        stopLoading();
    }

    const handleFinalizeInventory = async () => {
        startLoading();
        if (await finalizeInventory(inventory?.id)) dispatch({ type: 'finalize_inventory', payload: inventory.id });
        stopLoading();

    }

    const handleGenerateReport = async (id) => {
        startLoading();
        await downloadReport(id);
        stopLoading();
    }


    const clearCurrentFileCache = () => dispatch({ type: 'clear_current_file_cache' });

    return {
        handleCreateInventory,
        handleUpdateInventory,
        handleDeleteFile,
        handleCreateFile,
        handleFinalizeInventory,
        handleGenerateReport,
        handleUpdateFile,
        clearCurrentFileCache
    }
}
