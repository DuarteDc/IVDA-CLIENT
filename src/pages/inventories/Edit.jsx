import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { BuildingComunity, HomeIcon } from "../../components/icons"


export const EditInventory = () => {
    return (
        <section className="min-h-screen overflow-hidden">
            <h1 className="text-center text-4xl  md:text-5xl font-bold uppercase pb-5 md:pb-10">Editar Inventario</h1>
            <div className="px-5 flex flex-col flex-wrap gap-4 my-2 md:my-20">
                <Breadcrumbs radius="lg" variant="solid" color="foreground">
                    <BreadcrumbItem>
                        <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
                            <HomeIcon width={20} height={20} />
                            Inicio
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/auth/subsecretaries" className="flex items-center [&>:first-child]:mr-2">
                            <BuildingComunity width={20} height={20} />
                            Inventarios
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Editar</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            
        </section>
    )
}
