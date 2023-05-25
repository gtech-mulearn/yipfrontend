import { SchoolTableProps } from './SchoolTable'
import { selectProps } from '../../utils/setupUtils'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../services/apiGateway'
import { tableRoutes } from '../../../../../services/urls'
import '../../components/Modal.scss'
import { Error } from '../../../components/Error/Alerts'
import { Success } from '../../../components/Error/Alerts'
interface SchoolModalProps {
    school: SchoolTableProps
    setSchool: Dispatch<SetStateAction<SchoolTableProps>>
    optionStatusList: selectProps[]
    updateSchoolData: Function
}
const Modal: FC<SchoolModalProps> = ({ school, setSchool, optionStatusList, updateSchoolData }) => {
    const [status, setStatus] = useState(school.club_status)
    const [deleteSchool, setDeleteSchool] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    return (
        <div className="modal-overlay">
            <div className='modal'>
                <div className='heading'>
                    <div className="title">Manage Model School</div>
                    <div className="close-btn" onClick={() => setSchool({} as SchoolTableProps)}><i className="fa fa-close"></i>
                    </div>
                </div>
                <div className='secondary-box'>
                    <div className="data-box">
                        <div className="title">Name</div>
                        <div className="content">{school.name}</div>
                    </div>

                    <div className="data-box">
                        <div className="title">District</div>
                        <div className="content">{school.district}</div>
                    </div>
                    <div className="data-box">
                        <div className="title">Legislative Assembly</div>
                        <div className="content">{school.legislative_assembly}</div>
                    </div>
                    <div className="data-box">
                        <div className="title">BRC</div>
                        <div className="content">{school.block}</div>
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
                                placeholder={school.club_status}
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
                        <div className={`${(status !== school.club_status && status !== '') ? 'btn-update ' : 'btn-disabled'}`}
                            onClick={() => {
                                if (status !== school.club_status && status !== '') {
                                    updateSchoolStatus(school.id, status, setSchool, updateSchoolData, setSuccessMessage, setErrorMessage)
                                }
                                else {
                                    setErrorMessage("Select a different status")
                                    setTimeout(() => {
                                        setErrorMessage("")
                                    }, 2000);
                                }
                            }}>
                            Update Status
                        </div>
                    </div>
                    <div className='last-container'>
                        {deleteSchool && <p>Are you sure you want to delete this item?</p>}
                        <div className="modal-buttons">
                            {deleteSchool && <button className="confirm-delete" onClick={() => {
                                deleteModelSchool(school.id, updateSchoolData, setSuccessMessage, setErrorMessage, setSchool)
                            }}>Confirm Delete</button>}
                            {!deleteSchool && <button className="confirm-delete" onClick={() => setDeleteSchool(true)}>Delete</button>}
                            <button className="cancel-delete" onClick={() => { setSchool({} as SchoolTableProps) }}>Cancel</button>
                        </div>
                    </div>
                </div>
                {errorMessage && <Error error={errorMessage} />}
                {successMessage && <Success success={successMessage} />}
            </div>
        </div>
    )
}
function updateSchoolStatus(id: string, status: string, setSchool: Dispatch<SetStateAction<SchoolTableProps>>, update: Function,
    setSuccess: Dispatch<SetStateAction<string>>,
    setError: Dispatch<SetStateAction<string>>
) {
    privateGateway.put(tableRoutes.status.update, { clubId: id, clubStatus: status })
        .then(res => {
            console.log('Success :', res?.data?.message?.general[0])
            setSuccess(res?.data?.message?.general[0])
            setTimeout(() => {
                setSchool({} as SchoolTableProps)
                update()
            }, 1000)
        })
        .catch(err => setError(err?.response?.data?.message?.general[0]))
}
function deleteModelSchool(id: string, update: Function, setSuccess: Dispatch<SetStateAction<string>>,
    setError: Dispatch<SetStateAction<string>>, setClub: Dispatch<SetStateAction<SchoolTableProps>>
) {
    privateGateway.delete(`${tableRoutes.school.delete}${id}/`)
        .then(res => {
            update()
            setSuccess(res?.data?.message?.general[0])
            setTimeout(() => {
                update()
                setClub({} as SchoolTableProps)
            }, 1000)
        })
        .catch(err => setError(err?.response?.data?.message?.general[0]))
}

export default Modal