import { ThreeDots } from 'react-loader-spinner'

export const LoadingScreen = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-[#0067D5]/10 fixed w-full z-[999] blur-sm">
            <ThreeDots
                height="100"
                width="200"
                radius="9"
                color="#1888FF"
                ariaLabel="three-dots-loading"
                visible={true}
            />
        </section>
    )
}
