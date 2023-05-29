import { privateGateway } from '../../../../../../../services/apiGateway'
import { tableRoutes } from '../../../../../../../services/urls'
import './CampusModal.scss'
const DeleteModal = ({ id, cancel, customFunction }: { id: string, cancel: () => void, customFunction?: () => void }) => {
    return (
        <div className="modal-overlay">
            <div className='modal'>
                <div className="secondary-box">
                    <div className='last-container'>
                        <p>Are you sure you want to delete this campus?</p>
                        <div className="modal-buttons">
                            <button className="confirm-delete" onClick={() => {
                                { customFunction ? customFunction() : deleteModelSchool(id, cancel) }
                            }}>Confirm Delete</button>
                            <button className="cancel-delete" onClick={cancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export function deleteModelSchool(id: string, cancel: () => void) {
    privateGateway.delete(`${tableRoutes.school.delete}${id}/`)
        .then(res => {
            cancel()
            console.log(res?.data?.message?.general[0])
        })
        .catch(err => console.log(err?.response?.data?.message?.general[0]))
}
export default DeleteModal