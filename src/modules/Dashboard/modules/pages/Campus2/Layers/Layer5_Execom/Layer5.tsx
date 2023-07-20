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
import Select from '../../Components/Select/Select'
import Input from '../../Components/Input/Input'
const emptyObject = { id: '', name: '' }
const Layer5 = ({ ...props }) => {
    const { campusId, updateCampus, updateSubUserList, execomState } = props
    const [user, setUser] = useState(emptyObject)
    const [deleteModal, setDeleteModal] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [designationList, setDesignationList] = useState<listElementProps[]>([])
    const clear = () => {
        setDeleteModal(false)
        setOpenModal(false)
        setUser(emptyObject)
    }
    useEffect(() => {
        if (openModal)
            getPocRoles(setDesignationList, 'Execom')
    }, [openModal])
    return (
        <div className="layer-3">
            <Table
                title={"Execom Members"}
                headings={['Name', 'Email', 'Phone', 'Designation']}
                table={execomState.list}
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
                onSubmit={(e: any) => {
                    AddConnect({
                        postData: {
                            clubId: campusId as string,
                            type: 'Execom',
                            name: e.Name,
                            email: e.Email,
                            phone: e.Mobile,
                            role: e.Role,
                            status: '',
                        },
                        close: () => clear(),
                        updateCampus: updateSubUserList(execomState.setList, campusId, 'Execom'),
                    })
                }}>
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
                <Modal header={'Delete User'}
                    DeleteBtn={true}
                    functionName="Confirm Delete"
                    close={() => setDeleteModal(false)}
                    onSubmit={(e: any) => deleteSubUser(user.id, () => {
                        clear()
                        updateSubUserList(execomState.setList, campusId, 'Execom')
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