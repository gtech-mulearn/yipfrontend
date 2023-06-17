import { privateGateway } from '../../../../../../../services/apiGateway'
import { tableRoutes } from '../../../../../../../services/urls'
import './CampusModal.scss'
import { useNavigate } from 'react-router-dom'

const DeleteModal = ({ id, cancel, customFunction, option = 'Campus' }: { id: string, cancel: () => void, customFunction?: () => void, option?: string }) => {
    const navigate = useNavigate()

    return (
        <div className="modal-overlay">
            <div className='modal'>
                <div className="secondary-box">
                    <div className='last-container'>
                        <p>Are you sure you want to delete this {option}?</p>
                        <div className="modal-buttons">
                            <button className="confirm-delete" onClick={() => {
                                { customFunction ? customFunction() : deleteModelSchool(id, cancel, () => navigate('/school-dashboard')) }
                            }}>Confirm Delete</button>
                            <button className="cancel-delete" onClick={cancel} >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export function deleteModelSchool(id: string, cancel: () => void, reRoute: () => void) {
    privateGateway.delete(`${tableRoutes.school.delete}${id}/`)
        .then(res => {
            cancel()
            reRoute()
            console.log(res?.data?.message?.general[0])
        })
        .catch(err => console.log(err?.response?.data?.message?.general[0]))
}
export default DeleteModal