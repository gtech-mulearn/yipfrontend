import { Dispatch, FC, SetStateAction, useState } from 'react'
import '../../components/Modal.scss'
import { Error, Success } from '../../../components/Error/Alerts'

import { UserTableProps } from './UserTable'
import { deleteThisUser } from './UserApi'
import { OptionDistrict, OptionZone } from '../../../../../utils/Locations'
import { selectProps } from '../../utils/setupUtils'
import { prepareDataForValidation } from 'formik'
import { privateGateway } from '../../../../../services/apiGateway'
import { setupRoutes } from '../../../../../services/urls'
import { errorCheck, errorMessage, success } from '../../../components/Toastify/ToastifyConsts'
interface UserModalProps {
    user: UserTableProps
    setUser: Dispatch<SetStateAction<UserTableProps>>
    updateUserData: Function,
    setUpdateUser: Dispatch<SetStateAction<any>>

}
const Modal: FC<UserModalProps> = ({ user, setUser, updateUserData, setUpdateUser }) => {
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
                    {user?.location && <div className="data-box">
                        <div className="title">Location</div>
                        <div className="content">{user?.location}</div>
                    </div>}
                    {user?.coordinator?.id && <div className="data-box">
                        <div className="title">Coordinator</div>
                        <div className="content">{user?.coordinator?.name}</div>
                    </div>
                    }
                    {user?.institutes.length > 0 && <div className="data-box special">
                        <div className="title">Assigned Institutes</div>
                        <div className="inside-box">
                            {
                                user?.institutes.map((item: selectProps, index: number) => {
                                    return (
                                        <div className='institutes' key={index}>
                                            <p className='name'>{index + 1 + '.'} {item?.name}</p>
                                            <i className='fas fa-trash'
                                                onClick={() => disconnectInstitute(user?.id, item?.id, setUser, updateUserData)}
                                            ></i>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>}
                    <div className='last-container'>
                        {deleteUser && <p>Are you sure you want to delete this item?</p>}
                        <div className="modal-buttons">
                            {deleteUser && <button className="confirm-delete" onClick={() => {
                                deleteThisUser(user.id, updateUserData, setSuccessMessage, setErrorMessage, setUser)
                            }}>Confirm Delete</button>}
                            {!deleteUser && <button className="confirm-delete" onClick={() => setDeleteUser(true)}>Delete</button>}
                            {user.role !== 'District Coordinator' && user.role !== 'Zonal Coordinator' &&

                                <button className="cancel-delete" onClick={() => setupUserUpdate(user, setUpdateUser, () => setUser({} as UserTableProps))}>Update</button>
                            }
                            <button className="cancel-delete" onClick={() => { setUser({} as UserTableProps) }}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
function disconnectInstitute(userId: string, instituteId: string, setUser: Dispatch<SetStateAction<UserTableProps>>, update: Function) {
    privateGateway.delete(`${setupRoutes.user.instituteDisconnect}${instituteId}/${userId}/`)
        .then((res) => {
            success()
            setUser((user) => (
                {
                    ...user,
                    institutes: user.institutes.filter((item) => item.id !== instituteId)
                }
            ))
            update
        })
        .catch((err) => {
            errorCheck(err.response)
            errorMessage(err.response)
        })
}
function setupUserUpdate(user: UserTableProps, setUpdateUser: React.Dispatch<React.SetStateAction<any>>, cancel: () => void) {
    let X = {
        ...user,
        id: user.id,
        district: user.role === 'District Coordinator' || user.role === 'Programme Executive' || user.role === 'Intern' ? getDistrict(user.location) : {} as selectProps,
        zone: user.role === 'Zonal Coordinator' ? getZone(user.location) : {} as selectProps,
        role: getRoleId(user.role),
    }
    setUpdateUser(X)
    cancel()
}
function getDistrict(district: string) {
    const x = OptionDistrict.filter((item) =>
        item.name === district
    )
    if (x.length === 0) return {} as selectProps
    return x[0]
}
function getZone(zone: string) {
    let Zone = zone === 'Outside State' ? zone : zone.split(' ')[0]
    const x = OptionZone.filter((item) =>
        item.name === Zone
    )
    return x[0]
}
function getRoleId(role: string) {
    switch (role) {
        case 'Admin': return { id: 'AD', name: 'Admin' }
        case 'HQ Staff': return { id: 'HQ', name: 'HQ Staff' }
        case "District Coordinator": return { id: 'DC', name: 'District Coordinator' }
        case "Zonal Coordinator": return { id: 'ZC', name: 'Zonal Coordinator' }
        case "Programme Executive": return { id: 'PE', name: 'Programme Executive' }
        case "Intern": return { id: 'IN', name: 'Intern' }
    }
}


export default Modal