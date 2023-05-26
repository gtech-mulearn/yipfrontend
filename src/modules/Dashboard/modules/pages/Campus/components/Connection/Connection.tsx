import React from 'react'
import StatusTable from '../StatusTable/StatusTable'
export interface FacilitatorProps {
    id: string
    name: string
    email: string
    phone: string
    type: string
}
const Connection = ({ date, facilitator }: { date: string, facilitator: FacilitatorProps[] }) => {
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
                AddOption={'Add Facilitator'}
                TableHeading={'Facilitator List'}
                tableHeadList={['Name', 'Email', 'Phone', 'Designation']}
                tableData={facilitator ? facilitator : []}
                orderBy={['name', 'email', 'phone', 'type']}
            /></div>
    )
}

export default Connection