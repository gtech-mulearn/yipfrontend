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
import Select from "../../Components/Select/Select"
import Input from "../../Components/Input/Input"
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
                onSubmit={(e: any) => {
                    console.log(e)
                    AddConnect({
                        postData: {
                            clubId: campusId as string,
                            type: type.id,
                            name: e.Name,
                            email: e.Email,
                            phone: e.Mobile,
                            status: '',
                            role: e.Role,
                        },
                        close: clear,
                        updateCampus: updateCampus,
                    })
                }}
                header={`Add ${type.name}`}
                close={clear}
            >
                <>
                    <Select options={designationList} name='Role' />
                    <Input name={'Name'} />
                    <Input name={'Email'} type='email' />
                    <Input name={'Mobile'} />
                </>
            </Modal>
            }
            {
                deleteModal &&
                <Modal
                    onSubmit={(e: any) => {
                        deleteSubUser(user.id, () => {
                            clear()
                            toast.success('User Successfully Deleted')
                        })
                    }}
                    header={'Delete User'}
                    DeleteBtn={true}
                    functionName="Confirm Delete"
                    close={() => setDeleteModal(false)}
                >
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
