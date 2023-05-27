import React from 'react'
import StatusTable from '../StatusTable/StatusTable'
import CampusModal from '../CampusModal/CampusModal'
export interface ExecomProps {
    id: string
    role: string
    name: string
    email: string
    phone: string
}
const Execom = ({ date, members }: { date: string, members: ExecomProps[] }) => {
    const [open, setOpen] = React.useState(false)
    return (
        <div>
            {open && <CampusModal campuStatus={'Execom Formed'} cancel={() => setOpen(false)} />}
            <StatusTable
                title1='Status'
                name='Connection Established'
                title2='Date Connection Established'
                date={date}
                setAdd={setOpen}
                AddOption={'Add Member'}
                TableHeading={'Execom '}
                tableHeadList={['Name', 'Email', 'Phone', 'Designation']}
                tableData={members ? members : []}
                orderBy={['role', 'name', 'email', 'phone',]}
                pagination={false}
            /></div>
    )
}

export default Execom