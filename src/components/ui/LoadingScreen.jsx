import { Spinner } from '@nextui-org/react'

export const LoadingScreen = () => {
    return (
        <section className="transition-all duration-400 ease-in-out overscroll-none min-h-screen flex flex-col justify-center items-center top-0 bottom-0 left-0 fixed w-full z-[999]  bg-slate-200/60  dark:bg-black/80 ">
            <Spinner color="primary" />
            <span className="black:text-white">Cargando . . .</span>
        </section>
    )
}
