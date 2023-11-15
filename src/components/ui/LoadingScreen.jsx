import { Dna } from 'react-loader-spinner';

export const LoadingScreen = () => {
    return (
        <section className="min-h-screen flex justify-center items-center bg-black/90 fixed w-full">
            <Dna
                visible={true}
                height="250"
                width="250"
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
            />
        </section>
    )
}
