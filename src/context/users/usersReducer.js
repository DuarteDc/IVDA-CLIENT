export const usersReducer = (state, { type, payload }) => {

    switch (type) {

        case 'get_users': {
            return {
                ...state,
                users: payload?.users,
                totalPages: payload?.totalPages,
            }
        }
    }

}
