import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Subsecretaries from '../pages/subsecretaries/Index'
import { SubsecretaryProvider } from '../context/subsecretary/SubsecretaryProvider'
import { Subsecretary } from '../pages/subsecretaries/Show'
import { CreateSubsecretary } from '../pages/subsecretaries/Create'
import { EditSubsecretary } from '../pages/subsecretaries/Edit'
import { NotFound } from '../pages/404/Index'

export const SubsecretariesRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={
                <Routes>
                    <Route path="/" element={<Subsecretaries />} />
                    <Route path="/:id" element={<Subsecretary />} />
                    <Route path="/edit/:id" element={<EditSubsecretary />} />
                    <Route path="/create" element={<CreateSubsecretary />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            }
            />
        </Routes>
    )
}
