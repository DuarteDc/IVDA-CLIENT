
export const inventoryReducer = (state, { type, payload }) => {

    switch (type) {

        case 'start_get_inventories':
            return {
                ...state,
                inventories: payload.inventories,
                totalPages: payload.totalPages,
            }

        case 'start_get_inventory':
            return {
                ...state,
                inventory: payload
            }

        default: state;
    }


}
