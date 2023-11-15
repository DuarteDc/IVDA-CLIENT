export const authReducer = (state, { type, payload }) => {

    switch(type) {

        case 'login': {
            return {
                ...state,
                logged: true,
                user: payload,
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
