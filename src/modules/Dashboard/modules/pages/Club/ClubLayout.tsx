import React, { useState } from 'react'
import ClubSetup from './ClubSetup'
import ClubTable from './ClubTable'
import ClubBanner from './ClubBanner'
import '../../components/Layout.scss'

const ClubLayout = () => {
    const [update, setUpdate] = useState<boolean>(false)
    const [viewSetup, setViewSetup] = useState<boolean>(false)
    const [viewBanner, setViewBanner] = useState<boolean>(true)
    function updateClubData() {
        setUpdate((prev: boolean) => !prev)
    }
    return (
        <div className='dash-container'>
            <ClubBanner updated={update} />
            {viewSetup && <ClubSetup setViewSetup={setViewSetup}
                updateClubData={updateClubData} />}
            <ClubTable
                setViewSetup={setViewSetup}
                updateClubData={updateClubData}
                updated={update}
            />
        </div>)
}

export default ClubLayout