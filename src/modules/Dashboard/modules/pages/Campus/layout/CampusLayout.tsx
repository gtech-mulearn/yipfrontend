import React, { useEffect } from 'react'
import '../../../components/Layout.scss'
import StatusTable from '../components/StatusTable/StatusTable'
import Identified from '../components/Identified/Identified'
import './CampusLayout.scss'
import TitleNameTag from '../components/TitleNameTag/TitleNameTag'
import Confirmed from '../components/Confirmed/Confirmed'
import Connection from '../components/Connection/Connection'
import Orientation from '../components/Orientation/Orientation'
import Execom from '../components/Execom/Execom'
import CampusModal from '../components/CampusModal/CampusModal'
import DeleteModal from '../components/CampusModal/DeleteModal'
import { useParams } from 'react-router-dom'
import { ClubTableProps } from '../../Club/ClubTable'
import { selectProps } from '../../../utils/setupUtils'
import { privateGateway } from '../../../../../../services/apiGateway'
import { campusRoutes } from '../../../../../../services/urls'
import { Error, Success } from '../../../../components/Error/Alerts'
import { listEvent } from '../components/Orientation/OrientationScheduleModal'


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
    connection: string
    orientation: string
    execom: string
}

const CampusLayout = () => {
    const { campusId, type } = useParams()
    const [campus, setCampus] = React.useState({} as CampusPageProps)
    const [deleteCampus, setDeleteCampus] = React.useState(false)
    const [updateCampus, setUpdateCampus] = React.useState(false)
    const [campusX, setCampusX] = React.useState({} as ClubTableProps)
    const [statusList, setStatusList] = React.useState<selectProps[]>([])
    const [updateStatus, setUpdateStatus] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState("")
    const [successMessage, setSuccessMessage] = React.useState("")
    const viewExecom = campus.status === 'Execom Formed'
    const viewOrientation = campus.status === 'Orientation Scheduled' || campus.status === 'Orientation Completed' || viewExecom
    const viewConnected = campus.status === 'Connection Established' || viewOrientation || viewExecom
    const viewConfirmed = campus.status === 'Confirmed' || viewConnected || viewOrientation || viewExecom
    const viewIdentified = campus.status === 'Identified' || viewConfirmed || viewOrientation || viewConnected || viewExecom
    useEffect(() => {
        getCampusInfo(campusId as string, setCampus)

    }, [updateCampus])

    return (
        <div className='dash-container'>
            <div className='white-container'>
                <div className='campus-sub-container-1'>
                    <div className='update-status-button' onClick={() => setDeleteCampus(true)}>Delete Campus </div>

                    <div className='update-status-button' onClick={() => setUpdateCampus(true)}>Update Status</div>
                </div>

                {deleteCampus && <DeleteModal id={campusId as string} cancel={() => setDeleteCampus(false)} />}
                {updateCampus && <CampusModal campuStatus={campus?.status} campusId={campusId as string} cancel={() => setUpdateCampus(false)} district={campus?.district} />}

                <div className={'campus-sub-container-2'}>
                    <TitleNameTag title={'Campus'} name={campus?.campus} />
                    <TitleNameTag title={'Category'} name={getCategory(campus?.category)} />

                    <TitleNameTag title={'Zone'} name={campus?.zone} />
                    <TitleNameTag title={'District'} name={campus?.district} />
                    {type === 'school' && <>
                        <TitleNameTag title={'Legislative Assembly'} name={campus?.legislativeAssembly} />
                        <TitleNameTag title={'Block '} name={campus?.block} />
                    </>}
                </div>
                <Identified date={formatDateStyle(campus?.identified)} />
                {viewConfirmed && <Confirmed date={formatDateStyle(campus?.confirmed)} />}
                {viewConnected && <Connection date={formatDateStyle(campus?.connection)} campusId={campusId as string} />}
                {viewOrientation && <Orientation date={formatDateStyle(campus?.orientation)} campusId={campusId as string} district={campus?.district} />}
                {viewExecom && <Execom date={formatDateStyle(campus?.execom)} campusId={campusId as string} />}
                {errorMessage && <Error error={errorMessage} />}
                {successMessage && <Success success={successMessage} />}
            </div >
        </div >
    )
}
function getCampusInfo(
    id: string,
    setCampus: React.Dispatch<React.SetStateAction<CampusPageProps>>,

) {
    privateGateway.get(`${campusRoutes.campus.info}${id}/`)
        .then((res) => res.data.response)
        .then((data) => {
            setCampus((campusData) => ({
                ...campusData,
                campus: data.name,
                category: data.institute_type,
                district: data.district,
                status: data.club_status,
                zone: data.zone,
                legislativeAssembly: data.legislative_assembly,
                block: data.block,
                identified: data.date_of_identification,
                confirmed: data.date_of_confirmation,
                connection: data.date_of_connection,
                orientation: data.date_of_orientaion,
                execom: data.date_of_execom_formation,
            }))
            console.log(data.date_of_orientation)

        })
        .catch((err) => {
            console.error(err)
        })
}
function formatDateStyle(value: string) {
    if (value === null || value === '' || value === undefined) {
        return ''
    }
    const date = new Date(value);
    const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    return formattedDate// Output: "29 May 2023"
}
function getCategory(value: string) {
    if (value === 'School') {
        return 'Model School'
    }
    if (value === 'College') {
        return 'YIP Club'
    }
    return ''
}
export default CampusLayout