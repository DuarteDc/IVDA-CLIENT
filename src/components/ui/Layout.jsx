import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent, NavbarMenuToggle } from '@nextui-org/react'
import { AuthContext } from '../../context/auth/AuthContext'

import { BuildingComunity, FileIcon, HomeCog, HomeIcon, MoonIcon, SunIcon, UsersIcon } from '../icons';
import { UIContext } from '../../context/ui/UIContext';

export const Layout = ({ children }) => {

    const [isOpen, setIsOpen] = useState(true);

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, handleLogout } = useContext(AuthContext);
    const { theme, handleChangeTheme } = useContext(UIContext);

    const toggleDrawer = () => setIsOpen((prevState) => !prevState)

    return (
        <>
            <Navbar
                isBordered
                isMenuOpen={isOpen}
                onMenuOpenChange={setIsOpen}
                maxWidth="full"
            >
                {
                    user?.role === "0" ? (
                        <NavbarContent justify="start">
                            <NavbarMenuToggle aria-label={isOpen ? "Close menu" : "Open menu"} />
                        </NavbarContent>
                    ) : (
                        <NavbarContent justify="start">

                        </NavbarContent>
                    )
                }

                <NavbarContent as="div" className="items-center" justify="center">
                    {
                        theme === 'dark' ? (
                            <Button isIconOnly size="sm" radius="full" color="default" variant="faded" aria-label="dark" onClick={() => handleChangeTheme('light')}>
                                <SunIcon width={20} height={20} />
                            </Button>
                        ) : (
                            <Button isIconOnly size="sm" radius="full" color="default" variant="faded" aria-label="dark" onClick={() => handleChangeTheme('dark')}>
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
                            <DropdownItem key="email" className="h-14 gap-2">
                                <p className="font-semibold">{user?.email}</p>
                            </DropdownItem>
                            {
                                user?.role === "0" && (
                                    <DropdownItem key="profile" onClick={() => navigate('/auth/profile')}>Mi Perfil</DropdownItem>
                                )
                            }
                            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                Cerrar Sesión
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
            <main className={`min-h-screen [&>section]:lg:px-20 [&>section]:pt-10 [&>section]:lg:pt-20 px-2 [&>section]:overflow-hidden`}>
                {
                    user?.role === "0" && (
                        <Drawer
                            open={isOpen}
                            onClose={toggleDrawer}
                            direction="left"
                            size={350}
                            className="px-2"
                            style={{ backgroundColor: `${theme === 'dark' ? 'black' : 'white'}` }}
                            zIndex={20}
                        >
                            <ul className="mt-[5rem] [&>*]:my-5 [&>li>a>svg]:mr-2 [&>li>a]:py-4 [&>li>a]:rounded-lg [&>li>a]:pl-5">

                                <li onClick={toggleDrawer}>
                                    <Link to="/auth" className={`flex items-center transition-all duration-1000 ease-in  ${pathname === '/auth' ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-600/60'}`}>
                                        <HomeIcon width={28} height={24} />
                                        Inicio
                                    </Link>
                                </li>
                                <li onClick={toggleDrawer}>
                                    <Link to="/auth/users" className={`flex items-center  transition-all duration-1000 ease-in   ${pathname.includes('/auth/users') ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-600/60'}`}>
                                        <UsersIcon width={28} height={24} />
                                        Usuarios
                                    </Link>
                                </li>
                                {/* <li onClick={toggleDrawer}>
                                    <Link to="/auth/subsecretaries" className={`flex items-center  transition-all duration-1000 ease-in   ${pathname.includes('/auth/subsecretaries') ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-600/60'}`}>
                                        <BuildingComunity width={28} height={24} />
                                        Subsecretarias
                                    </Link>
                                </li> */}
                                <li onClick={toggleDrawer}>
                                    <Link to="/auth/administrative-units" className={`flex items-center  transition-all duration-1000 ease-in   ${pathname.includes('/auth/administrative-units') ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-600/60'}`}>
                                        <HomeCog width={28} height={24} />
                                        Unidades Administrativas
                                    </Link>
                                </li>
                                <li onClick={toggleDrawer}>
                                    <Link to="/auth/inventories" className={`flex items-center  transition-all duration-1000 ease-in   ${pathname.includes('/auth/inventories') ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-600/60'}`}>
                                        <FileIcon width={28} height={24} />
                                        Inventarios
                                    </Link>
                                </li>
                            </ul>
                        </Drawer>
                    )
                }
                {children}
            </main>
        </>
    )
}
