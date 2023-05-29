import React, { useEffect } from 'react'
import '../../../components/Layout.scss'
import StatusTable from '../components/StatusTable/StatusTable'
import Identified from '../components/Identified/Identified'
import './CampusLayout.scss'
import TitleNameTag from '../components/TitleNameTag/TitleNameTag'
import Confirmed from '../components/Confirmed/Confirmed'
import Connection, { FacilitatorProps } from '../components/Connection/Connection'
import Orientation, { OrientationProps } from '../components/Orientation/Orientation'
import Execom, { ExecomProps } from '../components/Execom/Execom'
import CampusModal from '../components/CampusModal/CampusModal'
import DeleteModal from '../components/CampusModal/DeleteModal'
import { useParams } from 'react-router-dom'
import { ClubTableProps } from '../../Club/ClubTable'
import { fetchStatus } from '../../School/SchoolAPI'
import { selectProps } from '../../../utils/setupUtils'
import { privateGateway } from '../../../../../../services/apiGateway'
import { tableRoutes } from '../../../../../../services/urls'


interface CampusPageProps {
    campus: string
    category: string
    zone: string
    district: string
    legislativeAssembly: string
    block: string
    status: string
    identified: string
    confirmed: string
    connection: {
        date: string,
        facilitator: FacilitatorProps[]
    }
    orientation: OrientationProps,
    execom: {
        id: string
        date: string
        members: ExecomProps[]
    }
}

const CampusLayout = () => {
    const { campusId, type } = useParams()
    const [campus, setCampus] = React.useState({} as CampusPageProps)
    const [deleteCampus, setDeleteCampus] = React.useState(false)
    const [updateCampus, setUpdateCampus] = React.useState(false)
    const [campusX, setCampusX] = React.useState({} as ClubTableProps)
    const [statusList, setStatusList] = React.useState<selectProps[]>([])
    const [updateStatus, setUpdateStatus] = React.useState('')
    const campusContainer = React.useRef<HTMLDivElement>(null)
    useEffect(() => {
        setCampus((prev) => ({
            ...prev,
            status: 'Identified',
            category: type === 'school' ? 'Model School' : 'YIP Club',
            campus: 'Model H. S Puthiyangadi',
            district: "Thrissur",
            legislativeAssembly: "Wadakkanchery",
            block: "Irinjalakuda",
            zone: "Central"
        }))
    }, [])
    return (
        <div className='dash-container'>
            <div className='white-container'>
                <div className='campus-sub-container-1'>
                    <div className='update-status-button' onClick={() => setDeleteCampus(true)}>Delete Campus </div>

                    <div className='update-status-button' onClick={() => setUpdateCampus(true)}>Update Status</div>
                </div>


                {deleteCampus && <DeleteModal id={campusId as string} cancel={() => setDeleteCampus(false)} />}
                {updateCampus && <CampusModal campuStatus={campus?.status} campusId={campusId as string} cancel={() => setUpdateCampus(false)} />}

                <div className={'campus-sub-container-2'}

                    id='campusContainer' ref={campusContainer}>
                    <TitleNameTag title={'Campus'} name={campus?.campus} />
                    <TitleNameTag title={'Category'} name={campus?.category} />

                    <TitleNameTag title={'Zone'} name={campus?.zone} />
                    <TitleNameTag title={'District'} name={campus?.district} />
                    {type === 'school' && <>
                        <TitleNameTag title={'Legislative Assembly'} name={campus?.legislativeAssembly} />
                        <TitleNameTag title={'Block '} name={campus?.block} />
                    </>}

                </div>
                <Identified date={campus?.identified} />
                {campus?.confirmed && <Confirmed date={campus?.confirmed} />}
                {campus?.connection && <Connection date={campus?.connection?.date} campusId={campusId as string} />}
                {campus?.orientation && <Orientation orientation={campus?.orientation} />}
                {campus?.execom && <Execom date={campus?.execom?.date} members={campus?.execom?.members} />}
                <Confirmed date={campus?.confirmed} />
                <Connection date={campus?.connection?.date} campusId={campusId as string} />
                <Orientation orientation={campus?.orientation} />
                <Execom date={campus?.execom?.date} members={campus?.execom?.members} />
            </div >
        </div >
    )
}

export default CampusLayout