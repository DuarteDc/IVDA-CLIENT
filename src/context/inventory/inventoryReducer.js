
export const inventoryReducer = (state, { type, payload }) => {

    switch (type) {

        case 'start_get_inventories':
            return {
                ...state,
                inventories: payload.inventories,
                totalPages: payload.totalPages,
            }

        case 'start_get_inventory': {
            const { body, ...res } = payload;

            return {
                ...state,
                inventory: res,
                files: body || []
            }
        }

        case 'clear_inventory_cache':
            return {
                ...state,
                inventory: {}
            }

        case 'get_current_inventory':
            return {
                ...state,
                inventory: state.inventories.find(inventory => inventory.id === payload),
            }

        case 'finalize_inventory':
            return {
                ...state,
                inventories: state.inventories.map(inventory => inventory.id === payload ? { ...inventory, status: inventory.status = !inventory.status } : inventory)
            }

        case 'get_current_file':
            return {
                ...state,
                file: state.files.find(file => file.id === payload),
            }

        case 'add_file':
            return {
                ...state,
                files: [...state.files, { no: state.files?.length + 1, ...payload }]
            }

        case 'update_file':
            return {
                ...state,
                files: state.files.map(file => file.id == payload.fileId ? { ...payload.data, 'id': file.id, no: file.no } : file),
            }

        case 'remove_file':
            return {
                ...state,
                file: {},
                files: state.files.filter(file => file.id !== payload).map((file, index) => {
                    file.no = index + 1;
                    return file;
                })
            }

        case 'get_inventory_by_user':
            const { body, ...res } = payload;

            return {
                ...state,
                inventory: res,
                files: body || []
            }


        case 'clear_current_file_cache':
            return {
                ...state,
                file: []
            }

        default: state;
    }


}
