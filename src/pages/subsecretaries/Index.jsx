import { BreadcrumbItem, Breadcrumbs, Button } from '@nextui-org/react'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon } from '../../components/icons'
import { SubsecretaryContext } from '../../context/subsecretary/SubsecretaryContext'
import { SubsecretariesTable } from '../../components/subsecretaries/SubsecretariesTable'

const Subsecretaries = () => {

    const { startGetSubsecretaries, subsecretaries } = useContext(SubsecretaryContext);

    useEffect(() => {
        startGetSubsecretaries();
    }, []);

    return (
        <section>
            <h1 className="text-center text-5xl font-bold pb-10 uppercase">Lista de subsecretarias</h1>
            <div className="flex justify-end py-10">
                <Button color="primary" startContent={<PlusIcon />}>
                    <Link to="/auth/users/create">
                        Crear Usuario
                    </Link>
                </Button>
            </div>
            <div className="flex flex-col flex-wrap gap-4 mb-5">
                <Breadcrumbs radius="lg" variant="bordered" color="primary">
                    <BreadcrumbItem>
                        <Link to="/auth">
                            Inicio
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Subsecretarias</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <SubsecretariesTable subsecretaries={subsecretaries} />
        </section>
    )
}

export default Subsecretaries