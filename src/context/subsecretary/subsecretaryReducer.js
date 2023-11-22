

export const subsecretaryReducer = (state, { type, payload }) => {

    switch (type) {
        case 'start_get_subsecretaries':
            return {
                ...state,
                subsecretaries: payload.subsecretaries,
                totalPages: payload?.totalPages,
            }


        case 'get_current_subsecretary':
            return {
                ...state,
                subsecretary: state.subsecretaries.find(subsecretary => subsecretary.id === payload),
            }

        case 'start_get_subsecretary':
            return {
                ...state,
                subsecretary: payload.subsecretary,
                enable_administrative_units: payload.enable_administrative_units,
                disable_administrative_units: payload.disable_administrative_units,
            }

        case 'disable_subsecretary': {
            return {
                ...state,
                subsecretaries: state.subsecretaries.map(subsecretary => subsecretary.id === payload ? { ...subsecretary, status: subsecretary.status = !subsecretary.status } : subsecretary)
            }
        }


        case 'enable_subsecretary': {
            return {
                ...state,
                subsecretaries: state.subsecretaries.map(subsecretary => subsecretary.id === payload ? { ...subsecretary, status: subsecretary.status = !subsecretary.status } : subsecretary)
            }
        }

        default:
            return state;

    }

}
