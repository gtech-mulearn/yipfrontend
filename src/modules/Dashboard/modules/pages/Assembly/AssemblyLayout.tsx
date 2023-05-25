import React, { useState } from 'react'
import AssemblySetup from './AssemblySetup'
import AssemblyTable from './AssemblyTable'
import '../../components/Layout.scss'

const AssemblyLayout = () => {
    const [update, setUpdate] = useState<boolean>(false)
    const [viewSetup, setViewSetup] = useState<boolean>(false)
    function updateAssemblyData() {
        setUpdate((prev: boolean) => !prev)
    }
    return (
        <div className='dash-container'>
            {viewSetup &&
                <AssemblySetup
                    setViewSetup={setViewSetup}
                    updateAssemblyData={updateAssemblyData}
                />}
            <AssemblyTable
                setViewSetup={setViewSetup}
                updateAssemblyData={updateAssemblyData}
                updated={update}
            />
        </div>
    )
}

export default AssemblyLayout