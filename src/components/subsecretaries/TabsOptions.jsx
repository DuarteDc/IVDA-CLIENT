import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { UsersTable } from "../users/UsersTable"
import AdministrativeUnitsTable from "../administrative-units/AdministrativeUnitsTable"

export const TabsOptions = ({ users, administrativeUnits }) => {
    return (
        <div className="mt-20">
            <Tabs aria-label="Options">
                <Tab key="users" title="Usuarios">
                    <UsersTable users={users} totalPages={0} />
                </Tab>
                <Tab key="administrative_units" title="Unidades Administrativas">
                    <AdministrativeUnitsTable administrativeUnits={administrativeUnits} />
                </Tab>
                <Tab key="inventories" title="Inventarios">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>

    )
}
