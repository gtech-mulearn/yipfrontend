import React from 'react'
import StatusTable from '../StatusTable/StatusTable'
export interface OrientationCompleteProps {
    location: string
    mode: string
    coordinatorId: string
    coordinatorName: string
    noOfParticipants: string
    remarks: string
    expired: boolean
    date: string
    time: string
}
export interface OrientationProps {
    id: string
    scheduled: boolean
    date: string
    completed: OrientationCompleteProps[]
}

const Orientation = ({ orientation }: { orientation: OrientationProps }) => {
    return (
        <div>
            <StatusTable
                title1='Status'
                name='Orientation Scheduled'
                title2='Orientation Date'
                date={orientation?.completed[orientation?.completed.length - 1]?.date}
                setAdd={function (value: React.SetStateAction<boolean>): void {
                    console.log('Need to add function')
                }}
                AddOption={'Add Orientation'}
                TableHeading={'Orientation Schedules'}
                tableHeadList={['Mode of Delivery', 'Coordinator', 'Place', 'No of Participants', 'Remarks', 'Date', 'Time', 'Expired']}
                tableData={orientation ? orientation?.completed : []}
                orderBy={['mode', 'coordinatorName', 'location', 'noOfParticipants', 'remarks', 'date', 'time', 'expired']}
                pagination={false}
            /></div>
    )
}

export default Orientation