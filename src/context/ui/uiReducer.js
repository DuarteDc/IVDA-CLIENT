export const uiReducer = (state, { type, payload }) => {

    switch(type) {

        case 'change_theme': 
            return {
                ...state,
                theme: payload
            }

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
