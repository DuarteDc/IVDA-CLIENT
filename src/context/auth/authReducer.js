export const authReducer = (state, { type, payload }) => {

    switch(type) {

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

        default:
            
            return state;


    }

}
