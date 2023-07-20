import { useEffect, useState } from 'react'
import MediumStatusBox from '../../Components/MidBox/MediumStatusBox'
import { DateConverter } from '../../Utils/Date'
import './Layer2.css'
import Modal, { listElementProps } from '../../Components/Modal/Modal'
import { getPocRoles } from '../../../Campus/utils'
import AddConnect from '../../Utils/Add Data/Connect'
import AddVisit from '../../Utils/Add Data/Visit'
import Select from '../../Components/Select/Select'
import Input from '../../Components/Input/Input'
const Types = [
    { id: 'POC', name: 'Facilitator' },
    { id: 'PTA', name: 'PTA Member' },
    { id: 'ALUMNI', name: 'Alumni' },
]
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
const emptyObject = { id: '', name: '' }
const Layer2 = ({ ...props }: Layer2Props) => {
    const { visit, connection, execom, campusId, status } = props
    const [openModal, setOpenModal] = useState(false)
    const [selectedBtn, setSelectedBtn] = useState('')
    const [designationList, setDesignationList] = useState<listElementProps[]>([])
    const [type, setType] = useState(emptyObject)
    const [visitModal, setVisitModal] = useState(false)
    const [openConnectModal, setOpenConnectModal] = useState(false)
    function clear() {
        setSelectedBtn('')
        setOpenModal(false)
        setDesignationList([])
        setType(emptyObject)
        setVisitModal(false)
        setOpenConnectModal(false)
    }
    useEffect(() => {
        if (type.id !== '') {
            console.log(type)
            setDesignationList({} as listElementProps[])
            getPocRoles(setDesignationList, type.id)
        }
    }, [type])

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
                        setVisitModal(true)
                        setSelectedBtn('Visit')
                    }}
                    editOption={true} />
                <MediumStatusBox
                    title={connection ? 'Connect Date' : 'Add'}
                    content={connection ? DateConverter(connection) : 'Connect'}
                    status={connection !== null}
                    onClick={() => {
                        setOpenModal(true)
                        setSelectedBtn('Connect')
                        setOpenConnectModal(true)
                    }}
                    editOption={false} />
                <MediumStatusBox
                    title={execom ? 'Date Execom Formed' : 'Add'}
                    content={execom ? DateConverter(execom) : 'Execom '}
                    status={execom !== null}
                    onClick={() => {
                        setOpenModal(true)
                        setOpenConnectModal(false)
                        setSelectedBtn('Execom')
                        setType({ id: 'Execom', name: 'Execom' })
                    }} editOption={false} />
            </div >
            {openModal &&
                <Modal
                    onSubmit={(e: any) => {
                        AddConnect({
                            postData: {
                                clubId: campusId as string,
                                type: e.Type || 'Execom',
                                name: e.Name,
                                email: e.Email,
                                phone: e.Mobile,
                                status: selectedBtn === 'Connect' ? 'Connection Established' : selectedBtn === 'Execom' ? 'Execom Formed' : '',
                                role: e.Role,
                            },
                            close: clear,
                            updateCampus: props.updateCampus,
                        }
                        )
                    }}
                    header={selectedBtn === 'Connect' ? 'Add Connection' : selectedBtn === 'Execom' ? 'Add Execom Member' : ''}
                    close={clear}
                    functionName={selectedBtn === 'Connect' ? 'Add' : selectedBtn === 'Execom' ? 'Add Member' : ''}
                >
                    <>
                        {openConnectModal && <Select
                            options={Types}
                            placeholder={'Select a connection'}
                            header={'Connection Type'}
                            name='Type'
                            onChange={(e: any) => {
                                setType(e)
                            }}
                        />}
                        <Select options={designationList} name='Role' />
                        <Input name={'Name'} />
                        <Input name={'Email'} type='email' />
                        <Input name={'Mobile'} />
                    </>
                </Modal >
            }
            {
                visitModal &&
                <Modal
                    onSubmit={(e: any) => AddVisit({
                        clubId: campusId as string,
                        clubStatus: 'Visited',
                        visited_date: new Date(e.Date).toISOString(),
                        visited_remarks: e.Remarks
                    }, () => setVisitModal(false), props.updateCampus)}
                    header={'Add Visit'}
                    close={clear}
                >
                    <>
                        <Input name={'Remarks'} />
                        <Input name={'Date'} type='date' />
                    </>
                </Modal>
            }
        </>
    )
}


export default Layer2