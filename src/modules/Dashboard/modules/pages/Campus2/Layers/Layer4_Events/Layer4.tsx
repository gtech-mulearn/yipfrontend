import React, { useEffect, useRef, useState } from 'react'
import Table from '../../Components/Table/Table'
import SmallStatus from '../../Components/SmallBox/SmallStatus'
import Modal from '../../Components/Modal/Modal'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import { CustomInput } from '../../../../../components/CustomInput/CustomInput'
import { createEvent, deleteEvent, listEvent, updateEvent } from '../../Utils/Event'
import { getListOfCoordinatorByDistrict } from '../../Utils/User'
const emptyObject = { id: '', name: '' }
const eventHeadings = ['Mode of Delivery', 'Coordinator', 'Place', 'No of Participants', 'Remarks', 'Planned Date', 'Completed On', 'Status']
const eventColumns = ['mode_of_delivery', 'districtCordinator', 'place', 'no_of_participants', 'remarks', 'planned_date', 'completed_date', 'status']
const Layer4 = ({ ...props }) => {
    const { campusId, district, updateCampus } = props
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
    const [event, setEvent] = useState<any>(emptyObject)
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
        if (event.id) {
            console.log(event)
            setPlace(event.place)
            setNop(event.no_of_participants)
            setRemark(event.remarks)
        }
    }, [event])
    return (
        <>
            <div className="layer-3">
                <Table
                    opener={false}
                    title={'Events'}
                    headings={eventHeadings}
                    table={eventList}
                    columns={eventColumns}
                    type={''}
                    buttons={{
                        edit: (event: any) => {
                            setEvent(event)
                            setEventModal(true)
                            setIsAddEvent(false)
                            getListOfCoordinatorByDistrict(district, setCoordinatorList)
                        },
                        delete: (event: any) => { setEvent(event), setDeleteModal(true) },
                    }}
                >
                    <>
                        <SmallStatus value={'Add Event'}
                            style="button"
                            run={() => {
                                getListOfCoordinatorByDistrict(district, setCoordinatorList)
                                setEventModal(true)
                                setIsAddEvent(true)
                            }}
                        />
                    </>

                </Table>
            </div>
            {eventModal &&
                <Modal header={isAddEvent ? 'Add Event' : 'Update Event'}
                    close={clear}
                    runFunction={
                        () => {
                            if (isAddEvent) {
                                createEvent(date, place, mod.name, coordinator.id, campusId, () => {
                                    updateCampus();
                                    clear()
                                    setEventModal(false)
                                    firstCall.current = true
                                }, () => { })
                            }
                            else {
                                updateEvent(event.id, nop, date, remarks, place, () => {
                                    updateCampus()
                                    clear()
                                    setEventModal(false)
                                    firstCall.current = true
                                }, () => {
                                }, !isAddEvent)
                            }
                        }
                    } >
                    <>
                        {isAddEvent && <>
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
                        </>}
                        <CustomInput
                            value={'Place'}
                            data={place}
                            setData={setPlace}
                        />

                        {!isAddEvent && <>

                            <CustomInput
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
                        </>}

                        <CustomInput
                            value={` ${isAddEvent ? 'Date' : 'Date of Completion'}`}
                            data={date}
                            setData={setDate}
                            type='datetime-local'
                        />
                    </>
                </Modal >
            }
            {deleteModal &&
                <Modal
                    header={'Delete Event'}
                    close={clear}
                    runFunction={() => {
                        deleteEvent(event.id, () => {
                            updateCampus();
                            clear()
                            setEventModal(false)
                            firstCall.current = true
                        })
                    }
                    }>
                    <div className='delete-campus-modal'>
                        Are you sure you want to delete this event?
                    </div>
                </Modal>
            }
        </>
    )
}

export default Layer4