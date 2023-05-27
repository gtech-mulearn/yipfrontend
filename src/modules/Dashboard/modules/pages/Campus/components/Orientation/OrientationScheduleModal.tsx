import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../../../services/apiGateway'
import { selectProps } from '../../../../utils/setupUtils'
import { CustomInput } from '../../../../../components/CustomInput/CustomInput'
import '../CampusModal/CampusModal.scss'
const OrientationScheduleModal = ({ cancel }: { cancel: () => void }) => {
    const [coordinatorList, setCoordinatorList] = useState<selectProps[]>([])
    const [coordinator, setCoordinator] = useState<selectProps>({} as selectProps)
    const [mod, setMod] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [place, setPlace] = useState('')

    useEffect(() => {
    }, [])
    return (
        <div className='secondary-box'>
            <div className="data-box">
                <div className="content">
                    <CustomSelect
                        option={coordinatorList}
                        header={'Coordinator'}
                        placeholder={'Select Coordinator'}
                        customCSS={{
                            className: "react-select-container",
                            classNamePrefix: "react-select"
                        }}
                        setData={setCoordinator}
                    />
                </div>
            </div>
            <div className="data-box">
                <div className="content">
                    <CustomInput value={'Mode of Delivery'} data={mod} setData={setMod} customCSS={'setup-item'} />
                </div>
            </div>
            <div className="data-box">
                <div className="content">
                    <CustomInput value={'Date'} type={'date'} data={date} setData={setDate} customCSS={'setup-item'} />
                </div>
            </div>

            <div className="data-box">
                <div className="content">
                    <CustomInput value={'Time'} type={'time'} data={time} setData={setTime} customCSS={'setup-item'} />
                </div>
            </div>
            <div className="data-box">
                <div className="content">
                    <CustomInput value={'Place'} data={place} setData={setPlace} customCSS={'setup-item'} />
                </div>
            </div>
            <div className='last-container'>
                <div className="modal-buttons">
                    <button className='btn-update ' onClick={() => { }}>Add Orientation</button>
                    <button className="cancel-btn " onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>

    )
}
export default OrientationScheduleModal