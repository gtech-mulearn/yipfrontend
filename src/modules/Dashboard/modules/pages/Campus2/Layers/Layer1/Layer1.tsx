import { useEffect, useMemo, useRef, useState } from 'react'
import Modal from '../../Components/Modal/Modal'
import SmallStatus from '../../Components/SmallBox/SmallStatus'
import './Layer1.css'
import { deleteModelSchool } from '../../../Campus/utils'
import { useNavigate } from 'react-router-dom'
import { createEvent, listEvent, updateEvent } from '../../Utils/Event'
import { getListOfCoordinatorByDistrict } from '../../Utils/User'
import { updateCampusStatus } from '../../Utils/Campus'
import Input from '../../Components/Input/Input'
import Select from '../../Components/Select/Select'
interface Layer1Props {
    status: string
    category: string
    campusId: string
    updateCampus: () => void
    eventUpdate: () => void
    district: string
    isUpdate: boolean
    eventList: any[]
}
const statusList = [
    { id: '0', name: 'Connection Established' },
    { id: '1', name: 'Orientation Scheduled' },
    { id: '2', name: 'Orientation Completed' },
    { id: '3', name: 'Execom Formed' },
    { id: '4', name: 'Visited' },
]
const Modes = [
    { id: '0', name: 'Online' },
    { id: '1', name: 'Offline' },
]
const emptyObject = { id: '', name: '' }
const Layer1 = ({ status, category, campusId, updateCampus, district, isUpdate, eventList, eventUpdate }: Layer1Props) => {
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const [eventModal, setEventModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [coordinatorList, setCoordinatorList] = useState<any>([])
    const [isAddEvent, setIsAddEvent] = useState(false)
    const [event, setEvent] = useState(emptyObject)
    const clear = () => {
        setOpenModal(false)
        setEventModal(false)
        setDeleteModal(false)
        setEvent(emptyObject)
        setCoordinatorList([])
    }
    useEffect(() => {
        if (eventList.length > 0) {
            let eventScheduled = eventList.find((item: any) => item.status === 'Scheduled')
            if (eventScheduled) {
                console.log('Scheduled event found')
                setIsAddEvent(false)
                setEvent(eventScheduled)
            }
            else {
                console.log('Scheduled event not found')
                setIsAddEvent(true)
            }
        }
        else {
            setIsAddEvent(true)
        }
    }, [eventList.length])

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
                onSubmit={(e) => {
                    updateCampusStatus(campusId, statusList[e.status].name, () => { setOpenModal(false); updateCampus(); clear() })
                }}
                header={'Update Status'}
                close={() => { setOpenModal(false) }}
            >
                <>
                    <Select
                        options={statusList}
                        id={'status'}
                        name={'status'}
                        header={'Status'} />

                </>
            </Modal>}
            {eventModal &&
                <Modal header={isAddEvent ? 'Add Event' : 'Update Event'}

                    close={() => setEventModal(false)}
                    onSubmit={(e) => {
                        if (isAddEvent) {
                            createEvent(e?.date, e?.place, Modes[e?.mode].name,
                                coordinatorList.find((item: any) => item.id === e?.coordinator)?.id
                                , campusId, () => {
                                    eventUpdate();
                                    clear()
                                    setEventModal(false)
                                }, () => {
                                })
                        }
                        else {
                            updateEvent(event.id, e?.nop, e?.date, e.remarks, e?.place, () => {
                                eventUpdate()
                                clear()
                                setEventModal(false)
                            }, () => {
                            }),
                                true
                        }
                    }}
                >
                    <>
                        {isAddEvent ?
                            <>
                                <Select
                                    options={coordinatorList}
                                    name='coordinator'
                                    header={'Coordinator'} />
                                <Select
                                    options={Modes}
                                    name={'mode'}
                                    header={'Mode of Delivery'}
                                    placeholder={'Online/Offline'}
                                />
                                <Input
                                    header={'Place'}
                                    name={'place'}
                                />
                            </> :
                            <><Input
                                header={'No of Participants'}
                                name={'nop'}
                                type='number'
                            />
                                <Input
                                    header={'Remarks'}
                                    name={'remarks'}
                                />
                            </>
                        }
                        <Input
                            header={'Date'}
                            name={'date'}
                            type='datetime-local'
                        />
                    </>
                </Modal >
            }
            {
                deleteModal &&
                <Modal header={'Delete Campus'}
                    onSubmit={() => {
                        deleteModelSchool(campusId, () => { navigate('/club-dashboard') })
                    }}
                    DeleteBtn={true}
                    functionName="Confirm Delete"
                    close={() => setDeleteModal(false)}
                >
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



