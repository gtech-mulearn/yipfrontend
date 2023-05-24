import { ClubTableProps } from './ClubTable'
import { selectProps } from '../../utils/setupUtils'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../services/apiGateway'
import { tableRoutes } from '../../../../../services/urls'
import '../../components/Modal.scss'
interface ClubModalProps {
    club: ClubTableProps
    setClub: Dispatch<SetStateAction<ClubTableProps>>
    optionStatusList: selectProps[]
    update: Function
}
const Modal: FC<ClubModalProps> = ({ club, setClub, optionStatusList, update }) => {
    const [status, setStatus] = useState('')
    const [deleteClub, setDeleteClub] = useState(false)

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
                                value='Status'
                                setValue={setStatus}
                                requiredHeader={false}
                                requiredData={false}
                                requiredLabel={true}
                                placeHolder={club.club_status}
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
                        <div className={`${(status) ? 'btn-update ' : 'btn-disabled'}`}
                            onClick={() => {
                                if (status) {
                                    updateClubStatus(club.id, status, setClub, update)
                                }
                            }}>
                            Update Status
                        </div>
                    </div>
                    <div className='last-container'>
                        {deleteClub && <p>Are you sure you want to delete this item?</p>}
                        <div className="modal-buttons">
                            {deleteClub && <button className="confirm-delete" onClick={() => {
                                deleteModelClub(club.id, update)
                                setClub({} as ClubTableProps)
                            }}>Confirm Delete</button>}
                            {!deleteClub && <button className="confirm-delete" onClick={() => setDeleteClub(true)}>Delete</button>}
                            <button className="cancel-delete" onClick={() => { setClub({} as ClubTableProps) }}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
function updateClubStatus(id: string, status: string, setClub: Dispatch<SetStateAction<ClubTableProps>>, updateClubStatus: Function) {
    privateGateway.put(tableRoutes.status.update, { clubId: id, clubStatus: status })
        .then(res => {
            setClub({} as ClubTableProps)
            updateClubStatus()
            console.log('Success :', res?.data?.message?.general[0])
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
function deleteModelClub(id: string, updateClubStatus: Function) {
    privateGateway.delete(`${tableRoutes.club.delete}${id}/`)
        .then(res => {
            updateClubStatus()
            console.log('Success :', res?.data?.message?.general[0])
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}

export default Modal