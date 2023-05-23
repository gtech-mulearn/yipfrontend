import React from 'react'
import Setup from './BlockSetup'
import Table from './BlockTable'
import '../../components/Layout.scss'

const BlockLayout = () => {
    return (
        <div className='dash-container'>
            <Setup title='Block' />
            <Table />
        </div>
    )
}

export default BlockLayout