import { getAllSubsecretaries } from "../actions/subsecretariesActions"

export const useSubsecretaries = () => {

    const getAllActiveSubsecretaries = async() => await getAllSubsecretaries();

    return {
        getAllActiveSubsecretaries,
    }
}
