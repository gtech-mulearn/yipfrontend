import React from 'react'
import InternBanner from '../components/Banner/InternBanner'
import '../../../components/Layout.scss'
import InternSetup from '../components/Setup/InternSetup'

const InternLayout = () => {
    return (
        <div className='dash-container'>
            <InternBanner />
            <InternSetup />
        </div>
    )
}

export default InternLayout