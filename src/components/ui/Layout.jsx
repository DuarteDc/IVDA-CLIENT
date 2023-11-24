import { useContext } from 'react'
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent } from '@nextui-org/react'
import { AuthContext } from '../../context/auth/AuthContext'

import { MoonIcon, SunIcon } from '../icons';
import { UIContext } from '../../context/ui/UIContext';


export const Layout = ({ children }) => {

    const { theme, handleChangeTheme } = useContext(UIContext);
    const { user } = useContext(AuthContext);

    return (
        <main className={`${theme} text-foreground bg-background min-h-screen [&>section]:lg:px-20 px-2 [&>section]:pt-10 [&>section]:lg:pt-20 [&>section]:overflow-hidden`}>
            <Navbar isBordered>
                <NavbarContent as="div" className="items-center" justify="end">
                    {
                        theme === 'dark' ? (
                            <Button isIconOnly size="sm" radius="full" color="default" variant="faded" aria-label="dark" onClick={()=>handleChangeTheme('light')}>
                                <SunIcon width={20} height={20} />
                            </Button>
                        ) : (
                            <Button isIconOnly size="sm" radius="full" color="default" variant="faded" aria-label="dark" onClick={()=>handleChangeTheme('dark')}>
                                <MoonIcon width={15} height={15} />
                            </Button>
                        )
                    }

                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform "
                                name={user?.name + user?.last_name}
                                size="sm"
                                src={`https://ui-avatars.com/api/?background=random&name=${user?.name} ${user?.last_name}`}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">{user?.email}</p>
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
