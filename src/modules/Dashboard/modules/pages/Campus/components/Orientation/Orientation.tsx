import React from 'react'
import StatusTable from '../StatusTable/StatusTable'
import CampusModal from '../CampusModal/CampusModal'
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

const Orientation = ({ date = '', campusId }: { date: string, campusId: string }) => {
    const [open, setOpen] = React.useState(false)
    return (
        <div>
            {open && <CampusModal campuStatus={'Orientation Scheduled'} campusId={campusId} cancel={() => setOpen(false)} />}
            <StatusTable
                title1='Status'
                name='Orientation Scheduled'
                title2='Orientation Date'
                date={date}
                setAdd={setOpen}
                AddOption={'Add Orientation'}
                TableHeading={'Orientation Schedules'}
                tableHeadList={['Mode of Delivery', 'Coordinator', 'Place', 'No of Participants', 'Remarks', 'Date', 'Time', 'Expired']}
                tableData={[]}
                orderBy={['mode', 'coordinatorName', 'location', 'noOfParticipants', 'remarks', 'date', 'time', 'expired']}
                pagination={false}
            /></div>
    )
}

export default Orientation