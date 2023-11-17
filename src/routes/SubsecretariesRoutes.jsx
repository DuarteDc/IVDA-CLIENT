import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Subsecretaries from '../pages/subsecretaries/Index'
import { SubsecretaryProvider } from '../context/subsecretary/SubsecretaryProvider'

export const SubsecretariesRoutes = () => {
    return (
        <SubsecretaryProvider>
            <Routes>
                <Route path="/*" element={
                    <Routes>
                        <Route path="/" element={<Subsecretaries />} />
                    </Routes>
                }
                />
            </Routes>
        </SubsecretaryProvider>
    )
}
