export const uiReducer = (state, { type, payload }) => {

    switch(type) {

        case 'start_loading': {
            return {
                ...state,
                loading: true,
            }
        }

        case 'stop_loading': {
            return {
                ...state,
                loading: false,
            }
        }


    }

}
