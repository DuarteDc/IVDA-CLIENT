import { useContext } from 'react'
import { Avatar } from '@nextui-org/react';
import { AuthContext } from "../../context/auth/AuthContext"

export const Profile = () => {

    const { user } = useContext(AuthContext);
    return (
        <section>
            <div className="bg-blue-600/50 rounded-lg flex items-center p-16">
                <Avatar src={`https://ui-avatars.com/api/?background=random&name=${user?.name} ${user?.last_name}`} className="w-48 h-48 text-large" />
                <div className="[&>span]:block mx-5 text-2xl [&>:last-child]:text-sm [&>:last-child]:font-light">
                    <span>{user?.name} {user?.last_name}</span>
                    <span>{user?.email}</span>
                </div>
            </div>
        </section>
    )
}

