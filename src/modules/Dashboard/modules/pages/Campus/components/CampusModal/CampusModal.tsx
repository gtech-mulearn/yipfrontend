
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
const CampusModal = ({ campuStatus, campusId, campus, cancel, district, eventId }: { campuStatus?: string, campusId: string, campus?: CampusPageProps, cancel: () => void, district?: string, eventId?: string }) => {
    const [statusList, setStatusList] = useState<string[]>([])
    const [optionStatusList, setOptionStatusList] = useState<selectProps[]>([])
    const [status, setStatus] = useState<string>(getNextStatus(campuStatus ? campuStatus : campus?.status as string))
    const viewConnection = (status === 'Connection Established') || (status === 'Add Facilitator')
    const viewScheduled = (status === 'Orientation Scheduled')
    const viewCompleted = (status === 'Orientation Update')
    const viewExecom = ((status === 'Execom Formed') || (status === 'Add Member'))
    const viewUpdateButton = (status === 'Confirmed') || (status === 'Identified')
    let [view, setView] = useState('')
    useEffect(() => {
        fetchStatus(setStatusList, setOptionStatusList)
        if (viewScheduled) {
            setView('Orientation Scheduled')
        }
        if (campus?.status === 'Confirmed') {
            setView('Confirmed')
        }
        if (campus?.status === 'Identified') {
            setView('Identified')
        }
        if (viewExecom) {
            setView('Execom Formed')
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
                    {!campuStatus && <div className="data-box">
                        <div className="content">
                            <CustomSelect
                                option={optionStatusList}
                                header='Status'
                                setValue={setStatus}
                                requiredHeader={false}
                                requiredData={false}
                                isClearable={false}
                                requiredLabel={true}
                                defaultInputValue={view}
                                placeholder={getNextStatus(campuStatus ? campuStatus : campus?.status as string)}
                                requirePlaceHolder={true}
                                customCSS={{
                                    className: "react-select-container",
                                    classNamePrefix: "react-select"
                                }
                                }
                            />
                        </div>
                    </div>}
                    {viewConnection && <ConnectionModal cancel={cancel} campusId={campusId as string} />}
                    {viewScheduled && <OrientationScheduleModal cancel={cancel} district={district as string} campusId={campusId} />}
                    {viewCompleted && <OrientationCompletedModal cancel={cancel} eventId={eventId as string} campusId={campusId} />}
                    {viewExecom && <ExecomModal cancel={cancel} campusId={campusId} />}
                </div>

                {viewUpdateButton &&
                    <div className='secondary-box'>
                        <div className={`${(status && status !== campus?.status) ? 'btn-update ' : 'btn-disabled'}`}
                            onClick={() => { if (status && status !== campus?.status) updateStatus(campusId as string, status, cancel) }}>
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
        case 'Add Facilitator': return 'Add Facilitator'
        case 'Orientation Update': return 'Orientation Update'
        case 'Connection Established': return 'Orientation Scheduled'
        case 'Orientation Scheduled': return 'Execom Formed'
        case 'Execom Formed': return 'Execom Formed'
        case 'Orientation Completed': return 'Execom Formed'
        case 'Add Member': return 'Add Member'
        default: return ''
    }
}
export default CampusModal
