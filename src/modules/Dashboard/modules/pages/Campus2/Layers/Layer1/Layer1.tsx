import { useEffect, useRef, useState } from 'react'
import Modal from '../../Components/Modal/Modal'
import SmallStatus from '../../Components/SmallBox/SmallStatus'
import './Layer1.css'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import { CustomInput } from '../../../../../components/CustomInput/CustomInput'
import { deleteModelSchool } from '../../../Campus/utils'
import { useNavigate } from 'react-router-dom'
import { createEvent, listEvent, updateEvent } from '../../Utils/Event'
import { getListOfCoordinatorByDistrict } from '../../Utils/User'
import { updateCampusStatus } from '../../Utils/Campus'
interface Layer1Props {
    status: string
    category: string
    campusId: string
    updateCampus: () => void
    district: string
}
const emptyObject = { id: '', name: '' }
const Layer1 = ({ status, category, campusId, updateCampus, district }: Layer1Props) => {
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const [eventModal, setEventModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(emptyObject)
    const [coordinator, setCoordinator] = useState(emptyObject)
    const [coordinatorList, setCoordinatorList] = useState<any>([])
    const [place, setPlace] = useState('')
    const [date, setDate] = useState('')
    const [mod, setMod] = useState(emptyObject)
    const [eventList, setEventList] = useState<any>([])
    const [isAddEvent, setIsAddEvent] = useState(false)
    const [event, setEvent] = useState(emptyObject)
    const [nop, setNop] = useState('')
    const [remarks, setRemark] = useState('')
    const firstCall = useRef(true)
    const clear = () => {
        setOpenModal(false)
        setEventModal(false)
        setDeleteModal(false)
        setSelectedStatus(emptyObject)
        setCoordinator(emptyObject)
        setEvent(emptyObject)
        setNop('')
        setRemark('')
        setDate('')
        setMod(emptyObject)
        setPlace('')
        setCoordinatorList([])
        setEventList([])
        setEvent(emptyObject)
        setNop('')
        setRemark('')
    }
    const Modes = [
        { id: '1', name: 'Online' },
        { id: '2', name: 'Offline' },
    ]
    useEffect(() => {
        listEvent(campusId, setEventList)
    }, [updateCampus])
    useEffect(() => {
        if (eventList) {
            let eventScheduled = eventList.find((item: any) => item.status === 'Scheduled')
            if (eventScheduled) {
                setIsAddEvent(false)
                setEvent(eventScheduled)
            }
            else {
                setIsAddEvent(true)
            }
        }
    }, [eventList])
    return (
        <>
            <div className='layer1'>
                <div className="sub-layer">
                    <SmallStatus value={`Status : ${status}`}
                        style="status"
                        edit={() => { setOpenModal(true) }}
                    />
                    <SmallStatus value={`Category : ${category}`}
                        style="status"
                    />
                </div>
                <div className="sub-layer">
                    <SmallStatus value={isAddEvent ? 'Add Event' : 'Update Event'}
                        style="button"
                        run={() => {
                            if (isAddEvent)
                                getListOfCoordinatorByDistrict(district, setCoordinatorList)
                            setEventModal(true)
                        }}
                    />
                    <SmallStatus value="Delete Campus"
                        style="button"
                        run={() => { setDeleteModal(true) }}
                    />
                </div>
            </div>
            {openModal && <Modal
                header={'Update Status'}
                close={() => { setOpenModal(false) }}
                runFunction={() => {
                    updateCampusStatus(campusId, selectedStatus.name, () => { setOpenModal(false); updateCampus(); clear() })
                }}>
                <>
                    <CustomSelect
                        option={[
                            { id: '1', name: 'Connection Established' },
                            { id: '2', name: 'Orientation Scheduled' },
                            { id: '3', name: 'Orientation Completed' },
                            { id: '4', name: 'Execom Formed' },
                        ]}
                        value={selectedStatus?.id ? selectedStatus : undefined}
                        setData={setSelectedStatus}
                        header={'Status'} />

                </>
            </Modal>}
            {eventModal &&
                <Modal header={isAddEvent ? 'Add Event' : 'Update Event'}
                    close={() => setEventModal(false)}
                    runFunction={
                        () => {
                            if (isAddEvent) {
                                createEvent(date, place, mod.name, coordinator.id, campusId, () => {
                                    updateCampus();
                                    clear()
                                    setEventModal(false)
                                    firstCall.current = true
                                }, () => {
                                })
                            }
                            else {
                                updateEvent(event.id, nop, date, remarks, place, () => {
                                    updateCampus()
                                    clear()
                                    setEventModal(false)
                                }, () => {
                                })
                            }
                        }
                    } >
                    <>
                        {isAddEvent ?
                            <>
                                <CustomSelect
                                    option={coordinatorList}
                                    value={coordinator.id ? coordinator : undefined}
                                    setData={setCoordinator}
                                    header={'Coordinator'} />
                                <CustomSelect
                                    option={Modes}
                                    value={mod.id ? mod : undefined}
                                    setData={setMod}
                                    header={'Mode of Delivery'}
                                    placeholder={'Online/Offline'}
                                />
                                <CustomInput
                                    value={'Place'}
                                    data={place}
                                    setData={setPlace}
                                />
                            </> :
                            <><CustomInput
                                value={'No of Participants'}
                                data={nop}
                                setData={setNop}
                                type='number'
                            />
                                <CustomInput
                                    value={'Remarks'}
                                    data={remarks}
                                    setData={setRemark}
                                />
                            </>
                        }
                        <CustomInput
                            value={'Date'}
                            data={date}
                            setData={setDate}
                            type='datetime-local'
                        />
                    </>
                </Modal >
            }
            {
                deleteModal &&
                <Modal header={'Delete Campus'}
                    DeleteBtn={true}
                    functionName="Confirm Delete"
                    close={() => setDeleteModal(false)}
                    runFunction={() => deleteModelSchool(campusId, () => { navigate('/club-dashboard') })} >
                    <>
                        <div className='delete-campus-modal'>
                            Are you sure you want to delete this campus?
                        </div>
                    </>
                </Modal>
            }
        </>
    )
}

export default Layer1



