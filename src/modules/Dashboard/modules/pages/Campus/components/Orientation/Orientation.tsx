import React, { useEffect } from 'react'
import StatusTable from '../StatusTable/StatusTable'
import CampusModal from '../CampusModal/CampusModal'
import { listEvent } from './OrientationScheduleModal'
import CustomTable from '../../../../components/CustomTable/CustomTable'
export interface OrientationCompleteProps {
    id: string
    place: string
    mode_of_delivery: string
    districtCordinator: string
    no_of_participants: string
    scheduled_date: string
    remarks: string
    status: string
    completed_date: string
    description: string
    planned_date: string
}
export interface OrientationProps {
    id: string
    scheduled: boolean
    date: string
    completed: OrientationCompleteProps[]
}

const Orientation = ({ date = '', campusId, district, update }: { date: string, campusId: string, district: string, update: boolean }) => {
    const [open, setOpen] = React.useState(false)
    const [orientationList, setOrientationList] = React.useState<OrientationCompleteProps[]>([])
    const [eventId, setEventId] = React.useState<string>('')
    useEffect(() => {
        listEvent(campusId, setOrientationList)
    }, [open, campusId, update])
    return (
        <div>
            {open && <CampusModal campuStatus={'Orientation Update'} campusId={campusId} cancel={() => setOpen(!open)} district={district} eventId={eventId as string} />}
            <div>
                <div>
                    <div className='top-bar'>
                        <p>Orientation Scheduled</p>
                    </div>
                    <CustomTable
                        tableHeadList={['Mode of Delivery', 'Coordinator', 'Place', 'No of Participants', 'Remarks', 'Scheduled On', 'Planned Date', 'Completed On', 'Status']}
                        tableData={orientationList}
                        orderBy={['mode_of_delivery', 'districtCordinator', 'place', 'no_of_participants', 'remarks', 'scheduled_date', 'planned_date', 'completed_date', 'status']}
                        capitalize={false}
                        manage={
                            {
                                value: 'Update',
                                manageFunction: (item: any) => { setEventId(item.id); setOpen(true) },
                            }
                        }
                        pagination={false}
                        filter={false}
                    />
                </div>
            </div >
        </div>
    )
}

export default Orientation