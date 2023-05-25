import React, { useState } from 'react'
import UserSetup from './UserSetup'
import UserTable from './UserTable'
import '../../components/Layout.scss'

const UserLayout = () => {
    const [update, setUpdate] = useState<boolean>(false)
    const [viewSetup, setViewSetup] = useState<boolean>(false)
    const [viewBanner, setViewBanner] = useState<boolean>(true)
    function updateUserData() {
        setUpdate((prev: boolean) => !prev)
    }
    return (
        <div className='dash-container'>
            {viewSetup &&
                <UserSetup
                    setViewSetup={setViewSetup}
                    updateUserData={updateUserData}
                />}
            <UserTable
                setViewSetup={setViewSetup}
                updateUserData={updateUserData}
                updated={update}
            />
        </div>
    )
}

export default UserLayout