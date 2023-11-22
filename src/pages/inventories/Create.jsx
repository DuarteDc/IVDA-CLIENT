import { BreadcrumbItem, Breadcrumbs, Input } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { HomeIcon, UsersIcon } from "../../components/icons"

export const CreateInventory = () => {
  return (
    <section className="min-h-screen lg:px-10">
      <h1 className="text-center text-5xl font-bold uppercase pb-10">Crear Inventario</h1>
      <div className="px-5 flex flex-col flex-wrap gap-4 mb-5">
        <Breadcrumbs radius="lg" variant="solid" color="foreground">
          <BreadcrumbItem>
            <Link to="/auth" className="flex items-center [&>:first-child]:mr-2">
              <HomeIcon width={20} height={20} />
              Inicio
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/auth/users" className="flex items-center [&>:first-child]:mr-2">
              <UsersIcon width={20} height={20} />
              Usuarios
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Crear</BreadcrumbItem>
        </Breadcrumbs>
      </div>


      <div className="grid grid-cols-3 mt-28 gap-10">
        <Input
          name="name"
          type="text"
          label="Nombre"
          variant="bordered"
          // value={formik.values.name}
          // isInvalid={formik.touched.name && formik.errors.name ? true : false}
          // errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
          // required={true}
          // onChange={formik.handleChange}
          size="lg"
        />
        <Input
          name="name"
          type="text"
          label="Nombre"
          variant="bordered"
          // value={formik.values.name}
          // isInvalid={formik.touched.name && formik.errors.name ? true : false}
          // errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
          // required={true}
          // onChange={formik.handleChange}
          size="lg"
        />
        <Input
          name="name"
          type="text"
          label="Nombre"
          variant="bordered"
          // value={formik.values.name}
          // isInvalid={formik.touched.name && formik.errors.name ? true : false}
          // errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
          // required={true}
          // onChange={formik.handleChange}
          size="lg"
        />
        

      </div>
    </section>
  )
}
