import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateInventory } from '../pages/inventories';

export const InventoriestRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={
                <Routes>
                    <Route path="/create" element={<CreateInventory />} />
                </Routes>
            }
            />
        </Routes>
    )
}
