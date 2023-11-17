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

        case 'start_screen_loading': {
            return {
                ...state,
                screenLoading: true,
            }
        }

        case 'stop_screen_loading': {
            return {
                ...state,
                screenLoading: false,
            }
        }

        default:
            return state;


    }

}
