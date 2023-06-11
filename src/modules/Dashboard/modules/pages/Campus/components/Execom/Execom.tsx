import React, { Dispatch, SetStateAction, useEffect } from 'react'
import StatusTable from '../StatusTable/StatusTable'
import CampusModal from '../Modals/CampusModal'
import { privateGateway } from '../../../../../../../services/apiGateway'
import { campusRoutes } from '../../../../../../../services/urls'
export interface ExecomProps {
    id: string
    role: string
    name: string
    email: string
    phone: string
}
const Execom = ({ date, campusId, update }: { date: string, campusId: string, update: boolean }) => {
    const [open, setOpen] = React.useState(false)
    const [list, setList] = React.useState<ExecomProps[]>([])
    useEffect(() => {
        listSubUser(setList, campusId)
    }, [update, open])
    return (
        <div>
            {open && <CampusModal campuStatus={'Add Member'} campusId={campusId} cancel={() => setOpen(false)} />}
            <StatusTable
                title1='Status'
                name='Execom Formed'
                title2='Date of Execom Formation'
                date={date}
                setAdd={setOpen}
                AddOption={'Add Member'}
                TableHeading={'Execom '}
                tableHeadList={['Name', 'Email', 'Phone', 'Designation']}
                tableData={list}
                orderBy={['name', 'email', 'phone', 'role']}
                capitalize={false}
                pagination={false}
            /></div>
    )
}
function listSubUser(setData: Dispatch<SetStateAction<ExecomProps[]>>, id: string = '') {
    privateGateway.get(`${campusRoutes.subUser.listExecom}${id}/Execom/`)
        .then((res) => {
            setData(res.data.response)
        }).catch((err) => {
            console.log(err)
        })
}

export default Execom