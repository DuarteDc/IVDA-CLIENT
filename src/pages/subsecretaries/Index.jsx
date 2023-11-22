import { BreadcrumbItem, Breadcrumbs, Button, useDisclosure } from '@nextui-org/react'
import React, { useContext, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AlertCircleIcon, HomeIcon, PlusIcon } from '../../components/icons'
import { SubsecretaryContext } from '../../context/subsecretary/SubsecretaryContext'
import { SubsecretariesTable } from '../../components/subsecretaries/SubsecretariesTable'
import { AlertModal } from '../../components/ui/AlertModal'
import { useSubsecretaries } from '../../hooks/useSubsecretaries'

const Subsecretaries = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [searchParams, setSearchParams] = useSearchParams();

    const { startGetSubsecretaries, totalPages, subsecretaries, subsecretary, getCurrentSubsecretary } = useContext(SubsecretaryContext);
    const { handleChangeStatus } = useSubsecretaries();

    useEffect(() => {
        startGetSubsecretaries(searchParams);
    }, [searchParams]);


    console.log({searchParams});

    return (
        <section>
            <h1 className="text-center text-4xl md:text-5xl font-bold pb-10 uppercase">Subsecretarias</h1>
            <div className="flex justify-end py-10">
                <Button color="primary" startContent={<PlusIcon />}>
                    <Link to="/auth/subsecretaries/create">
                        Crear Subsecretaría
                    </Link>
                </Button>
            </div>
            <div className="flex flex-col flex-wrap gap-4 mb-5">
                <Breadcrumbs radius="lg" variant="solid" color="foreground">
                    <BreadcrumbItem>
                        <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
                            <HomeIcon width={20} height={20} />
                            Inicio
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Subsecretarias</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <SubsecretariesTable subsecretaries={subsecretaries} totalPages={totalPages} openAlert={onOpen} getCurrentSubsecretary={getCurrentSubsecretary} setSearchParams={setSearchParams} />
            {
                isOpen && (
                    <AlertModal
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onOpenChange={onOpenChange}
                        callback={handleChangeStatus}
                    >
                        <div className="flex flex-col items-center font-bold justify-center text-center">
                            {
                                subsecretary.status ? (
                                    <span className="text-red-600">
                                        <AlertCircleIcon width={50} height={50} />
                                    </span>
                                ) : (
                                    <span className="text-blue-600">
                                        <AlertCircleIcon width={50} height={50} />
                                    </span>
                                )
                            }
                            <p>Antest de continuar.</p>
                            {
                                subsecretary.status ? <p>¿Esta seguro que sea eliminar la subsecretaria <b>{subsecretary?.name}</b>?</p> : <p>¿Esta seguro que sea activar la subsecretaria  <b>{subsecretary?.name}</b>?</p>
                            }
                        </div>
                    </AlertModal>
                )
            }
        </section>
    )
}

export default Subsecretaries