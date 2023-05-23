import React from 'react'
import Setup from './Setup'
import Table from './Table'
import Banner from './Banner'
import '../../Layout.scss'

const SchoolLayout = () => {
    return (
        <div className='dash-container'>
            <Banner />
            <Setup />
            <Table />
        </div>
    )
}

export default SchoolLayout