import React from 'react'
import StatusTable from '../StatusTable/StatusTable'
export interface ExecomProps {
    id: string
    role: string
    name: string
    email: string
    phone: string
}
const Execom = ({ date, members }: { date: string, members: ExecomProps[] }) => {
    return (
        <div>
            <StatusTable
                title1='Status'
                name='Connection Established'
                title2='Date Connection Established'
                date={date}
                setAdd={function (value: React.SetStateAction<boolean>): void {
                    console.log('Need to add function')
                }}
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