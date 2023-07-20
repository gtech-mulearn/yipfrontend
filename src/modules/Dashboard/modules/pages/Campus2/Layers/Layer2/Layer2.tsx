import { useState } from 'react'
import MediumStatusBox from '../../Components/MidBox/MediumStatusBox'
import { DateConverter } from '../../Utils/Date'
import './Layer2.css'
import Modal from '../../Components/Modal/Modal'
import Input from '../../Components/Input/Input'
import { updateCampusStatus } from '../../Utils/Campus'

interface Layer2Props {
    zone: string
    district: string
    identified: string
    campusId?: string
    connection?: string
    execom?: string
    visit: string,
    status: string
    updateCampus: () => void
}
const emptyObject = { id: '', name: '', date: '', key: '', status: '' }
const TYPES = {
    visit: { id: 'Visit', name: 'Add Visit', date: 'Visit Date', key: 'visited_date', status: 'Visited' },
    connect: { id: 'Connect', name: 'Add Connect', date: 'Add Connect Date', key: 'connection_established_date', status: 'Connection Established' },
    execom: { id: 'Execom', name: 'Add Date', date: 'Date of Execom Formation', key: 'date_of_execom_formed', status: 'Execom Formed' }
}
const Layer2 = ({ ...props }: Layer2Props) => {
    const { visit, connection, execom, campusId, status } = props
    const [openModal, setOpenModal] = useState(false)
    const [type, setType] = useState(emptyObject)
    function clear() {
        setOpenModal(false)
        setType(emptyObject)
    }
    return (
        <>
            <div className='layer2'>
                <MediumStatusBox title={'ZONE'} content={props.zone} />
                <MediumStatusBox title={'DISTRICT'} content={props.district} />
                <MediumStatusBox title={'Identified Date'} content={DateConverter(props.identified)} />
                <MediumStatusBox
                    title={visit ? 'Visit Date' : 'Add'}
                    content={visit ? DateConverter(visit) : 'Visit'}
                    status={visit !== null}
                    onClick={() => {
                        setOpenModal(true)
                        setType(TYPES.visit)
                    }}
                    editOption={true} />
                <MediumStatusBox
                    title={connection ? 'Connect Date' : 'Add'}
                    content={connection ? DateConverter(connection) : 'Connected Date'}
                    status={connection !== null}
                    onClick={() => {
                        setOpenModal(true)
                        setType(TYPES.connect)
                    }}
                    editOption={true} />
                <MediumStatusBox
                    title={execom ? 'Date Execom Formed' : 'Add'}
                    content={execom ? DateConverter(execom) : 'Execom Formed Date'}
                    status={execom !== null}
                    onClick={() => {
                        setOpenModal(true)
                        setType(TYPES.execom)
                    }} editOption={true} />
            </div >
            {openModal &&
                <Modal
                    onSubmit={(e: any) => {
                        const postData: any = {
                            currentStatus: status
                        }
                        if (e?.Remarks)
                            postData.remarks = e.Remarks
                        if (e?.date)
                            postData[type.key] = new Date(e.date)
                        updateCampusStatus(
                            campusId as string,
                            type.status,
                            () => { clear(); props.updateCampus() },
                            postData)
                    }}
                    header={type.name}
                    close={() => {
                        clear()
                        props.updateCampus()
                    }}
                    functionName={`Update`}
                >
                    <>
                        {/* {type.id === 'Visit' && <Input name='Remarks' />} */}
                        <Input name='date' header={type.date} type='date' />
                    </>
                </Modal >
            }
        </>
    )
}


export default Layer2