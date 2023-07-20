import React, { useEffect, useRef, useState } from 'react'
import Table from '../../Components/Table/Table'
import SmallStatus from '../../Components/SmallBox/SmallStatus'
import Modal from '../../Components/Modal/Modal'
import { createEvent, deleteEvent, updateEvent } from '../../Utils/Event'
import { getListOfCoordinatorByDistrict } from '../../Utils/User'
import Select from '../../Components/Select/Select'
import Input from '../../Components/Input/Input'
const emptyObject = { id: '', name: '' }
const eventHeadings = ['Mode of Delivery', 'Coordinator', 'Place', 'No of Participants', 'Remarks', 'Planned Date', 'Completed On', 'Status']
const eventColumns = ['mode_of_delivery', 'districtCordinator', 'place', 'no_of_participants', 'remarks', 'planned_date', 'completed_date', 'status']
const Layer4 = ({ ...props }) => {
    const { campusId, district, updateCampus, eventUpdate, eventList } = props
    const [eventModal, setEventModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [coordinatorList, setCoordinatorList] = useState<any>([])
    const [isAddEvent, setIsAddEvent] = useState(false)
    const [event, setEvent] = useState<any>(emptyObject)
    const clear = () => {
        setEventModal(false)
        setDeleteModal(false)
        setEvent(emptyObject)
        setCoordinatorList([])
        setEvent(emptyObject)
    }
    const Modes = [
        { id: '1', name: 'Online' },
        { id: '2', name: 'Offline' },
    ]

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
                    onSubmit={(e) => {
                        if (isAddEvent) {
                            createEvent(e?.planned_date, e?.place, Modes[e?.mode].name,
                                e?.coordinator,
                                campusId, () => {
                                    eventUpdate()
                                    clear()
                                    setEventModal(false)
                                }, () => { })
                        }
                        else {
                            updateEvent(event.id, e?.nop, e?.completed_date, e.remarks, e?.place, () => {
                                eventUpdate()
                                clear()
                                setEventModal(false)
                            }, () => {
                            })
                        }
                    }} >
                    <>
                        {isAddEvent && <>
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
                                header={'Date'}
                                name={'planned_date'}
                                type='datetime-local'
                            />
                        </>}
                        <Input
                            header={'Place'}
                            name={'place'}
                            value={event?.place || ''}
                            onChange={(e: any) => {
                                setEvent({ ...event, place: e.target.value })
                            }}
                        />
                        {!isAddEvent && <>

                            <Input
                                header={'No of Participants'}
                                name={'nop'}
                                type='number'
                                value={event?.no_of_participants}
                                onChange={(e: any) => {
                                    setEvent({ ...event, no_of_participants: e.target.value })
                                }}
                            />
                            <Input
                                header={'Remarks'}
                                name={'remarks'}
                                value={event?.remarks}
                                onChange={(e: any) => {
                                    setEvent({ ...event, remarks: e.target.value })
                                }}
                            />
                            <Input
                                header={'Completed Date'}
                                value={convertDateTime(event?.completed_date)}
                                name={'completed_date'}
                                type='datetime-local'
                                onChange={(e: any) => {
                                    setEvent({ ...event, completed_date: e.target.value })
                                }}
                            />
                        </>}


                    </>
                </Modal >
            }
            {deleteModal &&
                <Modal
                    header={'Delete Event'}
                    close={clear}
                    DeleteBtn={true}
                    onSubmit={(e: any) => {
                        deleteEvent(event.id, () => {
                            eventUpdate()
                            clear()
                            setEventModal(false)
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
function convertDateTime(input: string) {

    const dateTimeRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}\sat\s\d{1,2}:\d{2}\s(AM|PM)$/;

    if (!input?.match(dateTimeRegex))
        return input
    const months: { [key: string]: string } = {
        January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
        July: '07', August: '08', September: '09', October: '10', November: '11', December: '12',
    };
    const [month, day, year, time, hour12] = input.replace(',', '').replace('at ', '').split(' ')
    let hour24 = '', [hour, minute] = time.split(':')
    if (hour12 === 'PM') {
        const temp = parseInt(hour) + 12
        console.log(temp)
        hour24 = `${temp}:${minute}:00`
    }
    else if (hour12 === 'AM' && hour === '12') {
        hour24 = `00:${minute}:00`
    }
    else {
        hour24 = time
    }
    console.log(`${year}-${months[month]}-${day} ${hour24}`)
    return `${year}-${months[month]}-${day} ${hour24}`
}

export default Layer4