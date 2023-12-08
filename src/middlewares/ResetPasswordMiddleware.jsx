import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Card, CardBody, Skeleton } from '@nextui-org/react';



export const ResetPasswordMiddleware = ({ children }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const { startVerifyTokenToResetPassword } = useAuth();

  const [response, setResponse] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(prev => !prev);
    startVerifyTokenToResetPassword(searchParams.get('key'), searchParams.get('email')).then(setResponse).finally(setLoading(prev => !prev));
  }, []);

  return (
    <>
      {
        loading || Object.keys(response).length <= 0 ?
          <section className="min-h-screen flex flex-col items-center justify-center  p-5 relative overflow-hidden">
            <span className="w-[200px] h-[100px] lg:w-[400px] lg:h-[200px] rounded-3xl -rotate-45 bg-blue-600/10 shadow-[0_10px_150px_20px_rgba(30,64,175,0.5)] absolute bottom-0 -left-20 lg:-left-24"></span>
            <span className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-md rotate-45 bg-blue-600/80  absolute lg:bottom-48 lg:left-40 bottom-20 left-16"></span>

            <span className="w-[200px] h-[200px] lg:w-[600px] lg:h-[600px] rounded-3xl rotate-45 border-blue-600/50 border-2 absolute top-10 -right-20 lg:-right-40"></span>
            <span className="w-[200px] h-[200px] lg:w-[600px] lg:h-[600px] rounded-3xl rotate-45 bg-blue-600/10 shadow-[0_10px_150px_20px_rgba(30,64,175,0.5)] absolute top-0 -right-20 lg:-right-40 z-10"></span>
            <span className="w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] rounded-md rotate-45 bg-blue-600/80  absolute lg:top-40 top-10 lg:right-80 right-16 z-20"></span>
            <Skeleton className="w-full lg:w-5/12 rounded-xl h-[24rem]" />
          </section>

          : response.status === 200 ? children : <Navigate to="/" replace />
      }
    </>
  )
}
