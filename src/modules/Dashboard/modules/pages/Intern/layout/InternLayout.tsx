import React, { useState } from 'react'
import InternBanner from '../components/Banner/InternBanner'
import '../../../components/Layout.scss'
import InternSetup from '../components/Setup/InternSetup'
import InternTable from '../components/Table/InternTable'

const InternLayout = () => {
    const [openSetup, setOpenSetup] = useState(false)
    return (
        <div className='dash-container'>
            <InternBanner />
            {/* {openSetup && <InternSetup close={() => setOpenSetup(false)} />} */}
            <InternTable openSetup={() => setOpenSetup(!openSetup)} />
        </div>
    )
}

export default InternLayout