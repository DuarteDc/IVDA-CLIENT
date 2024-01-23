import { useContext } from 'react';
import { UIContext } from '../context/ui/UIContext';
import { updateProfile } from '../actions/profileActions';
import { AuthContext } from '../context/auth/AuthContext';

export const useProfile = () => {

    const { startLoading, stopLoading, loading } = useContext(UIContext);
    const { dispatch } = useContext(AuthContext)

    const handleUpdateProfile = async (userId, data) => {
        startLoading();
        const response = await updateProfile(userId, data);
        if (response) dispatch({ type: 'update_profile', payload: response });
        stopLoading();
    }


    return { handleUpdateProfile, loading }
}
