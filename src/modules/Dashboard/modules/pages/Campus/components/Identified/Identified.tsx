import React, { useEffect } from 'react'
import StatusTable from '../StatusTable/StatusTable'
import TitleNameTag from '../TitleNameTag/TitleNameTag'
import { fetchSchools } from '../../../School/SchoolAPI'
import { selectProps } from '../../../../utils/setupUtils'
import { SchoolTableProps } from '../../../School/SchoolTable'
import '../../layout/CampusLayout.scss'
const Identified = ({ date }: { date: string }) => {

    return (
        <div className='campus-sub-container-2'>
            <TitleNameTag title={'Status'} name={'Identified'} />
            <TitleNameTag title={'Date of Identification'} name={date ? date : ''} />
        </div>
    )
}

export default Identified   