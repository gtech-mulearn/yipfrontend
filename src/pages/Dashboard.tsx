import React, { useEffect } from 'react'
import { BottomTab, LeftDrawer } from '../components/Navbar/Navbar'
import Banner from '../components/Banner/Banner'
import './Dashboard.scss'
import { getCurrentPageUtils, requirementSatisfied, updater } from '../utils/utils'
import Table from '../components/Table/Table'
import Setup from '../components/Setup/Setup'
const Dashboard = () => {

    return (
        <>
            <LeftDrawer />
            <div className='dash-container'>
                {requirementSatisfied(getCurrentPageUtils().content) && <Banner />}
                {<Setup />}
                <Table />
            </div>
            <BottomTab />
        </>
    )
}

export default Dashboard