import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../../../services/apiGateway'
import { selectProps } from '../../../../utils/setupUtils'
import { CustomInput } from '../../../../../components/CustomInput/CustomInput'
import '../CampusModal/CampusModal.scss'
import { campusRoutes } from '../../../../../../../services/urls'
const OrientationScheduleModal = ({ cancel, district }: { cancel: () => void, district: string }) => {
    const [coordinatorList, setCoordinatorList] = useState<selectProps[]>([])
    const [coordinator, setCoordinator] = useState<selectProps>({} as selectProps)
    const [mod, setMod] = useState('')
    const [date, setDate] = useState('')
    const [place, setPlace] = useState('')
    console.log(district)
    useEffect(() => {

        listEvent()
        getListOfCoordinatorByDistrict(district, setCoordinatorList)
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
                    <CustomInput value={'Date'} type={'datetime-local'} data={date} setData={setDate} customCSS={'setup-item'} />
                </div>
            </div>
            <div className="data-box">
                <div className="content">
                    <CustomInput value={'Place'} data={place} setData={setPlace} customCSS={'setup-item'} />
                </div>
            </div>
            <div className='last-container'>
                <div className="modal-buttons">
                    <button className='btn-update ' onClick={() => createEvent(date, place, mod, coordinator.id)}>Add Orientation</button>
                    <button className="cancel-btn " onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>

    )
}
export default OrientationScheduleModal
function getListOfCoordinatorByDistrict(district: string, setCoordinatorList: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(`${campusRoutes.districtCoordinator.listByDistrict}${district}/`)
        .then(res => res.data.response)
        .then(data => setCoordinatorList(data))
        .catch(err => console.log(err))
}
function createEvent(date: string, place: string, mod: string, coordinatorId: string) {

    privateGateway.post(campusRoutes.createEvent, {
        date_time: date,
        mode_of_delivery: mod,
        place: place,
        description: 'Orientation Scheduling',
        status: 'Scheduled',
        districtCordinator: coordinatorId
    })

}
export function listEvent(campusId: string) {
    privateGateway.get(`${campusRoutes.listEvent}${campusId}/`)
        .then(res => res.data.response)
        .then(data => console.log(data))
        .catch(err => console.log(err))
}