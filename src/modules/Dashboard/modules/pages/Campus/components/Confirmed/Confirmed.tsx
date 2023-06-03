import React from 'react'
import StatusTable from '../StatusTable/StatusTable'
import TitleNameTag from '../TitleNameTag/TitleNameTag'

const Confirmed = ({ date }: { date: string }) => {
    return (
        <div className='campus-sub-container-2'>
            <TitleNameTag title={'Status'} name={'Confirmed'} />
            <TitleNameTag title={'Date of Confirmation'} name={date ? date : ''} />
        </div>
    )
}

export default Confirmed