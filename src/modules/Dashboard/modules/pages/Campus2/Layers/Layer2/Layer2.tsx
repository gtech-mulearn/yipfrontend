import { SetStateAction, useEffect, useState } from 'react'
import MediumStatusBox from '../../Components/MidBox/MediumStatusBox'
import { DateConverter } from '../../Utils/Date'
import './Layer2.css'
import Modal, { listElementProps } from '../../Components/Modal/Modal'
import { getPocRoles } from '../../../Campus/utils'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import { CustomInput } from '../../../../../components/CustomInput/CustomInput'
import AddConnect from '../../Utils/Add Data/Connect'
import AddVisit from '../../Utils/Add Data/Visit'
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
    const [selected, setSelected] = useState('')
    const [designationList, setDesignationList] = useState<listElementProps[]>([])
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [designation, setDesignation] = useState(emptyObject)
    const [mobile, setMobile] = useState('')
    const [remarks, setRemarks] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState(emptyObject)
    const [visitModal, setVisitModal] = useState(false)
    const [openConnectModal, setOpenConnectModal] = useState(false)
    function clear() {
        setSelected('')
        setOpenModal(false)
        setDesignationList([])
        setEmail('')
        setName('')
        setDesignation(emptyObject)
        setMobile('')
        setRemarks('')
        setDate('')
        setType(emptyObject)
        setVisitModal(false)
        setOpenConnectModal(false)
    }
    useEffect(() => {
        if (type.id !== '') {
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
                        setSelected('Visit')
                    }}
                    editOption={true} />
                <MediumStatusBox
                    title={connection ? 'Connect Date' : 'Add'}
                    content={connection ? DateConverter(connection) : 'Connect'}
                    status={connection !== null}
                    onClick={() => {
                        setOpenModal(true)
                        setSelected('Connect')
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
                        setSelected('Execom')
                        setType({ id: 'Execom', name: 'Execom' })
                    }} editOption={false} />
            </div >
            {openModal &&
                <Modal
                    header={selected === 'Connect' ? 'Add Connection' : selected === 'Execom' ? 'Add Execom Member' : ''}
                    close={clear}
                    functionName={selected === 'Connect' ? 'Add' : selected === 'Execom' ? 'Add Member' : ''}
                    runFunction={() => {
                        AddConnect({
                            postData: {
                                clubId: campusId as string,
                                type: type.id,
                                name: name,
                                email: email,
                                phone: mobile,
                                status: selected === 'Connect' ? 'Connection Established' : selected === 'Execom' ? 'Execom Formed' : '',
                                role: designation.id,
                            },
                            close: clear,
                            updateCampus: props.updateCampus,
                        }
                        )
                    }}>
                    <>
                        {openConnectModal && <CustomSelect
                            option={[
                                { id: 'POC', name: 'Facilitator' },
                                { id: 'PTA', name: 'PTA Member' },
                                { id: 'ALUMNI', name: 'Alumni' },
                            ]}
                            placeholder={'Select a connection'}
                            header={'Connection Designation'}
                            setData={setType} />}
                        <CustomSelect
                            option={designationList}
                            header={'Role'}
                            setData={setDesignation}
                        />
                        <CustomInput
                            value={'Name'}
                            data={name}
                            setData={setName}
                        />
                        <CustomInput
                            value={'Email'}
                            data={email}
                            setData={setEmail}
                            type='email'
                        />
                        <CustomInput
                            value={'Mobile'}
                            data={mobile}
                            setData={setMobile}
                        />
                    </>
                </Modal >
            }
            {
                visitModal &&
                <Modal
                    header={'Add Visit'}
                    close={clear}
                    runFunction={() => AddVisit({
                        clubId: campusId as string,
                        clubStatus: 'Visited',
                        visited_date: new Date(date).toISOString(),
                        visited_remarks: remarks
                    }, () => setVisitModal(false), props.updateCampus)}>
                    <>
                        <CustomInput
                            value={'Remarks'}
                            data={remarks}
                            setData={setRemarks}

                        />
                        <CustomInput
                            value={'Date'}
                            data={date}
                            setData={setDate}
                            type='date'
                        />
                    </>
                </Modal>
            }
        </>
    )
}
function selectModalTitle(value: string): string {
    switch (value) {
        case 'Visit': return 'Add Visit'
        case 'Facilitator': return 'Add Facilitator'
        case 'PTA': return 'Add PTA'
        case 'Alumni': return 'Add Alumni'
        case 'Execom': return 'Add Execom Member'
    }
    return ''
}

export default Layer2