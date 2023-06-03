import React, { Dispatch, SetStateAction, useEffect } from 'react'
import StatusTable from '../StatusTable/StatusTable'
import CampusModal, { AddFacilitatorModal } from '../CampusModal/CampusModal'
import { privateGateway } from '../../../../../../../services/apiGateway'
import { campusRoutes } from '../../../../../../../services/urls'
import DeleteModal from '../CampusModal/DeleteModal'
import { CampusPageProps } from '../../utils'
import TitleNameTag from '../TitleNameTag/TitleNameTag'
import CustomTable from '../../../../components/CustomTable/CustomTable'
export interface FacilitatorProps {
    id: string
    name: string
    email: string
    phone: string
    type: string
}
const Connection = ({ date, campusId, campus }: { date: string, campusId: string, campus: CampusPageProps }) => {
    const [facilitator, setFacilitator] = React.useState<FacilitatorProps[]>([])
    const [open, setOpen] = React.useState(false)
    const [subUserId, setSubUserId] = React.useState('' as string)
    const [update, setUpdate] = React.useState(false)
    useEffect(() => {
        listSubUser(setFacilitator, campusId)
    }, [open, subUserId])
    return (
        <div>
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
            <div>
                <div className='status-table'>
                    <TitleNameTag title={'Status'} name={'Connection Established'} />
                    <TitleNameTag title={'Date Connection Established'} name={date} />
                </div>
                <div>
                    <div className='top-bar'>
                        <p>Facilitator List</p>
                        <div className='add-button' onClick={() => setOpen((prev: boolean) => !prev)}>
                            <i className='fas fa-add'></i>
                            <p>Add Facilitator</p>
                        </div>
                    </div>
                    <CustomTable<FacilitatorProps>
                        tableHeadList={['Name', 'Email', 'Phone', 'Designation']}
                        tableData={facilitator ? facilitator : []}
                        orderBy={['name', 'email', 'phone', 'type']}
                        manage={{
                            value: 'Delete',
                            manageFunction: (user: any) => { setSubUserId(user.id) },
                            icon: 'fa-trash'
                        }}
                        capitalize={false}
                        pagination={false}
                        filter={false}
                    />
                </div>
            </div >
            {subUserId && <DeleteModal id={subUserId} cancel={() => setSubUserId('')} customFunction={() => deleteASubUser(subUserId, () => setSubUserId(''))} />}
            {open && <AddFacilitatorModal campusId={campusId} cancel={() => setOpen(false)} />}

        </div>
    )
}
function listSubUser(setData: Dispatch<SetStateAction<FacilitatorProps[]>>, id: string = '') {
    privateGateway.get(`${campusRoutes.subUser.list}${id}/POC/`)
        .then((res) => {
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