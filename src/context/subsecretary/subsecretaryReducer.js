

export const subsecretaryReducer = (state, { type, payload }) => {

    switch (type) {
        case 'start_get_subsecretaries': 
            return {
                ...state,
                subsecretaries: payload.subsecretaries,
                totalPages: payload?.totalPages,
            }

        
    }

}
