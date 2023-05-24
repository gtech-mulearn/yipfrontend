import { selectProps } from '../../utils/setupUtils'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { privateGateway } from '../../../../../services/apiGateway'
import { tableRoutes } from '../../../../../services/urls'
import '../../components/Modal.scss'
import { UserTableProps } from './UserTable'
interface UserModalProps {
    user: UserTableProps
    setUser: Dispatch<SetStateAction<UserTableProps>>
    updateUserData: Function
}
const Modal: FC<UserModalProps> = ({ user, setUser, updateUserData }) => {
    const [deleteUser, setDeleteUser] = useState(false)

    return (
        <div className="modal-overlay">
            <div className='modal'>
                <div className='heading'>
                    <div className="title">Manage Model user</div>
                    <div className="close-btn" onClick={() => setUser({} as UserTableProps)}><i className="fa fa-close"></i>
                    </div>
                </div>
                <div className='secondary-box'>
                    <div className="data-box">
                        <div className="title">Name</div>
                        <div className="content">{user.name}</div>
                    </div>

                    <div className="data-box">
                        <div className="title">Email</div>
                        <div className="content">{user.email}</div>
                    </div>
                    <div className="data-box">
                        <div className="title">Mobile </div>
                        <div className="content">{user.phone}</div>
                    </div>
                    <div className="data-box">
                        <div className="title">Role</div>
                        <div className="content">{user.role}</div>
                    </div>
                    <div className='last-container'>
                        {deleteUser && <p>Are you sure you want to delete this item?</p>}
                        <div className="modal-buttons">
                            {deleteUser && <button className="confirm-delete" onClick={() => {
                                deleteThisUser(user.id, updateUserData)
                                setUser({} as UserTableProps)
                            }}>Confirm Delete</button>}
                            {!deleteUser && <button className="confirm-delete" onClick={() => setDeleteUser(true)}>Delete</button>}
                            <button className="cancel-delete" onClick={() => { setUser({} as UserTableProps) }}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
function deleteThisUser(id: string, update: Function) {
    privateGateway.delete(`${tableRoutes.user.delete}${id}/`)
        .then(res => {
            console.log('Success :', res?.data?.message?.general[0])
            update()
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}

export default Modal