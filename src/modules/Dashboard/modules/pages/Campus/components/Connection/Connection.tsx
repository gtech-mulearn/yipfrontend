import React, { Dispatch, SetStateAction, useEffect } from 'react'
import StatusTable from '../StatusTable/StatusTable'
import CampusModal from '../CampusModal/CampusModal'
import { privateGateway } from '../../../../../../../services/apiGateway'
import { campusRoutes } from '../../../../../../../services/urls'
import DeleteModal from '../CampusModal/DeleteModal'
export interface FacilitatorProps {
    id: string
    name: string
    email: string
    phone: string
    type: string
}
const Connection = ({ date, campusId }: { date: string, campusId: string }) => {
    const [facilitator, setFacilitator] = React.useState<FacilitatorProps[]>([])
    const [open, setOpen] = React.useState(false)
    const [subUserId, setSubUserId] = React.useState('' as string)
    const [update, setUpdate] = React.useState(false)
    useEffect(() => {
        listSubUser(setFacilitator, campusId)
    }, [open, subUserId])
    return (
        <div>
            {open && <CampusModal campuStatus={'Confirmed'} campusId={campusId} cancel={() => setOpen(false)} />}
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
                manage={{
                    value: 'Delete',
                    manageFunction: (user: any) => { setSubUserId(user.id) },
                    icon: 'fa-trash'
                }}
                capitalize={false}
            />
            {subUserId && <DeleteModal id={subUserId} cancel={() => setSubUserId('')} customFunction={() => deleteASubUser(subUserId, () => setSubUserId(''))} />}

        </div>
    )
}
function listSubUser(setData: Dispatch<SetStateAction<FacilitatorProps[]>>, id: string = '') {
    privateGateway.get(`${campusRoutes.subUser.list}${id}/`)
        .then((res) => {
            console.log('list sub user')
            setData(res.data.response)
        }).catch((err) => {
            console.log(err)
        })
}
function deleteASubUser(id: string, close: () => void) {
    privateGateway.delete(`${campusRoutes.subUser.delete}${id}/`)
        .then((res) => {
            console.log(res)
            close()
        }).catch((err) => {
            console.log(err)
        })
}
export default Connection