import React from 'react'
import '../../../components/Layout.scss'
import StatusTable from '../components/StatusTable/StatusTable'
import Identified from '../components/Identified/Identified'
import './CampusLayout.scss'
import TitleNameTag from '../components/TitleNameTag/TitleNameTag'
const CampusLayout = () => {
    return (
        <div className='dash-container'>
            <div className='white-container'>
                <div className='campus-sub-container-1'>
                    <div className='update-status-button'>Update Status</div>
                </div>
                <div className='campus-sub-container-2'>
                    <TitleNameTag title={'Campus'} name={'This Is A Very Big College Name of Kerala Files 2023 '} />
                    <TitleNameTag title={'Category'} name={'Model School'} />
                    <TitleNameTag title={'Campus'} name={'This Is A Very Big College Name of Kerala Files 2023 '} />
                    <TitleNameTag title={'Campus'} name={'This Is A Very Big College Name of Kerala Files 2023 '} />
                    <TitleNameTag title={'Campus'} name={'This Is A Very Big College Name of Kerala Files 2023 '} />
                    <TitleNameTag title={'Campus'} name={'This Is A Very Big College Name of Kerala Files 2023 '} />
                </div>
                <Identified />
            </div>
        </div>
    )
}

export default CampusLayout