import React from 'react'
import StatusTable from '../StatusTable/StatusTable'
import CampusModal from '../CampusModal/CampusModal'
export interface FacilitatorProps {
    id: string
    name: string
    email: string
    phone: string
    type: string
}
const Connection = ({ date, facilitator }: { date: string, facilitator: FacilitatorProps[] }) => {
    const [open, setOpen] = React.useState(false)
    return (
        <div>
            {open && <CampusModal campuStatus={'Confirmed'} cancel={() => setOpen(false)} />}
            <StatusTable
                title1='Status'
                name='Connection Established'
                title2='Date Connection Established'
                date={date}
                setAdd={setOpen}
                AddOption={'Add Facilitator'}
                TableHeading={'Facilitator List'}
                tableHeadList={['Name', 'Email', 'Phone', 'Designation']}
                tableData={facilitator ? facilitator : []}
                orderBy={['name', 'email', 'phone', 'type']}
            /></div>
    )
}

export default Connection