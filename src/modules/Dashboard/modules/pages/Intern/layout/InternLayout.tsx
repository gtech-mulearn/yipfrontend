import React, { useState } from 'react'
import InternBanner from '../components/Banner/InternBanner'
import '../../../components/Layout.scss'
import InternSetup from '../components/Setup/InternSetup'
import InternTable from '../components/Table/InternTable'

const InternLayout = () => {
    const [openSetup, setOpenSetup] = useState(false)
    const [update, setUpdate] = useState(false)
    return (
        <div className='dash-container'>
            <InternBanner update={update} />
            {/* {openSetup && <InternSetup close={() => setOpenSetup(false)} />} */}
            <InternTable update={() => setUpdate(!update)} />
        </div>
    )
}
export default InternLayout