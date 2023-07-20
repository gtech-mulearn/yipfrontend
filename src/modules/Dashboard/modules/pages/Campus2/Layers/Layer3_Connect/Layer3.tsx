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

interface listElementProps {
    id: string
    name: string
}
const FacilitatorHeading = ['Name', 'Email', 'Phone', 'Designation']
const Layer3 = ({ ...props }) => {
    const { campusId, pocState, updateSubUserList, ptaState, alumniState } = props
    const emptyObject = { id: '', name: '', state: pocState.setPocList }

    const [openConnect, setOpenConnect] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [designationList, setDesignationList] = useState<listElementProps[]>([])
    const [type, setType] = useState(emptyObject)
    const [user, setUser] = useState<any>({})
    const [deleteModal, setDeleteModal] = useState(false)
    const [update, setUpdate] = useState(false)
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
                            setType({ id: 'POC', name: 'Facilitator', state: pocState.setList })
                        }}
                    />
                    <SmallStatus
                        value={"Add PTA"}
                        style={"button"}
                        run={() => {
                            setOpenModal(true)
                            setType({ id: 'PTA', name: 'PTA Members', state: ptaState.setList })
                        }}
                    />
                    <SmallStatus
                        value={"Add Alumni"}
                        style={"button"}
                        run={() => {
                            setOpenModal(true)
                            setType({ id: 'ALUMNI', name: 'Alumni Members', state: alumniState.setList })
                        }}
                    />
                </>
            </InfoTab>
            {openConnect &&
                <Table title={"Facilitator List"}
                    opener={true}
                    headings={FacilitatorHeading}
                    table={pocState.list}
                    columns={['name', 'email', 'phone', 'role']}
                    type={""}
                    buttons={{
                        delete: (userId: string) => {
                            setUser(userId)
                            setDeleteModal(true)
                            setType({ id: 'POC', name: 'Facilitator', state: pocState.setList })
                        },
                    }}
                />}
            {openConnect &&
                <Table title={"PTA List"}
                    headings={FacilitatorHeading}
                    table={ptaState.list}
                    columns={['name', 'email', 'phone', 'role']}
                    type={""}
                    buttons={{
                        delete: (userId: string) => {
                            setUser(userId)
                            setDeleteModal(true)
                            setType({ id: 'PTA', name: 'PTA Members', state: ptaState.setList })
                        }
                    }}
                />}
            {openConnect &&
                <Table title={"Alumni List"}
                    headings={FacilitatorHeading}
                    table={alumniState.list}
                    columns={['name', 'email', 'phone', 'role']}
                    type={""}
                    buttons={{
                        delete: (userId: string) => {
                            setUser(userId)
                            setDeleteModal(true)
                            setType({ id: 'ALUMNI', name: 'Alumni Members', state: alumniState.setList })
                        }
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
                        updateCampus: () => updateSubUserList(type.state, campusId, type.id),
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
                            updateSubUserList(type.state, campusId, type.id)
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
