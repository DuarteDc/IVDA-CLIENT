import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateInventory, Inventories, EditInventory, Inventory } from '../pages/inventories';
import { NotFound } from '../pages/404/Index';

export const InventoriestRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={
                <Routes>
                    <Route path="/" element={<Inventories />} />
                    <Route path="/:id" element={<Inventory />} />
                    <Route path="/edit/:id" element={<EditInventory />} />
                    <Route path="/create" element={<CreateInventory />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            }
            />
        </Routes>
    )
}
