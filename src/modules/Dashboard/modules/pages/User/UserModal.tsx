import { Dispatch, FC, SetStateAction, useState } from 'react'
import '../../components/Modal.scss'
import { Error, Success } from '../../../components/Error/Alerts'

import { UserTableProps } from './UserTable'
import { deleteThisUser } from './UserApi'
interface UserModalProps {
    user: UserTableProps
    setUser: Dispatch<SetStateAction<UserTableProps>>
    updateUserData: Function
}
const Modal: FC<UserModalProps> = ({ user, setUser, updateUserData }) => {
    const [deleteUser, setDeleteUser] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
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
                                deleteThisUser(user.id, updateUserData, setSuccessMessage, setErrorMessage, setUser)

                            }}>Confirm Delete</button>}
                            {!deleteUser && <button className="confirm-delete" onClick={() => setDeleteUser(true)}>Delete</button>}
                            <button className="cancel-delete" onClick={() => { setUser({} as UserTableProps) }}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
            {errorMessage && <Error error={errorMessage} />}
            {successMessage && <Success success={successMessage} />}
        </div>
    )
}


export default Modal