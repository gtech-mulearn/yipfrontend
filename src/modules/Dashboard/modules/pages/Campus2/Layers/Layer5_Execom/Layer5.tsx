import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table/Table'
import AddConnect from '../../Utils/Add Data/Connect'
import Modal, { listElementProps } from '../../Components/Modal/Modal'
import { CustomSelect } from '../../../../../components/CustomSelect/CustomSelect'
import { CustomInput } from '../../../../../components/CustomInput/CustomInput'
import { deleteSubUser } from '../../Utils/SubUser'
import { toast } from 'react-toastify'
import { getPocRoles } from '../../../Campus/utils'
import listSubUser, { FacilitatorProps } from '../../Utils/ListSubUser'
import SmallStatus from '../../Components/SmallBox/SmallStatus'
const emptyObject = { id: '', name: '' }
const Layer5 = ({ ...props }) => {
    const { campusId, updateCampus } = props
    const [open, setOpen] = useState(true)
    const [execomList, setExecomList] = useState<FacilitatorProps[]>([])
    const [user, setUser] = useState(emptyObject)
    const [deleteModal, setDeleteModal] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [designation, setDesignation] = useState(emptyObject)
    const [designationList, setDesignationList] = useState<listElementProps[]>([])
    const clear = () => {
        setDeleteModal(false)
        setOpenModal(false)
        setUser(emptyObject)
        setName('')
        setEmail('')
        setMobile('')
        setDesignation(emptyObject)
    }
    useEffect(() => {
        listSubUser(setExecomList, campusId, 'Execom')
    }, [updateCampus])
    useEffect(() => {
        if (openModal)
            getPocRoles(setDesignationList, 'Execom')
    }, [openModal])
    return (
        <div className="layer-3">
            <Table
                title={"Execom Members"}
                headings={['Name', 'Email', 'Phone', 'Designation']}
                table={execomList}
                columns={['name', 'email', 'phone', 'role']}
                type={""}
                buttons={{
                    delete: (user: any) => { setUser(user); setDeleteModal(true) },
                }}
            >
                <SmallStatus
                    value={'Add Member'} style={'button'}
                    run={() => setOpenModal(true)}
                />
            </Table>
            {openModal && <Modal
                header={`Add Execom Member`}
                close={clear}
                runFunction={() => {
                    AddConnect({
                        postData: {
                            clubId: campusId as string,
                            type: 'Execom',
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
                        updateCampus()
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

export default Layer5