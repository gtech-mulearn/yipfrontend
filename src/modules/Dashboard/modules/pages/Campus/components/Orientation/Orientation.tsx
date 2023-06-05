import React, { useEffect } from 'react'
import StatusTable from '../StatusTable/StatusTable'
import CampusModal from '../CampusModal/CampusModal'
import { listEvent } from './OrientationScheduleModal'
export interface OrientationCompleteProps {
    id: string
    place: string
    mode_of_delivery: string
    districtCordinator: string
    no_of_participants: string
    remarks: string
    status: string
    completed_date: string
    description: string
}
export interface OrientationProps {
    id: string
    scheduled: boolean
    date: string
    completed: OrientationCompleteProps[]
}

const Orientation = ({ date = '', campusId, district }: { date: string, campusId: string, district: string }) => {
    const [open, setOpen] = React.useState(false)
    const [orientationList, setOrientationList] = React.useState<OrientationCompleteProps[]>([])
    const [eventId, setEventId] = React.useState<string>('')
    useEffect(() => {
        listEvent(campusId, setOrientationList)
    }, [open, campusId])
    return (
        <div>
            {open && <CampusModal campuStatus={'Orientation Scheduled'} campusId={campusId} cancel={() => setOpen(false)} district={district} eventId={eventId as string} />}
            <StatusTable
                title1='Status'
                name='Orientation Scheduled'
                title2='Orientation Date'
                date={date}
                setAdd={setOpen}
                
                TableHeading={'Orientation Schedules'}
                tableHeadList={['Mode of Delivery', 'Coordinator', 'Place', 'No of Participants', 'Remarks', 'Date', 'Status']}
                tableData={orientationList}
                orderBy={['mode_of_delivery', 'districtCordinator', 'place', 'no_of_participants', 'remarks', 'completed_date', 'status']}
                pagination={false}
                capitalize={false}
                manage={
                    {
                        value: 'Update',
                        manageFunction: (item: any) => { setEventId(item.id); setOpen(true) },
                    }
                }
            /></div>
    )
}

export default Orientation