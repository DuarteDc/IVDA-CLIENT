import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateInventory, Inventories, EditInventory, Inventory } from '../pages/inventories';

export const InventoriestRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={
                <Routes>
                    <Route path="/" element={<Inventories />} />
                    <Route path="/:id" element={<Inventory />} />
                    <Route path="/edit/:id" element={<EditInventory />} />
                    <Route path="/create" element={<CreateInventory />} />
                </Routes>
            }
            />
        </Routes>
    )
}
