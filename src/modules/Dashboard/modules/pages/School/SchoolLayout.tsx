import React from 'react'
import SchoolSetup from './SchoolSetup'
import SchoolTable from './SchoolTable'
import SchoolBanner from './SchoolBanner'
import '../../components/Layout.scss'

const SchoolLayout = () => {
    return (
        <div className='dash-container'>
            <SchoolBanner />
            <SchoolSetup />
            <SchoolTable />
        </div>
    )
}

export default SchoolLayout