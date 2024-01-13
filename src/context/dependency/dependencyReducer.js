

export const dependencyReducer = (state, { type, payload }) => {
    switch (type) {

        case 'start_get_dependencies':
            return {
                ...state,
                administrativeUnits: payload.administrative_units,
                totalPages: payload.totalPages,
            }

        case 'get_current_administrative_unit':
            return {
                ...state,
                currentAdministrativeUnit: state.administrativeUnits.find(administrativeUnit => administrativeUnit.id === payload),
            }

        case 'get_one_administrative_unit':
            return {
                ...state,
                currentAdministrativeUnit: payload
            }

        case 'change_status_administrative_unit':
            return {
                ...state,
                administrativeUnits: state.administrativeUnits.map(unit => unit.id === payload ? { ...unit, status: unit.status = !unit.status } : unit)
            }

        default:
            return state;
    }
}
