export const authReducer = (state, { type, payload }) => {

    switch (type) {

        case 'login': {
            return {
                ...state,
                logged: true,
                user: payload,
            }
        }

        case 'logout':
            return {
                ...state,
                logged: false,
                user: {}
            }

        case 'update_profile':
            return {
                ...state,
                user: payload
            }

        default:

            return state;


    }

}
