import React, { useEffect } from 'react'
import Banner from '../components/Banner/Banner'
import './Dashboard.scss'
import { getCurrentPageUtils, requirementSatisfied, updater } from '../utils/utils'
import Table from '../components/Table/Table'
import { LeftDrawer } from '../modules/Dashboard/components/Navbar/LeftDrawer'
import { BottomTab } from '../modules/Dashboard/components/Navbar/Bottom'
import Setup from '../modules/Dashboard/components/Setup/Setup'
const Dashboard = () => {

    return (
        <>
            < LeftDrawer />
            <div className='dash-container'>
                {requirementSatisfied(getCurrentPageUtils().content) && <Banner />}
                <Setup />
                <Table />
            </div>
            <BottomTab />
        </>
    )
}

export default Dashboard 