import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <section class="container mx-auto text-center flex items-center flex-col justify-center min-h-screen font-Poppins">
            <div class="w-full grid-cols-1 md:grid md:grid-cols-2 flex items-center justify-center">
                <div class="w-full hidden md:block">
                    <img
                        src="/assets/NotFound.svg"
                        width={700}
                        height={600}
                        alt="Build"
                    />
                </div>
                <div>
                    <h1 class="text-9xl md:lg:text-[200px] xl:text-[300px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">404</h1>
                    <h2 class="text-xl lg:text-4xl uppercase">Página no econtrada</h2>
                    <p class="my-5 text-sm lg:text-base">Opps, la página que buscas no esta disponible por el momento</p>
                    <Link to="/">
                        <button class="px-10 py-4 rounded-full text-white font-bold mt-10 bg-primary shadow-xl">
                            Volver al inicio
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
