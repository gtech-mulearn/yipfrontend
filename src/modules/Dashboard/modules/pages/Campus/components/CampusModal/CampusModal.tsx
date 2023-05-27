
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
const CampusModal = ({ campuStatus, deleteId, cancel }: { campuStatus: string, deleteId?: string, cancel: () => void }) => {
    const [statusList, setStatusList] = useState<string[]>([])
    const [optionStatusList, setOptionStatusList] = useState<selectProps[]>([])
    const [status, setStatus] = useState<string>('')

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
                    {campuStatus === 'Connection established' || status === 'Connection established' && <ConnectionModal cancel={cancel} />}
                    {campuStatus === 'Orientation Scheduled' || status === 'Orientation Scheduled' && <OrientationScheduleModal cancel={cancel} />}
                    {campuStatus === 'Orientation Completed' || status === 'Orientation Completed' && <OrientationCompletedModal cancel={cancel} />}
                    {campuStatus === 'Execom Formed' || status === 'Execom Formed' && <ExecomModal cancel={cancel} />}
                </div>
                <div className='secondary-box'>
                    <div className={`${(status && status !== campuStatus) ? 'btn-update ' : 'btn-disabled'}`}>
                        Update Status
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CampusModal