import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { useContext } from "react"
import { AuthContext } from "../../context/auth/AuthContext"
import { MoonIcon } from "../icons";

export const Layout = ({ children }) => {

    const { user } = useContext(AuthContext);

    return (
        <main className="dark text-foreground bg-background min-h-screen px-5 [&>section]:lg:px-20 [&>section]:pt-10 [&>section]:lg:pt-20">
            <Navbar isBordered>
                <NavbarContent as="div" className="items-center" justify="end">
                    <Button isIconOnly size="sm" radius="full"  color="default" variant="faded" aria-label="dark">
                        <MoonIcon width={15} height={15}/>
                    </Button>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform "
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