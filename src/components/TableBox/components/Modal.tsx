import { useContext } from "react"
import { DashboardContext } from "../../../utils/DashboardContext"
import { TableContext } from "../../../utils/TableContext"
import yip, { institutionProps } from "../../../service/dataHandler"
import Select from 'react-select'

const Modal = (props: any) => {
    const {
        setModalTrigger,
        setConfirmDelete,
        selectedData, setSelectedData,
        setDelete,
        club, setClub,
        deleteData,
    } = useContext(TableContext)
    const { setUpdateData } = useContext(DashboardContext)
    function closeModal() {
        setModalTrigger(false)
        setConfirmDelete(false)
        setDelete(false)
        setClub({})
        setSelectedData({} as institutionProps)
        setUpdateData((prev: any) => !prev)
    }
    return (
        <div className="modal-overlay">
            <div className='modal'>
                <div className='heading'>
                    <div className="title">Manage {yip.currentPage}</div>
                    <div className="close-btn" onClick={closeModal}><i className="fa fa-close"></i>
                    </div>
                </div>
                <div className='secondary-box'>
                    {selectedData.name && <div className="data-box">
                        <div className="title">Name</div>
                        <div className="content">{selectedData.name}</div>
                    </div>}
                    {selectedData.role && <div className="data-box">
                        <div className="title">Role</div>
                        <div className="content">{selectedData.role}</div>
                    </div>}
                    {selectedData.email && <div className="data-box">
                        <div className="title">email</div>
                        <div className="content">{selectedData.email}</div>
                    </div>}
                    {selectedData.phone && <div className="data-box">
                        <div className="title">phone</div>
                        <div className="content">{selectedData.phone}</div>
                    </div>}
                    {selectedData.district && <div className="data-box">
                        <div className="title">District</div>
                        <div className="content">{selectedData.district}</div>
                    </div>}
                    {selectedData.legislative_assembly && <div className="data-box">
                        <div className="title">Legislative Assembly</div>
                        <div className="content">{selectedData.legislative_assembly}</div>
                    </div>}
                    {selectedData.block && <div className="data-box">
                        <div className="title">BRC</div>
                        <div className="content">{selectedData.block}</div>
                    </div>}
                    {selectedData.club_status && <div className="data-box">
                        <div className="title">Update Status</div>
                        <div className="content">
                            <Select
                                className="react-select-container"
                                classNamePrefix="react-select"
                                options={yip.clubStatus}
                                isSearchable={true}
                                placeholder={selectedData.club_status}
                                getOptionValue={(option: any) => option.id}
                                getOptionLabel={(option: any) => option.name}
                                onChange={(data: any) => {
                                    setClub({ id: selectedData.id, status: data.name })
                                }}
                            />
                        </div>
                    </div>}
                    <div>
                        {selectedData.club_status && <div className={`${(club.status && selectedData.club_status !== club.status) ? 'btn-update ' : 'btn-disabled'}`}
                            onClick={() => {
                                if (club.status && selectedData.club_status !== club.status) {
                                    props.sendData(club.id, club.status)
                                    closeModal()
                                }
                            }}>
                            Update Status
                        </div>}
                    </div>
                    <div className='last-container'>
                        {deleteData && <p>Are you sure you want to delete this item?</p>}
                        <div className="modal-buttons">
                            {deleteData ?
                                <button onClick={() => {
                                    props.handleDelete(selectedData.id)
                                    closeModal()
                                    setUpdateData((prev: boolean) => !prev)
                                }} className="confirm-delete">Confirm Delete</button>
                                : <button onClick={() => { setDelete(true) }} className="confirm-delete">Delete</button>}
                            <button onClick={closeModal} className="cancel-delete">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal