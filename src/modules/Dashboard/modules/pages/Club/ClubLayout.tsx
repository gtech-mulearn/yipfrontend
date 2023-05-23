import React from 'react'
import ClubSetup from './ClubSetup'
import ClubTable from './ClubTable'
import ClubBanner from './ClubBanner'
import '../../components/Layout.scss'

const ClubLayout = () => {
    return (
        <div className='dash-container'>
            <ClubBanner />
            <ClubSetup />
            <ClubTable />
        </div>)
}

export default ClubLayout