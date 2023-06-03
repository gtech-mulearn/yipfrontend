
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import { selectProps } from '../../../../utils/setupUtils'
import { fetchStatus } from '../../../School/SchoolAPI'
import ConnectionModal from '../Connection/ConnectionModal'
import './CampusModal.scss'
import Orientation from '../Orientation/Orientation'
import OrientationScheduleModal from '../Orientation/OrientationScheduleModal'
import OrientationCompletedModal from '../Orientation/OrientationCompletedModal'
import ExecomModal from '../Execom/ExecomModal'
import { privateGateway } from '../../../../../../../services/apiGateway'
import { tableRoutes } from '../../../../../../../services/urls'
import { CampusPageProps } from '../../utils'
const CampusModal = ({ campusId, campus, cancel, district, eventId }: { campusId: string, campus: CampusPageProps, cancel: () => void, district?: string, eventId?: string }) => {
    console.log(district)
    const [statusList, setStatusList] = useState<string[]>([])
    const [optionStatusList, setOptionStatusList] = useState<selectProps[]>([])
    const [status, setStatus] = useState<string>('')
    const viewConnection = (status === 'Connection Established') || (campus.status === 'Confirmed' && status === '')
    const viewScheduled = (status === 'Orientation Scheduled') || (campus.status === 'Connection Established' && status === '')
    const viewCompleted = (status === 'Orientation Completed') || (campus.status === 'Orientation Scheduled' && status === '')
    const viewExecom = (status === 'Execom Formed') || (campus.status === 'Orientation Completed' && status === '') || (campus.status === 'Execom Formed' && status === '')
    const viewUpdateButton = (status === 'Confirmed') || (campus.status === 'Identified' && status === '') || (status === 'Identified')
    useEffect(() => {
        fetchStatus(setStatusList, setOptionStatusList)
        if (campus.status === 'Identified') {
            setStatus('Confirmed')
        }
    }, [])
    return (
        <div className="modal-overlay">
            <div className='modal'>
                <div className='heading'>
                    <div className="title">Update Status</div>
                    <div className="close-btn" onClick={cancel}><i className="fa fa-close"></i>
                    </div>
                </div>
                <div className='secondary-box'>
                    <div className="data-box">
                        <div className="content">
                            <CustomSelect
                                option={optionStatusList}
                                header='Status'
                                setValue={setStatus}
                                requiredHeader={false}
                                requiredData={false}
                                isClearable={false}
                                requiredLabel={true}
                                placeholder={getNextStatus(campus.status)}
                                requirePlaceHolder={true}
                                customCSS={{
                                    className: "react-select-container",
                                    classNamePrefix: "react-select"
                                }
                                }
                            />
                        </div>
                    </div>
                    {viewConnection && <ConnectionModal cancel={cancel} isNotConnected={campus.connection === ''} campusId={campusId as string} />}
                    {viewScheduled && <OrientationScheduleModal cancel={cancel} district={district as string} campusId={campusId} />}
                    {viewCompleted && <OrientationCompletedModal cancel={cancel} eventId={eventId as string} />}
                    {viewExecom && <ExecomModal cancel={cancel} campusId={campusId} />}
                </div>

                {viewUpdateButton &&
                    <div className='secondary-box'>
                        <div className={`${(status && status !== campus.status) ? 'btn-update ' : 'btn-disabled'}`}
                            onClick={() => { if (status && status !== campus.status) updateStatus(campusId as string, status, cancel) }}>
                            Update Status
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
function updateStatus(id: string, status: string, cancel: () => void) {
    privateGateway.put(tableRoutes.status.update, { clubId: id, clubStatus: status })
        .then(res => {
            cancel()
            console.log('Success :', res?.data?.message?.general[0])
        })
        .catch(err => console.error(err))
}
function getNextStatus(status: string) {
    switch (status) {
        case 'Identified': return 'Confirmed'
        case 'Confirmed': return 'Connection Established'
        case 'Connection Established': return 'Orientation Scheduled'
        case 'Orientation Scheduled': return 'Orientation Completed'
        case 'Orientation Completed': return 'Execom Formed'
        case 'Execom Formed': return 'Execom Formed'
        default: return ''
    }
}
export default CampusModal
export const AddFacilitatorModal = ({ cancel, campusId }: { cancel: () => void, campusId: string }) => {
    return (<div className="modal-overlay">
        <div className='modal'>
            <div className='heading'>
                <div className="title">Update Status</div>
                <div className="close-btn" onClick={cancel}><i className="fa fa-close"></i>
                </div>
            </div>
            <div className='secondary-box'>
                <ConnectionModal cancel={cancel} isNotConnected={true} campusId={campusId as string} />
            </div>
        </div>
    </div>
    )
}