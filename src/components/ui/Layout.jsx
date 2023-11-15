import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { useContext } from "react"
import { AuthContext } from "../../context/auth/AuthContext"

export const Layout = ({ children }) => {

    const { user } = useContext(AuthContext);

    return (
        <main>
            <Navbar isBordered>
                <NavbarContent as="div" className="items-center" justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                name={user.name + user.last_name}
                                size="sm"
                                src={`https://ui-avatars.com/api/?background=random&name=${user?.name} ${user?.last_name}`}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">{user.email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">Mi Perfil</DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
            {children}
        </main>
    )
}
