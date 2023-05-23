import React from 'react'
import Setup from './UserSetup'
import Table from './UserTable'
import '../../components/Layout.scss'
const UserLayout = () => {
    return (
        <div className='dash-container'>
            <Setup title='User' />
            <Table />
        </div>
    )
}

export default UserLayout