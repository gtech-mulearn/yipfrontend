import React, { useState } from 'react'
import BlockSetup from './BlockSetup'
import BlockTable from './BlockTable'
import '../../components/Layout.scss'

const BlockLayout = () => {
    const [update, setUpdate] = useState<boolean>(false)
    const [viewSetup, setViewSetup] = useState<boolean>(false)
    const [viewBanner, setViewBanner] = useState<boolean>(true)
    function updateBlockData() {
        setUpdate((prev: boolean) => !prev)
    }
    return (
        <div className='dash-container'>
            {viewSetup &&
                <BlockSetup
                    setViewSetup={setViewSetup}
                    updateBlockData={updateBlockData}
                />}
            <BlockTable
                setViewSetup={setViewSetup}
                updateBlockData={updateBlockData}
                updated={update}
            />
        </div>
    )
}

export default BlockLayout