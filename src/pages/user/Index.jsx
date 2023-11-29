import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { InventoryContext } from '../../context/inventory/InventoryContext';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export const User = () => {

    const { user } = useContext(AuthContext);
    const { startGetInventoryByUser, inventory } = useContext(InventoryContext);
    const navigate = useNavigate();

    useEffect(() => {
        startGetInventoryByUser();
    }, []);

    return (
        <section className="flex items-center min-h-screen justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full  max-w-[1800px]">
            <div className="mt-10 [&>div>div>form>*]:my-5 [&>div>div>form]:md:px-5 [&>div>div]:py-10 md:px-5 text-center lg:text-left">
                <h1 className="text-6xl lg:text-8xl xl:text-9xl mb-10 font-bold text-blue-600">Bienvenido</h1>
                <h2 className="text-4xl lg:text-6xl xl:text-8xl font-bold">{user?.name} {user?.last_name}</h2>
                <div>
                    {
                        Object.keys(inventory).length > 0 ? (
                            <div className="mt-20 flex flex-col">
                                <img
                                    src="/assets/inventories.svg"
                                    width={700}
                                    height={600}
                                    alt="Build"
                                    className="block lg:hidden"
                                />
                                <span className="my-5 text-gray-500 text-lg">
                                    Parece que hay un inventario en proceso, haz clic para ver
                                </span>
                                <Button color="primary" size="lg" className="py-7 lg:py-9 font-bold" onClick={()=> navigate(`/auth/user/inventory/${inventory.inventory_id?.id}`)}>
                                    Ver
                                </Button>
                            </div>
                        ) : (
                            <div className="mt-20 flex flex-col">
                                <img
                                    src="/assets/search.svg"
                                    width={700}
                                    height={600}
                                    alt="Build"
                                    className="block lg:hidden"
                                />
                                <span className="mt-8 text-gray-500 text-lg">
                                    Al Parece no hay inventarios disponibles
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="hidden lg:flex justify-center items-center w-full">
                <img
                    src="/assets/home.svg"
                    width={700}
                    height={600}
                    alt="Build"
                />
            </div>
            </div>
        </section>
    )
}
