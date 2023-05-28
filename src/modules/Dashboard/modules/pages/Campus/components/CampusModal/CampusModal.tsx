
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
const CampusModal = ({ campuStatus, campusId, cancel }: { campuStatus: string, campusId?: string, cancel: () => void }) => {
    const [statusList, setStatusList] = useState<string[]>([])
    const [optionStatusList, setOptionStatusList] = useState<selectProps[]>([])
    const [status, setStatus] = useState<string>(campuStatus)

    useEffect(() => {
        fetchStatus(setStatusList, setOptionStatusList)
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
                                requiredLabel={true}
                                placeholder={campuStatus}
                                requirePlaceHolder={true}
                                customCSS={{
                                    className: "react-select-container",
                                    classNamePrefix: "react-select"
                                }
                                }
                            />
                        </div>
                    </div>
                    {(campuStatus === 'Connection established' || status === 'Connection established') && <ConnectionModal cancel={cancel} />}
                    {(campuStatus === 'Orientation Scheduled' || status === 'Orientation Scheduled') && <OrientationScheduleModal cancel={cancel} />}
                    {(campuStatus === 'Orientation Completed' || status === 'Orientation Completed') && <OrientationCompletedModal cancel={cancel} />}
                    {(campuStatus === 'Execom Formed' || status === 'Execom Formed') && <ExecomModal cancel={cancel} />}
                </div>
                {(campuStatus === 'Identified' || status === 'Identified'
                    || campuStatus === 'Confirmed' || status === 'Confirmed'
                ) && <div className='secondary-box'>
                        <div className={`${(status && status !== campuStatus) ? 'btn-update ' : 'btn-disabled'}`}
                            onClick={() => updateStatus(campusId as string, status)}
                        >
                            Update Status
                        </div>
                    </div>}
            </div>
        </div>
    )
}
function updateStatus(id: string, status: string) {
    privateGateway.put(tableRoutes.status.update, { clubId: id, clubStatus: status })
        .then(res => console.log('Success :', res?.data?.message?.general[0]))
        .catch(err => console.log(err))
}

export default CampusModal