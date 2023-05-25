import { ClubTableProps } from './ClubTable'
import { selectProps } from '../../utils/setupUtils'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import '../../components/Modal.scss'
import { Error } from '../../../components/Error/Alerts'
import { Success } from '../../../components/Error/Alerts'
import { deleteModelClub, updateClubStatus } from './clubAPI'
interface ClubModalProps {
    club: ClubTableProps
    setClub: Dispatch<SetStateAction<ClubTableProps>>
    optionStatusList: selectProps[]
    update: Function
}
const Modal: FC<ClubModalProps> = ({ club, setClub, optionStatusList, update }) => {
    const [status, setStatus] = useState(club.club_status)
    const [deleteClub, setDeleteClub] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    return (
        <div className="modal-overlay">
            <div className='modal'>
                <div className='heading'>
                    <div className="title">Manage Model club</div>
                    <div className="close-btn" onClick={() => setClub({} as ClubTableProps)}><i className="fa fa-close"></i>
                    </div>
                </div>
                <div className='secondary-box'>
                    <div className="data-box">
                        <div className="title">Name</div>
                        <div className="content">{club.name}</div>
                    </div>

                    <div className="data-box">
                        <div className="title">District</div>
                        <div className="content">{club.district}</div>
                    </div>
                    <div className="data-box">
                        <div className="title">Legislative Assembly</div>
                        <div className="content">{club.legislative_assembly}</div>
                    </div>
                    <div className="data-box">
                        <div className="title">BRC</div>
                        <div className="content">{club.block}</div>
                    </div>

                    <div className="data-box">
                        <div className="title">Update Status</div>
                        <div className="content">
                            <CustomSelect
                                option={optionStatusList}
                                header='Status'
                                setValue={setStatus}
                                requiredHeader={false}
                                requiredData={false}
                                requiredLabel={true}
                                placeholder={club.club_status}
                                requirePlaceHolder={true}
                                customCSS={{
                                    className: "react-select-container",
                                    classNamePrefix: "react-select"
                                }
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <div className={`${(status !== club.club_status && status !== '') ? 'btn-update ' : 'btn-disabled'}`}
                            onClick={() => {
                                if (status !== club.club_status && status !== '') {
                                    updateClubStatus(club.id, status, setClub, update, setSuccessMessage, setErrorMessage)
                                }
                                else {
                                    setErrorMessage("Please select status")
                                    setTimeout(() => {
                                        setErrorMessage("")
                                    }, 2000);
                                }
                            }}>
                            Update Status
                        </div>
                    </div>
                    <div className='last-container'>
                        {deleteClub && <p>Are you sure you want to delete this item?</p>}
                        <div className="modal-buttons">
                            {deleteClub && <button className="confirm-delete" onClick={() => {
                                deleteModelClub(club.id, update, setSuccessMessage, setErrorMessage, setClub)
                            }}>Confirm Delete</button>}
                            {!deleteClub && <button className="confirm-delete" onClick={() => setDeleteClub(true)}>Delete</button>}
                            <button className="cancel-delete" onClick={() => { setClub({} as ClubTableProps) }}>Cancel</button>
                        </div>
                    </div>
                </div>
                {errorMessage && <Error error={errorMessage} />}
                {successMessage && <Success success={successMessage} />}
            </div>
        </div>
    )
}


export default Modal