export const authReducer = (state, { type, payload }) => {

    switch(type) {

        case 'login': {
            return {
                ...state,
                logged: true,
                user: payload,
            }
        }
        default:
            return state;


    }

}
