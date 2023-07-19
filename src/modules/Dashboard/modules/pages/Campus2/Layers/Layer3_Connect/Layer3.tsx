import { useEffect, useRef, useState } from "react"
import InfoTab from "../../Components/InfoTabs/InfoTab"
import './Layer3.css'
import SmallStatus from "../../Components/SmallBox/SmallStatus"
import open from '../../Assets/open.svg'
import close from '../../Assets/close.svg'
import Modal from "../../Components/Modal/Modal"
import { CustomSelect } from "../../../../../components/CustomSelect/CustomSelect"
import { CustomInput } from "../../../../../components/CustomInput/CustomInput"
import AddConnect from "../../Utils/Add Data/Connect"
import { getPocRoles } from "../../../Campus/utils"
import Table from "../../Components/Table/Table"
import listSubUser from "../../Utils/ListSubUser"
import { deleteSubUser } from "../../Utils/SubUser"
import { toast } from "react-toastify"
interface Layer3Props {
    campusId: string
    updateCampus: () => void
}
interface listElementProps {
    id: string
    name: string
}
const emptyObject = { id: '', name: '' }
const FacilitatorHeading = ['Name', 'Email', 'Phone', 'Designation']
const Layer3 = ({ campusId, updateCampus }: Layer3Props) => {
    const [openConnect, setOpenConnect] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [designationList, setDesignationList] = useState<listElementProps[]>([])
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [designation, setDesignation] = useState(emptyObject)
    const [mobile, setMobile] = useState('')
    const [type, setType] = useState(emptyObject)
    const [pocList, setPocList] = useState<any>([])
    const [ptaList, setPtaList] = useState<any>([])
    const [alumniList, setAlumniList] = useState<any>([])
    const [user, setUser] = useState<any>({})
    const [deleteModal, setDeleteModal] = useState(false)
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        listSubUser(setPocList, campusId, 'POC')
        listSubUser(setPtaList, campusId, 'PTA')
        listSubUser(setAlumniList, campusId, 'ALUMNI')
    }, [openConnect, update, updateCampus])

    useEffect(() => {
        if (type.id !== '') {
            getPocRoles(setDesignationList, type.id)
        }
    }, [type])

    const clear = () => {
        setOpenModal(false)
        setDesignationList([])
        setEmail('')
        setName('')
        setDesignation(emptyObject)
        setMobile('')
        setType(emptyObject)
        setUser('')
        setDeleteModal(false)
        setUpdate(!update)
    }
    return (
        <div className="layer-3">
            <InfoTab title="Connections"
                openLayer={openConnect}
                closer={() => setOpenConnect(!openConnect)}
            >
                <>
                    <SmallStatus
                        value={"Add Facilitator"}
                        style={"button"}
                        run={() => {
                            setOpenModal(true)
                            setType({ id: 'POC', name: 'Facilitator' })
                        }}
                    />
                    <SmallStatus
                        value={"Add PTA"}
                        style={"button"}
                        run={() => {
                            setOpenModal(true)
                            setType({ id: 'PTA', name: 'PTA Members' })
                        }}
                    />
                    <SmallStatus
                        value={"Add Alumni"}
                        style={"button"}
                        run={() => {
                            setOpenModal(true)
                            setType({ id: 'ALUMNI', name: 'Alumni Members' })
                        }}
                    />
                </>
            </InfoTab>

            {openConnect &&
                <Table title={"Facilitator List"}
                    opener={true}
                    headings={FacilitatorHeading}
                    table={pocList}
                    columns={['name', 'email', 'phone', 'role']}
                    type={""}
                    buttons={{
                        delete: (userId: string) => { setUser(userId); setDeleteModal(true) },
                    }}
                />}
            {openConnect &&
                <Table title={"PTA List"}
                    headings={FacilitatorHeading}
                    table={ptaList}
                    columns={['name', 'email', 'phone', 'role']}
                    type={""}
                    buttons={{
                        delete: (userId: string) => { setUser(userId); setDeleteModal(true) },
                    }}
                />}
            {openConnect &&
                <Table title={"Alumni List"}
                    headings={FacilitatorHeading}
                    table={alumniList}
                    columns={['name', 'email', 'phone', 'role']}
                    type={""}
                    buttons={{
                        delete: (userId: string) => { setUser(userId); setDeleteModal(true) },
                    }}
                />}
            {openModal && <Modal
                header={`Add ${type.name}`}
                close={clear}
                runFunction={() => {
                    AddConnect({
                        postData: {
                            clubId: campusId as string,
                            type: type.id,
                            name: name,
                            email: email,
                            phone: mobile,
                            role: designation.id,
                            status: '',
                        },
                        close: () => clear(),
                        updateCampus: updateCampus,
                    })
                }}>
                <>
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
            </Modal>
            }
            {
                deleteModal &&
                <Modal header={'Delete User'}
                    DeleteBtn={true}
                    functionName="Confirm Delete"
                    close={() => setDeleteModal(false)}
                    runFunction={() => deleteSubUser(user.id, () => {
                        clear()
                        toast.success('User Successfully Deleted')
                    })} >
                    <>
                        <div className='delete-campus-modal'>
                            Are you sure you want to delete user <br /> {user.name}?
                        </div>
                    </>
                </Modal>
            }
        </div>
    )
}
export default Layer3
