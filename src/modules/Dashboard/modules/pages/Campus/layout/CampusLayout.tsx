import React from 'react'
import '../../../components/Layout.scss'
import StatusTable from '../components/StatusTable/StatusTable'
import Identified from '../components/Identified/Identified'
import './CampusLayout.scss'
import TitleNameTag from '../components/TitleNameTag/TitleNameTag'
import Confirmed from '../components/Confirmed/Confirmed'
import Connection, { FacilitatorProps } from '../components/Connection/Connection'
import Orientation, { OrientationProps } from '../components/Orientation/Orientation'
import Execom, { ExecomProps } from '../components/Execom/Execom'
import ConnectionModal from '../components/Connection/ConnectionModal'
import CampusModal from '../components/CampusModal/CampusModal'
import DeleteModal from '../components/CampusModal/DeleteModal'
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

    const [campus, setCampus] = React.useState({} as CampusPageProps)
    const [deleteCampus, setDeleteCampus] = React.useState(false)
    const [updateCampus, setUpdateCampus] = React.useState(false)
    return (
        <div className='dash-container'>
            <div className='white-container'>
                <div className='campus-sub-container-1'>
                    <div className='update-status-button' onClick={() => setDeleteCampus(true)}>Delete Campus </div>

                    <div className='update-status-button' onClick={() => setUpdateCampus(true)}>Update Status</div>
                </div>
                {deleteCampus && <DeleteModal id={''} cancel={() => setDeleteCampus(false)} />}
                {updateCampus && <CampusModal campuStatus={campus?.status} deleteId={''} cancel={() => setUpdateCampus(false)} />}

                <div className='campus-sub-container-2'>
                    <TitleNameTag title={'Campus'} name={campus?.campus} />
                    <TitleNameTag title={'Category'} name={campus?.category} />
                    <TitleNameTag title={'Zone'} name={campus?.zone} />
                    <TitleNameTag title={'District'} name={campus?.district} />
                    <TitleNameTag title={'Legislative Assembly'} name={campus?.legislativeAssembly} />
                    <TitleNameTag title={'Block '} name={campus?.block} />
                </div>
                <Identified date={campus?.identified} />
                {campus?.confirmed && <Confirmed date={campus?.confirmed} />}
                {campus?.connection && <Connection date={campus?.connection?.date} facilitator={campus?.connection?.facilitator} />}
                {campus?.orientation && <Orientation orientation={campus?.orientation} />}
                {campus?.execom && <Execom date={campus?.execom?.date} members={campus?.execom?.members} />}
                <Confirmed date={campus?.confirmed} />
                <Connection date={campus?.connection?.date} facilitator={campus?.connection?.facilitator} />
                <Orientation orientation={campus?.orientation} />
                <Execom date={campus?.execom?.date} members={campus?.execom?.members} />
            </div>
        </div>
    )
}

export default CampusLayout