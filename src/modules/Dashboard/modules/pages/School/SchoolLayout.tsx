import React, { useState } from 'react'
import SchoolSetup from './SchoolSetup'
import SchoolTable from './SchoolTable'
import SchoolBanner from './SchoolBanner'
import '../../components/Layout.scss'

const SchoolLayout = () => {
    const [update, setUpdate] = useState<boolean>(false)
    const [viewSetup, setViewSetup] = useState<boolean>(false)
    const [viewBanner, setViewBanner] = useState<boolean>(true)
    function updateSchoolData() {
        setUpdate((prev: boolean) => !prev)
    }
    return (
        <div className='dash-container'>
            <SchoolBanner />
            {viewSetup &&
                <SchoolSetup
                    setViewSetup={setViewSetup}
                    updateSchoolData={updateSchoolData}
                />}
            <SchoolTable
                setViewSetup={setViewSetup}
                updateSchoolData={updateSchoolData}
                updated={update}
            />
        </div>
    )
}

export default SchoolLayout