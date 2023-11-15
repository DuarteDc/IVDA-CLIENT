import { useContext, useEffect } from "react"
import { UsersContext } from "../../context/users/UsersContext"
import { UsersTable } from "../../components/users/UsersTable";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { PlusIcon } from "../../components/icons";
import { Link } from "react-router-dom";

const Users = () => {

    const { users, totalPages } = useContext(UsersContext);

    return (
        <section className="min-h-screen mt-20 px-5">
            <h1 className="text-center text-5xl font-bold mb-10">Lista de usuarios</h1>
            <div className="flex justify-end px-5 lg:px-20 my-10">
                <Button color="primary" startContent={<PlusIcon />}>
                    Crear Usuario
                </Button>
            </div>
            <div className="px-5 flex flex-col flex-wrap gap-4 mb-5">
                <Breadcrumbs radius="lg" variant="bordered" color="primary">
                    <BreadcrumbItem>
                        <Link to="/">
                            Inicio
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Usuarios</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <UsersTable users={users} totalPages={totalPages} />
        </section>
    )
}

export default Users

