import React, { useContext, useEffect } from 'react'
import '../../../components/Layout.scss'
import StatusTable from '../components/StatusTable/StatusTable'
import Identified from '../components/Identified/Identified'
import './CampusLayout.scss'
import TitleNameTag from '../components/TitleNameTag/TitleNameTag'
import Confirmed from '../components/Confirmed/Confirmed'
import Connection from '../components/Connection/Connection'
import Orientation from '../components/Orientation/Orientation'
import Execom from '../components/Execom/Execom'
import CampusModal from '../components/Modals/CampusModal'
import DeleteModal from '../components/Modals/DeleteModal'
import { useNavigate, useParams } from 'react-router-dom'
import { ClubTableProps } from '../../Club/ClubTable'
import { Error, Success } from '../../../../components/Error/Alerts'
import { CampusPageProps, deleteModelSchool, formatDateStyle, getCampusInfo, getCategory } from '../utils'
import { GlobalContext } from '../../../../../../utils/GlobalVariable'
import roles from '../../../../../../utils/roles'

const CampusLayout = () => {
    const { campusId, type } = useParams()
    const [campus, setCampus] = React.useState({} as CampusPageProps)
    const [deleteCampus, setDeleteCampus] = React.useState(false)
    const [updateCampus, setUpdateCampus] = React.useState(false)
    const [campusX, setCampusX] = React.useState({} as ClubTableProps)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [successMessage, setSuccessMessage] = React.useState("")
    const viewExecom = campus.status === 'Execom Formed'
    const viewOrientation = campus.status === 'Orientation Scheduled' || campus.status === 'Orientation Completed' || viewExecom
    const viewConnected = campus.status === 'Connection Established' || viewOrientation || viewExecom
    const viewConfirmed = campus.status === 'Visited' || viewConnected || viewOrientation || viewExecom
    const navigate = useNavigate()
    const { userInfo } = useContext(GlobalContext)
    useEffect(() => {
        getCampusInfo(campusId as string, setCampus)
    }, [updateCampus])

    return (
        <div className='dash-container'>
            <div className='white-container'>
                <div className='campus-sub-container-1'>
                    {userInfo.role !== roles.INTERN && <div className='update-status-button' onClick={() => setDeleteCampus(true)}>Delete Campus </div>}
                    <div className='update-status-button' onClick={() => setUpdateCampus(true)}>Update Status</div>
                </div>

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
                {/* IDENTIFIED */}
                <Identified date={formatDateStyle(campus?.identified)} />
                {/* CONFIRMED */}
                {viewConfirmed && <Confirmed date={formatDateStyle(campus?.confirmed)} />}
                {/* CONNECTED */}
                {viewConnected && <Connection date={formatDateStyle(campus?.connection)} campusId={campusId as string} campus={campus} />}
                {/* ORIENTATION */}
                {viewOrientation && <Orientation date={formatDateStyle(campus?.orientation)} campusId={campusId as string} district={campus?.district} update={updateCampus} />}
                {/* EXECOM */}
                {/* {viewExecom && <Execom date={formatDateStyle(campus?.execom)} campusId={campusId as string} update={updateCampus} />} */}
                {/* ERROR */}
                {errorMessage && <Error error={errorMessage} />}
                {/* SUCCESS */}
                {successMessage && <Success success={successMessage} />}
                {/* DELETE CAMPUS MODAL*/}
                {deleteCampus && <div className="modal-overlay">
                    <div className='modal'>
                        <div className="secondary-box">
                            <div className='last-container'>
                                <p>Are you sure you want to delete this campus?</p>
                                <div className="modal-buttons">
                                    <button className="confirm-delete"
                                        onClick={() =>
                                            deleteModelSchool(campusId as string, () => navigate('/club-dashboard'))
                                        }>Confirm Delete</button>
                                    <button className="cancel-delete" onClick={() => setDeleteCampus(false)} >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >}
                {/* CAMPUS UPDATE MODAL */}
                {updateCampus && <CampusModal campusId={campusId as string} campus={campus} cancel={() => setUpdateCampus(!updateCampus)} district={campus?.district} />}
            </div >
        </div >
    )
}

export default CampusLayout