import { Card, CardBody, Chip, User } from "@nextui-org/react"

export const UsersList = ({ users }) => {
    return (
        <Card>
            <CardBody>
                {
                    users?.map(({ name, last_name, email, status, role }) => (
                        <span className="flex items-center justify-between my-2">
                            <User
                                name={`${name} ${last_name}`}
                                description={email}
                                avatarProps={{ radius: "lg", src: `https://ui-avatars.com/api/?background=random&name=${name} ${last_name}` }}
                            />
                            <Chip className="capitalize" color={`${status ? 'success' : 'warning'}`} size="sm" variant="flat">
                                {
                                    status ? 'Activo' : 'Inactivo'
                                }
                            </Chip>

                            <Chip className="capitalize" color={`${role === '0' ? 'primary' : 'secondary'}`} size="sm" variant="shadow">
                                {
                                    role === '0' ? 'Usuario' : 'Administrador'
                                }
                            </Chip>
                        </span>
                    ))
                }
            </CardBody>
        </Card>
    )
}
