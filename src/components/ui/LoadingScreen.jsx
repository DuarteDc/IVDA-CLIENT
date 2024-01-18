import { Spinner } from '@nextui-org/react'

export const LoadingScreen = () => {
    return (
        <section className="transition-all duration-400 ease-in-out overscroll-none min-h-screen flex flex-col justify-center items-center bg-black/90 top-0 bottom-0 left-0 fixed w-full z-[999]">
            <img src="https://github.githubassets.com/assets/mona-loading-dark-7701a7b97370.gif" loading="eager" width={50} height={50} />
            <span>Cargando . . .</span>
        </section>
    )
}
