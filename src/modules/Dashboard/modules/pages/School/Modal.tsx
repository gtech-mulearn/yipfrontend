import { SchoolTableProps } from './SchoolTable'
import { selectProps } from '../../utils/setupUtils'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect'
import { privateGateway } from '../../../../../services/apiGateway'
import { tableRoutes } from '../../../../../services/urls'
import '../../components/Modal.scss'
interface SchoolModalProps {
    school: SchoolTableProps
    setSchool: Dispatch<SetStateAction<SchoolTableProps>>
    optionStatusList: selectProps[]
    update: Function
}
const Modal: FC<SchoolModalProps> = ({ school, setSchool, optionStatusList, update }) => {
    const [status, setStatus] = useState('')
    const [deleteSchool, setDeleteSchool] = useState(false)

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
                                value='Status'
                                setValue={setStatus}
                                requiredHeader={false}
                                requiredData={false}
                                requiredLabel={true}
                                placeHolder={school.club_status}
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
                                    updateSchoolStatus(school.id, status, setSchool)
                                }
                            }}>
                            Update Status
                        </div>
                    </div>
                    <div className='last-container'>
                        {deleteSchool && <p>Are you sure you want to delete this item?</p>}
                        <div className="modal-buttons">
                            {deleteSchool && <button className="confirm-delete" onClick={() => {
                                deleteModelSchool(school.id, update)
                                setSchool({} as SchoolTableProps)
                            }}>Confirm Delete</button>}
                            {!deleteSchool && <button className="confirm-delete" onClick={() => setDeleteSchool(true)}>Delete</button>}
                            <button className="cancel-delete" onClick={() => { setSchool({} as SchoolTableProps) }}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
function updateSchoolStatus(id: string, status: string, setSchool: Dispatch<SetStateAction<SchoolTableProps>>) {
    privateGateway.put(tableRoutes.status.update, { clubId: id, clubStatus: status })
        .then(res => {
            setSchool({} as SchoolTableProps)
            console.log('Success :', res?.data?.message?.general[0])
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}
function deleteModelSchool(id: string, update: Function) {
    privateGateway.delete(`${tableRoutes.school.delete}${id}/`)
        .then(res => {
            update()
            console.log('Success :', res?.data?.message?.general[0])
        })
        .catch(err => console.log('Error :', err?.response?.data?.message?.general[0]))
}

export default Modal