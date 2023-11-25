import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { UsersTable } from "../users/UsersTable"
import AdministrativeUnitsTable from "../administrative-units/AdministrativeUnitsTable"
import { InventoriesTable } from "../inventories/InventoriesTable"

export const TabsOptions = ({ users, administrativeUnits, inventories }) => {
    return (
        <div className="mt-20">
            <Tabs aria-label="Options">
                <Tab key="users" title="Usuarios">
                    <UsersTable users={users} totalPages={0} />
                </Tab>
                <Tab key="administrative_units" title="Unidades Administrativas">
                    <AdministrativeUnitsTable administrativeUnits={administrativeUnits} showSubsecretary={false} />
                </Tab>
                <Tab key="inventories" title="Inventarios">
                    <InventoriesTable inventories={inventories} totalPages={0} />
                </Tab>
            </Tabs>
        </div>

    )
}
