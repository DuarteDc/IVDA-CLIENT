import { useContext, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Card, CardBody, Input, Select, SelectItem, Spinner } from '@nextui-org/react';

import { useInventory } from '../../hooks/useInventory';
import { useDependency } from '../../hooks/useDependency';
import { UIContext } from '../../context/ui/UIContext';

import { createInventoryValidations } from '../../validations/inventoryValidation';

export const FormEditInventory = ({ inventory, subsecretaries }) => {

    const { loading } = useContext(UIContext);
    const { handleUpdateInventory } = useInventory();
    // const { getAdministrativeUnitsBySubsecretary, administrativeUnits = [] } = useDependency();

    const initialValues = {
        subsecretary_id: inventory?.subsecretary_id?.id,
        code: inventory?.inventory_id?.code,
        administrative_unit_id: inventory?.administrative_unit_id.id,
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(createInventoryValidations()),
        onSubmit: (data) => handleUpdateInventory(inventory.id, data),
    });

    // useEffect(( )=> {
    //     getAdministrativeUnitsBySubsecretary(inventory?.subsecretary_id?.id,);
    // }, [])

    return (
        <Card>
            <CardBody>
                <h2 className="text-center text-4xl uppercase my-5">Inventario General de Archivo</h2>
                <div className="flex justify-end text-sm px-6 my-4">
                    <span>Fecha de elavoración:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                </div>
                <form onSubmit={formik.handleSubmit} className="flex flex-wrap lg:flex-nowrap gap-3 lg:gap-5 xl:gap-10">
                    <Select
                        label="Subsecretarias"
                        className="w-full"
                        size="lg"
                        isInvalid={formik.touched.subsecretary_id && formik.errors.subsecretary_id ? true : false}
                        errorMessage={formik.touched.subsecretary_id && formik.errors.subsecretary_id && formik.errors.subsecretary_id}
                        required={true}
                        defaultSelectedKeys={[formik.values.subsecretary_id]}
                        onChange={(event) => { formik.handleChange(event); getAdministrativeUnitsBySubsecretary(event.target.value) }}
                        name="subsecretary_id"
                    >
                        {
                            subsecretaries?.map(({ id, name }) => (
                                <SelectItem value={id} key={id}>
                                    {name}
                                </SelectItem>
                            ))
                        }
                    </Select>
                    {
                        formik.values.subsecretary_id ? (
                            <Select
                                label="Unidad Administrativa"
                                className="w-full"
                                size="lg"
                                isInvalid={formik.touched.administrative_unit_id && formik.errors.administrative_unit_id ? true : false}
                                errorMessage={formik.touched.administrative_unit_id && formik.errors.administrative_unit_id && formik.errors.administrative_unit_id}
                                required={true}
                                defaultSelectedKeys={[formik.values.administrative_unit_id]}
                                onChange={formik.handleChange}
                                name="administrative_unit_id"
                            >
                                {
                                    administrativeUnits?.map(({ id, name }) => (
                                        <SelectItem value={id} key={id}>
                                            {name}
                                        </SelectItem>
                                    ))
                                }
                            </Select>
                        ) : (<span></span>)
                    }
                    <Input
                        name="code"
                        type="text"
                        label="Código Estructural"
                        variant="bordered"
                        value={formik.values.code}
                        isInvalid={formik.touched.code && formik.errors.code ? true : false}
                        errorMessage={formik.touched.code && formik.errors.code && formik.errors.code}
                        required={true}
                        onChange={formik.handleChange}
                        size="lg"
                    />
                    <Button color="primary" type="submit" className="w-full font-bold py-8 " isLoading={loading} spinner={<Spinner color="default" />}>
                        Actualizar Inventario
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}
