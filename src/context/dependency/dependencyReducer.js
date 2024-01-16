

export const dependencyReducer = (state, { type, payload }) => {
    switch (type) {

        case 'start_get_dependencies':
            return {
                ...state,
                dependencies: payload.dependencies,
                totalPages: payload.totalPages,
            }

        case 'get_current_dependency':
            return {
                ...state,
                dependency: state.dependencies.find(dependency => dependency.id === payload),
            }

        case 'get_dependency':
            return {
                ...state,
                dependency: payload
            }

        case 'clear_dependency_cache':
            return {
                ...state,
                dependency: {}
            }

        case 'change_status_dependency':
            return {
                ...state,
                dependencies: state.dependencies.map(dependency => dependency.id === payload ? { ...dependency, status: dependency.status = !dependency.status } : dependency)
            }

        default:
            return state;
    }
}
