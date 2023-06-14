import React, { useEffect, useState } from 'react'
import UserSetup from './UserSetup'
import UserTable from './UserTable'
import '../../components/Layout.scss'

const UserLayout = () => {
    const [update, setUpdate] = useState<boolean>(false)
    const [viewSetup, setViewSetup] = useState<boolean>(false)
    const [updateUser, setUpdateUser] = useState<any>({})
    function updateUserData() {
        setUpdate((prev: boolean) => !prev)
    }
    useEffect(() => {
        if (updateUser.id) {
            setViewSetup(true)
        }
    }, [updateUser])
    return (
        <div className='dash-container'>
            {viewSetup &&
                <UserSetup
                    setViewSetup={setViewSetup}
                    updateUserData={updateUserData}
                    updateUser={updateUser}
                    resetUpdateUser={() => setUpdateUser({} as any)}
                />}
            <UserTable
                setViewSetup={setViewSetup}
                updateUserData={updateUserData}
                updated={update}
                setUpdateUser={setUpdateUser}
            />
        </div>
    )
}

export default UserLayout