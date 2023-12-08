import { useContext, useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UIContext } from '../context/ui/UIContext';
import { Spinner } from '@nextui-org/react';


export const ResetPasswordMiddleware = ({ children }) => {
  const { loading, } = useContext(UIContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const { startVerifyTokenToResetPassword } = useAuth();

  const [response, setResponse] = useState({});

  useEffect(() => {
    startVerifyTokenToResetPassword(searchParams.get('key'), searchParams.get('email')).then(setResponse);
  }, []);

  return (
    <>
      {
        loading || Object.keys(response).length <= 0 ? <></> : response.status === 200 ? children : <Navigate to="/" replace />
      }
    </>
  )
}
