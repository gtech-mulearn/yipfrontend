import React, { Dispatch, SetStateAction, useEffect } from 'react'
import StatusTable from '../StatusTable/StatusTable'
import CampusModal from '../Modals/CampusModal'
import { privateGateway } from '../../../../../../../services/apiGateway'
import { campusRoutes } from '../../../../../../../services/urls'
import DeleteModal from '../Modals/DeleteModal'
import { CampusPageProps } from '../../utils'
import TitleNameTag from '../TitleNameTag/TitleNameTag'
import CustomTable from '../../../../components/CustomTable/CustomTable'
export interface FacilitatorProps {
    id: string
    name: string
    email: string
    phone: string
    type: string
    role: string
}
const Connection = ({ date, campusId, campus }: { date: string, campusId: string, campus: CampusPageProps }) => {
    const [facilitator, setFacilitator] = React.useState<FacilitatorProps[]>([])
    const [pta, setPta] = React.useState<FacilitatorProps[]>([])
    const [alumni, setAlumni] = React.useState<FacilitatorProps[]>([])
    const [open, setOpen] = React.useState(false)
    const [openPta, setOpenPta] = React.useState(false)
    const [subUserId, setSubUserId] = React.useState('' as string)
    const [update, setUpdate] = React.useState(false)
    const [openAlumni, setOpenAlumni] = React.useState(false)
    useEffect(() => {
        listSubUser(setFacilitator, campusId, 'POC')
        listSubUser(setPta, campusId, 'PTA'),
            listSubUser(setAlumni, campusId, 'ALUMNI')
    }, [open, subUserId, openPta, openAlumni])
    return (
        <div>
            <StatusTable
                title1='Status'
                name='Connection Established'
                title2='Date of Connection Established'
                date={date}
                setAdd={setOpen}
                AddOption={'Add Facilitator'}
                TableHeading={'Facilitator List'}
                tableHeadList={['Name', 'Email', 'Phone', 'Designation']}
                tableData={facilitator ? facilitator : []}
                orderBy={['name', 'email', 'phone', 'role']}
                manage={{
                    value: 'Delete',
                    manageFunction: (user: any) => {
                        setSubUserId(user.id)
                    },
                    icon: 'fa-trash'
                }}
                capitalize={false}
            />
            {<StatusTable
                hideStatus={true}
                title1='Status'
                name='Connection Established'
                title2='Date of Connection Established'
                date={date}
                setAdd={setOpenPta}
                AddOption={'Add PTA'}
                TableHeading={'PTA List'}
                tableHeadList={['Name', 'Email', 'Phone', 'Designation']}
                tableData={pta ? pta : []}
                orderBy={['name', 'email', 'phone', 'role']}
                manage={{
                    value: 'Delete',
                    manageFunction: (user: any) => {
                        setSubUserId(user.id)
                    },
                    icon: 'fa-trash'
                }}
                capitalize={false}
            />}
            {<StatusTable
                hideStatus={true}
                title1='Status'
                name='Connection Established'
                title2='Date of Connection Established'
                date={date}
                setAdd={setOpenAlumni}
                AddOption={'Add Alumni'}
                TableHeading={'Alumni List'}
                tableHeadList={['Name', 'Email', 'Phone', 'Designation']}
                tableData={alumni ? alumni : []}
                orderBy={['name', 'email', 'phone', 'role']}
                manage={{
                    value: 'Delete',
                    manageFunction: (user: any) => {
                        setSubUserId(user.id)
                    },
                    icon: 'fa-trash'
                }}
                capitalize={false}
            />}
            {openAlumni && <CampusModal campuStatus={'Add Facilitator'} designation='ALUMNI' campusId={campusId} cancel={() => setOpenAlumni(false)} />}
            {openPta && <CampusModal campuStatus={'Add PTA'} designation='PTA' campusId={campusId} cancel={() => setOpenPta(false)} />}
            {subUserId && <DeleteModal id={subUserId} cancel={() => setSubUserId('')} customFunction={() => deleteASubUser(subUserId, () => setSubUserId(''))} />}
            {open && <CampusModal campuStatus='Add Facilitator' designation='POC' campusId={campusId as string} campus={campus} cancel={() => setOpen(false)} district={campus?.district} />}

        </div>
    )
}
function listSubUser(setData: Dispatch<SetStateAction<FacilitatorProps[]>>, id: string = '', data: string) {
    privateGateway.get(`${campusRoutes.subUser.list}${id}/${data}/`)
        .then((res) => {
            setData(res.data.response)
        }).catch((err) => {
            console.log(err)
        })
}
function deleteASubUser(id: string, close: () => void) {
    privateGateway.delete(`${campusRoutes.subUser.delete}${id}/`)
        .then((res) => {
            close()
        }).catch((err) => {
            console.log(err)
        })
}
export default Connection