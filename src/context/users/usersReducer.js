export const usersReducer = (state, { type, payload }) => {

    switch (type) {

        case 'get_users': {
            return {
                ...state,
                users: payload?.users,
                totalPages: payload?.totalPages,
            }
        }

        case 'set_users': {
            return {
                ...state,
                currentUser: state.users.find(user => user.id === payload),
            }
        }

        case 'delete_user': {
            return {
                ...state,
                users: state.users.map(user => user.id === payload.id ? { ...user, status: user.status = false } : user)
            }
        }


        case 'active_user': {
            return {
                ...state,
                users: state.users.map(user => user.id === payload.id ? { ...user, status: user.status = true } : user)
            }
        }

    }

}
