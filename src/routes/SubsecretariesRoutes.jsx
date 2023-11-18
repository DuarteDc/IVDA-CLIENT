import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Subsecretaries from '../pages/subsecretaries/Index'
import { SubsecretaryProvider } from '../context/subsecretary/SubsecretaryProvider'
import { Subsecretary } from '../pages/subsecretaries/Show'
import { CreateSubsecretary } from '../pages/subsecretaries/Create'

export const SubsecretariesRoutes = () => {
    return (
        <SubsecretaryProvider>
            <Routes>
                <Route path="/*" element={
                    <Routes>
                        <Route path="/" element={<Subsecretaries />} />
                        <Route path="/:id" element={<Subsecretary />} />
                        <Route path="/create" element={<CreateSubsecretary />} />
                    </Routes>
                }
                />
            </Routes>
        </SubsecretaryProvider>
    )
}
