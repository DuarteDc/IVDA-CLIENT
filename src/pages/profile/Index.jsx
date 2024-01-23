import { useContext } from 'react'
import { Avatar, BreadcrumbItem, Breadcrumbs, Card, CardBody } from '@nextui-org/react';
import { AuthContext } from "../../context/auth/AuthContext"
import { FormEditProfile } from '../../components/profile';
import { HomeIcon } from '../../components/icons';
import { Link } from 'react-router-dom';

export const Profile = () => {

    const { user } = useContext(AuthContext);

    return (
        <section>
            <h1 className="text-center text-5xl font-bold pb-10 uppercase">Mi perfil</h1>
            <div className="flex flex-col flex-wrap gap-4 mb-5">
                <Breadcrumbs radius="lg" variant="solid" color="foreground">
                    <HomeIcon />
                    <BreadcrumbItem>
                        <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
                            <HomeIcon width={20} height={20} />
                            Inicio
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Mi perfil</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 my-20">
                <Card className="flex justify-center items-center p-16 w-full">
                    <Avatar src={`https://ui-avatars.com/api/?background=random&name=${user?.name} ${user?.last_name}`} className="w-48 h-48 text-large" />
                    <div className="[&>span]:block mx-5 text-2xl [&>:last-child]:text-sm [&>:last-child]:font-light mt-5">
                        <span>{user?.name} {user?.last_name}</span>
                        <span>{user?.email}</span>
                    </div>
                </Card>
                <FormEditProfile user={user} />
            </div>
        </section>
    )
}

